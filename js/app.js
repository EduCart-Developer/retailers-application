// const { response } = require("express");

// sessionStorage.clear();
var booksItem ;

// fetching the books from the database
fetch("https://educart-book-api.herokuapp.com/api/products")
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        booksItem = data;
        showBooks(booksItem);
        btnAddEvent();
    })
    .catch(e => console.log(e));


function showBooks(data)
{
    let divBook = document.getElementById("books");
    let html = "";
    data.forEach((book) => {
            // console.log(book);
            html += `

            <div class="row productRow my-3">
            <div class="col-3">
                <img src="${book.img}" alt="${book.title}" width="80%"/>
            </div>
            <div class="col-3">
                <div class="row" style="display:none; visibility:hidden;">${book.title}</div>
                <div class="row">${book.subject}</div>
                <div class="row">${book.type}</div>
                <div class="row">Class ${book.class}</div>
                <div class="row">SKUID-${book.skuID}</div>
            </div>
            <div class="col-2">
                <div class="row" style="margin-bottom:10px;"><b style="padding:0;">Price</b></div>
                <div class="row">${book.price}</div>
            </div>
            <div class="col-2">
            <div class="row" style="margin-bottom:10px;"><b style="padding:0;">Qty</b></div>
                <form class = "row" action="" class="bookQuantity" style="max-width:100%">
                    <input type="number" style="height:24px;">
                </form>
            </div>
            <div class="col-2">
                <button class="addBook btn-sm btn-primary" id="${book._id}">ADD</button>
            </div>
        </div>
        `;
        });
        divBook.innerHTML = html;
        btnAddEvent();
}


//adding event listner to button
function btnAddEvent() {
    let btn = document.getElementsByClassName("addBook");
    Array.from(btn).forEach((element, index) => {
        // console.log(element);
        element.addEventListener("click", function (e) {
            // targets the quantity when add it clicked
            // console.log(e.target.parentNode.previousSibling.previousSibling.children[1].children[0].value);
            let quantity = e.target.parentNode.previousSibling.previousSibling.children[1].children[0].value;
            

            //targets the book title
            // console.log(e.target.parentNode.parentNode.children[1].children[0].innerText);
            let title = e.target.parentNode.parentNode.children[1].children[0].innerText;


            //targets the price of the book
            // console.log(e.target.parentNode.parentNode.children[2].children[1].innerText);
            let price = e.target.parentNode.parentNode.children[2].children[1].innerText;
            // console.log(index," ",quantity," ",title," ",price);

            let bookObj =
            {
                id: index,
                description: title,
                quantity: quantity,
                price: price,
                "tax-rate":-40
            };
            console.log(JSON.stringify(bookObj));
            let book = sessionStorage.getItem("books");
            if (book == null)
                bookArr = [];
            else {
                bookArr = JSON.parse(book);
            }
            // console.log(book);
            flag = true;
            Array.from(bookArr).forEach((element) => {
                // console.log(element.title);
                // console.log(bookObj.title);
                if(element.description === bookObj.description)
                {
                    flag = false;
                }
            });
            if(flag && quantity != 0 && quantity != "")
                bookArr.push(bookObj);
            // book.push(JSON.stringify(bookObj))
            // console.log(bookArr);
            sessionStorage.setItem("books", JSON.stringify(bookArr));
            showCart();
        });
    });
}



let filteredBooks;
let selectClass = "All";
let selectBoard = "All";
let selectType = "All";
let selectSubject = "All";

//filter functions for classes
function pickClass(value) {
    // console.log(value,booksItem);
    selectClass = value;
    filterBook();
}

function pickContentType(value) {
    // console.log(value,booksItem);
    selectType = value;
    filterBook();
}

function pickSubject(value) {
    // console.log(value,booksItem);
    selectSubject = value;
    filterBook();
}

function pickBoard(value)
{
    // console.log(value,booksItem);
    selectBoard = value;
    filterBook();
}


function filterBook()
{
    if(selectClass == "All" && selectBoard == "All" && selectType == "All" && selectSubject == "All")
    {
        showBooks(booksItem);
    }
    else if (selectBoard == "All" && selectType == "All" && selectSubject == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.class == selectClass);
        });
        showBooks(filteredBooks);
    }
    else if (selectClass == "All"  && selectType == "All" && selectSubject == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.board == selectBoard);
        });
        showBooks(filteredBooks);
    }
    else if (selectClass == "All" && selectBoard == "All" && selectSubject == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType);
        });
        showBooks(filteredBooks);
    }
    else if (selectClass == "All" && selectBoard == "All" && selectType == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.subject == selectSubject);
        });
        showBooks(filteredBooks);
    }
    else if (selectClass == "All" && selectBoard == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType && item.subject == selectSubject);
        });
        showBooks(filteredBooks);
    }
    else if (selectClass == "All" && selectType == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.board == selectBoard && item.subject == selectSubject);
        });
        showBooks(filteredBooks);
    }
    else if (selectClass == "All" && selectSubject == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType && item.board == selectBoard);
        });
        showBooks(filteredBooks);
    }
    else if (selectBoard == "All" && selectType == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.class == selectClass && item.subject == selectSubject);
        });
        showBooks(filteredBooks);
    }
    else if (selectBoard == "All" && selectSubject == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType && item.class == selectClass);
        });
        showBooks(filteredBooks);
    }
    else if (selectType == "All" && selectSubject == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.board == selectBoard && item.class == selectClass);
        });
        showBooks(filteredBooks);
    }
    else if (selectBoard == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType && item.subject == selectSubject && item.class == selectClass);
        });
        showBooks(filteredBooks);
    }
    else if (selectClass == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType && item.subject == selectSubject && item.board == selectBoard);
        });
        showBooks(filteredBooks);
    }
    else if (selectType == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.board == selectBoard && item.subject == selectSubject && item.class == selectClass);
        });
        showBooks(filteredBooks);
    }
    else if (selectSubject == "All")
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType && item.board == selectBoard && item.class == selectClass);
        });
        showBooks(filteredBooks);
    }
    else
    {
        filteredBooks = booksItem.filter((item) =>{
            return (item.type == selectType && item.subject == selectSubject && item.class == selectClass && item.board == selectBoard);
        });
        showBooks(filteredBooks);
    }
}




//Function to display the cart items
//it handles the cart and close text change listner
function triggerCart() {
    var x = document.getElementById("checkout");
    if (x.style.display === "none") {
        x.style.display = "block";
        let cart = document.getElementById("cartBtn");
        let html = ``; // for the close icon sign
        //   console.log(cart);
        cart.innerText = "Close";
        //   Adding products to cart
        showCart();
    } else {
        x.style.display = "none";
        let cart = document.getElementById("cartBtn");
        let html = ``; // for the close icon sign
        cart.innerText = "Cart";
    }
}


//Showing Book in Cart
function showCart() {
    checkoutEmpty();
    let book = sessionStorage.getItem("books");
    if (book == null)
        bookArr = [];
    else {
        bookArr = JSON.parse(book);
        let html = "";
        Array.from(bookArr).forEach((element, index) => {
            html += `
                    <div id="${element.description}" class="row align-item-start my-3" style="padding: 0;padding-left: 20px;">
                        <div class="col-4" >${element.description}</div>
                        <div class="col-3" >${element.quantity}</div>
                        <div class="col-2" >${element.price}</div>
                        <div class="col-2" >
                            <buttton class="btn btn-sm btn-danger removeBtn" onclick="removeProduct(this)">Remove</buttton>
                        </div>        
                    </div>
            `;
        });
        let cartProduct = document.getElementById("product");
        cartProduct.innerHTML = html;
    }
}


//removing the product from the list
function removeProduct(element) {
    // var p=element.parentNode.parentNode;
    // p.parentNode.removeChild(p);
    //Products Title to remove
    let titleDelete = element.parentNode.parentNode.id;

    let book = sessionStorage.getItem("books");
    let bookArr = JSON.parse(book);

    for (let index = 0; index < bookArr.length; index++) {
        if(bookArr[index].description == titleDelete)
        {
            bookArr.splice(index,1)
        }
    }
    console.log(bookArr);
    sessionStorage.setItem("books",JSON.stringify(bookArr));
    showCart();
}


//Disabling invoice 
function disableInvoice(e)
{
    let user = localStorage.getItem("User");
    if(user === null)
    {
        e.children[0].href = "./checkout.html";
        // console.log(e.children[0]);
        // e.style.backgroundColor = "grey";
        // document.getElementById("alertDiv").style.display = "inherit";
        // alert("Please enter your details! Using 'Edit User Button'")
        // e.preventDefault();
    }
    else
    {
        e.children[0].href = "./invoice.html";
    }

}



function checkoutEmpty()
{
    let cart = document.getElementById("checkout");

    let book = JSON.parse(sessionStorage.getItem("books"));
    let html = "";
    if(book == null || book.length == 0)
    {
        html = `
        <p> Cart is empty!!! Please add item to proceed further</p>
        <div id="product">
        </div>
        `;
    }
    else
    {
        html = `
        <div id="checkoutHeading" class="row align-item-start my-3" style="padding: 0;padding-left: 20px;">
        <div class="col-4" >Books</div>
        <div class="col-3" >Quantity</div>
        <div class="col-2" >Price</div>
        <div class="col-2" style="display: none;">
            <buttton class="btn btn-sm btn-danger">Remove</buttton>
        </div>
        </div>
        <div id="product">
        </div>
        <!-- <div class="container">
            <button class="btn btn-lg btn-primary checkoutBtn">
                <a href="../checkout.html" style="text-decoration: none; color: white;">
                    Proceed to checkout
                </a>
            </button>
        </div> -->
            <div id="invoiceButton">
                <button class="btn btn-primary" onclick="disableInvoice(this)">
                    <a href="./invoice.html" style="text-decoration: none; color: white;">
                        Invoice
                    </a>
                </button>
            </div>
        `;
    }
    cart.innerHTML = html;
}