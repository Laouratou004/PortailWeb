import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Lazy loading — chaque page est chargée uniquement quand elle est visitée
const Login        = lazy(() => import('./pages/users/Login'));
const LinkDashboard = lazy(() => import('./pages/links/LinkDashboard'));
const Home         = lazy(() => import('./pages/Home'));
const Domain       = lazy(() => import('./pages/domains/Domain'));
const SubCategories = lazy(() => import('./pages/domains/SubCategories'));
const About        = lazy(() => import('./pages/About'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Chargement...</span>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"                      element={<Home />} />
            <Route path="/domains"               element={<Domain />} />
            <Route path="/domaine/:categoryId"   element={<SubCategories />} />
            <Route path="/about"                 element={<About />} />
          </Route>

          <Route path="/admin-portal" element={<Login />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <LinkDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
