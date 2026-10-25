// =====================================
// KELLY LAUNDRY WEBSITE JAVASCRIPT
// =====================================

// Business WhatsApp number
// International format: country code + number, without +
// Example: 2348012345678
const LAUNDRY_WHATSAPP_NUMBER = "2348060757524";

// Find website elements
const orderForm = document.getElementById("orderForm");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Support either version of the form's field IDs
const customerName = document.getElementById("customerName") ||
                     document.getElementById("name");

const customerPhone = document.getElementById("customerPhone") ||
                      document.getElementById("phone");

const serviceSelect = document.getElementById("service");

const quantityField = document.getElementById("quantity");

const preferredDate = document.getElementById("preferredDate") ||
                      document.getElementById("date");

const addressField = document.getElementById("address");

const instructionsField = document.getElementById("notes") ||
                          document.getElementById("instructions");

const formError = document.getElementById("formError");

// Check that the WhatsApp number is configured
function isWhatsAppNumberConfigured() {
    return /^\d{10,15}$/.test(LAUNDRY_WHATSAPP_NUMBER);
}

// Generate WhatsApp link
function whatsappUrl(message) {
    return "https://wa.me/" +
        LAUNDRY_WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);
}

// Open WhatsApp with a message
function openWhatsApp(message) {
    if (!isWhatsAppNumberConfigured()) {
        alert("Please check Kelly Laundry's WhatsApp number in script.js.");
        return;
    }

    window.location.href = whatsappUrl(message);
}

// Set the current year in the footer
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Prevent customers from selecting a date in the past
if (preferredDate) {
    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    preferredDate.min = localToday;
}

// WhatsApp contact links
function setContactLinks() {
    const message =
        "Hello Kelly Laundry, I would like to ask about your laundry services.";

    const contactWhatsApp = document.getElementById("contactWhatsApp");
    const floatingWhatsApp = document.getElementById("floatingWhatsApp");

    const href = whatsappUrl(message);

    if (contactWhatsApp) {
        contactWhatsApp.href = href;
    }

    if (floatingWhatsApp) {
        floatingWhatsApp.href = href;
    }
}

setContactLinks();

// Mobile navigation menu
if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        });
    });
}

// Select a service when a service link is clicked
document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
        if (serviceSelect) {
            serviceSelect.value = link.dataset.service;
        }
    });
});

// Handle the order form only once
const nameField =
    document.getElementById("customerName") ||
    document.getElementById("name");

const phoneField =
    document.getElementById("customerPhone") ||
    document.getElementById("phone");

const serviceField = document.getElementById("service");
const addressInput = document.getElementById("address");

if (!nameField || !phoneField || !serviceField || !addressInput) {
    alert("Form error: Please check the IDs in index.html.");
    return;
}
const data = {
    name: nameField.value.trim(),
    phone: phoneField.value.trim(),
    service: serviceField.value,
    quantity: document.getElementById("quantity")?.value.trim()
        || "Not specified",
    date: (
        document.getElementById("preferredDate") ||
        document.getElementById("date")
    )?.value || "Not specified",
    address: addressInput.value.trim(),
    notes: (
        document.getElementById("notes") ||
        document.getElementById("instructions")
    )?.value.trim() || "None"
};

        const name = customerName.value.trim();
        const phone = customerPhone.value.trim();
        const service = serviceSelect.value;

        const quantity = quantityField
            ? quantityField.value.trim() || "Not specified"
            : "Not specified";

        const date = preferredDate
            ? preferredDate.value || "Not specified"
            : "Not specified";

        const address = addressField.value.trim();

        const instructions = instructionsField
            ? instructionsField.value.trim() || "None"
            : "None";

        const message = [
            "Hello Kelly Laundry! I'd like to place a laundry order.",
            "",
            "Name: " + name,
            "Customer phone: " + phone,
            "Service: " + service,
            "Estimated quantity: " + quantity,
            "Preferred date: " + date,
            "Pickup/drop-off address: " + address,
            "Additional instructions: " + instructions,
            "",
            "Please confirm the price and availability. Thank you."
        ].join("\n");

        openWhatsApp(message);
    });
}

// Contact links open WhatsApp directly
["contactWhatsApp", "floatingWhatsApp"].forEach(function (id) {
    const link = document.getElementById(id);

    if (link) {
        link.addEventListener("click", function (event) {
            if (!isWhatsAppNumberConfigured()) {
                event.preventDefault();

                alert(
                    "Please check Kelly Laundry's WhatsApp number in script.js."
                );
            }
        });
    }
});