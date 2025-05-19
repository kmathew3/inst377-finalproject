# API Documentation

This describes the API endpoints of the Kroger Web App.

## Base URL

Local Development:
http://localhost:3000/api

Production (Vercel):
https://inst377-finalproject-4hv8.vercel.app/

# API Endpoints Overview
 - GET `/api/products` returns a list of products based on a search term
 - GET `/api/product/:id` returns details about a specific product
 - POST `/api/order` submits a customer order to Supabase

# Endpoint: `GET /api/products`

Fetches a list of Kroger products that match a user-provided search term.

- term
- string
- required
- search keyword (e.g., "milk", "apple") |

# Example:
- GET /api/products?term=milk
- returns: [
  {
    "productId": "0001111005190",
    "description": "Kroger 2% Milk - 1 Gallon",
    "brand": "Kroger",
    "price": 2.99,
    "available": true,
    "delivery": true,
    "pickup": true,
    "inStore": true,
    "stockLevel": "In Stock"
  }
]

# Endpoint: `GET /api/product/:id`

Fetches details about a specific product by Kroger product ID.

- id
- string
- required
- Kroger product ID

# Example:
- GET /api/product/0001111005190
- returns: {
  "productId": "0001111005190",
  "description": "Kroger 2% Milk - 1 Gallon",
  "brand": "Kroger",
  "price": 2.99,
  "stockLevel": "In Stock",
  "available": true,
  "deliveryTypes": {
    "inStore": true,
    "pickup": true,
    "delivery": true,
    "shipToHome": false
  },
  "locations": ["70600092", "70600093"]
}

# Endpoint: `POST /api/order`
Accepts a cart and stores it in a Supabase table called orders.

# Example:
{
  "items": [
    {
      "productId": "0001111005190",
      "quantity": 2
    },
    {
      "productId": "0001111005460",
      "quantity": 1
    }
  ],
  "locationId": "70600092",
  "deliveryMethod": "curbside"
}

- returns: {
  "success": true,
  "orderId": "abcdef123456"
}

# Kroger Product API
URL: https://api.kroger.com/v1/products

# Endpoints:
- filter.term — search by keyword
- filter.brand — filter by brand
- /products/{id} — get full product details
- /locations — get store availability
- price, stockLevel, and delivery options

- OAuth2 credential authentication (client ID and secret)

# Error Handling

- `200 OK` — Successful request
- `400 Bad Request` — Missing or invalid query parameters
- `404 Not Found` — No product found for ID or search term
- `500 Internal Server Error` — Server or external API issue

Errors return a JSON response:
```json
{
  "error": "Invalid product ID",
  "message": "No product found for ID 'xyz'"
}