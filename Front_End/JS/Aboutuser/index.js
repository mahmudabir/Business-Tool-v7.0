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

        //Load Profile Info
        var loadUserInfo = function(){
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
                        $("#username").val(data.username);
                        $("#editusername").val(data.username);
                        $("#mobile").val(data.mobile);
                        $("#editmobile").val(data.mobile);
                        $("#email").val(data.email);
                        $("#editemail").val(data.email);
                        if(localStorage.userRole!=5)
                        {
                            sessionStorage.id= data.employees[0].id;
                            sessionStorage.userDesignationID = data.employees[0].login.userDesignation.id;
                            console.log(data.employees[0].login.userDesignation.id);
                            $("#name").val(data.employees[0].name);
                            $("#editname").val(data.employees[0].name);
                            $("#joindate").val(data.employees[0].joinDate);
                            $("#editjoindate").val(data.employees[0].joinDate);
                        }
                        else
                        {
                            sessionStorage.id= data.customers[0].id;
                            sessionStorage.userDesignationID = data.customers[0].login.userDesignation.id;
                            console.log(data.customers[0].login.userDesignation.id);
                            $("#name").val(data.customers[0].name);
                            $("#editname").val(data.customers[0].name);
                            $("#joindate").val(data.customers[0].joinDate);
                            $("#editjoindate").val(data.customers[0].joinDate);
                        }
                    }
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
            
        }
        loadUserInfo();
        //Load Profile Info

        // update profile info

        var updateEmployeeDetails = function () {
            $.ajax({
                url: "https://localhost:44308/api/employees/update/employeeID/"+sessionStorage.id,
                method: "PUT",
                header: "Content-Type:application/json",
                data: {
                    id: sessionStorage.id,
                    name: $("#editname").val(),
                    joinDate: $("#editjoindate").val()
                },
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        loadUserInfo();
                    } 
                    else {
                        alert("Fill Correctly.");
                    }
                }
            });
        }
        var updateCustomerDetails = function () {
            $.ajax({
                url: "https://localhost:44308/api/customers/update/customerID/"+sessionStorage.id,
                method: "PUT",
                header: "Content-Type:application/json",
                data: {
                    id: sessionStorage.id,
                    name: $("#editname").val(),
                    joinDate: $("#editjoindate").val()
                },
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        loadUserInfo();
                    } 
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
        }

    var updateLoginDetails = function () {
        // if ($("#editname").val() != "" && $("#editemail").val() != "" && $("#editmobile").val() != "")
        // {
            $.ajax({
                url: "https://localhost:44308/api/logins/update/employeeID/"+localStorage.userId,
                method: "PUT",
                header: "Content-Type:application/json",
                data: {
                    id: localStorage.userId,
                    username: $("#editusername").val(),
                    email: $("#editemail").val(),
                    mobile: $("#editmobile").val(),
                    userDesignationID: sessionStorage.userDesignationID,
                    
                },
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        
                        if(localStorage.userRole!=5)
                        {
                            updateEmployeeDetails();
                            sessionStorage.clear();
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Succssfully Update User Info</div>");
                        }
                        else
                        {
                            updateCustomerDetails();
                            sessionStorage.clear();
                            $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Succssfully Update User Info</div>");
                        }
                    } 
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
        // }
        // else
        // {
        //     if ($("#editname").val() == "") {
        //         $("#msg1").html("*This Field Can't be Empty");
        //     }
        //     if ($("#editemail").val() == "") {
        //         $("#msg2").html("*This Field Can't be Empty");
        //     }
        //     if ($("#editmobile").val() == "") {
        //         $("#msg3").html("*This Field Can't be Empty");
        //     }
        // }
        
    }
    $("#btnsave").on("click",function(){
        updateLoginDetails();
    });
    // $("#editname").keyup(function () {
    //     $("#msg1").hide();
    // })
    // $("#editemail").keyup(function () {
    //     $("#msg2").hide();
    // })
    // $("#editmobile").keyup(function () {
    //     $("#msg3").hide();
    // })

        // update profile info
        




    $("#divedit").hide();
    $("#btnedit").click(function () {
        $("#divshow").hide();
        $("#divedit").show();
    })

});