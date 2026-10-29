function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensaje enviado. ¡Gracias por contactarnos!')
    e.target.reset()
  }

  return (
    <main className="contenido-principal">
      <section className="contact-map">
        <div className="contact-form">
          <h3>¿Tienes preguntas? Escríbenos o ven a las instalaciones de la poli.</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" required />
            <input type="email" name="correo" placeholder="Correo" required />
            <input type="text" name="celular" placeholder="Celular" />
            <textarea name="observaciones" placeholder="Observaciones"></textarea>
            <button type="submit">Enviar</button>
          </form>
        </div>
        <div className="map">
          <iframe
            src="https://maps.google.com/maps?q=Escuela%20Politécnica%20Nacional,%20Quito&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa EPN"
          ></iframe>
        </div>
      </section>
    </main>
  )
}

export default Contacto
