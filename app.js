const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

function showSection(id) {
  sections.forEach((sec) => {
    sec.style.display = sec.id === id ? "block" : "none";
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

window.addEventListener("hashchange", () => {
  const section = location.hash.replace("#", "") || "form";
  showSection(section);
});

showSection(location.hash.replace("#", "") || "form");

document.getElementById("leaveForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const reason = document.getElementById("reason").value;

  fetch(
    "https://script.google.com/a/macros/tni.ac.th/s/AKfycbya_BHvpSWn6S4JKuNMn0yOazYeE_NmbXG_uqg0N6m9e2RJtSO7rI8WNepXiWxnfRzr6Q/exec",
    {
      method: "POST",
      body: JSON.stringify({ name, type, date, reason }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.text())
    .then((response) => {
      if (response === "OK") {
        alert("✅ ส่งใบลาสำเร็จ");
        document.getElementById("leaveForm").reset();
      } else {
        alert("❌ เกิดข้อผิดพลาดในการส่งใบลา");
      }
    })
    .catch((error) => {
      alert("❌ การเชื่อมต่อผิดพลาด");
      console.error(error);
    });
});
