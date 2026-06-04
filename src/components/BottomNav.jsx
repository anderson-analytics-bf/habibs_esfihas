import './BottomNav.css'

const navItems = [
  { id: 'menu', icon: 'bi-grid-3x3-gap', label: 'Cardápio' },
  { id: 'status', icon: 'bi-clock-history', label: 'Status' },
  { id: 'cart', icon: 'bi-bag-plus', label: 'Carrinho', center: true },
  { id: 'update', icon: 'bi-person-lines-fill', label: 'Dados' },
  { id: 'favorites', icon: 'bi-heart', label: 'Favoritos' },
]

export default function BottomNav({ activePage, onNavigate, cartCount }) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item${item.center ? ' nav-item--center' : ''}${activePage === item.id ? ' nav-item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
          >
            {item.center ? (
              <div className="nav-center-btn">
                <i className={`bi ${item.icon}`}></i>
                {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
              </div>
            ) : (
              <>
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
