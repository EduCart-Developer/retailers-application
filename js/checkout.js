let name = document.getElementById("name");
let address = document.getElementById("address");

let warningText = document.createElement("small");
warningText.innerHTML = "Address feild is required";
warningText.style.color = "red";


let warningText1 = document.createElement("small");
warningText1.innerHTML = "Name feild is required";
warningText1.style.color = "red";

function setUser()
{    
    // let email = document.getElementById("email").value;
    // let city = document.getElementById("city").value;
    // let state = document.getElementById("state").value;
    // let stateCode = document.getElementById("stateCode").value;
    // let zipCode = document.getElementById("zipCode").value;
    console
    if(name.value === '')
    {
        // window.alert("Please enter your details")
        name.style.border = "1px solid red";
        name.parentNode.appendChild(warningText1);
    }
    else if (address.value === '')
    {
        address.style.border = "1px solid red";
        address.parentNode.appendChild(warningText);
    }
    else
    {
        let userObj = {
            name: name.value,
            // email: email,
            address: address.value,
            // city: city + "," + state,
            // zipcode: zipCode,
            // stateCode: stateCode
        };
        localStorage.setItem("User",JSON.stringify(userObj));
    }
    // console.log(userObj);

}

function def()
{
    if(name.value == '' || address.value == '')
    {
        return false;
    }
    else
    {
        return true;
    }
}

function redirectLink(e)
{
    
}

document.getElementById("submitForm")
.addEventListener("click",(e) => {
    if(name.value === '' || address.value === '')
        e.preventDefault();
});