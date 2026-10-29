import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const CANCHAS = [
  'Cancha de Futsal "Bombonera"',
  'Cancha de FutSal "Mecanica"',
  'Básquet Cancha 1',
  'Básquet Cancha 2',
  'Ecuavoley cancha 1',
  'Ecuavoley cancha 2',
  'Ecuavoley cancha 3',
  'Tenis "Bombonera"',
]

const HORAS = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
]

function Horarios() {
  const { usuario, cargando } = useAuth()
  const [reservas, setReservas] = useState(
    () => JSON.parse(localStorage.getItem('reservas')) || []
  )

 
  const [modalAbierto, setModalAbierto] = useState(false)
  const [reservaEditar, setReservaEditar] = useState(null)
  const [errorModal, setErrorModal] = useState('')

  const hoy = new Date().toISOString().split('T')[0]

  if (cargando) {
    return (
      <main className="contenido-principal">
        <p style={{ textAlign: 'center', padding: '40px' }}>Cargando...</p>
      </main>
    )
  }

  if (!usuario) {
    return (
      <main className="contenido-principal">
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h3 style={{ color: 'red' }}>No has iniciado sesión</h3>
          <Link to="/login">
            <button className="boton boton-celeste" style={{ marginTop: '20px' }}>
              Ir al Login
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const misReservas = reservas.filter((r) => r.correoUsuario === usuario.email)

  const cancelarReserva = (id) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return
    const todasLasReservas = JSON.parse(localStorage.getItem('reservas')) || []
    const actualizadas = todasLasReservas.filter((r) => r.id !== id)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
    setReservas(actualizadas)
    alert('Reserva cancelada correctamente.')
  }

 
  const abrirModalActualizar = (reserva) => {
    setReservaEditar({ ...reserva })
    setErrorModal('')
    setModalAbierto(true)
  }

 
  const cerrarModal = () => {
    setModalAbierto(false)
    setReservaEditar(null)
    setErrorModal('')
  }

  
  const handleModalChange = (e) => {
    const { name, value } = e.target
    setReservaEditar((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Guardar Cambios con Validaciones
  const handleGuardarCambios = (e) => {
    e.preventDefault()

   
    if (reservaEditar.fecha < hoy) {
      setErrorModal('No puedes seleccionar una fecha que ya pasó.')
      return
    }

    const todasLasReservas = JSON.parse(localStorage.getItem('reservas')) || []

    
    const ocupada = todasLasReservas.some(
      (r) =>
        r.id !== reservaEditar.id &&
        r.cancha === reservaEditar.cancha &&
        r.fecha === reservaEditar.fecha &&
        r.hora === reservaEditar.hora
    )

    if (ocupada) {
      setErrorModal('Esa cancha ya está reservada en esa fecha y hora. Elige otro horario.')
      return
    }

    
    const actualizadas = todasLasReservas.map((r) =>
      r.id === reservaEditar.id ? reservaEditar : r
    )

    localStorage.setItem('reservas', JSON.stringify(actualizadas))
    setReservas(actualizadas)
    cerrarModal()
    alert('¡Reserva actualizada correctamente!')
  }

  return (
    <main className="contenido-principal">
      <div className="seccion-horarios">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Mis Reservas y Horarios</h2>

        {misReservas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            No tienes reservas registradas actualmente.
          </p>
        ) : (
          <table className="tabla-horarios" id="tabla-dinamica">
            <thead>
              <tr>
                <th>Cancha</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {misReservas.map((r) => (
                <tr key={r.id}>
                  <td style={{ textTransform: 'capitalize' }}>{r.cancha}</td>
                  <td className="input-fecha">{r.fecha}</td>
                  <td>{r.hora}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '13px',
                      }}
                    >
                      {r.estado || 'Confirmada'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button
                      onClick={() => abrirModalActualizar(r)}
                      style={{
                        backgroundColor: '#0d6efd',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => cancelarReserva(r.id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div
          className="grupo-botones-form"
          style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}
        >
          <Link to="/reservar" className="boton boton-celeste">
            Nueva Reserva
          </Link>
          <Link to="/" className="boton boton-verde">
            Volver al Inicio
          </Link>
        </div>

        <div className="contenedor-boton-volver">
          <Link to="/">
            <button className="boton-volver">Volver</button>
          </Link>
        </div>
      </div>


      {modalAbierto && reservaEditar && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '25px',
              borderRadius: '12px',
              maxWidth: '450px',
              width: '90%',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>
              Actualizar Reserva
            </h3>

            <form onSubmit={handleGuardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cancha:</label>
                <select
                  name="cancha"
                  value={reservaEditar.cancha}
                  onChange={handleModalChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {CANCHAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha:</label>
                <input
                  type="date"
                  name="fecha"
                  min={hoy}
                  value={reservaEditar.fecha}
                  onChange={handleModalChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hora:</label>
                <select
                  name="hora"
                  value={reservaEditar.hora}
                  onChange={handleModalChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {HORAS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              {errorModal && (
                <div
                  style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  {errorModal}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={cerrarModal}
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#0d6efd',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default Horarios