import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './CheckoutModal.css'

function generateOrderId() {
  return 'ESF' + String(Math.floor(10000 + Math.random() * 90000))
}

export default function CheckoutModal({ cart, onClose, onConfirm, savedCustomer, onSaveCustomer }) {
  const [deliveryType, setDeliveryType] = useState('delivery')
  const [payment, setPayment] = useState('pix')
  const [needChange, setNeedChange] = useState(false)
  const [changeFor, setChangeFor] = useState('')
  const [customer, setCustomer] = useState(savedCustomer || { name: '', phone: '', address: '' })
  const [confirmed, setConfirmed] = useState(false)
  const [order, setOrder] = useState(null)

  const deliveryFee = deliveryType === 'delivery' ? 2 : 0
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal + deliveryFee
  const change = needChange && parseFloat(changeFor) > 0
    ? (parseFloat(changeFor) - total).toFixed(2)
    : null

  const pixKey = '(65) 99950-3724'
  const pixPayload = `PIX - ${pixKey} - Total: R$ ${total.toFixed(2).replace('.', ',')}`

  function handleConfirm() {
    const orderId = generateOrderId()
    const orderData = {
      id: orderId,
      items: cart,
      deliveryType,
      address: customer.address,
      total,
      payment,
      customer,
      needChange,
      changeFor: parseFloat(changeFor) || 0,
    }
    onSaveCustomer(customer)
    setOrder(orderData)
    setConfirmed(true)
    onConfirm(orderData)
  }

  function handleWhatsApp() {
    const itemsList = cart.map(i => `  - ${i.name} x${i.qty} = R$ ${(i.price * i.qty).toFixed(2).replace('.', ',')}`).join('\n')
    const deliveryText = deliveryType === 'delivery' ? `Delivery (+R$ 2,00)\nEndereço: ${customer.address}` : 'Retirada no local'
    const msg = `*Novo Pedido - ${order.id}*\n\nCliente: ${customer.name}\nTelefone: ${customer.phone}\n\n*Itens:*\n${itemsList}\n\n*Entrega:* ${deliveryText}\n*Total:* R$ ${total.toFixed(2).replace('.', ',')}\n*Pagamento:* ${payment}${needChange && change ? `\nTroco para: R$ ${parseFloat(changeFor).toFixed(2).replace('.', ',')}\nTroco: R$ ${change.replace('.', ',')}` : ''}`
    window.open(`https://wa.me/5565999503724?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (confirmed && order) {
    return (
      <>
        <div className="overlay" onClick={onClose} />
        <div className="checkout-modal">
          <div className="checkout-modal-header">
            <h2 className="checkout-modal-title">Pedido Confirmado</h2>
            <button className="btn-ghost" onClick={onClose} aria-label="Fechar"><i className="bi bi-x-lg"></i></button>
          </div>
          <div className="checkout-modal-body">
            <div className="order-confirm-badge">
              <i className="bi bi-check-circle-fill"></i>
              <span>{order.id}</span>
            </div>

            <div className="order-summary">
              <h3>Resumo do Pedido</h3>
              {cart.map(i => (
                <div className="order-summary-item" key={i.id}>
                  <span>{i.name} x{i.qty}</span>
                  <span className="price-tag">R$ {(i.price * i.qty).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
              <div className="divider" />
              {deliveryType === 'delivery' && (
                <div className="order-summary-item">
                  <span>Taxa de entrega</span>
                  <span className="price-tag">R$ 2,00</span>
                </div>
              )}
              <div className="order-summary-item order-summary-total">
                <span>Total</span>
                <span className="price-tag">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="divider" />
              <div className="order-summary-item">
                <span>Entrega</span>
                <span>{deliveryType === 'delivery' ? 'Delivery' : 'Retirada'}</span>
              </div>
              {deliveryType === 'delivery' && (
                <div className="order-summary-item">
                  <span>Endereço</span>
                  <span style={{ textAlign: 'right', flex: 1, fontSize: '0.8rem' }}>{customer.address}</span>
                </div>
              )}
              <div className="order-summary-item">
                <span>Pagamento</span>
                <span style={{ textTransform: 'capitalize' }}>{payment}</span>
              </div>
              {payment === 'dinheiro' && needChange && change && (
                <div className="order-summary-item">
                  <span>Troco</span>
                  <span className="price-tag">R$ {change.replace('.', ',')}</span>
                </div>
              )}
              {payment === 'pix' && (
                <div className="pix-qr-wrap">
                  <p>Escaneie o QR Code para pagar</p>
                  <QRCodeSVG value={pixPayload} size={160} bgColor="transparent" fgColor="var(--sand-200)" />
                  <span className="pix-key">{pixKey}</span>
                </div>
              )}
            </div>

            <button className="btn-whatsapp" onClick={handleWhatsApp}>
              <i className="bi bi-whatsapp"></i> Enviar pelo WhatsApp
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="checkout-modal">
        <div className="checkout-modal-header">
          <h2 className="checkout-modal-title">Finalizar Pedido</h2>
          <button className="btn-ghost" onClick={onClose} aria-label="Fechar"><i className="bi bi-x-lg"></i></button>
        </div>

        <div className="checkout-modal-body">
          {/* Delivery type */}
          <div className="checkout-section">
            <label className="checkout-section-label">Tipo de Entrega</label>
            <div className="delivery-toggle">
              <button
                className={`delivery-btn${deliveryType === 'delivery' ? ' delivery-btn--active' : ''}`}
                onClick={() => setDeliveryType('delivery')}
              >
                <i className="bi bi-bicycle"></i> Delivery
              </button>
              <button
                className={`delivery-btn${deliveryType === 'retirada' ? ' delivery-btn--active' : ''}`}
                onClick={() => setDeliveryType('retirada')}
              >
                <i className="bi bi-shop"></i> Retirada
              </button>
            </div>
          </div>

          {/* Customer */}
          <div className="checkout-section">
            <label className="checkout-section-label">Seus Dados</label>
            <div className="form-field">
              <label>Nome</label>
              <input value={customer.name} onChange={e => setCustomer(c => ({ ...c, name: e.target.value }))} placeholder="Seu nome completo" />
            </div>
            <div className="form-field">
              <label>Telefone</label>
              <input value={customer.phone} onChange={e => setCustomer(c => ({ ...c, phone: e.target.value }))} placeholder="(65) 99999-9999" />
            </div>
            {deliveryType === 'delivery' && (
              <div className="form-field">
                <label>Endereço Completo</label>
                <input value={customer.address} onChange={e => setCustomer(c => ({ ...c, address: e.target.value }))} placeholder="Rua, número, bairro, cidade" />
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="checkout-section">
            <label className="checkout-section-label">Forma de Pagamento</label>
            <div className="payment-options">
              {[
                { value: 'credito', label: 'Crédito', icon: 'bi-credit-card' },
                { value: 'debito', label: 'Débito', icon: 'bi-credit-card-2-back' },
                { value: 'dinheiro', label: 'Dinheiro', icon: 'bi-cash-coin' },
                { value: 'pix', label: 'Pix', icon: 'bi-qr-code' },
              ].map(opt => (
                <button
                  key={opt.value}
                  className={`payment-btn${payment === opt.value ? ' payment-btn--active' : ''}`}
                  onClick={() => setPayment(opt.value)}
                >
                  <i className={`bi ${opt.icon}`}></i>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {payment === 'dinheiro' && (
              <div className="change-section">
                <label className="change-toggle">
                  <input type="checkbox" checked={needChange} onChange={e => setNeedChange(e.target.checked)} />
                  <span>Precisa de troco?</span>
                </label>
                {needChange && (
                  <div className="form-field">
                    <label>Troco para quanto?</label>
                    <input
                      type="number"
                      value={changeFor}
                      onChange={e => setChangeFor(e.target.value)}
                      placeholder="Ex: 50.00"
                      min={total}
                    />
                    {change && parseFloat(change) > 0 && (
                      <p className="change-value">Troco: <strong className="price-tag">R$ {change.replace('.', ',')}</strong></p>
                    )}
                  </div>
                )}
              </div>
            )}

            {payment === 'pix' && (
              <div className="pix-qr-wrap">
                <p>QR Code será gerado na confirmação</p>
                <i className="bi bi-qr-code" style={{ fontSize: '3rem', color: 'var(--green-400)', marginTop: 8 }}></i>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="checkout-section checkout-total-section">
            <div className="order-summary-item">
              <span>Subtotal</span>
              <span className="price-tag">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {deliveryType === 'delivery' && (
              <div className="order-summary-item">
                <span>Taxa de entrega</span>
                <span className="price-tag">R$ 2,00</span>
              </div>
            )}
            <div className="order-summary-item order-summary-total">
              <span>Total</span>
              <span className="price-tag" style={{ fontSize: '1.1rem' }}>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <button className="btn-primary" onClick={handleConfirm} disabled={!customer.name || !customer.phone || (deliveryType === 'delivery' && !customer.address)}>
            <i className="bi bi-check2-circle"></i> Confirmar Pedido
          </button>
        </div>
      </div>
    </>
  )
}
