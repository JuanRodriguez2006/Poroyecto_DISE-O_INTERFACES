function Servicios() {
  return (
    <div className="contenido-principal">
      <main>
        <section className="services">
          <h2>Servicios</h2>
          <p>Ofrecemos soluciones inteligentes para el deporte universitario.</p>
          <div className="service-cards">
            <div className="card">
              <img src="/imagenes/imagen1.png" alt="Balones" />
              <h3>Encuentra y aparta tu cancha de fútbol, básquet o vóley en segundos.</h3>
            </div>
            <div className="card">
              <img src="/imagenes/imagen2.png" alt="Juego de Basquet" />
              <h3>Espacios deportivos disponibles a tu alrededor en tiempo real.</h3>
            </div>
            <div className="card">
              <img src="/imagenes/imagen3.png" alt="Gestion de Reservas" />
              <h3>Gestiona tus reservas de manera fácil y confiable.</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Servicios
