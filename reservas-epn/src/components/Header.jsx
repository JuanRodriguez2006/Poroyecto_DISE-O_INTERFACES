import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { updatePassword } from 'firebase/auth'
import { useAuth } from '../context/AuthContext.jsx'

function Header() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [dropdownAbierto, setDropdownAbierto] = useState(false)
  const [modalClaveAbierto, setModalClaveAbierto] = useState(false)
  const [nuevaClave, setNuevaClave] = useState('')
  const [confirmarClave, setConfirmarClave] = useState('')
  const [mensajeClave, setMensajeClave] = useState({ tipo: '', texto: '' })
  const [cargandoClave, setCargandoClave] = useState(false)

  const dropdownRef = useRef(null)

  const handleLogout = async () => {
    await cerrarSesion()
    navigate('/')
  }

  useEffect(() => {
    const handleClickFuera = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAbierto(false)
      }
    }
    document.addEventListener("mousedown", handleClickFuera)
    return () => document.removeEventListener("mousedown", handleClickFuera)
  }, [])

  const estiloLink = (ruta) => {
    const activo = location.pathname === ruta
    return {
      textDecoration: 'none',
      color: activo ? '#00838f' : '#333',
      fontWeight: 'bold',
      borderBottom: activo ? '2px solid #00838f' : 'none',
      paddingBottom: '4px',
      transition: 'all 0.3s ease'
    }
  }

  const handleCambiarClave = async (e) => {
    e.preventDefault()
    if (nuevaClave !== confirmarClave) {
      setMensajeClave({ tipo: 'error', texto: 'Las contraseñas no coinciden.' })
      return
    }
    if (nuevaClave.length < 6) {
      setMensajeClave({ tipo: 'error', texto: 'La clave debe tener al menos 6 caracteres.' })
      return
    }

    setCargandoClave(true)
    setMensajeClave({ tipo: '', texto: '' })

    try {
      await updatePassword(usuario, nuevaClave)
      setMensajeClave({ tipo: 'exito', texto: '¡Contraseña actualizada con éxito!' })
      setNuevaClave('')
      setConfirmarClave('')
      setTimeout(() => {
        setModalClaveAbierto(false)
        setMensajeClave({ tipo: '', texto: '' })
      }, 2000)
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setMensajeClave({ tipo: 'error', texto: 'Vuelve a iniciar sesión antes de cambiar tu clave.' })
      } else {
        setMensajeClave({ tipo: 'error', texto: 'No se pudo cambiar la clave. Intenta de nuevo.' })
      }
    } finally {
      setCargandoClave(false)
    }
  }

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="logo">
          <Link to="/">
            <img src="/imagenes/EPN.png" alt="Logo EPN" style={{ height: '60px' }} />
          </Link>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <ul className="menu" style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0, alignItems: 'center' }}>
            <li><Link to="/" style={estiloLink('/')}>Inicio</Link></li>
            <li><Link to="/nosotros" style={estiloLink('/nosotros')}>Nosotros</Link></li>
            <li><Link to="/servicios" style={estiloLink('/servicios')}>Servicios</Link></li>
            <li><Link to="/contacto" style={estiloLink('/contacto')}>Contacto</Link></li>
            
            {usuario && (
              <>
                <li><Link to="/reservar" style={estiloLink('/reservar')}>Reservar</Link></li>
                <li><Link to="/horarios" style={estiloLink('/horarios')}>Mis Reservas</Link></li>
              </>
            )}

            {!usuario && (
              <li>
                <Link to="/login" style={{ textDecoration: 'none', color: '#00b2a9', fontWeight: 'bold' }}>
                  Login
                </Link>
              </li>
            )}
          </ul>

          {usuario && (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <div 
                onClick={() => setDropdownAbierto(!dropdownAbierto)}
                style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#1b2a38', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
              >
                <span style={{ textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.5px' }}>
                  {usuario.displayName || usuario.email.split('@')[0]}
                </span>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.4)' }}></div>
                <i className="fa-solid fa-circle-user" style={{ fontSize: '28px', color: '#9ca3af' }}></i>
              </div>

              {dropdownAbierto && (
                <div style={{ position: 'absolute', top: '100%', right: '0', backgroundColor: 'white', width: '100%', minWidth: '260px', border: '1px solid #e2e8f0', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '10px 0', zIndex: 1000, marginTop: '5px' }}>
                  
                  <Link to="/perfil" onClick={() => setDropdownAbierto(false)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', color: '#475569', textDecoration: 'none' }}>
                    <i className="fa-solid fa-user-tag" style={{ width: '20px', textAlign: 'center', color: '#1b2a38', fontSize: '16px' }}></i>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>PERFILES / DASHBOARD</span>
                  </Link>

                  <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', color: '#475569', cursor: 'pointer' }}>
                    <i className="fa-solid fa-power-off" style={{ width: '20px', textAlign: 'center', color: '#1b2a38', fontSize: '16px' }}></i>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>CERRAR SESIÓN</span>
                  </div>

                  <div onClick={() => { setDropdownAbierto(false); setModalClaveAbierto(true); }} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', color: '#475569', cursor: 'pointer' }}>
                    <i className="fa-solid fa-key" style={{ width: '20px', textAlign: 'center', color: '#1b2a38', fontSize: '16px' }}></i>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>CAMBIO DE CLAVE</span>
                  </div>

                  <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #e2e8f0', marginTop: '5px' }}>
                    <span style={{ fontSize: '14px', color: '#475569' }}>PERÍODO:</span>
                    <select style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}>
                      <option>2026-A</option>
                      <option>2026-B</option>
                    </select>
                  </div>
                  
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {modalClaveAbierto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1b2a38', fontSize: '20px', textAlign: 'center' }}>Cambiar Contraseña</h3>
            
            <form onSubmit={handleCambiarClave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Nueva Contraseña</label>
                <input 
                  type="password" value={nuevaClave} onChange={(e) => setNuevaClave(e.target.value)} required minLength={6} placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Confirmar Nueva Contraseña</label>
                <input 
                  type="password" value={confirmarClave} onChange={(e) => setConfirmarClave(e.target.value)} required minLength={6} placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>

              {mensajeClave.texto && (
                <p style={{ margin: '5px 0', color: mensajeClave.tipo === 'error' ? '#d40f0f' : '#2ea44f', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>{mensajeClave.texto}</p>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={cargandoClave} style={{ flex: 1, backgroundColor: '#00838f', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>{cargandoClave ? 'Guardando...' : 'Actualizar'}</button>
                <button type="button" onClick={() => setModalClaveAbierto(false)} style={{ flex: 1, backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Header