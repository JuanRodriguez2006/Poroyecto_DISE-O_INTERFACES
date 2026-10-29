import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'

function mensajeError(codigo) {
  switch (codigo) {
    case 'auth/invalid-email':
      return 'El correo no es válido.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.'
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera un momento e intenta de nuevo.'
    default:
      return 'No se pudo iniciar sesión. Intenta de nuevo.'
  }
}

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const correo = e.target.correo.value
    const pass = e.target.pass.value

    setCargando(true)
    try {
      await signInWithEmailAndPassword(auth, correo, pass)
      navigate('/reservar')
    } catch (err) {
      setError(mensajeError(err.code))
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="contenido-principal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f4f7f6', padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '40px 30px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <i className="fa-solid fa-circle-user" style={{ fontSize: '50px', color: '#00838f', marginBottom: '15px' }}></i>
          <h2 style={{ color: '#1b2a38', margin: '0', fontSize: '26px' }}>Bienvenido de nuevo</h2>
          <p style={{ color: '#64748b', margin: '10px 0 0 0', fontSize: '14px' }}>Inicia sesión para gestionar tus reservas</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Correo Institucional</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '15px', color: '#a0aec0', fontSize: '16px' }}></i>
              <input 
                type="email" 
                name="correo" 
                placeholder="ejemplo@epn.edu.ec" 
                required 
                style={{ width: '100%', height: '48px', padding: '0 12px 0 40px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <i className="fa-solid fa-lock" style={{ position: 'absolute', left: '15px', color: '#a0aec0', fontSize: '16px' }}></i>
              <input 
                type="password" 
                name="pass" 
                placeholder="••••••••" 
                required 
                style={{ width: '100%', height: '48px', padding: '0 12px 0 40px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} 
              />
            </div>
          </div>

          {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}

          <button type="submit" disabled={cargando} style={{ height: '48px', backgroundColor: '#00838f', color: '#ffffff', padding: '0 14px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background 0.3s' }}>
            {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          <p style={{ color: '#64748b', margin: '0 0 10px 0' }}>¿No tienes una cuenta? <Link to="/crear-cuenta" style={{ color: '#00b2a9', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate aquí</Link></p>
          <Link to="/" style={{ color: '#2ea44f', fontWeight: 'bold', textDecoration: 'none' }}>← Volver al inicio</Link>
        </div>

      </div>
    </main>
  )
}

export default Login