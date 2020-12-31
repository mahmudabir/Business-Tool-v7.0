$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "../../Login/index.html";
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
                                        "<td>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</td>"+
                                        "<td>"+ data[i].name+ "</td>"+
                                        "<td>" + data[i].login.userDesignation.designation + "</td>"+
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailEmployee' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
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
        if($.trim($("#search").val()) !== "")
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
                        
                        if(data.length>0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                
                                str += "<tr>"+
                                            "<td>"+ sl + "</td>"+
                                            "<td><p>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</p></td>"+
                                            "<td>"+ data[i].name+ "</td>"+
                                            "<td>" + data[i].login.userDesignation.designation + "</td>"+
                                            "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailEmployee' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
                                    "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
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
        //1 ADD EMPLOYEE
    var insertInEmployee = function () {
        $.ajax({
            url: "https://localhost:44308/api/employees/register",
            method: "POST",
            data: {
                name: $("#fullname").val(),
                salary: $("#salary").val(),
                addeddBy: localStorage.userId,
                joinDate: "1-1-1"
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#username").val() + ":" + "12345"),
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    console.log("Added"); 
                    loadAllEmployees();
                    alert("Employee `"+$("#username").val()+"` assigned.");      
                }
                else {
                    alert("Check Username/Email."); 
                    console.log(xhr);
                }
            }
        });
    }
        //2 ADD LOGIN
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
                    insertInEmployee();
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
                        $('#editrole option[value="'+data[0].login.userDesignationID+'"]').attr("selected", "selected");
                        if(data[0].login.accessStatusID == '1')
                        {
                            $("#btnactive").attr("hidden", "hidden");
                            $("#btndeactive").removeAttr("hidden", "hidden");
                            $("#btnupdate").removeAttr("hidden", "hidden");
                        }
                        else if(data[0].login.accessStatusID == 2)
                        {
                            $("#btndeactive").attr("hidden", "hidden");
                            $("#btnactive").removeAttr("hidden", "hidden");
                            $("#btnupdate").removeAttr("hidden", "hidden");
                        }
                        else
                        {
                            $("#btnupdate").attr("hidden", "hidden");
                            $("#btndeactive").attr("hidden", "hidden");
                            $("#btnactive").attr("hidden", "hidden");
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


    

});