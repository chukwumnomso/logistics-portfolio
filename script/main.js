const myNav = document.getElementById("myNav");
const navBar = document.getElementById("navBar");
const closeBar = document.getElementById("close");
const myBtn = document.getElementById("trackBtn");
const backToTop = document.getElementById("to-top");

function toTop() {
  window.scrollTo({
    top: 30,
    behavior: "smooth",
  });
}
function track() {
  const track = prompt("enter your unique code");
  if (track === "200496") {
    alert("successfully tracked");
  } else {
    alert("wrong code");
  }
}

function showNav() {
  myNav.style.display = "flex";
}
function closeNav() {
  myNav.style.display = "none";
}

if (myBtn) {
  myBtn.addEventListener("click", track);
} else {
}

navBar.addEventListener("click", showNav);
closeBar.addEventListener("click", closeNav);
myNav.addEventListener("click", closeNav);
backToTop.addEventListener("click", toTop);
