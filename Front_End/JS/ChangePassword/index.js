$(document).ready(function(){
    if (localStorage.authUser == null && localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "../Login/index.html";
    }
    else if(localStorage.authUser == null && localStorage.userRole!=2)
    {
        window.location.href = "../Login/index.html";
    }
    else if(localStorage.authUser == null && localStorage.userRole!=3)
    {
        window.location.href = "../Login/index.html";
    }
    else if(localStorage.authUser == null && localStorage.userRole!=4)
    {
        window.location.href = "../Login/index.html";
    }
    else if(localStorage.authUser == null && localStorage.userRole!=5)
    {
        window.location.href = "../Login/index.html";
    }
    else if(localStorage.authUser == null && localStorage.userRole!=6)
    {
        window.location.href = "../Login/index.html";
    }

    //load nav
    if(localStorage.userRole==1)
    {
        $('#content').load("../Admin/adminnav.html");
    }
    if(localStorage.userRole==2)
    {
        $('#content').load("../Manager/managernav.html");
    }
    if(localStorage.userRole==3)
    {
        $('#content').load("../Salesman/salesmannav.html");
    }
    if(localStorage.userRole==4)
    {
        $('#content').load("../Deliveryman/deliverymannav.html");
    }if(localStorage.userRole==5)
    {
        $('#content').load("../Customer/customernav.html");
    }if(localStorage.userRole==6)
    {
        $('#content').load("../Vendor/vendornav.html");
    }
});