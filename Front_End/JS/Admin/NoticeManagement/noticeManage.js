$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
    }

    $('#content').load("../adminnav.html");

    //LOAD LIST
    var loadAllNotice = function () {
        $.ajax({
            url: "https://localhost:44308/api/notices",
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
                                        "<td align='center'>"+ sl + "</td>"+
                                        "<td>"+ data[i].subject/*data[i].login.username.substr(0,180)*/ +"</td>"+
                                        "<td align='center'>"+ data[i].postDate +"</td>"+
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailEmployee' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
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
                    str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    $("#emptable tbody").html(str);
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    loadAllNotice();


    
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


    //ADD Notice
    
    var insertLogin = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/notices",
            method: "POST",
            data: {
                subject: $("#subject").val(),
                description: $("#content").val(),
                employeeID: 1
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    insertInEmployee(xhr.responseJSON.id);
                }
                else {
                    alert("Check Username/Email."); 
                    console.log(xhr);
                }
            }
        });
    }
    $("#btnadd").on("click",function(){
        insertLogin();
    }); 


    //Load Details Modal
    var loadNoticeDetails = function(id){
        $.ajax({
            url: "https://localhost:44308/api/notices/id/"+id,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;
                    
                    if(data != null)
                    {
                        
                        $("#editid").val(data.id);
                        $("#editsubject").val(data.subject);
                        $("#editcontent").val(data.description);
                        
                        
                        $("#updateMesg").attr("hidden", "hidden");    
                        $("#disableMesg").attr("hidden", "hidden");
                        $("#btnactive").attr("hidden", "hidden");                   
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
        loadNoticeDetails(id);
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
                }
            }
        });
    }
    $("#btnupdate").on("click",function(){
        updateLoginDetails();
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