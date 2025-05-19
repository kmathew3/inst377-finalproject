import requests

# Your Kroger credentials
client_id = 'inst377project-2432612430342451787045775264776b77592e65323336424250464375616739583835336e31443530726e544a4732377a4b30345865452e737471611037989340326762935'  # Replace with your client ID
client_secret = 'E0k5pe9aYD9uUjf7ybcXteicEnN0cHVLQNNfg7U5'  # Replace with your client secret

# The OAuth2 token URL for Kroger
url = 'https://api.kroger.com/v1/connect/oauth2/token'

# Prepare the data for the request
data = {
    'grant_type': 'client_credentials',  # Use client_credentials for server-to-server access
    'client_id': client_id,
    'client_secret': client_secret,
    'scope': 'product.compact'  # Scope of access you need (adjust based on your needs)
}

# Make the POST request to get the access token
response = requests.post(url, data=data)

# Parse the JSON response
print("Status Code:", response.status_code)
print("Response Text:", response.text)

try:
    token_data = response.json()
    access_token = token_data.get('access_token')
    print(f'Access Token: {access_token}')
except Exception as e:
    print("Error parsing JSON:", e)

# Extract the access token
access_token = token_data.get('access_token')

# Print the access token
print(f'Access Token: {access_token}')