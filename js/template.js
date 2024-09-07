//fetching the user
let user = JSON.parse(localStorage.getItem("User"));

//if the user is null alert the user
if(user == null)
    window.location.href = "/index.html";
    // alert("Please visit the home page again to proceed");

//storing all the variables to update in the invoice
const clientName = user.name;
const clientAddr = user.address;
const date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
let discount = 32;
if(user.discount != null)
    discount = user.discount;

document.getElementById("userName").innerText = clientName;
document.getElementById("userCity").innerText = clientAddr;
document.getElementById("today-date").innerText = date;


//adding the products to the invoice
let cart = JSON.parse(sessionStorage.getItem("books"));
// console.log(cart); 

// if there are no books
if(cart === null)
    window.location.href = "/index.html";


let html = "";
let total = 0;
let bookQty = 0;
Array.from(cart).forEach((e,idx)=>{
    html += `
    <tr style = "font-size:12px;">
        <td class="serial">${idx+1}</td>    
        <td class="desc">${e.description}</td>
        <td class="unit">${e.price}</td>
        <td class="qty">${e.quantity}</td>
        <td class="total">${e.quantity*e.price}</td>
    </tr>
    `;
    total += e.quantity*e.price;
    bookQty += parseInt(e.quantity);
});

let totalDiscount = (total/100)*discount;
totalDiscount = parseFloat(totalDiscount).toFixed(2);
let grandTotal = total - totalDiscount;
grandTotal = parseFloat(grandTotal).toFixed(2);
html += `
            <tr style = "font-weight:600;font-size:13px;">
              <td colspan="3" style="padding-right:50px">SUBTOTAL</td>
              <td>${bookQty}</td>
              <td id = "subtotal">${total}</td>
            </tr>
            <tr style = "font-weight:600;font-size:13px;">
              <td colspan="4" style="padding-right:80px">DISCOUNT <span id = "discount-rate">${discount}%</span></td>
              <td id="discounttotal">${totalDiscount}</td>
            </tr>
            <!--<tr>
              <td colspan="4" style="padding-right:140px">TOTAL QUANTITY</td>
              <td>${bookQty}</td>
            </tr>-->
            <tr style = "font-weight:600;border-top: 1px solid black;font-size:13px;">
              <td colspan="4" class="grand total" style="padding-right:70px">GRAND TOTAL</td>
              <td id="grandtotal">${grandTotal}</td>
            </tr>
`;
document.getElementById("cart-book").innerHTML = html;

// window.onload = function(){
//     document.getElementById("downloadBtn")
//     .addEventListener("click",()=>{
//         const inv = this.document.getElementById("inv");
//         html2pdf(inv).save();
//     });
// }

// var doc = new jsPDF();
// window.onload = function(){
//     document.getElementById("downloadBtn")
//     .addEventListener("click",async ()=>{
//         const inv = this.document.getElementById("invoice");
//         await html2pdf(inv).save();
//         // localStorage.clear();
//         // sessionStorage.clear();
//         window.location.href = "/index.html";
//     });
// }




document.getElementById("downloadBtn")
.addEventListener('click', function () {
    html2canvas(document.getElementById("invoice")).then(function (canvas) {                   
       var anchorTag = document.createElement("a");
        // document.body.appendChild(anchorTag);
        // document.getElementById("previewImg").appendChild(canvas);
        anchorTag.innerText = "Download Invoice"
        anchorTag.download = "filename.jpg";
        anchorTag.href = canvas.toDataURL();
        anchorTag.target = '_blank';
        anchorTag.classList = "btn btn-lg btn-primary";
        anchorTag.style.margin = " 30px 42%";
        anchorTag.click();
        document.getElementById("downloadBtn").style.display = "none";
        localStorage.clear();
        sessionStorage.clear();
        if(discount != 32)
            window.location.href = "/books.html";
        else
            window.location.href = "/index.html";
    });
});


