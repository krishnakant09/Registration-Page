# 🔒 Interactive Secure Registration Form

A modern, responsive, and accessible client-side registration form featuring real-time input validation, live password strength analysis, and glassmorphic UI aesthetics. Built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (Zero external dependencies).

---

## ✨ Features

- **🎨 Modern Glassmorphic Dark UI**
  - Sleek dark theme with ambient glowing gradients.
  - Smooth micro-interactions, subtle transitions, and hover feedback.
  - High-clarity typography powered by Google Fonts (*Plus Jakarta Sans*).

- **⚡ Real-Time Client-Side Validation**
  - **Touch-aware UX**: Errors appear on input after user blur to prevent premature validation frustration.
  - **Inline Feedback**: Dynamic error prompts and status icons for each input field.
  - **Shake Animation**: Visual shake effect on inputs when submission fails.
  - **Auto-Focus**: Automatically focuses on the first invalid field upon attempted form submission.

- **🛡️ Password Security Suite**
  - **Live Requirements Checklist**: Interactive check/cross indicators for:
    - Minimum 8 characters
    - At least 1 lowercase letter (`a-z`)
    - At least 1 uppercase letter (`A-Z`)
    - At least 1 number (`0-9`)
    - At least 1 special character (`!@#$%^&*...`)
  - **Dynamic Strength Bar**: Real-time visual progress bar (`Weak` → `Fair` → `Good` → `Strong`).
  - **Show / Hide Password Toggle**: Intuitive visibility toggle with SVG icon states.

- **📞 Smart Phone Number Input**
  - Automatically filters non-numeric characters on the fly.
  - Real-time digit counter (`0/10`) with visual completion highlight.
  - Enforces exact 10-digit format.

- **🎉 Celebratory Success Modal**
  - Custom modal dialog confirming successful submission.
  - Displays submitted summary data with privacy-masked phone number (`******1234`).
  - Supports keyboard navigation (<kbd>Esc</kbd> to close).

- **♿ Accessibility & Performance**
  - Semantic HTML5 elements (`<main>`, `<header>`, `<form>`, `<label>`).
  - Complete ARIA attributes (`aria-required`, `aria-invalid`, `aria-describedby`, `aria-live="polite"`, `role="alert"`).
  - Lightweight and blazing fast with **zero build steps** and **zero external JS libraries**.

---

## 📋 Validation Rules Matrix

| Field | Validation Criteria | Error State / Behavior |
| :--- | :--- | :--- |
| **Full Name** | • Required<br>• Min: 3 characters<br>• Max: 50 characters<br>• Only letters, spaces, hyphens, and apostrophes | Displays specific message & shakes container if submitted invalid. |
| **Email Address** | • Required<br>• Valid RFC-compliant email pattern (`user@domain.ext`) | Rejects missing `@`, invalid domains, or malformed syntax. |
| **Phone Number** | • Required<br>• Strictly 10 digits<br>• Auto-strips non-numeric characters | Real-time counter updates on keypress; rejects lengths $\neq 10$. |
| **Password** | • Required<br>• Must satisfy all 5 security checklist rules | Checklist updates dynamically; requires 5/5 score before submission. |

---

## 📁 File Structure

```text
├── index.html     # Semantic form structure, SVG icons, and modal dialog
├── style.css      # CSS variables, glassmorphism styling, responsive layout, animations
├── script.js     # Modular client-side validation logic and event handling
└── README.md      # Project documentation and guide
```

---

## 🚀 Getting Started

No installation, build tools, or server configurations required!

### Option 1: Open Directly in Browser
Simply double-click `index.html` or drag and drop it into any modern web browser.

### Option 2: Run with VS Code Live Server
1. Open this repository folder in **VS Code**.
2. Install the **Live Server** extension (by *Ritwick Dey*).
3. Right-click [index.html](file:///d:/KK-Project/WT%20Experiments/4th/index.html) and select **"Open with Live Server"**.
4. The application will launch at `http://127.0.0.1:5500/index.html`.

### Option 3: Run with Python HTTP Server
```bash
# In the project directory:
python -m http.server 3000
# Open http://localhost:3000 in your browser
```

---

## 🌐 Browser Compatibility

Tested and fully supported across modern web browsers:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Apple Safari (latest)
- Mobile Browsers (iOS Safari, Chrome for Android)

---

## 🛠️ Built With

- **HTML5** — Semantic, accessible page architecture
- **CSS3** — Custom properties (tokens), CSS Flexbox/Grid, Backdrop Filter, Keyframe Animations
- **JavaScript (ES6+)** — Event delegation, DOM manipulation, Regex validation

---

## 📄 License

This project is created for educational and practical web development demonstrations. Feel free to use, modify, and build upon it!
