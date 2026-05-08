# Solar Load Calculator Automation (Streamlit)

A single-file Streamlit app that:
1. Uploads your electricity bill (PDF / PNG / JPG / JPEG)
2. Extracts required fields using PDF text extraction (pdfplumber) or OCR (Tesseract)
3. Auto-fills an Excel template (`template.xlsx`)
4. Lets you download the generated Excel (`generated_output.xlsx`)

## How to install

### 1) Create a virtual environment (recommended)
```bash
python -m venv .venv
```

### 2) Activate it
**Windows (CMD):**
```bash
.venv\\Scripts\\activate
```

### 3) Install dependencies
```bash
pip install -r requirements.txt
```

> Notes:
> - This app requires **Tesseract OCR** installed on your machine.
> - On Windows, install it via the official installer and ensure `tesseract` is available in PATH.

## Excel template requirement

Place an Excel file named **`template.xlsx`** in the same folder as `app.py`.

### How filling works
The app scans **column A** for labels (case-insensitive), such as:
- Consumer Number
- Consumer Name
- Billing Date
- Units Consumed
- Bill Amount
- Tariff
- Load
- Meter Number

When it finds a label in column A, it fills the adjacent cell in **column B**.

## How to run

```bash
streamlit run app.py
```

## Supported input files
- PDF
- PNG
- JPG
- JPEG

## Dependencies
- streamlit
- pdfplumber
- pytesseract
- Pillow
- pandas
- openpyxl
- pdf2image
- regex
- google-generativeai *(optional; included only if you later want Gemini integration)*

## Troubleshooting

### Missing template.xlsx
Ensure `template.xlsx` exists next to `app.py`.

### OCR quality issues
If extraction fails, try a clearer scan or upload a different page.

### Tesseract errors
Install Tesseract OCR and verify it works:
```bash
tesseract --version
```

