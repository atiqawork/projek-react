import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoutesPage from './pages/Routes';
import RouteDetail from './pages/RouteDetail';
import Favorites from './pages/Favorites';
import About from './pages/About';
import NotFound from './pages/NotFound';

import './App.css';
import './components/components.css';
import './pages/pages.css';

function App() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('rutein-favorites')) || [];
  });

  useEffect(() => {
    localStorage.setItem('rutein-favorites', JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <Home favorites={favorites} onToggleFavorite={toggleFavorite} />
          } />
          <Route path="/routes" element={
            <RoutesPage favorites={favorites} onToggleFavorite={toggleFavorite} />
          } />
          <Route path="/routes/:id" element={<RouteDetail />} />
          <Route path="/favorites" element={
            <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
          } />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
