
// โหลดข้อมูล weather.json แล้วสร้าง dropdown กับแสดงข้อมูล
fetch("weather.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("weather-list");
    const select = document.getElementById("province-select");

    if (!data.length) {
      container.innerHTML = "<p>ยังไม่มีข้อมูล</p>";
      return;
    }

    // ฟังก์ชันอัพเดตเวลาไทย
function updateThaiTime() {
  const timeElement = document.getElementById("time-thai");
  if (!timeElement) return;

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // เวลา UTC
  const thaiOffset = 7 * 60 * 60000; // UTC+7 เป็นมิลลิวินาที
  const thaiTime = new Date(utc + thaiOffset);

  const hours = String(thaiTime.getHours()).padStart(2, "0");
  const minutes = String(thaiTime.getMinutes()).padStart(2, "0");
  const seconds = String(thaiTime.getSeconds()).padStart(2, "0");

  timeElement.textContent = `🕒 เวลาไทย: ${hours}:${minutes}:${seconds}`;
}

// เรียกอัพเดตเวลา ทุก 1 วินาที
setInterval(updateThaiTime, 1000);
updateThaiTime();


// โหลดข้อมูล weather.json แล้วสร้าง dropdown กับแสดงข้อมูล
fetch("weather.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("weather-list");
    const select = document.getElementById("province-select");

    if (!data.length) {
      container.innerHTML = "<p>ยังไม่มีข้อมูล</p>";
      return;
    }

    // สร้าง dropdown จังหวัดไม่ซ้ำ
    const provinces = [...new Set(data.map((item) => item.city))].sort();
    provinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province;
      option.textContent = province;
      select.appendChild(option);
    });

    // ฟังก์ชันแสดงข้อมูลสภาพอากาศ
    function render(list) {
      if (!list.length) {
        container.innerHTML = "<p>ไม่พบข้อมูลจังหวัดนี้</p>";
        return;
      }
      container.innerHTML = list
        .map(
          (item) => `
        <div class="weather-card">
          <h3>${item.city}</h3>
          <p>🌡 อุณหภูมิ: ${item.temp}°C</p>
          <p>☁️ สภาพอากาศ: ${item.condition}</p>
        </div>
      `
        )
        .join("");
    }

    // แสดงข้อมูลทั้งหมดตอนโหลดหน้า
    render(data);

    // กดเลือกจังหวัดใน dropdown
    select.addEventListener("change", () => {
      const selected = select.value;
      if (selected === "all") {
        render(data);
      } else {
        render(data.filter((item) => item.city === selected));
      }
    });
  })
  .catch(() => {
    document.getElementById("weather-list").innerHTML =
      "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
  });


    // สร้าง dropdown จังหวัดไม่ซ้ำ
    const provinces = [...new Set(data.map((item) => item.city))].sort();
    provinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province;
      option.textContent = province;
      select.appendChild(option);
    });

    // ฟังก์ชันแสดงข้อมูลสภาพอากาศ
    function render(list) {
      if (!list.length) {
        container.innerHTML = "<p>ไม่พบข้อมูลจังหวัดนี้</p>";
        return;
      }
      container.innerHTML = list
        .map(
          (item) => `
        <div class="weather-card">
          <h3>${item.city}</h3>
          <p>🌡 อุณหภูมิ: ${item.temp}°C</p>
          <p>☁️ สภาพอากาศ: ${item.condition}</p>
        </div>
      `
        )
        .join("");
    }

    // แสดงข้อมูลทั้งหมดตอนโหลดหน้า
    render(data);

    // กดเลือกจังหวัดใน dropdown
    select.addEventListener("change", () => {
      const selected = select.value;
      if (selected === "all") {
        render(data);
      } else {
        render(data.filter((item) => item.city === selected));
      }
    });
  })
  .catch(() => {
    document.getElementById("weather-list").innerHTML =
      "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
  });
