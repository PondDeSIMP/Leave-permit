const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");
const logoutBtn = document.getElementById("logoutBtn");

// แสดง section ตาม id
function showSection(id) {
  sections.forEach((sec) => {
    sec.style.display = sec.id === id ? "block" : "none";
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

// ตรวจสอบสถานะล็อกอิน
function checkLogin() {
  const user = localStorage.getItem("username");
  if (user) {
    logoutBtn.style.display = "inline-block";
    // ถ้า user อยู่หน้า login ให้เปลี่ยนเป็น form
    if (location.hash === "#login" || location.hash === "") {
      location.hash = "#form";
    }
  } else {
    logoutBtn.style.display = "none";
    // ถ้าไม่ล็อกอิน ให้ไปหน้า login เท่านั้น
    if (location.hash !== "#login") {
      location.hash = "#login";
    }
  }
}

// จับ event เปลี่ยน hash
window.addEventListener("hashchange", () => {
  const section = location.hash.replace("#", "") || "form";
  showSection(section);
  checkLogin();
});

// เริ่มต้น
showSection(location.hash.replace("#", "") || "form");
checkLogin();

// ฟอร์มล็อกอิน
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // ตัวอย่างตรวจสอบง่าย ๆ
  if (username === "user" && password === "1234") {
    localStorage.setItem("username", username);
    alert("✅ เข้าสู่ระบบสำเร็จ");
    location.hash = "#form";
  } else {
    alert("❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }
});

// ปุ่มออกจากระบบ
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("username");
  alert("✅ ออกจากระบบเรียบร้อย");
  location.hash = "#login";
});

// ฟอร์มส่งใบลา
document.getElementById("leaveForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = localStorage.getItem("username");
  if (!user) {
    alert("❌ กรุณาเข้าสู่ระบบก่อนส่งใบลา");
    location.hash = "#login";
    return;
  }

  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const reason = document.getElementById("reason").value;

  fetch(
    "https://script.google.com/macros/s/AKfycbya_BHvpSWn6S4JKuNMn0yOazYeE_NmbXG_uqg0N6m9e2RJtSO7rI8WNepXiWxnfRzr6Q/exec",
    {
      method: "POST",
      body: JSON.stringify({ name, type, date, reason }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      if (response.status === "OK") {
        alert("✅ ส่งใบลาสำเร็จ");
        document.getElementById("leaveForm").reset();
      } else {
        alert("❌ เกิดข้อผิดพลาดในการส่งใบลา");
        console.error("Response error:", response);
      }
    })
    .catch((error) => {
      alert("❌ การเชื่อมต่อผิดพลาด");
      console.error("Fetch error:", error);
    });
});