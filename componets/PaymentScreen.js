import { useState } from 'react';
export default function PaymentScreen({ total, onPaymentSuccess, onCancel }) {
    const [method, setMethod] = useState(null);
    const [cashGiven, setCashGiven] = useState('');
    const [error, setError] = useState('');
    const handleCashSubmit = () => {
        const amount = parseFloat(cashGiven);
        if (isNaN(amount) || amount < total) {
            setError(`Insufficient payment. Please enter at least ₱${total.toFixed(2)}.`);
            return;
        }
        const change = amount - total;
        onPaymentSuccess({ method: 'CASH', amountPaid: amount, change });
    };
    const handleSimulatedPayment = (paymentMethod) => {
        onPaymentSuccess({ method: paymentMethod, amountPaid: total, change: 0 });
    };
    return (
        <div className="payment-screen">
            <h2>PAYMENT</h2>
            <h3>Amount Due: ₱{total.toFixed(2)}</h3>

            {!method ? (
                <div className="payment-methods">
                    <button onClick={() => setMethod('CASH')}>CASH</button>
                    <button onClick={() => setMethod('QR')}>QR PAY</button>
                    <button onClick={() => setMethod('CARD')}>CREDIT/DEBIT CARD</button>
                    <button className="cancel-btn" onClick={onCancel}>Back to Order</button>
                </div>
            ) : method === 'CASH' ? (
                <div className="cash-payment">
                    <p>Enter Cash Amount:</p>
                    <input
                        type="number"
                        value={cashGiven}
                        onChange={(e) => setCashGiven(e.target.value)}
                        placeholder="₱0.00"
                    />
                    {error && <p className="error">{error}</p>}
                    <button className="proceed-btn" onClick={handleCashSubmit}>Complete Payment</button>
                    <button className="cancel-btn" onClick={() => { setMethod(null); setError(''); }}>Back</button>
                </div>
            ) : method === 'QR' ? (
                <div className="qr-payment">
                    <div className="qr-placeholder">QR CODE / PLACEHOLDER</div>
                    <p>Scan the QR code using your supported payment application.</p>
                    <button className="proceed-btn" onClick={() => handleSimulatedPayment('QR')}>Confirm Payment</button>
                    <button className="cancel-btn" onClick={() => setMethod(null)}>Back</button>
                </div>
            ) : (
                <div className="card-payment">
                    <p>Please tap, insert, or swipe your card.</p>
                    <button className="proceed-btn" onClick={() => handleSimulatedPayment('CARD')}>Process Payment</button>
                    <button className="cancel-btn" onClick={() => setMethod(null)}>Back</button>
                </div>
            )}
        </div>
    );
}
