$(document).ready(function () {
    if (localStorage.authUser != null) {
        window.location.replace = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Index.html";
    }

    if (sessionStorage.signup == "true") {
        $("#divlogin").hide();
        $("#divregister").show();
        sessionStorage.clear();
    }
    else {
        $("#divregister").hide();
        $("#divregistervendor").hide();
    }

    $("#gotoregister").click(function () {
        $("#divlogin").hide();
        $("#divregister").show();
        $("#divregistervendor").hide();
    })

    $("#gotologin").click(function () {
        $("#divregister").hide();
        $("#divregistervendor").hide();
        $("#divlogin").show();
    })

    $("#btnven").click(function () {
        $("#divregister").hide();
        $("#divregistervendor").show();
        $("#divlogin").hide();
    })

    $("#btncus").click(function () {
        $("#divregister").show();
        $("#divregistervendor").hide();
        $("#divlogin").hide();
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
                if ($("#username").val() != "" && $("#password").val() != "") {
                    if (xhr.status == 200) {
                        localStorage.authUser = btoa($("#username").val() + ":" + $("#password").val());

                        console.log(xhr);

                        var user = xhr.responseJSON;
                        localStorage.userId = user.id;
                        localStorage.username = user.username;
                        localStorage.userRole = user.userDesignationID;


                        console.log(localStorage.userId);
                        console.log(localStorage.username);
                        console.log(localStorage.authUser);
                        console.log("Login Success");

                        console.log(xhr);

                        //USER TYPE WISE REDIRECTION
                        if (localStorage.userRole == 1) {
                            window.location.href = "../../html/Admin";
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Logged In</div>");
                        }
                        else if (localStorage.userRole == 2) {
                            window.location.href = "../../html/Manager";
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Logged In</div>");
                        }
                        else if (localStorage.userRole == 3) {
                            window.location.href = "../../html/Salesman";
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Logged In</div>");
                        }
                        else if (localStorage.userRole == 4) {
                            window.location.href = "../../html/Deliveryman";
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Logged In</div>");
                        }
                        else if (localStorage.userRole == 5) {
                            window.location.href = "../../html/Customer";
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Logged In</div>");
                        }
                        else if (localStorage.userRole == 6) {
                            window.location.href = "../../html/Vendor";
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Logged In</div>");
                        }
                        else {
                            $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : Invalid Login</div>");
                        }
                    }
                    else {
                        console.log(xhr);
                        $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : Invalid Login</div>");
                    }
                }
                else {
                    if ($("#username").val() == "") {
                        $("#msg1").html("*Username Can't be Empty");
                    }
                    if ($("#password").val() == "") {
                        $("#msg2").html("*Password Can't be Empty");
                    }
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
                joinDate: "1-1-1"
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
                accessStatusId: "2",
                registrationStatusId: "1",
                userDesignationId: "5"
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#regusername").val() + ":" + $("#regpassword").val()),
            },
            complete: function (xhr, status) {
                if ($("#regname").val() != "" && $("#regemail").val() != "" && $("#regmobile").val() != "" && $("#regusername").val() != "" && $("#regpassword").val() != "") {
                    if (xhr.status == 201) {
                        console.log("Login For Customer Table Data insert Success");
                        insertInCustomer();
                    }
                    else {
                        console.log(xhr);
                    }
                }
                else {
                    if ($("#regname").val() == "") {
                        $("#msg11").html("*Full Name Can't be Empty");
                    }
                    if ($("#regemail").val() == "") {
                        $("#msg21").html("*Email Can't be Empty");
                    }
                    if ($("#regmobile").val() == "") {
                        $("#msg3").html("*Mobile No. Can't be Empty");
                    } if ($("#regusername").val() == "") {
                        $("#msg4").html("*Username Can't be Empty");
                    } if ($("#regpassword").val() == "") {
                        $("#msg5").html("*password Can't be Empty");
                    }
                }
            }
        });
    }

    // vendor register

    var insertInEmployee = function () {
        $.ajax({
            url: "https://localhost:44308/api/employees/register",
            method: "POST",
            data: {
                name: $("#venregname").val(),
                //joinDate: "1-1-1",
                joinDate: "1-1-1"
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#venregusername").val() + ":" + $("#venregpassword").val()),
            },
            complete: function (xhr2, status) {
                if (xhr2.status == 201) {
                    console.log("Employees Table Data insert Success");

                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Successfully Registered</div>");
                }
                else {
                    console.log(xhr2);
                    //$("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    var loadVendorRegister = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/register",
            method: "POST",
            data: {
                email: $("#venregemail").val(),
                mobile: $("#venregmobile").val(),
                username: $("#venregusername").val(),
                password: $("#venregpassword").val(),
                accessStatusId: "2",
                registrationStatusId: "1",
                userDesignationId: "6"
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#venregusername").val() + ":" + $("#venregpassword").val()),
            },
            complete: function (xhr, status) {
                if ($("#venregname").val() != "" && $("#venregemail").val() != "" && $("#venregmobile").val() != "" && $("#venregusername").val() != "" && $("#venregpassword").val() != "") {
                    if (xhr.status == 201) {
                        console.log("Login For Employees Table Data insert Success");
                        insertInEmployee();
                    }
                    else {
                        console.log(xhr);
                    }
                }
                else {
                    if ($("#venregname").val() == "") {
                        $("#msg6").html("*Full Name Can't be Empty");
                    }
                    if ($("#venregemail").val() == "") {
                        $("#msg7").html("*Email Can't be Empty");
                    }
                    if ($("#venregmobile").val() == "") {
                        $("#msg8").html("*Mobile No. Can't be Empty");
                    } if ($("#venregusername").val() == "") {
                        $("#msg9").html("*Username Can't be Empty");
                    } if ($("#venregpassword").val() == "") {
                        $("#msg10").html("*password Can't be Empty");
                    }
                }
            }
        });
    }



    //vendor register

    $("#username").keyup(function () {
        $("#msg1").hide();
    })
    $("#password").keyup(function () {
        $("#msg2").hide();
    })
    $("#regname").keyup(function () {
        $("#msg11").hide();
    })
    $("#regemail").keyup(function () {
        $("#msg21").hide();
    })
    $("#regmobile").keyup(function () {
        $("#msg3").hide();
    })
    $("#regusername").keyup(function () {
        $("#msg4").hide();
    })
    $("#regpassword").keyup(function () {
        $("#msg5").hide();
    })
    $("#venregname").keyup(function () {
        $("#msg6").hide();
    })
    $("#venregemail").keyup(function () {
        $("#msg7").hide();
    })
    $("#venregmobile").keyup(function () {
        $("#msg8").hide();
    })
    $("#venregusername").keyup(function () {
        $("#msg9").hide();
    })
    $("#venregpassword").keyup(function () {
        $("#msg10").hide();
    })

    $("#btnlogin").click(function () {
        loadLogin();

    });
    $("#btnregister").click(function () {
        loadRegister();
        // $("#divregister").hide();
        // $("#divregistervendor").hide();
        // $("#divlogin").show();
    });    
    $("#btnvenregister").click(function () {
        loadVendorRegister();
        // $("#divregister").hide();
        // $("#divregistervendor").hide();
        // $("#divlogin").show();
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