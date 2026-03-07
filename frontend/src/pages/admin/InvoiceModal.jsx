import { useState } from 'react';
import { useAuth } from '/../../services/AuthContext.jsx';           
import { confirmPendingSale } from '../../services/fetchSales'; 
import './Admin.css';

function InvoiceModal({ reservation, onClose, onSuccess }) {
  const { token } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [bank, setBank] = useState('');

  const subtotal = reservation.price;
  const iva = reservation.taxAmount;
  const total = reservation.totalPaid;

  const handleConfirm = async () => {
    if (!paymentRef.trim() || !paymentDate || !bank.trim()) {
      setError('Todos los campos de pago son obligatorios.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // ✅ cuando el backend implemente el endpoint, solo cambias fetchSales.js
      await confirmPendingSale(
        reservation.idSale,
        { referenciaPago: paymentRef, fechaPago: paymentDate, banco: bank },
        token
      );
      onSuccess(reservation.idSale);
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || 'Error al procesar la factura. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Confirmar Venta</h2>

        <p className="modal-section-label">Datos del Comprador</p>
        <div className="invoice-summary">
          <div className="summary-row">
            <span>Nombre</span>
            <strong>{reservation.clientFullName}</strong>
          </div>
          <div className="summary-row">
            <span>Email</span>
            <strong>{reservation.clientEmail || 'No disponible'}</strong>
          </div>
        </div>

        <p className="modal-section-label">Datos de la Obra</p>
        <div className="invoice-summary">
          <div className="summary-row">
            <span>Obra</span>
            <strong>{reservation.artworkTitle}</strong>
          </div>
          <div className="summary-divider" />
          <div className="summary-row">
            <span>Precio</span>
            <span>${subtotal?.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>IVA</span>
            <span>${iva?.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${total?.toLocaleString()}</strong>
          </div>
        </div>

        <p className="modal-section-label">Datos del Pago</p>

        <div className="form-group">
          <label className="form-label">Referencia de Pago *</label>
          <input className="form-input" type="text"
            placeholder="Ej: REF-2026-00123"
            value={paymentRef}
            onChange={e => { setPaymentRef(e.target.value); setError(''); }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Fecha de Pago *</label>
          <input className="form-input" type="date"
            value={paymentDate}
            onChange={e => { setPaymentDate(e.target.value); setError(''); }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Banco *</label>
          <input className="form-input" type="text"
            placeholder="Ej: Banco Nacional"
            value={bank}
            onChange={e => { setBank(e.target.value); setError(''); }}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Procesando...' : '✓ Confirmar Venta'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;