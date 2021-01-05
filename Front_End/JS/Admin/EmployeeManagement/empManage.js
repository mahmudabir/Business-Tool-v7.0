$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
    }

    $('#content').load("../adminnav.html");

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
          return false;
        }else{
          return true;
        }
      }
    //LOAD EMPLOYEES LIST
    var loadPrintEmployees = function () {
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
                    var icon = "";
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            $("#btnprint").removeAttr("hidden", "hidden");
                            if(data[i].login.accessStatusID == 1)
                            {
                                icon = '<i style="color: green;" class="fas fa-user-check"></i>';
                            } 
                            else
                            {
                                icon = '<i style="color: red;" class="fas fa-user-slash"></i>';
                            }
                            str += "<tr>"+
                                        "<td align='center'>"+ sl + "</td>"+
                                        "<td>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</td>"+
                                        "<td>"+ data[i].name+ "</td>"+
                                        "<td>" + data[i].login.userDesignation.designation + "</td>"+
                                        "<td align='center'>" + data[i].login.accessStatus.status+ "</td>"+
                                        "<td>" + data[i].login.email + "</td>"+
                                        "<td>" + data[i].login.mobile + "</td>"+
                                        "<td>" + data[i].joinDate + "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        $("#btnprint").attr("hidden", "hidden");
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#printtable tbody").html(str);
                }
                else 
                {
                    alert("No Data Found.");
                    $("#printtable tbody").html("<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>");
                }
            }
        });
    }
    loadPrintEmployees();

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
                    var icon = "";
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            if(data[i].login.accessStatusID == 1)
                            {
                                icon = '<i style="color: green;" class="fas fa-user-check"></i>';
                            } 
                            else
                            {
                                icon = '<i style="color: red;" class="fas fa-user-slash"></i>';
                            }
                            str += "<tr>"+
                                        "<td align='center'>"+ sl + "</td>"+
                                        "<td>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</td>"+
                                        "<td>"+ data[i].name+ "</td>"+
                                        "<td>" + data[i].login.userDesignation.designation + "</td>"+
                                        "<td align='center'>" + icon + "</td>"+
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailEmployee' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#emptable tbody").html(str);
                }
                else 
                {
                    alert("No Data Found.");
                    $("#emptable tbody").html("<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>");
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
                            $('#editrole').append(`<option value="${data[i].id}">  ${data[i].designation} </option>`); 
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
        if($.trim($("#search").val()) != "")
        {
            $.ajax({
                url: "https://localhost:44308/api/employees/name/"+$("#search").val(),
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
                        var icon = "";
                        
                        if(data.length>0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                
                                if(data[i].login.accessStatusID == 1)
                                {
                                    icon = '<i style="color: green;" class="fas fa-user-check"></i>';
                                } 
                                else
                                {
                                    icon = '<i style="color: red;" class="fas fa-user-slash"></i>';
                                }
                                str += "<tr>"+
                                            "<td align='center'>"+ sl + "</td>"+
                                            "<td>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</td>"+
                                            "<td>"+ data[i].name+ "</td>"+
                                            "<td>" + data[i].login.userDesignation.designation + "</td>"+
                                            "<td align='center'>" + icon + "</td>"+
                                            "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailEmployee' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
                                    "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                        }

                        $("#emptable tbody").html(str);
                    }
                    else {
                        alert("No Data Found.");
                        $("#emptable tbody").html("<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>");
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
        //1 ADD EMPLOYEE
    var insertInEmployee = function (id) {
        $.ajax({
            url: "https://localhost:44308/api/employees/register",
            method: "POST",
            data: {
                name: $("#fullname").val(),
                salary: $("#salary").val(),
                addeddBy: localStorage.userId,
                joinDate: "1-1-1",
                loginId: id,
                image: ''
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    console.log("Added"); 

                    loadAllEmployees();

                    $("#insertMesg").removeAttr("hidden", "hidden");
                    alert("Username: `"+$("#username").val()+"`\nPassword: 123456789");      

                }
                else {
                    $("#insertMesg").attr("hidden", "hidden");
                    alert("Check Username/Email."); 
                    console.log(xhr);
                }
            }
        });
    }
        //2 ADD LOGIN
    var insertLogin = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/register/employee",
            method: "POST",
            data: {
                email: $("#email").val(),
                mobile: $("#contact").val(),
                username: $("#username").val(),
                password: "123456789",
                accessStatusId: "1",
                registrationStatusId: "2",
                userDesignationId: $("#role").val()
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    insertInEmployee(xhr.responseJSON.id);
                }
                else {
                    alert("Unique Username/Email/Mobile No. Required."); 
                    console.log(xhr);
                }
            }
        });
    }
    $("#btnadd").on("click",function(){
        ///Validation
        var error = false;
        var msg = "";
        //Input Check
        if($.trim($("#username").val()).length <4)
        {
            error = true;
            msg += "# Valid Username Required.\n";
        }
        if($.trim($("#fullname").val()).length <1)
        {
            error = true;
            msg += "# Name Required.\n";
        }
        if($.trim($("#contact").val()).length != 11)
        {
            error = true;
            msg += "# Valid Contact Required.\n";
        }
        if($.trim($("#email").val()).length < 5)
        {
            error = true;
            msg += "# Valid Email Required.\n";
        }
        if(!IsEmail($("#email").val()))
        {
            error = true;
            msg += "# Invalid Mail Formate.\n";
        }
        if($.trim($("#role").val()).length < 1)
        {
            error = true;
            msg += "# Designation Required.\n";
        }
        if($("#salary").val() < 1)
        {
            error = true;
            msg += "# Valid Salary Required.\n";
        }
        //Error Check
        if(!error)
        {
            insertLogin();
        }
        else
        {
            alert(msg);
            loadAllEmployees();
        }
        
    }); 


    //Load Details Modal
    var loadEmployeeDetails = function(id){
        $.ajax({
            url: "https://localhost:44308/api/employees/id/"+id,
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
                        $("#editusername").val(data[0].login.username);
                        $("#editloginid").val(data[0].loginID);//LOGIN
                        $("#editid").val(data[0].id);//EMPLOYEE
                        $("#editfullname").val(data[0].name);
                        $("#editcontact").val(data[0].login.mobile);
                        $("#editemail").val(data[0].login.email);
                        $("#editsalary").val(data[0].salary);
                        $("#editjoindate").val(data[0].joinDate);
                        $("#editenrollby").val(data[0].addeddBy);
                        $('#editrole option[value="'+data[0].login.userDesignationID+'"]').attr("selected", "selected");
                        if(data[0].login.accessStatusID == '1')
                        {                    
                            $("#updateMesg").attr("hidden", "hidden");
                            $("#enableMesg").attr("hidden", "hidden");
                            $("#disableMesg").attr("hidden", "hidden");
                            $("#btnactive").attr("hidden", "hidden");
                            $("#btndeactive").removeAttr("hidden", "hidden");
                            $("#btnupdate").removeAttr("hidden", "hidden");
                        }
                        else if(data[0].login.accessStatusID == 2)
                        {
                            $("#updateMesg").attr("hidden", "hidden");
                            $("#enableMesg").attr("hidden", "hidden");
                            $("#disableMesg").attr("hidden", "hidden");
                            $("#btndeactive").attr("hidden", "hidden");
                            $("#btnactive").removeAttr("hidden", "hidden");
                            $("#btnupdate").removeAttr("hidden", "hidden");
                        }
                        else
                        {
                            $("#updateMesg").attr("hidden", "hidden");
                            $("#enableMesg").attr("hidden", "hidden");
                            $("#disableMesg").attr("hidden", "hidden");
                            $("#btnupdate").attr("hidden", "hidden");
                            $("#btndeactive").attr("hidden", "hidden");
                            $("#btnactive").attr("hidden", "hidden");
                        }

                        if(data[0].loginID == localStorage.userId)
                        {
                            $("#btndeactive").attr("disabled", "disabled");
                            $("#editrole").attr("disabled", "disabled");
                        }
                        else
                        {
                            $("#btndeactive").removeAttr("disabled", "disabled");
                            $("#editrole").removeAttr("disabled", "disabled");
                        }
                    }
                    else
                    {
                        alert("User Not Found");
                    }
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    $('#detailEmployee').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        loadEmployeeDetails(id);
    });


    //UPDATE EMPLOYEE DETAILS
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
                    console.log(localStorage.user);
                    window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
                } else {
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xmlhttp.status + ":" + xmlhttp.statusText + "</div>");
                }
            }
        })
    }
    var updateEmployeeDetails = function () {
            $.ajax({
                url: "https://localhost:44308/api/employees/update/employeeID/"+$("#editid").val(),
                method: "PUT",
                header: "Content-Type:application/json",
                data: {
                    id: $("#editid").val(),
                    name: $("#editfullname").val(),
                    salary: $("#editsalary").val(),
                    addeddBy: $("#editenrollby").val(),
                    loginID: $("#editloginid").val(),
                    image: "",
                    joinDate: $("#editjoindate").val()
                },
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        loadAllEmployees();
                        $("#updateMesg").removeAttr("hidden", "hidden");
                        $("#enableMesg").attr("hidden", "hidden");
                        $("#disableMesg").attr("hidden", "hidden");
                    } 
                    else {
                        alert("Fill Correctly.");
                        alert("Unique Username/Email/Mobile No. Required."); 
                    }
                }
            });
    }
    var updateLoginDetails = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/update/employeeID/"+$("#editloginid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editloginid").val(),
                username: $("#editusername").val(),
                email: $("#editemail").val(),
                mobile: $("#editcontact").val(),
                userDesignationID: $("#editrole").val()
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    updateEmployeeDetails();
                } 
                else {
                    alert("Fill Correctly.");
                    alert("Unique Username/Email/Mobile No. Required."); 
                }
            }
        });
    }
    $("#btnupdate").on("click",function(){
        ///Validation
        var error = false;
        var msg = "";
        //Input Check
        if($.trim($("#editusername").val()).length < 4)
        {
            error = true;
            msg += "# Valid Username Required.\n";
        }
        if($.trim($("#editfullname").val()).length <1)
        {
            error = true;
            msg += "# Name Required.\n";
        }
        if($.trim($("#editcontact").val()).length != 11)
        {
            error = true;
            msg += "# Valid Contact Required.\n";
        }
        if($.trim($("#editemail").val()).length < 5)
        {
            error = true;
            msg += "# Valid Email Required.\n";
        }
        if(!IsEmail($("#editemail").val()))
        {
            error = true;
            msg += "# Invalid Mail Formate.\n";
        }
        if($.trim($("#editrole").val()).length < 1)
        {
            error = true;
            msg += "# Designation Required.\n";
        }
        if($("#editsalary").val() < 1)
        {
            error = true;
            msg += "# Valid Salary Required.\n";
        }
        //Error Check
        if(!error)
        {
            updateLoginDetails();
        }
        else
        {
            alert(msg);
            loadAllEmployees();
        }
    });

    //Login Access Controlling
    var EnableEmployeeLogin = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/enable/user/"+$("#editloginid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editloginid").val(),
                username: $("#editusername").val(),
                email: $("#editemail").val(),
                mobile: $("#editcontact").val(),
                userDesignationID: $("#editrole").val()
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadAllEmployees();
                    $("#enableMesg").removeAttr("hidden", "hidden");
                    $("#updateMesg").attr("hidden", "hidden");
                    $("#disableMesg").attr("hidden", "hidden");

                    $("#btndeactive").removeAttr("hidden", "hidden");
                    $("#btnactive").attr("hidden", "hidden");

                    
                } 
                else {
                    alert("Error Proccessing.");
                }
            }
        });
    }
    $("#btnactive").on("click",function(){
        EnableEmployeeLogin();
    });

    var DisbaleEmployeeLogin = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/disable/user/"+$("#editloginid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editloginid").val(),
                username: $("#editusername").val(),
                email: $("#editemail").val(),
                mobile: $("#editcontact").val(),
                userDesignationID: $("#editrole").val()
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadAllEmployees();
                    $("#disableMesg").removeAttr("hidden", "hidden");
                    $("#updateMesg").attr("hidden", "hidden");
                    $("#enableMesg").attr("hidden", "hidden");

                    $("#btndeactive").attr("hidden", "hidden");
                    $("#btnactive").removeAttr("hidden", "hidden");

                    if($("#editloginid").val() == localStorage.userId)
                    {
                        alert("System Logged Out.");
                        loadLogout();
                    }
                } 
                else {
                    alert("Error Proccessing.");
                }
            }
        });
    }
    $("#btndeactive").on("click",function(){
        DisbaleEmployeeLogin();
    });


    // var Print = function (id) {
    //     html2canvas($('#hide')[0], {
    //         //windowWidth: 1200,
    //         windowHeight: 1200,
    //         onrendered: function (canvas) {
    //             var data = canvas.toDataURL();
    //             var docDefinition = {
    //                 content: [{
    //                     image: data,
    //                     width: 500,
    //                     windowHeight: 500
    //                 }]
    //             };
    //             pdfMake.createPdf(docDefinition).print(id+".pdf");
    //             $("#hide").attr("hidden", "hidden");
    //         }
    //     });
    // }
    

    function savePDF()
    {
        var sTable = document.getElementById('hide').innerHTML;
        var style = "<style>";
        style = style + "table{width: 100%;font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;border-collapse: collapse;font-style: bold;}";
        style = style + "table th {border: 2px solid #000000;}";
        style = style + "table td{border: 2px solid #000000;padding: 8px;}";
        //style = style + "table tr:nth-child(even) {background-color: #f2f2f2;}";
        //style = style + "table tr:nth-child(odd) {background-color: #E6E6FA;}";
        style = style + "table th {padding-top: 8px;padding-bottom: 8px;text-align: center;background-color: #000000;color: white;}";
        style = style + "</style>";


        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write('<title>PDF</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.

        //$("#hide").attr("hidden", "hidden"); 
    }
    $("#btnprint").on("click",function(){
        //$("#hide").removeAttr("hidden", "hidden");
        savePDF();
        //$("#hide").attr("hidden", "hidden"); 
        
    });

});