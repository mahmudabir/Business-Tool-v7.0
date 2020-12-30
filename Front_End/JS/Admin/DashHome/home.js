$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "../Login/index.html";
    }

    $('#content').load("adminnav.html");

});