/*
  KELLY LAUNDRY WEBSITE SETTINGS
  IMPORTANT: Replace the sample WhatsApp number below with the business number.
  Use international format without +, spaces or dashes. Example Nigeria: 2348012345678
*/
const LAUNDRY_WHATSAPP_NUMBER = "2348060757524";

const orderForm = document.getElementById("orderForm");
const serviceSelect = document.getElementById("serviceType");
const formError = document.getElementById("formError");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Set the earliest available date to today.
const preferredDate = document.getElementById("preferredDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
preferredDate.min = localToday;
document.getElementById("year").textContent = new Date().getFullYear();

function whatsappUrl(message) {
  return `https://wa.me/${LAUNDRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function isWhatsAppNumberConfigured() {
  return /^\d{10,15}$/.test(LAUNDRY_WHATSAPP_NUMBER) &&
         LAUNDRY_WHATSAPP_NUMBER !== "2348060757524";
}

function showWhatsAppSetupMessage() {
  alert("Please set Kelly Laundry's real WhatsApp number in script.js first. Find LAUNDRY_WHATSAPP_NUMBER near the top and replace the sample number.");
}

function setContactLinks() {
  const message = "Hello Kelly Laundry, I would like to ask about your laundry services.";
  const href = whatsappUrl(message);
  document.getElementById("contactWhatsApp").href = href;
  document.getElementById("floatingWhatsApp").href = href;
}
setContactLinks();

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

["contactWhatsApp", "floatingWhatsApp"].forEach(id => {
  document.getElementById(id).addEventListener("click", event => {
    if (!isWhatsAppNumberConfigured()) {
      event.preventDefault();
      showWhatsAppSetupMessage();
    }
  });
});

orderForm.addEventListener("submit", event => {
  event.preventDefault();
  formError.textContent = "";

  if (!orderForm.reportValidity()) return;
  if (!isWhatsAppNumberConfigured()) {
    showWhatsAppSetupMessage();
    return;
  }

  const data = {
    name: document.getElementById("customerName").value.trim(),
    phone: document.getElementById("customerPhone").value.trim(),
    service: serviceSelect.value,
    quantity: document.getElementById("quantity").value.trim() || "Not specified",
    date: preferredDate.value,
    address: document.getElementById("address").value.trim(),
    notes: document.getElementById("notes").value.trim() || "None"
  };

  const message = [
    "Hello Kelly Laundry! I'd like to place a laundry order.",
    "",
    `Name: ${data.name}`,
    `Customer phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Estimated quantity: ${data.quantity}`,
    `Preferred date: ${data.date}`,
    `Pickup/drop-off address: ${data.address}`,
    `Additional instructions: ${data.notes}`,
    "",
    "Please confirm the price and availability. Thank you."
  ].join("\n");

  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});
