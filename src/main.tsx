import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Alertas, { EditarAlerta } from './pages/Alertas'
import Previsoes from './pages/Previsoes'
import Sobre from './pages/Sobre'
import FAQ from './pages/FAQ'
import Integrantes from './pages/Integrantes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/dashboard"    element={<Dashboard />} />
        <Route path="/alertas"      element={<Alertas />} />
        <Route path="/alertas/:id/editar" element={<EditarAlerta />} />
        <Route path="/previsoes"    element={<Previsoes />} />
        <Route path="/sobre"        element={<Sobre />} />
        <Route path="/faq"          element={<FAQ />} />
        <Route path="/integrantes"  element={<Integrantes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)