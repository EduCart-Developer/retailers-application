// Fetching the user
let user = JSON.parse(localStorage.getItem("User"));

// If the user is null alert the user and redirect
if (user == null)
    window.location.href = "/index.html";

// Storing all the variables to update in the invoice
const clientName = user.name;
const clientAddr = user.address;
const date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
let discount = 32;
if (user.discount != null)
    discount = user.discount;

document.getElementById("userName").innerText = clientName;
document.getElementById("userCity").innerText = clientAddr;
document.getElementById("today-date").innerText = date;

// Adding the products to the invoice
let cart = JSON.parse(sessionStorage.getItem("books"));

// If there are no books in the cart
if (cart === null)
    window.location.href = "/index.html";

let html = "";
let total = 0;
let bookQty = 0;

Array.from(cart).forEach((e, idx) => {
    // Calculate the price after discount for each book
    let priceAfterDiscount = (e.price - (e.price * discount / 100)).toFixed(2);
    let totalBookPrice = (e.price * e.quantity).toFixed(2); // Actual total price without discount

    // Generate table rows
    html += `
    <tr style="font-size:12px;">
        <td class="serial">${idx + 1}</td>    
        <td class="desc">${e.description}</td>
        <td class="unit">${e.price}</td>
        <td class="qty">${e.quantity}</td>
        <td class="price-after-discount">${priceAfterDiscount}</td>
        <td class="total">${totalBookPrice}</td>
    </tr>
    `;

    total += parseFloat(totalBookPrice);  // Sum of actual prices without discount
    bookQty += parseInt(e.quantity);
});

let totalDiscount = (total / 100) * discount;
totalDiscount = parseFloat(totalDiscount).toFixed(2);
let grandTotal = total - totalDiscount;
grandTotal = parseFloat(grandTotal).toFixed(2);

// Add the subtotal, discount, and grand total rows
html += `
    <tr style="font-weight:600;font-size:13px;">
        <td colspan="3" style="padding-right:50px">SUBTOTAL</td>
        <td>${bookQty}</td>
        <td></td>
        <td colspan="2" id="subtotal">${total.toFixed(2)}</td>
    </tr>
    <tr style="font-weight:600;font-size:13px;">
        <td colspan="4" style="padding-right:80px">DISCOUNT <span id="discount-rate">${discount}%</span></td>
        <td></td>

        <td colspan="2" id="discounttotal">${totalDiscount}</td>
    </tr>
    <tr style="font-weight:600;border-top: 1px solid black;font-size:13px;">
        <td colspan="4" class="grand total" style="padding-right:70px">GRAND TOTAL</td>
        <td></td>

        <td colspan="2" id="grandtotal">${grandTotal}</td>
    </tr>
`;

document.getElementById("cart-book").innerHTML = html;

// Download button functionality
document.getElementById("downloadBtn").addEventListener('click', function () {
    html2canvas(document.getElementById("invoice")).then(function (canvas) {
        var anchorTag = document.createElement("a");
        anchorTag.download = "invoice.jpg";
        anchorTag.href = canvas.toDataURL();
        anchorTag.target = '_blank';
        anchorTag.classList = "btn btn-lg btn-primary";
        anchorTag.style.margin = "30px 42%";
        anchorTag.click();

        // Clear storage and redirect based on discount
        document.getElementById("downloadBtn").style.display = "none";
        localStorage.clear();
        sessionStorage.clear();
        if (discount != 32)
            window.location.href = "/books.html";
        else
            window.location.href = "/index.html";
    });
});
