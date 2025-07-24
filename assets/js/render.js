// แสดงเวลาไทยแบบอัพเดตทุกวินาที
function updateThaiTime() {
  const now = new Date();
  const timeOptions = {
    timeZone: 'Asia/Bangkok',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const timeString = now.toLocaleTimeString('th-TH', timeOptions);
  document.getElementById('time-thai').textContent = `🕒 เวลาไทย: ${timeString}`;
}

// เรียกฟังก์ชันอัพเดตเวลา และตั้งให้มันอัพเดตทุก 1 วิ
updateThaiTime();
setInterval(updateThaiTime, 1000);

// โหลดข้อมูล weather.json พร้อมระบบเลือกจังหวัด
fetch('weather.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('weather-list');
    const select = document.getElementById('province-select');

    if (!data.length) {
      container.innerHTML = '<p>ยังไม่มีข้อมูล</p>';
      return;
    }

    // สร้าง dropdown จังหวัด (ไม่ซ้ำและเรียง)
    const provinces = [...new Set(data.map(item => item.city))].sort();
    provinces.forEach(province => {
      const option = document.createElement('option');
      option.value = province;
      option.textContent = province;
      select.appendChild(option);
    });

    // ฟังก์ชันแสดงข้อมูล
    function render(list) {
      if (!list.length) {
        container.innerHTML = '<p>ไม่พบข้อมูลจังหวัดนี้</p>';
        return;
      }
      container.innerHTML = list.map(item => `
        <div class="weather-card">
          <h3>${item.city}</h3>
          <p>🌡 อุณหภูมิ: ${item.temp}°C</p>
          <p>☁️ สภาพอากาศ: ${item.condition}</p>
        </div>
      `).join('');
    }

    // แสดงทั้งหมดตอนเริ่ม
    render(data);

    // เมื่อเลือกจังหวัด ให้แสดงข้อมูลกรอง
    select.addEventListener('change', () => {
      const selected = select.value;
      if (selected === 'all') {
        render(data);
      } else {
        render(data.filter(item => item.city === selected));
      }
    });
  })
  .catch(() => {
    document.getElementById('weather-list').innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
  });
