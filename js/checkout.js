function setUser()
{    
    let name = document.getElementById("name").value;
    // let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    // let city = document.getElementById("city").value;
    // let state = document.getElementById("state").value;
    // let stateCode = document.getElementById("stateCode").value;
    // let zipCode = document.getElementById("zipCode").value;

    let userObj = {
        name: name,
        // email: email,
        address: address,
        // city: city + "," + state,
        // zipcode: zipCode,
        // stateCode: stateCode
    };
    localStorage.setItem("User",JSON.stringify(userObj));
    console.log(userObj);
}