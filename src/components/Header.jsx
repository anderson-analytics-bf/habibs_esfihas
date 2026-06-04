export default function Header({ theme, onToggleTheme, cartCount, onOpenCart }) {
  return (
    <header className="header">
      <button className="theme-toggle" onClick={onToggleTheme} aria-label="Alternar tema">
        <i className={`bi bi-${theme === 'dark' ? 'sun' : 'moon-stars'}`}></i>
      </button>

      <div className="header-center">
        <img src="/assets/images/logotipo.png" alt="Habib's Lanches" className="header-logo" />
        <p className="header-slogan">Servindo bem para servir sempre</p>
      </div>

      <button className="cart-btn" onClick={onOpenCart} aria-label="Abrir carrinho">
        <i className="bi bi-cart3"></i>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </header>
  )
}
