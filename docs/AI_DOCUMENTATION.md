# AI Development Documentation

## AI Prompt 1 — Initial Project Setup

### Prompt
> I am developing a touchscreen Point-of-Sale (POS) Kiosk application for an IT415 practical examination using Next.js App Router and JavaScript.
> The application must be simple, touchscreen-friendly, and suitable for a campus food and merchandise outlet.
> Create the initial project foundation only.
> Requirements: Use JavaScript and Next.js App Router. Do not use Tailwind CSS. Do not use external UI libraries. Prepare product data for exactly six products (Coffee, Sandwich, Soft Drink, Cookies, Bottled Water, Chocolate). Use Philippine peso prices. Prepare clean global CSS for a modern touchscreen kiosk interface. Do not implement payment or unrelated features yet.

### AI Response
The AI generated the basic file structure, created `page.js` with basic state management, provided the array of 6 products, and set up initial CSS styles in `globals.css`. 

### Evaluation
The generated structure was functional and accurately met the constraint of not using Tailwind or external libraries. However, the initial design was too generic and simple.

### Modification Made
The team heavily modified the `globals.css` to implement a highly custom, unique Army Green aesthetic, including a glassmorphic header and a custom "Review Ticket" layout that didn't look like a standard HTML table.

### Final Result
A clean, functioning Next.js foundation with a beautiful and unique starting layout.

---

## AI Prompt 2 — Custom Numpad Interface

### Prompt
> why a dropdown? the second image is the example but do not copy. make sure the system is unique, modern

### AI Response
The AI acknowledged that using a standard HTML `<input type="number">` creates a bad user experience on a kiosk (showing tiny spinner arrows and invoking the native device keyboard). It replaced the native input with a custom React state and built a large, touch-friendly on-screen numeric keypad alongside "Quick Cash" buttons.

### Evaluation
The logic for the on-screen keypad was excellent and perfectly addressed the kiosk UX requirement. The dual-panel design provided a professional look without directly copying the reference material.

### Modification Made
Adjusted the CSS padding and hover states slightly to perfectly match the team's Army Green aesthetic (`globals.css`). 

### Final Result
A fully functional, touch-optimized cash payment screen with a custom numpad and dynamic change calculation.

---

## AI Prompt 3 — Diagnosing State Bug (Stage 5 Real Bug Fix)

### Prompt
> (Internal Team Analysis triggered by QA) 
> Observed: When the receipt screen re-renders, the transaction number (TXN-...) changes dynamically on the screen.
> Expected: A transaction number should remain constant for a specific purchase.

### AI Response
The AI identified that `Math.random()` and `new Date()` were being called directly inside the render cycle of the `Receipt.js` component. It suggested generating the transaction number once inside the `handlePaymentSuccess` function in `page.js` and passing it securely into the payment details state.

### Evaluation
The AI correctly pinpointed the React re-render lifecycle issue. Generating IDs in the render function is a well-known React anti-pattern.

### Modification Made
Moved the transaction generation logic into `page.js` when the user clicks "Pay Now" or "Confirm Payment". Passed it via the `paymentDetails` state to the `Receipt` component.

### Final Result
The transaction number is now securely generated once upon successful payment and correctly persists across any React re-renders on the receipt screen.

---

## AI Prompt 4 — Refactoring Currency (Stage 6)

### Prompt
> (Internal Team Analysis) We are duplicating the logic `₱${parseFloat(amount).toFixed(2)}` across almost every component.

### AI Response
The AI extracted this logic into a utility file (`lib/utils.js`) with an exported `formatCurrency` function, and updated all components (`ItemSelection`, `OrderSummary`, `PaymentScreen`, `Receipt`) to import and use it.

### Evaluation
This was a straightforward and highly effective refactor that drastically cleaned up the JSX.

### Modification Made
None required. The refactoring was directly implemented.

### Final Result
Cleaner code with a single source of truth for currency formatting, fully satisfying the Stage 6 Refactoring requirement.
