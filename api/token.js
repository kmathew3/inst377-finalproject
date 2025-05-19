const axios = require('axios');

const clientId = 'inst377project-2432612430342451787045775264776b77592e65323336424250464375616739583835336e31443530726e544a4732377a4b30345865452e737471611037989340326762935';
const clientSecret = 'E0k5pe9aYD9uUjf7ybcXteicEnN0cHVLQNNfg7U5';

const getToken = async () => {
  const credentials = `${clientId}:${clientSecret}`;
  const base64Creds = Buffer.from(credentials).toString('base64');

  try {
    const response = await axios.post(
      'https://api.kroger.com/v1/connect/oauth2/token',
      'grant_type=client_credentials&scope=product.compact',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${base64Creds}`
        }
      }
    );

    console.log('Access Token:', response.data.access_token);
  } catch (error) {
    console.error('Error getting token:', error.response?.data || error.message);
  }
};

getToken();