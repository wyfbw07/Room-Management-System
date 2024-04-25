// pages/api/sensors.js
export default async function handler(req, res) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
  
    try {
      const authBuffer = Buffer.from(`${apiKey}:${apiSecret}`);
      const base64Auth = authBuffer.toString('base64');
  
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Basic ${base64Auth}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  