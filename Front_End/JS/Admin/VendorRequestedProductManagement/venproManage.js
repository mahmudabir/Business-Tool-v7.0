$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
    }

    $('#content').load("../adminnav.html");

    
    //LOAD PENDING PRODUCTS LIST
    var loadAllProducts = function () {
        $.ajax({
            url: "https://localhost:44308/api/products",
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
                    var count = 0;
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            if(data[i].productStatusID == 2)
                            {
                                icon = '<i style="color: red;" class="fas fa-ban"></i>';
                            } 
                            

                            if(data[i].productStatusID == 2)
                            {
                                str += "<tr>"+
                                        "<td align='center'>"+ sl + "</td>"+
                                        "<td>"+ data[i].name+ "</td>"+
                                        "<td>"+ data[i].vendor.name+ "</td>"+
                                        "<td>" + data[i].login.username + "</td>"+
                                        "<td>" + data[i].sellPrice + "</td>"+
                                        "<td align='center'>" + icon + "</td>"+
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailCustomer' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
                                "</tr>";
                                count++;
                            }
                            
                            sl++;
                        }

                        if(count < 1)
                        {
                            str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
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
    loadAllProducts();

    //Load Pending Products By Company Name
    var loadAllProductsByCompanyName = function () {
        if($.trim($("#search").val()) != "")
        {
            $.ajax({
                url: "https://localhost:44308/api/customers/name/"+$("#search").val(),
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
                        var count = 0;
                        
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

                                if(data[i].login.registrationStatusID == 2)
                                {
                                    str += "<tr>"+
                                            "<td align='center'>"+ sl + "</td>"+
                                            "<td>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</td>"+
                                            "<td>"+ data[i].name+ "</td>"+
                                            "<td>" + data[i].address + "</td>"+
                                            "<td align='center'>" + icon + "</td>"+
                                            "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailCustomer' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
                                    "</tr>";
                                    count++;
                                }
                                
                                sl++;
                            }

                            if(count < 1)
                            {
                                str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
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
            loadAllCustomers();
        }
    }
    $("#search").on("keyup change",function(){
        loadAllProductsByCompanyName();
    });


    //Load Details Modal
    var loadCustomerDetails = function(id){
        $.ajax({
            url: "https://localhost:44308/api/customers/id/"+id,
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
                        $("#editid").val(data[0].id);//CUSTOMER
                        $("#editfullname").val(data[0].name);
                        $("#editcontact").val(data[0].login.mobile);
                        $("#editemail").val(data[0].login.email);
                        $("#editaddress").val(data[0].address);
                        $("#editjoindate").val(data[0].joinDate);
                        $("#editenrollby").val(data[0].addeddBy);
                        if(data[0].login.accessStatusID == '1')
                        {                    
                            $("#enableMesg").attr("hidden", "hidden");
                            $("#disableMesg").attr("hidden", "hidden");
                            $("#btnactive").attr("hidden", "hidden");
                            $("#btndeactive").removeAttr("hidden", "hidden");
                        }
                        else if(data[0].login.accessStatusID == 2)
                        {
                            $("#enableMesg").attr("hidden", "hidden");
                            $("#disableMesg").attr("hidden", "hidden");
                            $("#btndeactive").attr("hidden", "hidden");
                            $("#btnactive").removeAttr("hidden", "hidden");
                        }
                        else
                        {
                            $("#enableMesg").attr("hidden", "hidden");
                            $("#disableMesg").attr("hidden", "hidden");
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
    $('#detailCustomer').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        loadCustomerDetails(id);
    });


    //Login Access Controlling
    var EnableCustomerLogin = function () {
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
                    loadAllCustomerByName();
                    $("#enableMesg").removeAttr("hidden", "hidden");
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
        EnableCustomerLogin();
    });

    var DisbaleCustomerLogin = function () {
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
                    loadAllCustomerByName();
                    $("#disableMesg").removeAttr("hidden", "hidden");
                    $("#enableMesg").attr("hidden", "hidden");

                    $("#btndeactive").attr("hidden", "hidden");
                    $("#btnactive").removeAttr("hidden", "hidden");

                } 
            }
        });
    }
    $("#btndeactive").on("click",function(){
        DisbaleCustomerLogin();
    });

});