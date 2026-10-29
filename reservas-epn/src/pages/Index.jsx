function Index() {
  return (
    <div className="contenido-principal">
      <main className="hero-carrusel">
        <div className="hero-overlay"></div>
        <div className="bg-slideshow">
          <img src="/imagenes/cancha-Futbol.png" alt="Cancha de Fútbol" className="bg-carrousel" />
          <img src="/imagenes/Cancha-Basquet.png" alt="Cancha de Básquet" className="bg-carrousel" />
          <img src="/imagenes/cancha-Ecuavoley.png" alt="Cancha de Ecuavoley" className="bg-carrousel" />
        </div>
        <div className="hero-content">
          <h1>SISTEMA DE RESERVACIÓN DE CANCHAS</h1>
          <p>
            Bienvenidos al sistema de alquiler de canchas de la poli.
            A través de esta plataforma, podrán reservar su espacio de manera rápida, sencilla y segura.
            Recuerden revisar la disponibilidad, elegir el horario que mejor se ajuste a sus necesidades y confirmar su turno con anticipación.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Index
