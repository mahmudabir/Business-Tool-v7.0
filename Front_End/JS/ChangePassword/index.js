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

    var getPasswordFromLogin = function(){
        $.ajax({
            url: "https://localhost:44308/api/logins/"+localStorage.userId,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;
                    console.log(data);
                    sessionStorage.pass = data.password;
                    sessionStorage.mobile = data.mobile;
                    sessionStorage.email = data.email;
                    sessionStorage.userDesignationID=data.employees[0].login.userDesignationID;
                    //console.log(data.employees[0].login.userDesignationID);
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    getPasswordFromLogin();

    var updateLoginPassword = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/update/employeeID/"+localStorage.userId,
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: localStorage.userId,
                username: localStorage.username,
                password: $("#newpass").val(),
                userDesignationID: sessionStorage.userDesignationID,
                
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if($("#oldpass").val()==localStorage.pass)
                {
                    if (xhr.status == 200) {
                        $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Password Updated</div>");
                       
                    } 
                    else {
                        alert("Something Went Wrong.");
                    }
                }
                else
                {
                    alert("Wrong Old Password");
                }
            }
        });
    }
    $("#btnconfirm").on("click",function(){
        updateLoginPassword();
    });
});