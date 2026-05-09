import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import { nanoid } from 'nanoid'

const app = express()

app.use(helmet())
app.use(express.json({ limit: '2mb' }))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: false,
  }),
)


const upload = multer({ storage: multer.memoryStorage() })

const PORT = Number(process.env.PORT || 8000)
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

// In-memory stores (production should swap to DB)
const users = [] // {id, name, email, passwordHash, is_admin}
const bills = [] // {id, userId, original_filename, extracted_data, confidence_score, created_at}

function signToken(user) {
  return jwt.sign({ sub: user.id, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '7d' })
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ detail: 'Missing Authorization token' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.auth = { userId: payload.sub, is_admin: payload.is_admin }
    return next()
  } catch {
    return res.status(401).json({ detail: 'Invalid or expired token' })
  }
}

function getUserById(id) {
  return users.find((u) => u.id === id) || null
}

// Seed admin user (optional)
if (users.length === 0) {
  const seed = {
    id: nanoid(),
    name: 'Admin',
    email: 'admin@example.com',
    is_admin: true,
  }
  // password: admin123
  seed.passwordHash = bcrypt.hashSync('admin123', 10)
  users.push(seed)
}

// Auth
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body || {}
  if (!name || !email || !password) return res.status(400).json({ detail: 'Name, email, password required' })

  if (users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ detail: 'Email already exists' })
  }

  const passwordHash = await bcrypt.hash(String(password), 10)
  const user = {
    id: nanoid(),
    name: String(name),
    email: String(email),
    passwordHash,
    is_admin: false,
  }
  users.push(user)

  return res.json({
    message: 'Account created',
    user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin },
  })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ detail: 'Email and password required' })

  const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase())
  if (!user) return res.status(401).json({ detail: 'Invalid credentials' })

  const ok = await bcrypt.compare(String(password), user.passwordHash)
  if (!ok) return res.status(401).json({ detail: 'Invalid credentials' })

  const access_token = signToken(user)

  return res.json({
    access_token,
    user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin },
  })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = getUserById(req.auth.userId)
  if (!user) return res.status(401).json({ detail: 'User not found' })
  return res.json({ id: user.id, name: user.name, email: user.email, is_admin: user.is_admin })
})

// Admin
app.get('/api/admin/users', authMiddleware, (req, res) => {
  if (!req.auth.is_admin) return res.status(403).json({ detail: 'Admin access required' })
  const items = users.map((u) => ({ id: u.id, name: u.name, email: u.email, is_admin: u.is_admin }))
  return res.json({ items })
})

app.get('/api/admin/bills', authMiddleware, (req, res) => {
  if (!req.auth.is_admin) return res.status(403).json({ detail: 'Admin access required' })
  const items = bills.map((b) => ({
    ...b,
    user: getUserById(b.userId) ? { email: getUserById(b.userId).email } : null,
  }))
  return res.json({ items })
})

// Upload + extraction (mocked)
app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ detail: 'file is required' })

  const billId = nanoid()
  const created_at = new Date().toISOString()

  const extracted_data = {
    consumer_name: 'Mock Consumer',
    consumer_number: '12345',
    address: 'Mock Address',
    billing_period: { from: '2024-01-01', to: '2024-01-31' },
    units_consumed: 250,
    tariff: 'LT',
    sanctioned_load_kw: 3.5,
    meter_number: 'MN-0001',
    bill_amount: 1250,
    due_date: '2024-02-15',
  }

  const confidence_score = 0.72

  bills.push({
    id: billId,
    userId: req.auth.userId,
    original_filename: req.file.originalname,
    extracted_data,
    confidence_score,
    created_at,
  })

  return res.json({ bill_id: billId })
})

app.post('/api/extract/:billId', authMiddleware, (req, res) => {
  const { billId } = req.params
  const bill = bills.find((b) => b.id === billId)
  if (!bill || bill.userId !== req.auth.userId) return res.status(404).json({ detail: 'Bill not found' })

  bill.confidence_score = Math.min(0.99, bill.confidence_score + 0.05)
  return res.json(bill)
})

app.get('/api/history', authMiddleware, (req, res) => {
  const limit = Number(req.query.limit || 20)
  const items = bills
    .filter((b) => b.userId === req.auth.userId)
    .slice()
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, limit)
  return res.json({ items })
})

app.get('/api/history/:billId', authMiddleware, (req, res) => {
  const { billId } = req.params
  const bill = bills.find((b) => b.id === billId && b.userId === req.auth.userId)
  if (!bill) return res.status(404).json({ detail: 'Bill not found' })
  return res.json(bill)
})

app.get('/api/stats', authMiddleware, (req, res) => {
  const userBills = bills.filter((b) => b.userId === req.auth.userId)
  const total_bills = userBills.length
  const total_units = userBills.reduce((sum, b) => sum + Number(b.extracted_data?.units_consumed || 0), 0)
  const total_amount = userBills.reduce((sum, b) => sum + Number(b.extracted_data?.bill_amount || 0), 0)
  return res.json({ total_bills, total_units, total_amount })
})

app.get('/api/download/:billId', authMiddleware, (req, res) => {
  const { billId } = req.params
  const bill = bills.find((b) => b.id === billId && b.userId === req.auth.userId)
  if (!bill) return res.status(404).json({ detail: 'Bill not found' })

  // Mock Excel: return a simple CSV with .xls extension
  const content = `Consumer Name,${bill.extracted_data.consumer_name}\nBill Amount,${bill.extracted_data.bill_amount}\n`
  res.setHeader('Content-Type', 'application/vnd.ms-excel')
  res.setHeader('Content-Disposition', `attachment; filename="bill-${billId}.xlsx"`)
  return res.send(content)
})

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${PORT}`)
})

