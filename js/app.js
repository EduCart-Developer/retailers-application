// sessionStorage.clear();
var booksItem ;
var bookCount = document.getElementById('bookCount').innerText;
// fetching the books from the database
fetch("../data/data.json")
    .then(response => response.json())
    .then((data) => {
        // console.log(data);
        booksItem = data;
        showBooks(booksItem);
        setTimeout(() => {
            document.getElementById("spinner").style.display = "none";
            document.getElementById("books").style.display = "inherit";
        }, 500);
        btnAddEvent();
    })
    .catch(e => console.log(e));

function showBooks(data)
{
    let divBook = document.getElementById("books");
    let html = "";
    data.sort((a,b) => {
        return (b.sortNumber - a.sortNumber);
    });
    data.forEach((book) => {
            // console.log(book);
            html += `
            <div id="${book._id}" class="row productRow my-3" style="padding:0 2px;">
            <div class="col-2" style="padding:0;">
                <img src="${book.img}" alt="${book.title}" width="90%"/>
            </div>
            <div class="col-3" style="padding-left:-4px;">
                <div class="row" style="display:none; visibility:hidden;">${book.title}</div>
                <div class="row book-subject">${book.subject}</div>
                <div class="row book-type">(${book.type})</div>
                <div class="row book-class">${book.class==="NEET" || book.class === "CUET" ? book.class:"Class " + book.class}</div>
                <!--<div class="row" style = "font-weight:600;overflow:hidden;"> CODE - ${book.skuID} </div>-->
            </div>
            <div class="col-2">
                <div class="row book-code-head"><b style="padding:0;">Code</b></div>
                <div class="row book-code">${book.skuID}</div>
            </div>
            <div class="col-2">
                <div class="row book-price-head"><b style="padding:0;">Price</b></div>
                <div class="row book-price" >${book.price}</div>
            </div>
            <div class="col-2" style="padding:0">
            <div class="row" style="margin-bottom:10px;"><b style="padding-left:10px;">Qty</b></div>
                <form class = "row" action="" class="bookQuantity" style="max-width:80%">
                    <input type="number" style="height:18px;padding:0;text-align:center;font-size:11px;">
                </form>
            </div>
            <div class="col-1">
                <button class="addBook btn-sm btn-primary book-btn" id="${book._id}">Add</button>
            </div>
        </div>
        `;
        });
        divBook.innerHTML = html;
        btnAddEvent();
        addBtnOnLoad();
        cartCount();
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
            // console.log(e.target.parentNode.parentNode.children[3].children[1].innerText);
            let price = e.target.parentNode.parentNode.children[3].children[1].innerText;
            // console.log(index," ",quantity," ",title," ",price);

            let id = e.target.parentNode.parentNode.id;
            let bookObj =
            {
                id: id,
                description: title,
                quantity: quantity,
                price: price,
                "tax-rate":-40
            };
            // console.log(JSON.stringify(bookObj));
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
            {
                element.innerText = "Added";
                element.classList.remove ("btn-primary");
                element.classList.add ("btn-success");
                bookArr.push(bookObj);
            }
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
        document.getElementById("greyContainer").style.display = "block";
        showCart();
    } else {
        document.getElementById("greyContainer").style.display = "none";
        x.style.display = "none";
        let cart = document.getElementById("cartBtn");
        let html = ``; // for the close icon sign
        cart.innerHTML = `<span>Invoice    
        <i class="fa fa-download" style="font-size:24px"></i></span>`;
    }
}

//Showing Book in Cart
function showCart() {
    checkoutEmpty();
    let book = sessionStorage.getItem("books");
    bookCount = 0;
    if (book == null){
        bookArr = [];
        bookCount = 0;
    }
    else {
        bookArr = JSON.parse(book);
        let html = "";
        Array.from(bookArr).forEach((element, index) => {
            html += `
                    <div id="${element.id}" class="cartItems row align-item-start my-3">
                        <div class="col-6 cartItems-Desc" >${element.description}</div>
                        <div class="col-2 cartItems-Qty" >${element.quantity}</div>
                        <div class="col-2 cartItems-Price" >${element.price}</div>
                        <div class="col-2 cartItems-Remove" style="padding:0;">
                            <buttton class="btn btn-sm btn-danger removeBtn" onclick="removeProduct(this)" style="font-size:10px;">Remove</buttton>
                        </div>        
                    </div>
            `;
            bookCount = index+1;
        });
        let cartProduct = document.getElementById("product");
        cartProduct.innerHTML = html;
    }
    cartCount();
}

//removing the product from the list
function removeProduct(element) {
    // var p=element.parentNode.parentNode;
    // p.parentNode.removeChild(p);
    //Products Title to remove
    let titleDelete = element.parentNode.parentNode.id;
    // titleDelete = titleDelete.substring(0,1);

    let book = sessionStorage.getItem("books");
    let bookArr = JSON.parse(book);

    for (let index = 0; index < bookArr.length; index++) {
        if(bookArr[index].id === titleDelete)
        {
            bookArr.splice(index,1)
        }
    }
    // console.log(bookArr);
    
    let removedBook = document.getElementById(titleDelete);
    // console.log(removedBook);
    removedBook.children[5].children[0].innerText = "ADD";
    removedBook.children[5].children[0].classList.add("btn-primary");
    removedBook.children[5].children[0].classList.remove("btn-success");
    removedBook.children[4].children[1].children[0].value="";
    sessionStorage.setItem("books",JSON.stringify(bookArr));
    showCart();
}

//Disabling invoice 
function disableInvoice(e)
{
    e.children[0].href = "./checkout.html";
    // let user = localStorage.getItem("User");
    // if(user === null)
    // {
        
    //     // console.log(e.children[0]);
    //     // e.style.backgroundColor = "grey";
    //     // document.getElementById("alertDiv").style.display = "inherit";
    //     // alert("Please enter your details! Using 'Edit User Button'")
    //     // e.preventDefault();
    // }
    // else
    // {
    //     e.children[0].href = "./invoice.html";
    // }

}

function checkoutEmpty()
{
    let cart = document.getElementById("checkout");

    let book = JSON.parse(sessionStorage.getItem("books"));
    let html = "";
    if(book == null || book.length == 0)
    {
        html = `
        <p style="padding:10px;"> Cart is empty!!! Please add item to proceed further</p>
        <div id="product">
        </div>
        `;
    }
    else
    {
        html = `
        <div id="checkoutHeading" class="row align-item-start my-3" style="padding: 0;padding-left: 20px;">
        <div class="col-6"  >Books</div>
        <div class="col-2" style="padding:0;" >Qty</div>
        <div class="col-2" style="padding:0;" >Price</div>
        <div class="col-2" style="display: none;">
            <buttton class="btn btn-sm btn-danger">Remove</buttton>
        </div>
        </div>
        <div id="product">
        </div>
            <div id="invoiceButton">
                <button class="invoiceBtn btn btn-primary" onclick="disableInvoice(this)">
                    <a href="./invoice.html" style="text-decoration: none; color: white;">
                        Invoice 
                        <i class="fa fa-download" style="font-size:20px;padding-left:4px;"></i>
                    </a>
                </button>
            </div>
        `;
    }
    cart.innerHTML = html;
}


//Adding count functionality in top of the cart
function cartCount()
{
    // console.log(bookCount);
    let itemNum = document.getElementById("bookCount");
    itemNum.innerText = bookCount;
}



//window onload the ADD buttons should remain green
const addBtnOnLoad = ()=>{
    let book = sessionStorage.getItem("books");
    let bookArr = JSON.parse(book);
    if(bookArr)
    {
        for (let index = 0; index < bookArr.length; index++)
        {
            let addBook = document.getElementById(bookArr[index].id);
            addBook.children[5].children[0].innerText = "Added";
            addBook.children[5].children[0].classList.add("btn-success");
            addBook.children[5].children[0].classList.remove("btn-primary");    
            addBook.children[4].children[1].children[0].value=bookArr[index].quantity;
        }
    }  
};

window.onload = ()=>{
    if(JSON.parse(sessionStorage.getItem("books")))
    {
        //Initialize the cart count
        document.getElementById("bookCount").innerText = JSON.parse(sessionStorage.getItem("books")).length;
        triggerCart();
        triggerCart();
    }
}


// API: https://educart-book-api.herokuapp.com/api/products