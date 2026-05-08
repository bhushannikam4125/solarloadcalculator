// solar-load-calculator/frontend/src/hooks/useAuth.js
export { useAuth } from '../context/AuthContext.jsx'

// Backwards-compatible default export
import { useAuth as useAuthFromContext } from '../context/AuthContext.jsx'
export default useAuthFromContext

