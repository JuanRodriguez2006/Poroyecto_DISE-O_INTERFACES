import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase.js'

function mensajeError(codigo) {
  switch (codigo) {
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado.'
    case 'auth/invalid-email':
      return 'El correo no es válido.'
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.'
    default:
      return 'No se pudo crear la cuenta. Intenta de nuevo.'
  }
}

function CrearCuenta() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const nombre = e.target.nombre.value
    const codigo = e.target.codigo.value
    const correo = e.target.correo.value
    const pass = e.target.pass.value
    const confirm = e.target.confirm.value

    if (pass !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setCargando(true)
    try {
      const credencial = await createUserWithEmailAndPassword(auth, correo, pass)
      await updateProfile(credencial.user, { displayName: nombre })
      localStorage.setItem(`codigo_${credencial.user.uid}`, codigo)

      alert('Cuenta creada con éxito.')
      navigate('/login')
    } catch (err) {
      setError(mensajeError(err.code))
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="contenido-principal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f4f7f6', padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '40px 30px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <i className="fa-solid fa-user-plus" style={{ fontSize: '40px', color: '#00838f', marginBottom: '15px' }}></i>
          <h2 style={{ color: '#1b2a38', margin: '0', fontSize: '26px' }}>Crea tu Cuenta</h2>
          <p style={{ color: '#64748b', margin: '10px 0 0 0', fontSize: '14px' }}>Únete a la comunidad de deportes EPN</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Nombre</label>
              <input type="text" name="nombre" placeholder="Tu nombre" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Código Único</label>
              <input type="text" name="codigo" placeholder="Ej. 202610" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Correo Institucional</label>
            <input type="email" name="correo" placeholder="ejemplo@epn.edu.ec" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña</label>
              <input type="password" name="pass" placeholder="••••••••" required minLength={6} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Confirmar</label>
              <input type="password" name="confirm" placeholder="••••••••" required minLength={6} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', fontSize: '14px', textAlign: 'center', fontWeight: 'bold', margin: '5px 0' }}>{error}</div>}

          <button type="submit" disabled={cargando} style={{ backgroundColor: '#00838f', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background 0.3s' }}>
            {cargando ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          <p style={{ color: '#64748b', margin: '0 0 10px 0' }}>¿Ya tienes una cuenta? <Link to="/login" style={{ color: '#00b2a9', fontWeight: 'bold', textDecoration: 'none' }}>Inicia sesión aquí</Link></p>
          <Link to="/" style={{ color: '#2ea44f', fontWeight: 'bold', textDecoration: 'none' }}>← Volver al inicio</Link>
        </div>

      </div>
    </main>
  )
}

export default CrearCuenta