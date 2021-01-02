$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
    }

    $('#content').load("../adminnav.html");

    
    //LOAD PENDING LIST
    var loadAllCustomers = function () {
        $.ajax({
            url: "https://localhost:44308/api/customers",
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
                            icon = '<i class="fas fa-pause" style="color: #7d821e;"></i>';

                            if(data[i].login.registrationStatusID == 1)
                            {
                                str += "<tr>"+
                                        "<td align='center'>"+ sl + "</td>"+
                                        "<td>"+ data[i].login.username/*data[i].login.username.substr(0,180)*/ +"</td>"+
                                        "<td>"+ data[i].name+ "</td>"+
                                        "<td>" + data[i].address + "</td>"+
                                        "<td align='center'>" + icon + "</td>"+
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detail' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
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
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    loadAllCustomers();


    //Aprove All Pendings
    var AcceptAll = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/pending/acceptAll/customers",
            method: "PUT",
            header: "Content-Type:application/json",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadAllCustomers();
                    alert("All Pending Requests Accepted.");
                } 
                else {
                    alert("Error Proccessing.");
                }
            }
        });
    }
    $("#btnacceptall").on("click",function(){
        AcceptAll();
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
    $('#detail').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        loadCustomerDetails(id);
    });

    var Approve = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/pending/accept/user/"+$("#editloginid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    alert("`"+$("#editusername").val()+"` Accepted.");
                    loadAllCustomers();
                    
                } 
                else {
                    alert("Error Proccessing.");
                }
            }
        });
    }
    $("#btnactive").on("click",function(){
        Approve();
    });

    var Reject = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/pending/reject/user/"+$("#editloginid").val(),
            method: "DELETE",
            header: "Content-Type:application/json",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    alert("`"+$("#editusername").val()+"` Rejected.");
                    loadAllCustomers();
                   
                } 
                else {
                    alert("Error Proccessing.");
                }
            }
        });
    }
    $("#btndeactive").on("click",function(){
        if (confirm("Deny Customer Registration?"))
        {
            Reject();
        }  
    });

});