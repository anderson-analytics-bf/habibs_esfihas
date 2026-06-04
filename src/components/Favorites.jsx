import './Favorites.css'

export default function Favorites({ products, favorites, onToggleFavorite, onAddToCart, onOpenModal }) {
  const favProducts = products.filter(p => favorites.includes(p.id))

  return (
    <div className="favorites-page">
      <h2 className="section-title" style={{ paddingTop: 20 }}>Meus Favoritos</h2>
      {favProducts.length === 0 ? (
        <div className="favorites-empty">
          <i className="bi bi-heart"></i>
          <p>Nenhum favorito ainda.</p>
          <p>Toque no coração de um produto para salvar aqui.</p>
        </div>
      ) : (
        <div className="products-grid">
          {favProducts.map(p => (
            <div className="product-card" key={p.id} onClick={() => onOpenModal(p)}>
              <div className="product-card-image-wrap">
                <img src={p.image} alt={p.name} className="product-card-image" />
                <button
                  className="fav-btn fav-btn--active"
                  onClick={e => { e.stopPropagation(); onToggleFavorite(p.id) }}
                  aria-label="Remover favorito"
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-name">{p.name}</h3>
                <p className="product-card-desc">{p.shortDescription}</p>
                <div className="product-card-footer">
                  <span className="price-tag">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                  <button
                    className="add-cart-btn"
                    onClick={e => { e.stopPropagation(); onAddToCart(p) }}
                    aria-label="Adicionar ao carrinho"
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
