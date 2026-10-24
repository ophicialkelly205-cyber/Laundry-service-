KELLY LAUNDRY WEBSITE
=====================

FILES
- index.html: website structure and content
- style.css: responsive design and styling
- script.js: mobile navigation, order form, date validation and WhatsApp integration

HOW TO RUN
1. Extract the ZIP file.
2. Keep index.html, style.css and script.js in the same folder.
3. Open index.html in a browser.

IMPORTANT: CONFIGURE WHATSAPP
1. Open script.js in a code editor.
2. Find this line near the top:
   const LAUNDRY_WHATSAPP_NUMBER = "2348012345678";
3. Replace the sample number with Kelly Laundry's real WhatsApp number.
   Use international format with digits only: no plus sign, spaces or dashes.
   Example format for a Nigerian number: 2348012345678
4. Save the file and refresh the website.

ORDER HANDLING
- Customers fill in the order form and tap "Send order on WhatsApp".
- The website opens WhatsApp with the order details pre-filled.
- The customer must press Send in WhatsApp.
- The website does not store orders or provide an admin dashboard.
- A backend/database would be needed for automatic order storage, tracking and administration.

CUSTOMIZATION
- Edit service descriptions and business details in index.html.
- Change colors and layout in style.css.
- Replace the sample WhatsApp number in script.js before publishing.
- The hero photo is loaded from Unsplash, so an internet connection is needed to display it.
