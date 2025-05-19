import requests

client_id = 'inst377project-2432612430342451787045775264776b77592e65323336424250464375616739583835336e31443530726e544a4732377a4b30345865452e737471611037989340326762935'  # Replace with your client ID
client_secret = 'E0k5pe9aYD9uUjf7ybcXteicEnN0cHVLQNNfg7U5'

url = 'https://api.kroger.com/v1/connect/oauth2/token'

data = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
    'scope': 'product.compact'
}

response = requests.post(url, data=data)

print("Status Code:", response.status_code)
print("Response Text:", response.text)

try:
    token_data = response.json()
    access_token = token_data.get('access_token')
    print(f'Access Token: {access_token}')
except Exception as e:
    print("Error parsing JSON:", e)

access_token = token_data.get('access_token')

print(f'Access Token: {access_token}')