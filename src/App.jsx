import { useState, useEffect } from 'react'
import './App.css'
import products from './data/products'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartSidebar from './components/CartSidebar'
import CheckoutModal from './components/CheckoutModal'
import OrderStatus from './components/OrderStatus'
import Favorites from './components/Favorites'
import './components/Header.css'
import './components/ProductCard.css'

function loadLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

export default function App() {
  const [theme, setTheme] = useState(() => loadLocal('hb_theme', 'dark'))
  const [activePage, setActivePage] = useState('menu')
  const [cart, setCart] = useState(() => loadLocal('hb_cart', []))
  const [favorites, setFavorites] = useState(() => loadLocal('hb_favorites', []))
  const [savedCustomer, setSavedCustomer] = useState(() => loadLocal('hb_customer', null))
  const [lastOrder, setLastOrder] = useState(() => loadLocal('hb_last_order', null))

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  // Persist
  useEffect(() => { localStorage.setItem('hb_theme', JSON.stringify(theme)) }, [theme])
  useEffect(() => { localStorage.setItem('hb_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('hb_favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { if (savedCustomer) localStorage.setItem('hb_customer', JSON.stringify(savedCustomer)) }, [savedCustomer])
  useEffect(() => { if (lastOrder) localStorage.setItem('hb_last_order', JSON.stringify(lastOrder)) }, [lastOrder])

  // Apply theme to document
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])

  function toggleTheme() { setTheme(t => t === 'dark' ? 'light' : 'dark') }

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function updateCartQty(id, qty) {
    if (qty <= 0) removeFromCart(id)
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  function toggleFavorite(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  function handleNavigate(page) {
    if (page === 'cart') { setCartOpen(true); return }
    setActivePage(page)
    setCartOpen(false)
    setCheckoutOpen(false)
    setSelectedProduct(null)
  }

  function handleConfirmOrder(order) {
    setLastOrder(order)
    setCart([])
    setCheckoutOpen(false)
    setCartOpen(false)
    setActivePage('status')
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="app-main">
        {activePage === 'menu' && (
          <>
            <h2 className="section-title" style={{ paddingTop: 20 }}>Cardápio</h2>
            <div className="products-grid">
              {products.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorite={favorites.includes(p.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                  onOpenModal={setSelectedProduct}
                />
              ))}
            </div>
          </>
        )}

        {activePage === 'status' && (
          <OrderStatus
            order={lastOrder}
            onNewOrder={() => { setLastOrder(null); setActivePage('menu') }}
          />
        )}

        {activePage === 'favorites' && (
          <Favorites
            products={products}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
            onOpenModal={setSelectedProduct}
          />
        )}

        {activePage === 'update' && (
          <UpdateCustomer
            savedCustomer={savedCustomer}
            onSave={c => { setSavedCustomer(c); localStorage.setItem('hb_customer', JSON.stringify(c)) }}
          />
        )}
      </main>

      <BottomNav activePage={activePage} onNavigate={handleNavigate} cartCount={cartCount} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateCartQty}
          onRemove={removeFromCart}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={handleConfirmOrder}
          savedCustomer={savedCustomer}
          onSaveCustomer={setSavedCustomer}
        />
      )}
    </div>
  )
}

function UpdateCustomer({ savedCustomer, onSave }) {
  const [form, setForm] = useState(savedCustomer || { name: '', phone: '', address: '' })
  const [saved, setSaved] = useState(false)

  function handleSave() {
    onSave(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="update-customer">
      <h2 className="section-title" style={{ paddingTop: 20 }}>Atualizar Dados</h2>
      <div className="update-customer-form">
        <div className="form-field">
          <label>Nome</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Seu nome completo" />
        </div>
        <div className="form-field">
          <label>Telefone</label>
          <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(65) 99999-9999" />
        </div>
        <div className="form-field">
          <label>Endereço</label>
          <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Rua, número, bairro, cidade" />
        </div>
        <button className="btn-primary" onClick={handleSave}>
          {saved ? <><i className="bi bi-check2"></i> Salvo!</> : <><i className="bi bi-floppy"></i> Salvar Dados</>}
        </button>
      </div>
    </div>
  )
}
