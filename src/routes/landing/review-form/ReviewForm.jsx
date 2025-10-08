import React, { useState } from 'react';
import './ReviewForm.css';
import {REVIEWS_URL} from "../../../data/constants.js";

// Sub-component for star rating
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`star ${starValue <= rating ? 'filled' : ''}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    enjoyed_most: '',
    improvement_suggestion: '',
    would_recommend: '',
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setRating = (newRating) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (formData.rating === 0 || !formData.enjoyed_most || !formData.would_recommend) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(REVIEWS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Algo salió mal.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  if (status === 'success') {
    return (
      <section id="review-form" className="review-form-section">
        <div className="review-form-container">
          <div className="success-message">
            <h3>¡Gracias por tu opinión!</h3>
            <p>Valoramos mucho tu tiempo y tus comentarios.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="review-form" className="review-form-section">
      <div className="review-form-container">
        <h2>Na pizza é na cosa seria… tu opinión también.</h2>
        <p>Tu opinión nos ayuda a mejorar y a seguir ofreciéndote la mejor pizza de la ciudad.</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>¿Cómo calificarías tu experiencia en Tonda? *</legend>
            <StarRating rating={formData.rating} setRating={setRating} />
          </fieldset>

          <fieldset>
            <legend>¿Qué fue lo que más disfrutaste? *</legend>
            <div className="radio-group">
              {['La pizza', 'El ambiente', 'El servicio', 'Todo en conjunto'].map((option) => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="enjoyed_most"
                    value={option}
                    checked={formData.enjoyed_most === option}
                    onChange={handleInputChange}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>¿Qué podemos mejorar para tu próxima visita?</legend>
            <textarea
              name="improvement_suggestion"
              value={formData.improvement_suggestion}
              onChange={handleInputChange}
              placeholder="Tus sugerencias son bienvenidas..."
            />
          </fieldset>

          <fieldset>
            <legend>¿Recomendarías Tonda a un amigo? *</legend>
            <div className="radio-group">
              {['Sí, sin dudas', 'Tal vez', 'No'].map((option) => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="would_recommend"
                    value={option}
                    checked={formData.would_recommend === option}
                    onChange={handleInputChange}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Enviando...' : 'Enviar Reseña'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
