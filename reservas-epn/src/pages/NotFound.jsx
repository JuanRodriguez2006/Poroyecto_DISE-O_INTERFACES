import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="contenido-principal" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/">
        <button className="boton-volver">Volver al inicio</button>
      </Link>
    </main>
  )
}

export default NotFound
