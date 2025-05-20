// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{ padding: '10px', borderTop: '1px solid #ccc', marginTop: '20px', textAlign: 'center' }}>
      © {new Date().getFullYear()} 7up. All rights reserved.
    </footer>
  );
}
