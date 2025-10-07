import { useState, useEffect } from 'react';
import './ReviewsPage.css';
import {REVIEWS_TOKEN_URL, REVIEWS_URL} from "../../data/constants.js";

const ReviewsPage = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'today', 'dateRange'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(REVIEWS_TOKEN_URL, {
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
      const response = await fetch(REVIEWS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
        setFilteredReviews(data);
      } else {
        setError('Error al obtener las reseñas.');
      }
    } catch (err) {
      setError('Ocurrió un error al obtener las reseñas.');
    }
    setIsLoading(false);
  };

  // Función para filtrar reseñas
  const filterReviews = () => {
    let filtered = [...reviews];

    if (filterType === 'today') {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      
      filtered = reviews.filter(review => {
        const reviewDate = new Date(review.created_at);
        return reviewDate >= todayStart && reviewDate < todayEnd;
      });
    } else if (filterType === 'dateRange' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Incluir todo el día final
      
      filtered = reviews.filter(review => {
        const reviewDate = new Date(review.created_at);
        return reviewDate >= start && reviewDate <= end;
      });
    }

    setFilteredReviews(filtered);
  };

  // Función para eliminar todas las reseñas
  const deleteAllReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(REVIEWS_URL, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokenInput}`,
        },
      });

      if (response.ok) {
        setReviews([]);
        setFilteredReviews([]);
        setShowDeleteConfirm(false);
        setError('');
      } else {
        setError('Error al eliminar las reseñas.');
      }
    } catch (err) {
      setError('Ocurrió un error al eliminar las reseñas.');
    }
    setIsLoading(false);
  };

  // Efecto para aplicar filtros cuando cambian
  useEffect(() => {
    filterReviews();
  }, [filterType, startDate, endDate, reviews]);

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
      <div className="reviews-header">
        <h2>Reseñas de Clientes</h2>
        <div className="reviews-actions">
          <button 
            className="delete-all-btn"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isLoading}
          >
            🗑️ Eliminar Todas las Reseñas
          </button>
        </div>
      </div>

      {/* Controles de Filtrado */}
      <div className="filter-controls">
        <div className="filter-group">
          <label>Filtrar por:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas las reseñas</option>
            <option value="today">Solo hoy</option>
            <option value="dateRange">Rango de fechas</option>
          </select>
        </div>

        {filterType === 'dateRange' && (
          <div className="date-range-controls">
            <div className="date-input-group">
              <label>Desde:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input"
              />
            </div>
            <div className="date-input-group">
              <label>Hasta:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="date-input"
              />
            </div>
          </div>
        )}

        <div className="reviews-stats">
          <span>Mostrando {filteredReviews.length} de {reviews.length} reseñas</span>
        </div>
      </div>

      {isLoading && <p className="loading-message">Cargando reseñas...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="reviews-list">
        {filteredReviews.length === 0 ? (
          <div className="no-reviews">
            <p>No hay reseñas que coincidan con los filtros seleccionados.</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="review-id">#{review.id}</span>
                <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <div className="review-rating">
                <span className="rating-label">Calificación:</span>
                <div className="stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <div className="review-content">
                <p><strong>Lo que más le gustó:</strong> {review.enjoyed_most}</p>
                {review.improvement_suggestion && (
                  <p><strong>Sugerencia de mejora:</strong> {review.improvement_suggestion}</p>
                )}
                <p><strong>Lo recomendaría:</strong> {review.would_recommend}</p>
              </div>
              <div className="review-time">
                <small>{new Date(review.created_at).toLocaleString()}</small>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de confirmación para eliminar */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>⚠️ Confirmar Eliminación</h3>
            <p>¿Estás seguro de que quieres eliminar TODAS las reseñas? Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={deleteAllReviews}
                disabled={isLoading}
              >
                {isLoading ? 'Eliminando...' : 'Sí, Eliminar Todas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
