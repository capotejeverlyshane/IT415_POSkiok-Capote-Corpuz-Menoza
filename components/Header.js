export default function Header({ currentView }) {
    return (
        <header className="header">
            {/* Logo and Title Container */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
                <img src="/logo.jpg" alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <h1 style={{ margin: 0 }}>GGCampus Store</h1>
            </div>

            {/* Dynamic Progress Tabs */}
            <div className="header-tabs">
                <span className={currentView === 'selection' ? 'active' : ''}>
                    {['review', 'payment', 'receipt'].includes(currentView) ? '✓ Order' : '1 Order'}
                </span>
                <span className={currentView === 'review' ? 'active' : ''}>
                    {['payment', 'receipt'].includes(currentView) ? '✓ Review' : '2 Review'}
                </span>
                <span className={currentView === 'payment' ? 'active' : ''}>
                    {currentView === 'receipt' ? '✓ Payment' : '3 Payment'}
                </span>
                <span className={currentView === 'receipt' ? 'active' : ''}>
                    4 Receipt
                </span>
            </div>
        </header>
    );
}
