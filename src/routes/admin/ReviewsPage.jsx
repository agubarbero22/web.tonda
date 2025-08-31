import { useState } from 'react';
import './ReviewsPage.css';

const ReviewsPage = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenInput }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchReviews(tokenInput);
      } else {
        const data = await response.json();
        setError(data.message || 'Token inválido');
      }
    } catch (err) {
      setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
    }

    setIsLoading(false);
  };

  const fetchReviews = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        setError('Error al obtener las reseñas.');
      }
    } catch (err) {
      setError('Ocurrió un error al obtener las reseñas.');
    }
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="reviews-page">
        <form onSubmit={handleTokenSubmit} className="token-form">
          <h2>Introducir Token de Acceso</h2>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Token Secreto"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Ver Reseñas'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <h2>Reseñas de Clientes</h2>
      {isLoading && <p>Cargando reseñas...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p><strong>ID:</strong> {review.id}</p>
            <p><strong>Calificación:</strong> {review.rating}</p>
            <p><strong>Lo que más le gustó:</strong> {review.enjoyed_most}</p>
            <p><strong>Sugerencia de mejora:</strong> {review.improvement_suggestion}</p>
            <p><strong>Lo recomendaría:</strong> {review.would_recommend ? 'Sí' : 'No'}</p>
            <p><strong>Creado el:</strong> {new Date(review.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
