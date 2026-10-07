# GGCampus Store POS Kiosk

## Project Description
A modern, touchscreen-friendly Point-of-Sale (POS) Kiosk web application built for the IT415 practical examination. Designed to be intuitive and realistic for a campus food and merchandise outlet.

## Objectives
- Build a responsive, touchscreen-optimized kiosk interface.
- Implement robust state management for a shopping cart (add, increase, decrease, remove).
- Simulate payment methods (Cash, QR, Credit/Debit) with strict input validation.
- Demonstrate modern development practices including GitHub workflow, feature branching, pull requests, and AI-assisted development documentation.

## Features
- **Product Selection:** Grid of realistic campus products with tap-to-add functionality.
- **Cart Management:** Real-time order summary with quantity adjustments and removals.
- **Order Review:** Dedicated review screen summarizing the subtotal and total cost.
- **Payment Processing:** Support for Cash (with change calculation), simulated QR Pay, and simulated Card payments.
- **Strict Input Validation:** Rejects empty carts, insufficient cash, blank cash, and negative cash amounts.
- **Receipt Generation:** Generates a unique, persistent transaction number (e.g., TXN-20261008-034) with full transaction details.
- **New Transaction Reset:** Securely clears all cart and payment states for the next user.

## Technology Used
- **Framework:** Next.js (App Router)
- **Language:** JavaScript
- **Styling:** Custom CSS (No Tailwind, No external UI libraries)
- **Deployment:** Vercel

## Installation & How to Run
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Navigate into the project folder:
   ```bash
   cd IT415_POSkiok-Capote-Corpuz-Menoza
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

## POS Transaction Flow
1. **Order:** Select items from the product grid to add them to the cart. Adjust quantities or remove items as needed.
2. **Review:** Review the order and total.
3. **Payment:** Select a payment method (Cash, QR, Card). Enter sufficient cash or simulate payment.
4. **Receipt:** View the final receipt with a unique transaction number. Tap "New Transaction" to reset the kiosk.

## Payment Methods
- **Cash:** Requires the user to enter an amount equal to or greater than the total. Calculates change automatically. Rejects insufficient amounts.
- **QR:** Displays a QR code placeholder and simulates payment processing.
- **Credit/Debit:** Prompts the user to insert/tap a card and simulates a processing delay before completing the transaction.

## Git/GitHub Workflow
This project strictly followed a professional collaborative workflow:
- Development took place on designated feature branches (`feature/ui-layout`, `feature/payment-processing`, `feature/bug-fixes`, etc.).
- Code was pushed to GitHub and merged via Pull Requests (PRs).
- PRs were reviewed by team members before merging into the `main` branch.

## AI-Assisted Development
Artificial Intelligence was used to bootstrap the initial Next.js foundation, generate CSS styling for the custom touchscreen interface, diagnose real state-management bugs, and guide refactoring. 
*See `docs/AI_DOCUMENTATION.md` for a complete log of AI prompts, evaluations, and modifications.*

## Team Members & Contributions
- **Menoza, A. / Capote, J. / Corpuz, H.**
  - **M1:** Responsible for UI Layout, Product Selection, Touchscreen Interface, Cart, and Order Summary (`feature/ui-layout`).
  - **M2:** Responsible for Payment Processing (Cash, QR, Card), Input Validation, and Receipt Generation (`feature/payment-processing`, `feature/input-validation`).
  - **M3:** Responsible for Quality Assurance, Bug Fixes (Transaction Number Persistence), Refactoring (`lib/utils.js`), and Documentation (`feature/bug-fixes`, `feature/refactoring`, `feature/documentation`).

## Deployment
This application is deployed live on Vercel at:
[Insert Live Vercel Link Here]
