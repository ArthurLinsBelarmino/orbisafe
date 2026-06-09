import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import FAQ from './pages/FAQ';
import Integrantes from './pages/Integrantes';
import Alertas from './pages/Alertas';
import Dashboard from './pages/Dashboard';
import Previsoes from './pages/Previsoes';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/previsoes" element={<Previsoes />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;