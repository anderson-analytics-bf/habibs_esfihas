import './ProductCard.css'

export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, onOpenModal }) {
  return (
    <div className="product-card" onClick={() => onOpenModal(product)}>
      <div className="product-card-image-wrap">
        <img src={product.image} alt={product.name} className="product-card-image" />
        <button
          className={`fav-btn${isFavorite ? ' fav-btn--active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id) }}
          aria-label="Favoritar"
        >
          <i className={`bi bi-heart${isFavorite ? '-fill' : ''}`}></i>
        </button>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.shortDescription}</p>
        <div className="product-card-footer">
          <span className="price-tag">R$ {product.price.toFixed(2).replace('.', ',')}</span>
          <button
            className="add-cart-btn"
            onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
            aria-label="Adicionar ao carrinho"
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
