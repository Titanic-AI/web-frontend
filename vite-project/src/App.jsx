// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculator';
import AdPage from './pages/AdPage';

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/adpage" element={<AdPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
