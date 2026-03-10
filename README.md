# 💍 ShaadiBio — Marriage Biodata Generator

> A full-stack React web app to create, preview, and download beautiful Indian marriage biodatas in minutes.

---

## 🚀 Live Features

- 🔐 Authentication — Email/Password + Google Login (Firebase Auth)
- 📝 5-Step Form Flow — Personal → Contact → Education → Family → Horoscope
- 📸 Photo Upload — Firebase Storage
- 👁️ Preview Page — Section-wise view with Edit buttons
- 🎨 2 Templates — Classic Elegance & Modern Minimal
- 📥 PDF Download — Browser print-to-PDF
- 🔒 Private Routes — Only logged-in users can access forms

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Forms | React Hook Form |
| Routing | React Router v6 |
| Date Util | date-fns |

---

## 📁 Project Structure

```
src/
├── firebase.js              # Firebase config & exports
├── App.jsx                  # Routes + PrivateRoute + Auth state
├── utils/
│   └── saveProfile.js       # Firestore read/write helpers
├── Components/
│   ├── StepIndicator.jsx    # Progress bar component
│   ├── Pages/
│   │   ├── LandingPage.jsx  # Home page with nav
│   │   ├── Login.jsx        # Firebase email + Google login
│   │   ├── Signup.jsx       # Firebase signup
│   │   ├── UploadPhoto.jsx  # Firebase Storage upload
│   │   └── Preview.jsx      # Full biodata preview + edit
│   ├── forms/
│   │   ├── PersonalDetails.jsx
│   │   ├── ContactDetails.jsx
│   │   ├── EducationDetails.jsx
│   │   ├── FamilyDetails.jsx
│   │   └── HoroscopeDetails.jsx
│   └── templates/
│       ├── ClassicTemplate.jsx
│       └── ModernTemplate.jsx
```

---

## ⚙️ Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Firebase config in src/firebase.js

# 3. Run the app
npm run dev
```

### Firebase Setup
1. Create project at console.firebase.google.com
2. Enable Authentication → Email/Password + Google
3. Create Firestore Database (test mode)
4. Enable Storage
5. Paste config into `src/firebase.js`

---

## 🎤 INTERVIEW QUESTIONS & ANSWERS

### 📌 General / Project Overview

**Q: Tell me about your project ShaadiBio.**

A: ShaadiBio is a React-based web app that lets Indian users create marriage biodatas digitally. Users sign up, fill 5 sections of information (Personal, Contact, Education, Family, Horoscope), upload a photo, preview everything, choose from 2 templates, and download as a PDF. I built it to solve a real problem — most Indian families still make biodatas manually in Word or take help from others. This app makes the whole process self-serve in under 5 minutes.

---

**Q: What tech stack did you use and why?**

A: 
- **React** — for building a dynamic, component-based UI. The form steps are all individual components that can be reused.
- **Tailwind CSS** — utility-first CSS that lets me style fast without writing custom CSS files. Consistent design tokens like `orange-500` across the app.
- **Firebase** — I chose Firebase over a traditional Node/MongoDB backend because it removes all infrastructure complexity. Auth, database, and file storage are handled by Firebase SDKs. No server to deploy, no MongoDB connection issues.
- **React Hook Form** — lightweight form library that avoids re-rendering the whole form on every keystroke. Better performance than controlled inputs.
- **React Router v6** — for client-side routing and protected routes.

---

### 📌 Firebase Specific

**Q: Why did you choose Firebase over MongoDB/Express?**

A: In my earlier version I used Node.js + MongoDB Atlas, but I kept hitting network connectivity issues (DNS errors with `querySrv ECONNREFUSED`). Firebase solves this — it's a fully managed BaaS (Backend as a Service). Firebase Auth handles JWT tokens automatically, Firestore gives me a real-time NoSQL database, and Storage handles file uploads. I removed my entire backend folder. This is the right architecture for a form-heavy app like this.

---

**Q: How does authentication work in your app?**

A: I'm using Firebase Authentication. When a user signs up with email/password, Firebase creates a user account and returns a `User` object. For Google login, I use `signInWithPopup` with `GoogleAuthProvider` — the user sees the Google consent screen and Firebase handles the OAuth flow. After login, Firebase provides an ID token. In the app, I use `onAuthStateChanged` in `App.jsx` to listen to auth state — this re-runs whenever login/logout happens and updates the `user` state, which controls access to private routes.

---

**Q: How are you storing user data?**

A: I use Firestore, which is Firebase's NoSQL document database. Each user gets a document at `users/{userId}`. The document has nested objects for each section — `personal`, `contact`, `education`, `family`, `horoscope`, and `photo`. I use `setDoc` with `{ merge: true }` so updating one section doesn't overwrite others. This is the key insight — `merge: true` acts like a PATCH request instead of PUT.

---

**Q: How does the photo upload work?**

A: I use Firebase Storage. The user selects a file, I create a `ref` at `photos/{userId}`, upload using `uploadBytes`, then get the public URL using `getDownloadURL`. That URL is saved to Firestore under `photo.photoURL`. When rendering the template, I just use that URL in an `<img>` tag.

---

### 📌 React Specific

**Q: How do private routes work?**

A: I have a `PrivateRoute` component in `App.jsx` that checks if a `user` is present from `onAuthStateChanged`. If no user exists, it redirects to `/login` using React Router's `<Navigate>`. There's also a `loading` state — while Firebase is checking auth state (async), I show a loading spinner instead of immediately redirecting. Without this, there's a flash where logged-in users briefly see the redirect before auth resolves.

---

**Q: How does the edit flow work from the Preview page?**

A: Each section on the Preview page has an Edit button that navigates to the form page with `?edit=true` as a query param. I have an `EditWrapper` component in `App.jsx` that reads this query param using `useSearchParams` and passes `isEditing={true}` as a prop to the form. When `isEditing` is true, the submit button text changes to "Save & Back to Preview" and instead of navigating to the next step, it calls `onEditDone()` which calls `window.history.back()`. This keeps the routing clean.

---

**Q: How does the auto age calculation work?**

A: In `PersonalDetails.jsx`, when the user picks a date of birth, the `handleDob` function uses `differenceInYears` from the `date-fns` library. It calculates the difference between today's date and the selected DOB, and stores it in the `age` field of state. The age input is `readOnly` — users can't type in it, it just displays the calculated value. This prevents incorrect ages.

---

**Q: How do you handle form validation?**

A: I use a combination of `react-hook-form` for the Login/Signup pages (which have simpler validation) and manual validation functions in the multi-step forms. For the step forms, I have a `validate()` function that checks required fields and returns an object of errors. If errors exist, they're set in state and displayed under each field. Only when `validate()` returns `true` does the form save to Firestore and navigate forward.

---

### 📌 PDF Generation

**Q: How does PDF generation work?**

A: I use the browser's built-in `window.print()` API. The template pages have a `print:hidden` CSS class on the action buttons (using Tailwind's print variant). When the user clicks "Download PDF", the browser's print dialog opens, and they can save as PDF. This is simpler than integrating a library like `jsPDF` and produces better results because the browser renders it exactly as displayed. The templates use `@media print` CSS to hide UI chrome.

---

### 📌 Architecture / Design Decisions

**Q: Why 5 separate form pages instead of one big form?**

A: Breaking the form into steps reduces cognitive load — users don't see 30+ fields at once. Each step focuses on one category of information. This is a common UX pattern called "progressive disclosure". It also means users can save progress section by section, so if they close the app they don't lose everything. Each step saves to Firestore independently.

---

**Q: What would you improve if you had more time?**

A: 
1. **Better PDF** — Integrate `html2pdf.js` or `react-pdf` for proper PDF generation with custom fonts instead of browser print
2. **Profile completeness indicator** — Show a % completion score
3. **Multiple biodatas** — Let one user create biodatas for different family members
4. **Share link** — Generate a shareable link to the biodata preview
5. **More templates** — Add regional templates (South Indian, Bengali etc.)
6. **Real-time preview** — Show template updating live as user fills forms

---

**Q: What was the hardest part of building this?**

A: The edit flow was the trickiest part. I needed the same form component to work both as a "step in a wizard" (navigate forward) and as an "edit page" (go back to preview). I solved this cleanly with the `isEditing` prop pattern and the `EditWrapper` component that reads the query param. Also, getting Firebase Storage CORS configured correctly for photo uploads took some debugging.

---

## 📦 Dependencies

```json
{
  "firebase": "^10.x",
  "react-router-dom": "^6.x",
  "react-hook-form": "^7.x",
  "date-fns": "^3.x",
  "react-icons": "^5.x",
  "@react-oauth/google": "^0.12.x"
}
```

---

*Built by Satyam • ShaadiBio 2025*
