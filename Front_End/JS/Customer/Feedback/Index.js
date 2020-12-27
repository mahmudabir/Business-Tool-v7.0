$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Authentication.html";
    }

    var cid = 0;

    var loadUser = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/logins/" + localStorage.userId,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr1, status) {
                if (xhr1.status == 200) {
                    console.log(xhr1.responseJSON);

                    var data = xhr1.responseJSON;

                    cid = data.customers[0].id;
                    console.log(data.customers[0].id)


                    $("#username").text(data.customers[0].name);
                    $("#image").attr("src", data.customers[0].image);


                }
                else {
                    console.log(xhr1);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr1.responseJSON.message + "</div>");
                }
            }
        });
    }

    loadUser();



    var sendFeedback = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/feedbacks",
            method: "POST",
            header: "Content-Type:application/json",
            data: {
                email: $("#email").val(),
                subject: $("#subject").val(),
                description: $("#description").val(),
                customerID: cid
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr2, status) {
                if (xhr2.status == 201) {
                    console.log("Success:   " + xhr2.responseJSON);
                    console.log("Successfully Posted");
                    $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Successfully Sent</div>");
                    loadUser();
                }
                else {
                    console.log("Error:   " + xhr2.responseJSON);

                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Please Fill up all the fields.</div>");
                }
            }
        });
    }








    $("#btnSend").click(function () {
        sendFeedback();
    });



    $("#msg").click(function () {
        $(this).attr("hidden", "hidden");
    });


});