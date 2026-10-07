import { useState } from 'react';
import { formatCurrency } from '../lib/utils';

export default function PaymentScreen({ total, onPaymentSuccess, onCancel }) {
    const [method, setMethod] = useState(null);
    const [cashGivenStr, setCashGivenStr] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const cashGivenNum = parseFloat(cashGivenStr) || 0;
    const change = cashGivenNum - total;

    const handleKeypad = (val) => {
        if (val === 'CLEAR') setCashGivenStr('');
        else if (val === 'DEL') setCashGivenStr(prev => prev.slice(0, -1));
        else setCashGivenStr(prev => (prev === '0' ? val : prev + val));
    };

    const handleQuickAmount = (val) => {
        setCashGivenStr(val.toString());
    };

    const handleCashSubmit = () => {
        if (change < 0) {
            setError(`Insufficient payment.`);
            return;
        }
        onPaymentSuccess({ method: 'Cash', amountPaid: cashGivenNum, change: change });
    };

    const simulatePayment = (methodName) => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            // BUG FIX: Wrap the data in an object here too!
            onPaymentSuccess({ method: methodName, amountPaid: total, change: 0 });
        }, 2000);
    };

    // --- MAIN PAYMENT SELECTION SCREEN ---
    if (!method) {
        return (
            <div className="payment-screen">
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#2b3924' }}>Please select your preferred payment method</h2>
                    <div style={{ textAlign: 'right', backgroundColor: '#fafbf9', padding: '15px 30px', borderRadius: '15px', border: '2px solid #e5e7eb' }}>
                        <p style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase' }}>Amount Due</p>
                        <p style={{ fontSize: '2.2rem', color: '#4b5320', fontWeight: 'bold' }}>{formatCurrency(total)}</p>
                    </div>
                </div>

                <p style={{ width: '100%', textAlign: 'left', color: '#6b7280', fontSize: '1.2rem', marginBottom: '20px' }}>Tap one of the options below.</p>

                {/* UI FIX: Cleanly stacked button text */}
                <div className="payment-methods">
                    <button onClick={() => setMethod('cash')}>
                        <img src="/cash.png" alt="Cash" style={{ width: '100px', height: '100px', marginBottom: '15px', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                        <span style={{ display: 'block', fontSize: '1.5rem', color: '#2b3924', marginBottom: '8px' }}>CASH</span>
                        <span style={{ display: 'block', fontSize: '1rem', color: '#6b7280', fontWeight: 'normal', lineHeight: '1.4' }}>Enter exact amount or change will be given.</span>
                    </button>
                    <button onClick={() => setMethod('qr')}>
                        <img src="/gcash.png" alt="GCash" style={{ width: '100px', height: '100px', marginBottom: '15px', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                        <span style={{ display: 'block', fontSize: '1.5rem', color: '#2b3924', marginBottom: '8px' }}>GCASH / QR</span>
                        <span style={{ display: 'block', fontSize: '1rem', color: '#6b7280', fontWeight: 'normal', lineHeight: '1.4' }}>Scan with your supported e-wallet app.</span>
                    </button>
                    <button onClick={() => setMethod('card')}>
                        <img src="/card.png" alt="Card" style={{ width: '100px', height: '100px', marginBottom: '15px', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                        <span style={{ display: 'block', fontSize: '1.5rem', color: '#2b3924', marginBottom: '8px' }}>CREDIT / DEBIT</span>
                        <span style={{ display: 'block', fontSize: '1rem', color: '#6b7280', fontWeight: 'normal', lineHeight: '1.4' }}>Tap, insert, or swipe your card.</span>
                    </button>
                </div>

                {/* Big Back Button */}
                <button
                    onClick={onCancel}
                    style={{ alignSelf: 'flex-start', marginTop: '40px', padding: '15px 40px', fontSize: '1.2rem', backgroundColor: 'white', border: '2px solid #d1d5db', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', color: '#374151' }}
                >
                    ← Back to Order
                </button>
            </div>
        );
    }

    // --- INDIVIDUAL PAYMENT SCREENS ---
    return (
        <div className="payment-screen">
            <h2 style={{ fontSize: '2.5rem', color: '#2b3924', marginBottom: '10px' }}>
                {method === 'cash' ? 'Thank you. Please insert your cash.' : method === 'qr' ? 'Thank you. Please scan the QR code.' : 'Thank you. Please insert or tap your card.'}
            </h2>
            <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>Amount Due: <strong style={{ color: '#4b5320' }}>{formatCurrency(total)}</strong></p>

            {method === 'cash' && (
                <div className="custom-cash-layout">
                    {/* Left Panel: Summary & Quick amounts */}
                    <div className="cash-summary-panel">
                        <div className="summary-box">
                            <span className="summary-label">Total Amount</span>
                            <span className="summary-value">{formatCurrency(total)}</span>
                        </div>
                        
                        <div className="summary-box active-box">
                            <span className="summary-label">Amount Paid</span>
                            <span className="summary-value large-value">
                                {cashGivenStr ? formatCurrency(parseFloat(cashGivenStr)) : '₱0.00'}
                            </span>
                        </div>

                        <div className="quick-amounts">
                            <p>Quick Amounts</p>
                            <div className="quick-buttons">
                                <button onClick={() => handleQuickAmount(total)}>Exact</button>
                                <button onClick={() => handleQuickAmount(200)}>₱200</button>
                                <button onClick={() => handleQuickAmount(500)}>₱500</button>
                                <button onClick={() => handleQuickAmount(1000)}>₱1000</button>
                            </div>
                        </div>

                        <div className={`change-box ${change >= 0 ? 'valid' : ''}`}>
                            <div>
                                <span className="summary-label">Change</span>
                                {change >= 0 && <span className="change-subtext">{formatCurrency(cashGivenNum)} - {formatCurrency(total)}</span>}
                            </div>
                            <span className="summary-value change-value">
                                {change >= 0 ? formatCurrency(change) : 'Insufficient'}
                            </span>
                        </div>
                    </div>

                    {/* Right Panel: Numpad & Actions */}
                    <div className="cash-numpad-panel">
                        <div className="numpad-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                <button key={num} onClick={() => handleKeypad(num.toString())}>{num}</button>
                            ))}
                            <button className="numpad-action" onClick={() => handleKeypad('CLEAR')}>Clear</button>
                            <button onClick={() => handleKeypad('0')}>0</button>
                            <button className="numpad-action" onClick={() => handleKeypad('DEL')}>⌫</button>
                        </div>

                        <button 
                            className="primary pay-now-btn" 
                            disabled={change < 0}
                            onClick={handleCashSubmit}
                        >
                            Pay Now
                        </button>

                        <button className="change-method-btn" onClick={() => { setMethod(null); setCashGivenStr(''); }}>
                            ← Change Payment Method
                        </button>
                    </div>
                </div>
            )}

            {method === 'qr' && (
                <div className="qr-payment" style={{ alignItems: 'center' }}>
                    <div className="qr-placeholder" style={{ marginBottom: '20px', overflow: 'hidden' }}>
                        <img src="/qr.png" alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '1.2rem' }}>Scan the QR code using your GCash app.</p>
                    <button className="primary" disabled={isProcessing} onClick={() => simulatePayment('QR Code')}>
                        {isProcessing ? 'Confirming...' : 'Confirm Payment'}
                    </button>
                </div>
            )}

            {method === 'card' && (
                <div className="card-payment" style={{ alignItems: 'center' }}>
                    <img src="/card.png" alt="Insert Card" style={{ width: '150px', marginBottom: '30px', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                    <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '1.2rem' }}>Please tap, insert, or swipe your card at the reader.</p>
                    <button className="primary" disabled={isProcessing} onClick={() => simulatePayment('Credit/Debit Card')}>
                        {isProcessing ? 'Processing payment...' : 'Process Payment'}
                    </button>
                </div>
            )}

            {method !== 'cash' && (
                <button
                    onClick={() => { setMethod(null); setError(''); setCashGivenStr(''); }}
                    style={{ marginTop: '50px', padding: '15px 40px', fontSize: '1.2rem', backgroundColor: 'white', border: '2px solid #d1d5db', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', color: '#374151' }}
                >
                    ← Change Payment Method
                </button>
            )}
        </div>
    );
}
