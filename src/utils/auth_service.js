import axios from "axios"
export default async function getToken(){
    const clientId = localStorage.getItem('CLIENT_ID')
    const clientSecret = localStorage.getItem('CLIENT_SECRET')
    const url = 'https://accounts.spotify.com/api/token';
    const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    try {
      const response = await axios.post(url, data, { headers });
      const token = response.data.access_token;
      localStorage.setItem('TOKEN', token)
    } catch (error) {
      console.error('Error al autenticar:', error);
      alert('Error al autenticar');
    }
  };