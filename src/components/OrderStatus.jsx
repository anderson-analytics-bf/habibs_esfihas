import { useState, useEffect } from 'react'
import './OrderStatus.css'

function getSteps(deliveryType) {
  return [
    { icon: 'bi-shop', label: 'Pedido chegou na cozinha' },
    { icon: 'bi-fire', label: 'Pedido em preparação' },
    { icon: 'bi-check-circle', label: 'Pedido ficou pronto' },
    deliveryType === 'delivery'
      ? { icon: 'bi-bicycle', label: 'Pedido saiu para entrega' }
      : { icon: 'bi-hand-thumbs-up', label: 'Pedido aguardando retirada' },
  ]
}

export default function OrderStatus({ order, onNewOrder }) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = getSteps(order?.deliveryType)

  useEffect(() => {
    if (!order) return
    setCurrentStep(0)
    const intervals = [2000, 5000, 9000, 14000]
    const timers = intervals.map((delay, i) =>
      setTimeout(() => setCurrentStep(i + 1), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [order])

  if (!order) {
    return (
      <div className="order-status-empty">
        <i className="bi bi-clock-history"></i>
        <p>Nenhum pedido em andamento.</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
          Finalize um pedido para acompanhar o status aqui.
        </p>
      </div>
    )
  }

  return (
    <div className="order-status">
      <div className="order-status-header">
        <span className="order-status-id">{order.id}</span>
        <span className="order-status-type">
          <i className={`bi ${order.deliveryType === 'delivery' ? 'bi-bicycle' : 'bi-shop'}`}></i>
          {order.deliveryType === 'delivery' ? ' Delivery' : ' Retirada'}
        </span>
      </div>

      <div className="order-timeline">
        {steps.map((step, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <div key={i} className={`timeline-step${done ? ' done' : ''}${active ? ' active' : ''}`}>
              <div className="timeline-icon-wrap">
                <div className="timeline-icon">
                  <i className={`bi ${done ? 'bi-check-lg' : step.icon}`}></i>
                </div>
                {i < steps.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <p className="timeline-label">{step.label}</p>
                {active && (
                  <span className="timeline-pulse">
                    <span></span><span></span><span></span>
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="order-status-summary">
        <h3>Resumo</h3>
        {order.items.map(i => (
          <div className="order-summary-item" key={i.id}>
            <span>{i.name} x{i.qty}</span>
            <span className="price-tag">R$ {(i.price * i.qty).toFixed(2).replace('.', ',')}</span>
          </div>
        ))}
        <div className="divider" />
        <div className="order-summary-item order-summary-total">
          <span>Total</span>
          <span className="price-tag">R$ {order.total.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      <button className="btn-primary" onClick={onNewOrder} style={{ marginTop: 8 }}>
        <i className="bi bi-plus-circle"></i> Fazer Novo Pedido
      </button>
    </div>
  )
}
