# RUBRA Café — Virtual Water Footprint Order System

A single-page, waiter-facing React application for selecting café orders and calculating their virtual water footprint.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the ZIP file.
2. Open the extracted `rubra-cafe` folder in VS Code.
3. Open the VS Code terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Build for production
```bash
npm run build
```

## Features
- Main Course, Desserts, and Drinks menus
- Checkbox selection and quantity controls
- Dynamic per-item and total water-footprint calculation
- Confirmation summary
- Edit Order and New Order actions
- Responsive maroon-and-gold design

## Menu and virtual water footprint values
### Main Course
- Veg Burger: 250 L
- Chicken Burger: 600 L
- Mutton Burger: 1,000 L
- Bowl of Rice: 600 L
- Veg Pizza: 200 L
- Chicken Pizza: 375 L
- Mutton Pizza: 600 L

### Desserts
- Chocolate: 825 L
- Cheesecake: 325 L
- Ice Cream Lollipop: 115 L

### Drinks
- Rose Milk: 260 L
- Mojito: 30 L
- Matcha: 24 L

The app is frontend-only. Orders are held in React state and are not saved to a database.
