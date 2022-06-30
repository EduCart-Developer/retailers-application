// const logo = require("../assets/invoice-head.jpg");
// import logo from '../assets/invoice-head.jpg';

let num = 1;
let user = JSON.parse(localStorage.getItem("User"));

//Client Details
let clientName = user.name;
let clientAddr = user.address;
// let clientStateCode = user.stateCode;
// let clientEmail = user.email;
// let clientCity = user.city;
// let clientZip = user.zipcode;

//Sender's Details
let senderName = "EduCart (CBSE)";
let senderEmail = "sales@agpgroup.in";
let senderSite = "https://www.educart.co";
let senderAdr = "28/115, Jyoti Block, Sanjay Palace";
let senderZip = "282002";
let senderCity = "Agra, Uttar Pradesh";

//user's product
let cart = JSON.parse(sessionStorage.getItem("books"));
console.log(cart);

//date object
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();
console.log(year,month,day);
let dateStr = day + "-" + (month+1) + "-" + year;


var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('../template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": "https://i.postimg.cc/0NWn2Y9w/invoice-head.jpg",
        // The invoice background
        // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    },
    // Your own data
    "sender": {
        "company": senderName,
        "address": senderAdr,
        "zip": senderZip,
        "city": senderCity,
        "country": "India"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    // Your recipient
    "client": {
        "company": clientName,
        "address": clientAddr,
        // "city": clientCity,
        // "zip": clientZip,
        "country": "India",
        // "custom1": "Email :" + clientEmail,
        // "custom2": "State Code :" + clientStateCode
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
    },
    "information": {
        // Invoice number
        "number": num,
        // Invoice data
        "date": dateStr,
        // Invoice due date
        "due-date": "Within 10 days"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": cart,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "For further support on your order, kindly contact us at +91 89999 99999",
    // Settings to customize your invoice
    "settings": {
        "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        "tax-notation": "Discount ", // Defaults to 'vat'
        "margin-top": 0, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        "margin-bottom": 0, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
    },
};

window.onload = (e) =>
{
    createInv();
}

let result;
async function createInv(){
    result = await easyinvoice.createInvoice(data);
    console.log(result);
    // easyinvoice.download('invoice.pdf',result.pdf)
    //render on the browser
    await easyinvoice.render("invoice",result.pdf);
    num++;
    sessionStorage.clear();
}
//Create your invoice! Easy!

// easyinvoice.createInvoice(data, function (result) {
//     //The response will contain a base64 encoded PDF file
//     // console.log('PDF base64 string: ', result.pdf);

//     // Download the invoice
    // easyinvoice.download('invoice.pdf',result.pdf)
    
// });







function sendEmail() {
    Email.send({
        SecureToken : "2d06c160-ff94-45ef-b099-4b3b5773748e",
        To : "yjain8958372013@gmail.com",
        From : "educart.developer@gmail.com",
        Subject : "Invoice",
        Body : "Thanks for ordering!",
        Attachments : [
            {
                name: "Invoice",
                data: result.pdf
            }
        ]
    }).then(
      message => console.log(message)
    );
  }


function downloadInvoice()
{
    easyinvoice.download('invoice.pdf',result.pdf);
}

//   [
//     {
//         "quantity": 2,
//         "description": "Product 1",
//         "tax-rate": -40,
//         "price": 33.87
//     }
// ]




