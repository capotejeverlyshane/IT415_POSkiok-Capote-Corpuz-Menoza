export default function Receipt({ cart, total, paymentDetails, onNewTransaction }) {
    return (
        <div className="receipt-screen">
            <h2 style={{ color: '#4b5320', marginBottom: '10px' }}>Thank you for your purchase!</h2>
            <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '30px' }}>Your transaction was successful. Please take your receipt below.</p>
            <div className="receipt">
                <h3 style={{ textAlign: 'center', marginBottom: '5px' }}>GGCampus Store</h3>
                <p style={{ textAlign: 'center', marginBottom: '20px', color: '#64748b' }}>Official Receipt</p>
                <p>Txn: {paymentDetails.transactionNumber}</p>
                <p>Date: {paymentDetails.date}</p>
                <hr />
                <div className="receipt-items">
                    {cart.map((item, idx) => (
                        <div key={idx} className="receipt-item">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <hr />
                <p className="receipt-total"><strong>Total: ₱{total.toFixed(2)}</strong></p>
                <p>Payment Method: {paymentDetails.method}</p>
                <p>Amount Paid: ₱{paymentDetails.amountPaid.toFixed(2)}</p>
                <p>Change: ₱{paymentDetails.change.toFixed(2)}</p>
            </div>
            <button className="proceed-btn" onClick={onNewTransaction}>New Transaction</button>
        </div>
    );
}
