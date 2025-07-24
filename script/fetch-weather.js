const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const provinces = [
  'Bangkok', 'Chiang Mai', 'Khon Kaen', 'Phuket', 'Nonthaburi',
  'Nakhon Ratchasima', 'Udon Thani', 'Surat Thani', 'Chonburi',
  'Nakhon Si Thammarat'
];

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=th`;
  const res = await axios.get(url);
  return {
    city,
    temp: res.data.main.temp,
    condition: res.data.weather[0].description
  };
}

(async () => {
  const results = [];
  for (const city of provinces) {
    try {
      const data = await fetchWeather(city);
      results.push(data);
      console.log(`ดึงข้อมูลสำหรับ ${city} เรียบร้อย`);
    } catch (err) {
      console.error(`ไม่สามารถดึงข้อมูล ${city} ได้:`, err.message);
    }
  }

  fs.writeFileSync('weather.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('✅ อัพเดต weather.json เรียบร้อย');
})();
