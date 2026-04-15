import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/users/Login';
import LinkDashboard from './pages/links/LinkDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home'; 
import Domain from './pages/domains/Domain';
import About from './pages/About';
import Layout from './components/Layout'; 

function App() {
  return (
    <Router>
      {/* Ton Layout enveloppe les Routes pour afficher Navbar/Slider/Footer partout */}
      <Layout>
        <Routes>
          {/* 1. PAGES PUBLIQUES */}
          <Route path="/" element={<Home />} />
          <Route path="/domains" element={<Domain />} />
          <Route path="/about" element={<About />} />

          {/* 2. ACCÈS ADMIN */}
          <Route path="/admin-portal" element={<Login />} />
          
          {/* 3. DASHBOARD PROTÉGÉ */}
          <Route path="/dashboard" element={
              <ProtectedRoute>
                  <LinkDashboard />
              </ProtectedRoute>
          } />

          {/* 4. REDIRECTION PAR DÉFAUT */}
          <Route path="*" element={<Navigate to="/" />} />

          {/* Note : Les routes dynamiques pour les sous-catégories et les détails de service seront à ajouter plus tard, une fois que tu auras les données du backend. */  }
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;