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
                    console.log(sessionStorage.pass);
                    // sessionStorage.mobile = data.mobile;
                    // sessionStorage.email = data.email;
                    // console.log(sessionStorage.mobile);
                    // console.log(sessionStorage.email);
                    // sessionStorage.userDesignationID=data.employees[0].login.userDesignationID;
                    // console.log(data.employees[0].login.userDesignationID);
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    getPasswordFromLogin();

    var loadLogout = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/logout",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xmlhttp, status) {
                if (xmlhttp.status == 200) {
                    console.log("Logout Success");
                    localStorage.clear();
                    sessionStorage.clear();
                    console.log(localStorage.user);
                    window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
                } else {
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xmlhttp.status + ":" + xmlhttp.statusText + "</div>");
                }
            }
        })
    }
    
    var updateLoginPassword = function () {
        if ($("#oldpass").val() != "" && $("#newpass").val() != "" && $("#confirmnewpass").val() != "")
        {
            if($("#oldpass").val()==sessionStorage.pass)
            {
                if($("#newpass").val()==$("#confirmnewpass").val())
                {
                    $.ajax({
                        url: "https://localhost:44308/api/logins/update/password/"+localStorage.userId,
                        method: "PUT",
                        header: "Content-Type:application/json",
                        data: {
                            id: localStorage.userId,
                            password: $("#confirmnewpass").val(),
                        },
                        headers: {
                            'Authorization': 'Basic ' + localStorage.authUser,
                        },
                        complete: function (xhr, status) {
                            if (xhr.status == 200) {
                                $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Password Updated</div>");
                                loadLogout();
                            } 
                            else {
                                alert("Something Went Wrong.");
                            }
                        }
                    });
                }
                else
                {
                    alert("New Password & Confirm Password Doesn't match")
                }
            }
            else
            {
                alert("Wrong Old Password");
            }
        }
        else
        {
            if ($("#oldpass").val() == "") {
                $("#msg1").html("*This Field Can't be Empty");
            }
            if ($("#newpass").val() == "") {
                $("#msg2").html("*This Field Can't be Empty");
            }
            if ($("#confirmnewpass").val() == "") {
                $("#msg3").html("*This Field Can't be Empty");
            }
        }
    }

    $("#oldpass").keyup(function () {
        $("#msg1").hide();
    })
    $("#newpass").keyup(function () {
        $("#msg2").hide();
    })
    $("#confirmnewpass").keyup(function () {
        $("#msg3").hide();
    })
    $("#btnconfirm").on("click",function(){
        updateLoginPassword();
    });
});