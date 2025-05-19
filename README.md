# Kroger Web App

# Project Description
This web application helps users find, browse, and plan their grocery shopping using real-time product data from the Kroger public API. It includes featured deals, categorized navigation, dynamic search, and order customization through available delivery/pickup options.

# Target Browsers
- Chrome (Desktop)

# Developer Manual Link
See the [Developer Manual](#-developer-manual) below for  setup, API usage, and documentation.

# Developer Manual

# Installation & Setup
1. Clone the repo:
   git clone https://github.com/YOUR_USERNAME/kroger-deals.git
   cd kroger-deals
2. Install Dependencies
    npm install
3. Set Variables
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_anon_key
    KROGER_CLIENT_ID=your_kroger_client_id
    KROGER_CLIENT_SECRET=your_kroger_client_secret
4. Run Locally
    npm run dev
5. Run Tests
    npm run test

# API Overview
GET /api/products?term=milk
 - fetches a list of Kroger products matching this search term
 - uses Kroger's filter.term endpoint
 - returns: Array<Product>

GET /api/product/:id
 - retrieves informations for a single product by product ID
 - uses Kroger's /productId endpoint
 - returns: ProductDetails

POST /api/order
 - accepts a list of selected products, delivery preferences, and location ID
 - stores the data in Supabase
 - return example: {
  "items": [
    { "productId": "0001111005190", "quantity": 2 }
  ],
  "delivery": "curbside",
  "locationId": "70600092"
}


# Page Descriptions
 - Home Page (contains data on featured Kroger products that will be applicable for a certain week’s deals within category-based navigation that will lead you to various products on the main website.)
 - Order Page (contains data of listed, popular products for selection/combination when adding to your cart, as well as specifications like name and brand)
 - Search Page (contains up to 10 returned data results that align with the specified search made by the user and options to proceed to purchase as well as price and availabilty)
 - Promo Page (contains a list of weekly available promos and their price deductions on certain products)

# Known Bugs and Limitations
 - some products do not return price or stockLevel data
 - if no stores are available for a product, location reliant results may not display correctly
 - the Kroger API has rate limits that impact constant usage

# Roadmap for Future Development
- add a saved shopping cart with Supabase you can return to
- add filters for product searches
- improve the output for empty searches
- implement real-time promo deals