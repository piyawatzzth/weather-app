fetch('weather.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('weather-list');
    if (!data.length) {
      container.innerHTML = '<p>ยังไม่มีข้อมูล</p>';
      return;
    }
    container.innerHTML = data.map(item => `
      <div>
        <h3>${item.city}</h3>
        <p>อุณหภูมิ: ${item.temp}°C</p>
        <p>สภาพอากาศ: ${item.condition}</p>
      </div>
    `).join('');
  })
  .catch(() => {
    document.getElementById('weather-list').innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
  });
