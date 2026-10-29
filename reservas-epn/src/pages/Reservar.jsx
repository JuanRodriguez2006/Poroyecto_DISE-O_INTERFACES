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

function Reservar() {
  const { usuario, cargando: cargandoAuth } = useAuth()
  const isLoggedIn = !!usuario

  const [mostrarExito, setMostrarExito] = useState(false)
  const [errorReserva, setErrorReserva] = useState('')

  const hoy = new Date().toISOString().split('T')[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isLoggedIn) return

    const formData = new FormData(e.target)
    const fechaSeleccionada = formData.get('fecha')

    if (fechaSeleccionada < hoy) {
      setErrorReserva('No puedes reservar en una fecha que ya pasó.')
      setMostrarExito(false)
      return
    }

    const reserva = {
      id: Date.now(),
      cancha: formData.get('cancha'),
      fecha: fechaSeleccionada,
      hora: formData.get('hora'),
      estado: 'Confirmada',
      correoUsuario: usuario.email,
      nombreUsuario: usuario.displayName || usuario.email,
    }

    const reservas = JSON.parse(localStorage.getItem('reservas')) || []

    const yaExiste = reservas.some(
      (r) => r.cancha === reserva.cancha && r.fecha === reserva.fecha && r.hora === reserva.hora
    )

    if (yaExiste) {
      setErrorReserva('Esa cancha ya está reservada en esa fecha y hora. Elige otro horario.')
      setMostrarExito(false)
      return
    }

    setErrorReserva('')
    reservas.push(reserva)
    localStorage.setItem('reservas', JSON.stringify(reservas))
    setMostrarExito(true)
    e.target.reset()
    setTimeout(() => setMostrarExito(false), 3000)
  }

  if (cargandoAuth) {
    return (
      <main className="contenido-principal">
        <p style={{ textAlign: 'center', padding: '40px' }}>Cargando...</p>
      </main>
    )
  }

  return (
    <main className="contenido-principal">
      <section className="contenedor-reserva">
        <h1 className="titulo-principal">ESCUELA POLITÉCNICA NACIONAL</h1>
        <h2 className="subtitulo">RESERVA DE CANCHAS</h2>
        <p className="instruccion">SELECCIONE LA CANCHA QUE DESEA RESERVAR</p>

        <form
          id="reservaForm"
          onSubmit={handleSubmit}
          style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px', maxWidth: '500px', margin: '0 auto 20px auto', display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <select name="cancha" required disabled={!isLoggedIn} style={{ padding: '10px', borderRadius: '6px' }}>
            <option value="">-- Selecciona una cancha --</option>
            {CANCHAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input
            type="date"
            name="fecha"
            required
            disabled={!isLoggedIn}
            min={hoy}
            className="input-fecha"
            style={{ padding: '10px', borderRadius: '6px' }}
          />

          <select name="hora" required disabled={!isLoggedIn} style={{ padding: '10px', borderRadius: '6px' }}>
            <option value="">-- Selecciona una hora --</option>
            {HORAS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <button type="submit" className="boton boton-celeste" disabled={!isLoggedIn}>
            Confirmar Reserva
          </button>

          {mostrarExito && (
            <p className="msj-exito" style={{ display: 'block' }}>¡Cancha reservada correctamente!</p>
          )}
          {errorReserva && (
            <p className="msj-error" style={{ display: 'block', backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px' }}>
              {errorReserva}
            </p>
          )}

          {!isLoggedIn && (
            <p className="msj-error" style={{ display: 'block' }}>
              Debes iniciar sesión.<br /><Link to="/login">Ir al Login</Link>
            </p>
          )}
        </form>

        <div className="botones-gestion">
          <Link to="/horarios" className="boton boton-celeste">Ver Mis Reservas</Link>
        </div>

        <div className="boton-regresar">
          <Link to="/">
            <button className="boton boton-verde" type="button">Volver al Inicio</button>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Reservar