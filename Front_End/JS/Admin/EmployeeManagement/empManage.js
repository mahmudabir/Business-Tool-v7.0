$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "../../Login/Authentication.html";
    }

    $('#content').load("../adminnav.html");

    //LOAD EMPLOYEES LIST
    var loadAllEmployees = function () {
        $.ajax({
            url: "https://localhost:44308/api/employees",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';
                    var sl = 1;
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            
                            str += "<tr>"+
                                        "<td>"+ sl + "</td>"+
                                        "<td><p>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</p></td>"+
                                        "<td>"+ data[i].name+ "</td>"+
                                        "<td>" + data[i].login.userDesignation.designation + "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#emptable tbody").html(str);
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    loadAllEmployees();


    //LOAD EMPLOYEES DESIGNATIONS LIST
    var loadAllDesignations = function () {
        $.ajax({
            url: "https://localhost:44308/api/designations",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length-2; i++) 
                        {
                            
                            $('#role').append(`<option value="${data[i].id}">  ${data[i].designation} </option>`); 
                        }
                    }
                    
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    loadAllDesignations();


    //Load Employees By Name
    var loadAllEmployeesByName = function () {
        if($.trim($("#search").val()) !== "")
        {
            $.ajax({
                url: "https://localhost:44308/api/employees/"+$("#search").val(),
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        console.log(xhr.responseJSON);
    
                        var data = xhr.responseJSON;
    
                        var str = '';
                        var sl = 1;
                        
                        if(data.length>0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                
                                str += "<tr>"+
                                            "<td>"+ sl + "</td>"+
                                            "<td><p>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</p></td>"+
                                            "<td>"+ data[i].name+ "</td>"+
                                            "<td>" + data[i].login.userDesignation.designation + "</td>"+
                                    "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                        }

                        $("#emptable tbody").html(str);
                    }
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
        }
        
        else
        {
            loadAllEmployees();
        }
    }
    $("#search").on("keyup change",function(){
        loadAllEmployeesByName();
    }); 

    //ADD EMPLOYEE
        //1 ADD LOGIN
    var insertLogin = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/register",
            method: "POST",
            data: {
                email: $("#email").val(),
                mobile: $("#contact").val(),
                username: $("#username").val(),
                password: "12345",
                accessStatusId: "1",
                registrationStatusId: "2",
                userDesignationId: $("#role").val()
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#username").val() + ":" + "12345"),
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                   alert("Asigned...");
                    //insertInCustomer();
                }
                else {
                    console.log(xhr);
                }
            }
        });
    }
    $("#btnadd").on("click",function(){
        insertLogin();
    }); 

});