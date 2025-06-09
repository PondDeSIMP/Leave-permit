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
    if (location.hash === "#login" || location.hash === "") {
      location.hash = "#form";
    }
  } else {
    logoutBtn.style.display = "none";
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

  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const reason = document.getElementById("reason").value.trim();

  if (!name || !type || !date || !reason) {
    alert("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  const templateParams = {
    username: name,
    leave_type: type,
    leave_date: date,
    leave_reason: reason,
  };

  emailjs
    .send("service_k0ij3gg", "template_dt4ti1n", templateParams)
    .then(
      (response) => {
        alert("✅ ส่งใบลาสำเร็จ");
        document.getElementById("leaveForm").reset();
      },
      (error) => {
        alert("❌ เกิดข้อผิดพลาดในการส่งเมล");
        console.error("EmailJS error:", error);
      }
    );
});
