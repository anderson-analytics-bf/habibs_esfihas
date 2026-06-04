import { useState } from 'react'
import './ProductModal.css'

export default function ProductModal({ product, isFavorite, onToggleFavorite, onAddToCart, onClose }) {
  const [qty, setQty] = useState(1)

  if (!product) return null

  function handleAdd() {
    for (let i = 0; i < qty; i++) onAddToCart(product)
    onClose()
  }

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="product-modal">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="product-modal-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-modal-body">
          <div className="product-modal-header">
            <h2 className="product-modal-name">{product.name}</h2>
            <button
              className={`fav-btn fav-btn--modal${isFavorite ? ' fav-btn--active' : ''}`}
              onClick={() => onToggleFavorite(product.id)}
              aria-label="Favoritar"
            >
              <i className={`bi bi-heart${isFavorite ? '-fill' : ''}`}></i>
            </button>
          </div>

          <p className="product-modal-desc">{product.fullDescription}</p>

          <div className="product-modal-price">
            <span className="price-tag" style={{ fontSize: '1.3rem' }}>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="product-modal-qty">
            <button
              className="qty-btn"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              aria-label="Diminuir"
            >
              <i className="bi bi-dash"></i>
            </button>
            <span className="qty-value">{qty}</span>
            <button
              className="qty-btn"
              onClick={() => setQty(q => q + 1)}
              aria-label="Aumentar"
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>

          <button className="btn-primary" onClick={handleAdd}>
            <i className="bi bi-bag-plus me-2"></i>
            Adicionar ao carrinho &mdash; R$ {(product.price * qty).toFixed(2).replace('.', ',')}
          </button>
        </div>
      </div>
    </>
  )
}
