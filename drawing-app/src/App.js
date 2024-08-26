import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Drawing from './components/Drawing';
import Home from './components/Home';
import SavedDrawings from './components/SavedDrawings';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <nav style={{ marginRight: '20px' }}>
          <ul className='option'>
            <li><Link to="/">Anasayfa</Link></li>
            <li><Link to="/drawing">Yeni Çizim</Link></li>
            <li><Link to="/saved">Kayıtlı Çizimler</Link></li>
          </ul>
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drawing" element={<Drawing />} />
            <Route path="/saved" element={<SavedDrawings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
