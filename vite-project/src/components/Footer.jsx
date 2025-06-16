// src/components/Footer.jsx
export default function Footer({ darkMode }) {
  return (
    <footer className={`mt-5 py-3 ${darkMode ? 'bg-dark' : 'bg-light'} border-top`}>
      <p className="text-center mb-0">
        &copy; 2025 Titanic Survival Prediction App | Made with 💙 and child labor by 7 Up
      </p>
    </footer>
  );
}