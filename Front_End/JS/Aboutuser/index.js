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
                url: "https://localhost:44308/api/employees/"+localStorage.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                    
                        var data = xhr.responseJSON;
                        console.log(data);
                        //if(data.length>0)
                        //{
                            $("#username").val(data.login.username);
                            $("#name").val(data.name);
                            console.log(data.name);
                            $("#mobile").val(data.login.mobile);
                            $("#email").val(data.login.email);
                            $("#joindate").val(data.joinDate);
                        // }
                        // else
                        // {
                        //     alert("User Not Found");
                        // }
                    }
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
        }
        loadUserInfo();


    $("#divedit").hide();
    $("#btnedit").click(function () {
        $("#divshow").hide();
        $("#divedit").show();
    })

});