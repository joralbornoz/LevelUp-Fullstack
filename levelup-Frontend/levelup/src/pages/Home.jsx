// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import '../styles/styles.css';

function Home() {
  return (
    <>
      {/* Sección Hero */}
      <section className="hero">
        <h1>¡Bienvenido a Level-Up Gamer!</h1>
        <p>La mejor tienda de productos Gamer en un solo lugar.</p>
        {/* Usamos Link en vez de href="catalogo.html" */}
        <Link to="/catalogo" className="btn">
          Catálogo de Productos
        </Link>
      </section>

      {/* Sección Nosotros - Descripción general */}
      <section id="nosotros">
        <article>
          🕹️Level-Up Gamer
          <p>
            Es una tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile.
            Lanzada hace dos años como respuesta a la creciente demanda durante la pandemia, Level-Up Gamer ofrece una
            amplia gama de productos para gamers, desde consolas y accesorios hasta computadores y sillas
            especializadas. Aunque no cuenta con una ubicación física, realiza despachos a todo el país.
          </p>
        </article>
      </section>

      {/* Sección Misión */}
      <section id="nosotros">
        <article>
          📍Misión
          <p>
            Proporcionar productos de alta calidad para gamers en todo Chile, ofreciendo una experiencia de compra
            única y personalizada, con un enfoque en la satisfacción del cliente y el crecimiento de la comunidad gamer.
          </p>
        </article>
      </section>

      {/* Sección Visión */}
      <section id="nosotros">
        <article>
          🤖Visión
          <p>
            Ser la tienda online líder en productos para gamers en Chile, reconocida por su innovación, servicio al
            cliente excepcional, y un programa de fidelización basado en gamificación que recompense a nuestros clientes
            más fieles.
          </p>
        </article>
      </section>

      {/* Contenido Educativo y Comunidad */}
      <section id="comunidad">
        <h2>Consejos Educativo y Comunidad Gamer</h2>
        <div className="comunidad-container">
          <article className="comunidad-card">
            <h3>📰 Noticias Gamer</h3>
            <p>
              Entérate de las últimas novedades en el mundo gamer: lanzamientos, actualizaciones y torneos
              internacionales.
            </p>
            <a href="#">Leer más</a>
          </article>

          <article className="comunidad-card">
            <h3>🎮 Guías y Consejos</h3>
            <p>
              Descubre estrategias, builds y configuraciones para mejorar tu rendimiento en tus juegos favoritos.
            </p>
            <a href="#">Ver guías</a>
          </article>

          <article className="comunidad-card">
            <h3>💬 Comunidad</h3>
            <p>
              Comparte experiencias con otros gamers, participa en foros y sé parte de nuestra comunidad Level-Up
              Gamer.
            </p>
            <a href="#">Unirse</a>
          </article>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto">
        <h2>Soporte Técnico</h2>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
          Contactar por WhatsApp
        </a>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Level-Up Gamer</p>
      </footer>
    </>
  );
}

export default Home;
