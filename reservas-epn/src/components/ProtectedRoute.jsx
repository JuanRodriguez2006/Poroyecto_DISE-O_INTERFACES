import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { usuario, cargando } = useAuth()

  if (cargando) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>Cargando...</p>
  }
  
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute