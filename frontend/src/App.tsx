import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/users/Login';
import LinkDashboard from './pages/links/LinkDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home'; // Correction du chemin ici (enlevé le ../)

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. LA PAGE PUBLIQUE (Accueil) */}
        <Route path="/" element={<Home />} />

        {/* 2. L'ACCÈS ADMIN (Login) */}
        <Route path="/admin-portal" element={<Login />} />
        
        {/* 3. LE DASHBOARD (Protégé) */}
        <Route path="/dashboard" element={
            <ProtectedRoute>
                <LinkDashboard />
            </ProtectedRoute>
        } />

        {/* 4. SÉCURITÉ : Si l'URL n'existe pas, on revient à l'accueil public */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;