$(document).ready(function () {
    if (localStorage.authUser != null) {
        window.location.replace = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Index.html";
    }

    $("#divregister").hide();


    $("#gotoregister").click(function () {
        $("#divlogin").hide();
        $("#divregister").show();
    })

    $("#gotologin").click(function () {
        $("#divregister").hide();
        $("#divlogin").show();
    })




    var loadLogin = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/login",
            method: "POST",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#username").val() + ":" + $("#password").val()),
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    localStorage.authUser = btoa($("#username").val() + ":" + $("#password").val());

                    console.log(xhr);


                    var user = xhr.responseJSON;
                    localStorage.userId = user.id;
                    localStorage.username = user.username;

                    console.log(localStorage.userId);
                    console.log(localStorage.username);
                    console.log(localStorage.authUser);
                    console.log("Login Success");

                    console.log(xhr);

                    window.location.href = "Index.html";
                    $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Logged In</div>");
                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    var insertInCustomer = function () {
        $.ajax({
            url: "https://localhost:44308/api/customers/register",
            method: "POST",
            data: {
                name: $("#regname").val(),
                //joinDate: "1-1-1",
                joinDate: Date.now().toString(),
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#regusername").val() + ":" + $("#regpassword").val()),
            },
            complete: function (xhr2, status) {
                if (xhr2.status == 201) {
                    console.log("Customer Table Data insert Success");

                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Successfully Registered</div>");
                }
                else {
                    console.log(xhr2);
                    //$("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }


    var loadRegister = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/register",
            method: "POST",
            data: {
                email: $("#regemail").val(),
                mobile: $("#regmobile").val(),
                username: $("#regusername").val(),
                password: $("#regpassword").val(),
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#regusername").val() + ":" + $("#regpassword").val()),
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    console.log("Login Table Data insert Success");
                    insertInCustomer();
                }
                else {
                    console.log(xhr);
                }
            }
        });
    }







    $("#btnlogin").click(function () {
        loadLogin();
    });
    $("#btnregister").click(function () {
        loadRegister();
    });

    //$("#btnlogin2").click(function () {
    //    loadLogin();
    //});
    //$("#btnregister2").click(function () {
    //    loadRegister();
    //});

    $("#msg").click(function () {
        $(this).hide();
    });
});