import './CartSidebar.css'

export default function CartSidebar({ cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="cart-sidebar">
        <div className="cart-sidebar-header">
          <h2 className="cart-sidebar-title">
            <i className="bi bi-bag"></i> Seu Carrinho
          </h2>
          <button className="btn-ghost" onClick={onClose} aria-label="Fechar">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="cart-sidebar-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="bi bi-bag-x"></i>
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image-wrap">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <span className="price-tag" style={{ fontSize: '0.9rem' }}>
                      R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="cart-item-actions">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>
                      <i className="bi bi-plus"></i>
                    </button>
                    <button className="cart-remove-btn" onClick={() => onRemove(item.id)} aria-label="Remover">
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              ))}

              <div className="divider" />
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span className="price-tag">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar-footer">
            <button className="btn-primary" onClick={onCheckout}>
              <i className="bi bi-bag-check"></i> Finalizar Pedido
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
