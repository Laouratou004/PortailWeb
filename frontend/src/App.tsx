import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/users/Login';
import LinkDashboard from './pages/links/LinkDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home'; 
import Domain from './pages/domains/Domain';
import SubCategories from './pages/domains/SubCategories';
import About from './pages/About';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- GROUPE PUBLIQUE : Avec Navbar, Slider et Footer --- */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/domains" element={<Domain />} />
          <Route path="/domaine/:categoryId" element={<SubCategories />} />
          <Route path="/about" element={<About />} />
        </Route>
        

        {/* --- GROUPE ADMIN : Page vide sans aucun élément public --- */}
        <Route path="/admin-portal" element={<Login />} />
        
        {/* Dashboard protégé, sans barres de navigation publiques */}
        <Route path="/dashboard" element={
            <ProtectedRoute>
                <LinkDashboard />
            </ProtectedRoute>
        } />

        {/* Redirection automatique pour les erreurs 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;