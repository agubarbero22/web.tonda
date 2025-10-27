import SlideOne from "../../assets/images/img-one.jpeg";
import SlideTwo from "../../assets/images/carbonara.jpeg";
import SlideThree from "../../assets/images/img-three.jpeg";
import SlideFour from "../../assets/images/img-four.jpeg";

const AboutUs = () => {
  return (
    <section className="about__company" aria-labelledby="about-title">
      <article className="about__company__content">
        <h2 id="about-title">Sobre nosotros</h2>
        <h3 className="sub-title">Más que comida deliciosa</h3>
        <p>
          Fundada en 1982, ¡llevamos la pizza porción por porción al siguiente nivel!
          Una marca única y estar en la industria de la pizza es la fórmula de nuestro
          éxito. Entendemos lo que la gente quiere y convertimos los deseos en
          experiencias de sabor únicas.
        </p>
        <ul>
          <li>🥬 Frescura, originalidad y calidad son nuestras prioridades.</li>
          <li>💰 Costos asequibles, ubicados en casi cualquier lugar.</li>
          <li>📱 Increíble sistema de pedidos en línea: pida comida con un solo clic.</li>
          <li>📆 Opciones de pre-pedido fáciles de navegar.</li>
          <li>🎈 ¡Excelentes opciones para fiestas corporativas!</li>
        </ul>
        <p>
          ¡En TONDA siempre nos preocupamos por ti porque eres tú quien
          nos hace especiales!
        </p>
        <p>
          El proyecto TONDA fue hecho con amor por la pizza por Ekaterine
          Mitagvaria.
        </p>
        <div className="about__company__glass"></div>
      </article>
      <div className="about__company__gallery">
        <img
          src={SlideOne}
          alt=""
          aria-hidden="true"
          loading="lazy"
          fetchPriority="low"
        />
        <img
          src={SlideTwo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          fetchPriority="low"
        />
        <img
          src={SlideThree}
          alt=""
          aria-hidden="true"
          loading="lazy"
          fetchPriority="low"
        />
        <img
          src={SlideFour}
          alt=""
          aria-hidden="true"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
    </section>
  );
};

export default AboutUs;
