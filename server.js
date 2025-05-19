const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

const BASE_URL = 'https://api.kroger.com/v1/products';
const TOKEN_URL = 'https://api.kroger.com/v1/connect/oauth2/token';

app.use(express.static(path.join(__dirname, 'public')));

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function getAccessToken() {
    try {
        const response = await axios.post(
            TOKEN_URL,
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.KROGER_CLIENT_ID,
                client_secret: process.env.KROGER_CLIENT_SECRET,
                scope: 'product.compact',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        console.log('Access token:', response.data.access_token); // Debugging line

        return response.data.access_token;
    } catch (err) {
        console.error('Failed to get token:', err.response?.data || err.message);
        throw new Error('Unable to retrieve access token');
    }
}

async function fetchKrogerData(params) {
  const token = await getAccessToken();

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Kroger data:', error.response?.data || error.message);
    throw new Error('Failed to fetch data from Kroger API');
  }
}

app.get('/api/featured', async (req, res) => {
    try {
        const featuredData = await fetchKrogerData({ 'filter.term': 'milk', 'filter.limit': 5 });

        console.log(featuredData);

        if (featuredData && featuredData.data) {
            res.json(featuredData.data);
        } else {
            res.status(500).json({ error: 'Featured products not available' });
        }
    } catch (error) {
        console.error('Error fetching featured data:', error);
        res.status(500).json({ error: 'Failed to load featured products' });
    }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.query || 'milk';

  try {
    const searchData = await fetchKrogerData({
      'filter.term': query,
      'filter.limit': 10,
      'filter.locationId': '01400943'
    });

    res.json(searchData);
  } catch (error) {
    console.error('Kroger API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q || 'milk';
  const accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJpbnN0Mzc3cHJvamVjdC0yNDMyNjEyNDMwMzQyNDUxNzg3MDQ1Nzc1MjY0Nzc2Yjc3NTkyZTY1MzIzMzM2NDI0MjUwNDY0Mzc1NjE2NzM5NTgzODM1MzM2ZTMxNDQzNTMwNzI2ZTU0NGE0NzMyMzc3YTRiMzAzNDU4NjU0NTJlNzM3NDcxNjExMDM3OTg5MzQwMzI2NzYyOTM1IiwiZXhwIjoxNzQ3NjE3MjExLCJpYXQiOjE3NDc2MTU0MDYsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiMDJjM2FhMGMtMGY3Zi01ZWM4LWFjNGMtNWQzMTk1MzEwNGI5Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3NDc2MTU0MTE3NDIyMzU1ODAsImF6cCI6Imluc3QzNzdwcm9qZWN0LTI0MzI2MTI0MzAzNDI0NTE3ODcwNDU3NzUyNjQ3NzZiNzc1OTJlNjUzMjMzMzY0MjQyNTA0NjQzNzU2MTY3Mzk1ODM4MzUzMzZlMzE0NDM1MzA3MjZlNTQ0YTQ3MzIzNzdhNGIzMDM0NTg2NTQ1MmU3Mzc0NzE2MTEwMzc5ODkzNDAzMjY3NjI5MzUifQ.MERr6yNnGzeZvazhajPu50QpFXxwW3Yghl91lEkI_GsdW0BisiMzh3I8fUOWsGXBDUfunLnj_2bmOUhlkotlhXXFni7SEsM1nD1vVTWoBQPhvwrUFS88xsqhfclFVWPaxDvOELL7OqEGwh_cvwSJ8h6HVRDas7z9-zdLM2ZxoMycngwiXEb0Y7obHrMuI8FmAvEkon9_SGq4RYVZ3XFiX22FX46Yqxw7eLiDXGhaQiHJ6NfQO4JSSV3TF5vV0ggpIPKv-NLm8ek94wixQt-pubVCsn3mOhY-96ZBbp0jHXfBIVxjWahpZm_y44aDtlqFi3zReoQUzdTyDHQ-agicfw'; // dynamically set this in real apps
  const locationId = '01400943';

  try {
    const response = await fetch(`https://api.kroger.com/v1/products?filter.term=${query}&filter.locationId=${locationId}&filter.limit=10`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },

    params: {
        'filter.term': query,
        'filter.locationId': locationId,
        'filter.limit': 10,
      },
    });

    console.log('Full API response:', JSON.stringify(response.data, null, 2));

    if (response.data && response.data.data) {
      const products = response.data.data.map(product => ({
        name: product.product_name,
        price: product.price || 'Price not available',
        availability: product.product_availability || 'Not available',
        aisle: product.aisle_location || 'Not available',
      }));

      console.log('Products with prices, availability, and aisle locations:', products);

      res.json(products);
    } else {
      res.status(500).json({ error: 'No product data available' });
    }
  } catch (error) {
    console.error('Kroger API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

app.use(express.json());

app.post('/api/order', async (req, res) => {
  const { items, locationId, deliveryMethod } = req.body;

  if (!items || !locationId || !deliveryMethod) {
    return res.status(400).json({ error: 'Missing order fields' });
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          items,
          location_id: locationId,
          delivery_method: deliveryMethod,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      orderId: data[0].id,
      message: 'Order saved successfully!'
    });
  } catch (err) {
    console.error('Error inserting order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

app.get('/api/order', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('order')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error('Error retrieving orders:', err.message);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});