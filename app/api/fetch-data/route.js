import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('http://192.168.236.9:56972/predict');
    return new Response(response.data, { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
