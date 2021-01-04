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


    
    //Load By Subject
    var loadAllNoticeBySubject = function () {
        if($.trim($("#search").val()) != "")
        {
            $.ajax({
                url: "https://localhost:44308/api/notices/subject/"+$("#search").val(),
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
        
        else
        {
            loadAllNotice();
        }
    }
    $("#search").on("keyup change",function(){
        loadAllNoticeBySubject();
    });


    //ADD Notice
    
    var insertNotice = function () {
        $.ajax({
            url: "https://localhost:44308/api/notices/create",
            method: "POST",
            data: {
                subject: $("#subject").val(),
                description: $("#des").val(),
                employeeID: localStorage.userId,
                postDate: ""
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    $("#insertMesg").removeAttr("hidden", "hidden"); 
                    loadAllNotice();
                }
                else {
                    $("#insertMesg").attr("hidden", "hidden"); 
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    $("#btnadd").on("click",function(){
        ///Validation
        var error = false;
        var msg = "";
        //Input Check
        if($.trim($("#subject").val()).length <1)
        {
            error = true;
            msg += "# Subject Required.\n";
        }
        if($.trim($("#des").val()) == "")
        {
            error = true;
            msg += "# Notice Content Required.\n";
        }
        //Error Check
        if(!error)
        {
            insertNotice();
        }
        else
        {
            alert(msg);
            loadAllNotice();
        }
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


    //UPDATE NOTICE DETAILS
    var updateNoticeDetails = function () {
        $.ajax({
            url: "https://localhost:44308/api/notices/id/"+$("#editid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editid").val(),
                subject: $("#editsubject").val(),
                description: $("#editcontent").val(),
                employeeID: localStorage.userId,
                postDate: ""
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    $("#updateMesg").removeAttr("hidden", "hidden");    
                    $("#disableMesg").attr("hidden", "hidden");
                    loadAllNotice();
                } 
                else {
                    alert("Fill Correctly.");
                }
            }
        });
    }
    $("#btnupdate").on("click",function(){
        ///Validation
        var error = false;
        var msg = "";
        //Input Check
        if($.trim($("#editsubject").val()).length <1)
        {
            error = true;
            msg += "# Subject Required.\n";
        }
        if($.trim($("#editcontent").val()) == "")
        {
            error = true;
            msg += "# Notice Content Required.\n";
        }
        //Error Check
        if(!error)
        {
            updateNoticeDetails();
        }
        else
        {
            alert(msg);
            loadAllNotice();
        }
    });

    //DELETE
    var DeleteNotice = function () {
        $.ajax({
            url: "https://localhost:44308/api/notices/delete/id/"+$("#editid").val(),
            method: "DELETE",
            header: "Content-Type:application/json",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    $("#updateMesg").attr("hidden", "hidden");    
                    $("#disableMesg").removeAttr("hidden", "hidden");
                    loadAllNotice();
                   
                } 
                else {
                    alert("Error Proccessing.");
                }
            }
        });
    }
    $("#btndeactive").on("click",function(){
        if (confirm("Are you sure, you want to delete?"))
        {
            DeleteNotice();
        }  
    });

});