$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "Authentication.html";
    }


    $("#btnEditProfile").attr("hidden", "hidden");
    $("#password").attr("readonly", "readonly");

    var loadUser = function () {
        $.ajax({
            url: "https://localhost:44308/api/logins/" + localStorage.userId,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    $("#userID").text(data.userId);
                    $("#username").val(data.username);
                    $("#password").val(data.password);


                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    loadUser();





    //var modifyUser = function () {
    //    $.ajax({
    //        url: "https://localhost:44345/api/logins/" + localStorage.userId,
    //        method: "PUT",
    //        header: "Content-Type:application/json",
    //        data: {
    //            id: localStorage.userId,
    //            username: $("#username").val(),
    //            password: $("#password").val(),

    //        },
    //        headers: {
    //            'Authorization': 'Basic ' + localStorage.authUser,
    //        },
    //        complete: function (xhr, status) {
    //            if (xhr.status == 200) {
    //                $("#msg").html("User Modified");
    //                $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Success: Successfully Updated</div>");
    //                localStorage.authUser = btoa($("#username").val() + ":" + $("#password").val());
    //                loadUser();
    //                console.log(xhr.responseJSON.password);
    //            } else {
    //                //$("#msg").html(xhr.state + ":" + xhr.statusText);
    //                $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
    //            }
    //        }
    //    });
    //}


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
                    window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/Authentication.html";
                } else {
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xmlhttp.status + ":" + xmlhttp.statusText + "</div>");
                }
            }
        })
    }

    $("#logout").click(function () {
        loadLogout();
    });









    $("#btnEnableEdit").click(function () {
        $("#password").removeAttr('disabled');
        $("#password").removeAttr('readonly');
        $("#password").attr('type', 'text');
        $("#btnEditProfile").removeAttr('hidden');
        $(this).hide();
    });


    $("#btnEditProfile").click(function () {


        modifyUser();
        $("#password").attr('disabled', 'disabled');
        $("#password").attr('type', 'password');
        $("#btnEnableEdit").show();
        $(this).hide();
    });










    $("#msg").click(function () {
        $(this).hide();
    });




});