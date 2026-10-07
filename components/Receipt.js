export default function Receipt({ cart, total, paymentDetails, onNewTransaction }) {
    // Generates a unique transaction number like TXN-20261008-592
    const d = new Date();
    const dateStr = `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
    const transactionNumber = `TXN-${dateStr}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    return (
        <div className="receipt-screen">
            <h2>PAYMENT SUCCESSFUL</h2>
            <div className="receipt">
                <h3>CAMPUS STORE POS</h3>
                <p>Receipt</p>
                <p>Txn: {transactionNumber}</p>
                <p>Date: {d.toLocaleString()}</p>
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
