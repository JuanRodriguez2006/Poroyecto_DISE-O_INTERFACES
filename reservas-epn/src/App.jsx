import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Index from './pages/Index.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Servicios from './pages/Servicios.jsx'
import Contacto from './pages/Contacto.jsx'
import Reservar from './pages/Reservar.jsx'
import Horarios from './pages/Horarios.jsx'
import PerfilUsuario from './pages/PerfilUsuario.jsx'
import Login from './pages/Login.jsx'
import CrearCuenta from './pages/CrearCuenta.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        
        <Route path="/reservar" element={
          <ProtectedRoute>
            <Reservar />
          </ProtectedRoute>
        } />
        <Route path="/horarios" element={
          <ProtectedRoute>
            <Horarios />
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <PerfilUsuario />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App