$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=6)
    {
        //localStorage.clear();
        window.location.href = "../../Login/index.html";
    }

    $('#content').load("../vendornav.html");

})