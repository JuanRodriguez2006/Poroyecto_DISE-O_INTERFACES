import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { useAuth } from '../context/AuthContext.jsx'

function PerfilUsuario() {
  const { usuario, cargando, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const [editando, setEditando] = useState(false)
  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [misReservas, setMisReservas] = useState([])

  const hoy = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (usuario) {
      const todasLasReservas = JSON.parse(localStorage.getItem('reservas')) || []
      const reservasUsuario = todasLasReservas.filter((r) => r.correoUsuario === usuario.email)
      const reservasActivas = reservasUsuario.filter((r) => r.fecha >= hoy)
      setMisReservas(reservasActivas)
    }
  }, [usuario, hoy])

  if (cargando) {
    return (
      <main className="contenido-principal">
        <p style={{ textAlign: 'center', padding: '40px' }}>Cargando...</p>
      </main>
    )
  }

  if (!usuario) {
    return (
      <div className="contenido-principal">
        <main className="hero-section">
          <section id="perfil" className="perfil-section">
            <div id="mensaje-no-logueado" style={{ textAlign: 'center', marginTop: '50px' }}>
              <h3 style={{ color: 'red' }}>No has iniciado sesión</h3>
              <Link to="/login">
                <button className="boton boton-celeste" style={{ marginTop: '20px' }}>Ir al Login</button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    )
  }

  const codigoGuardado = localStorage.getItem(`codigo_${usuario.uid}`) || '---'

  const handleLogout = async () => {
    await cerrarSesion()
    navigate('/')
  }

  const iniciarEdicion = () => {
    setNombre(usuario.displayName || '')
    setCodigo(codigoGuardado)
    setEditando(true)
  }

  const cancelarEdicion = () => {
    setEditando(false)
  }

  const guardarCambios = async (e) => {
    e.preventDefault()
    setGuardando(true)
    try {
      await updateProfile(usuario, { displayName: nombre.trim() })
      localStorage.setItem(`codigo_${usuario.uid}`, codigo.trim())
      alert('¡Datos de perfil actualizados con éxito!')
      setEditando(false)
    } catch (err) {
      alert('No se pudo actualizar el perfil. Intenta de nuevo.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="contenido-principal">
      <main className="hero-section">
        <section id="perfil" className="perfil-section">
          <div className="contenedor" id="contenedor-perfil" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            <h2 className="section-title" style={{ marginBottom: '30px' }}>Dashboard Estudiantil EPN</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#00838f', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Reservas Activas</h3>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{misReservas.length}</p>
              </div>
              <div style={{ background: '#26415a', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Estado de Cuenta</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#00b2a9' }}>Verificado</p>
              </div>
            </div>

            <div className="perfil-card" style={{ marginBottom: '30px' }}>
              <img src="/imagenes/icon-4399701_640.webp" alt="Foto de perfil" className="perfil-avatar" />

              <div className="perfil-info" style={{ flex: '1' }}>
                {editando ? (
                  <form onSubmit={guardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#64748b' }}>Nombre / Usuario:</strong>
                      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#64748b' }}>Correo Institucional:</strong>
                      <input type="email" value={usuario.email} disabled style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', backgroundColor: '#f8fafc' }} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#64748b' }}>Código Único:</strong>
                      <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="submit" disabled={guardando} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', flex: 1 }}>{guardando ? 'Guardando...' : 'Guardar'}</button>
                      <button type="button" onClick={cancelarEdicion} style={{ backgroundColor: '#6b7280', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', flex: 1 }}>Cancelar</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 id="perfil-nombre" style={{ fontSize: '24px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{usuario.displayName || 'Usuario'}</h3>
                    <p style={{ margin: '15px 0' }}><strong>Email:</strong> <span style={{ color: '#00838f' }}>{usuario.email}</span></p>
                    <p style={{ margin: '15px 0' }}><strong>Código único:</strong> <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>{codigoGuardado}</span></p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <button onClick={iniciarEdicion} style={{ backgroundColor: '#008b8b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Editar perfil</button>
                      <button onClick={handleLogout} style={{ backgroundColor: '#d40f0f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Cerrar sesión</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div
              id="mis-reservas-container"
              style={{ marginTop: '30px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', padding: '20px' }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Tus Reservas Activas</h3>
              <div id="lista-mis-reservas">
                {misReservas.length === 0 ? (
                  <p style={{ textAlign: 'center' }}>No tienes reservas activas registradas.</p>
                ) : (
                  <table className="tabla-horarios">
                    <thead>
                      <tr><th>Cancha</th><th>Fecha</th><th>Hora</th><th>Estado</th></tr>
                    </thead>
                    <tbody>
                      {misReservas.map((r) => (
                        <tr key={r.id}>
                          <td style={{ textTransform: 'capitalize' }}>{r.cancha}</td>
                          <td className="input-fecha">{r.fecha}</td>
                          <td>{r.hora}</td>
                          <td>{r.estado || 'Confirmada'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '25px' }}>
                <Link to="/reservar" className="boton boton-celeste" style={{ textDecoration: 'none' }}>
                  Hacer Nueva Reserva
                </Link>
                <Link to="/horarios" className="boton" style={{ backgroundColor: '#ffc107', color: '#212529', textDecoration: 'none' }}>
                  Editar / Cancelar Reservas
                </Link>
              </div>
            </div>

            <div className="contenedor-boton-volver" style={{ marginTop: '30px', textAlign: 'center' }}>
              <Link to="/">
                <button className="boton-volver">Volver al Inicio</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PerfilUsuario