// ========================================
// KELLY LAUNDRY - ORDER MANAGEMENT
// ========================================

// Your business WhatsApp number.
// Use country code + number without the leading zero or + sign.
const LAUNDRY_WHATSAPP_NUMBER = "2348060757524";

document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("orderForm");

    // Stop if the order form cannot be found.
    if (!orderForm) {
        console.error("Order form not found. Check index.html.");
        return;
    }

    // Find a form field using any matching ID.
    function findField(ids) {
        for (const id of ids) {
            const field = document.getElementById(id);

            if (field) {
                return field;
            }
        }

        return null;
    }

    // Display an error message.
    function showError(message) {
        alert(message);
    }

    // Submit the order.
    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Find the form fields.
        const nameField = findField([
            "customerName", "name", "fullName"
        ]);

        const phoneField = findField([
            "customerPhone", "phone", "phoneNumber"
        ]);

        const serviceField = findField([
            "service", "serviceNeeded"
        ]);

        const quantityField = findField([
            "quantity", "estimatedQuantity"
        ]);

        const dateField = findField([
            "preferredDate", "date"
        ]);

        const addressField = findField([
            "address", "pickupAddress", "customerAddress"
        ]);

        const notesField = findField([
            "notes", "instructions", "additionalInstructions"
        ]);

        // Check that the essential fields exist.
        if (
            !nameField ||
            !phoneField ||
            !serviceField ||
            !addressField
        ) {
            console.error("Missing form fields:", {
                nameField,
                phoneField,
                serviceField,
                addressField
            });

            showError(
                "The order form has a configuration problem. " +
                "Please check the field IDs in index.html."
            );

            return;
        }

        // Read the customer's information.
        const customerName = nameField.value.trim();
        const customerPhone = phoneField.value.trim();
        const service = serviceField.value;
        const quantity = quantityField
            ? quantityField.value.trim() || "Not specified"
            : "Not specified";

        const preferredDate = dateField
            ? dateField.value || "Not specified"
            : "Not specified";

        const address = addressField.value.trim();

        const instructions = notesField
            ? notesField.value.trim() || "None"
            : "None";

        // Validate the customer's details.
        if (
            !customerName ||
            !customerPhone ||
            !service ||
            !address
        ) {
            showError(
                "Please complete your name, phone number, " +
                "service and address."
            );

            return;
        }

        // Check the business WhatsApp number.
        if (!/^\d{10,15}$/.test(LAUNDRY_WHATSAPP_NUMBER)) {
            showError(
                "The business WhatsApp number is invalid. " +
                "Please check script.js."
            );

            return;
        }

        // Generate a unique order reference for this attempt.
        const orderReference =
            "KL-" + Date.now().toString().slice(-8);

        // Build the order message.
        const orderMessage = `
KELLY LAUNDRY - NEW ORDER

Order Reference: ${orderReference}

CUSTOMER DETAILS
Name: ${customerName}
Customer Phone: ${customerPhone}

ORDER DETAILS
Service: ${service}
Estimated Quantity: ${quantity}
Preferred Date: ${preferredDate}
Pickup/Delivery Address: ${address}

Additional Instructions:
${instructions}

Please confirm receipt of this order and provide the price.
Thank you.
        `.trim();

        // Open WhatsApp with the order details.
        const whatsappLink =
            "https://wa.me/" +
            LAUNDRY_WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(orderMessage);

        window.location.href = whatsappLink;
    });

    // Set the minimum date to today.
    const dateField = findField(["preferredDate", "date"]);

    if (dateField && dateField.type === "date") {
        const today = new Date();
        const localDate = new Date(
            today.getTime() -
            today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateField.min = localDate;
    }

    // Update the copyright year.
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});