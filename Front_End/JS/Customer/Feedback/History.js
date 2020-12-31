$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
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

                    var data1 = xhr1.responseJSON;

                    cid = data1.customers[0].id;
                    console.log(data1.customers[0].id);
                    loadFeedbacksByCustomer();

                }
                else {
                    console.log(xhr1);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Could not get user data.</div>");
                }
            }
        });
    }



    var loadFeedbacksByCustomer = function () {
        $("#msg").removeAttr("hidden");


        $.ajax({
            url: "https://localhost:44308/api/customers/" + cid + "/feedbacks",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;
                    console.log(data);
                    console.log(cid);
                    var str = "";
                    for (var i = 0; i < data.length; i++) {

                        str += "<div class=\"media text-muted pt-3\">"
                            + "<p class=\"d-flex justify-content-between align-items-center w-100\">"
                            + "<strong class=\"d-block text-gray-dark\">"
                            + "<span>" + data[i].subject + "</span>"
                            + "</strong>"
                            //+ "<div><p >" + data[i].email + "</p></div>"
                            + "|<div class=\"col-md-8\"><p>" + data[i].description + "</p></div>"
                            + "</div>"
                            + "<hr />";
                    }


                    $("#divFeedbacks").html(str);

                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Could not get user data.</div>");
                }
            }
        });
    };

    loadUser();



    var createOrder = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders",
            method: "POST",
            data: {
                address: "Dummy",
                customerName: "Dummy",
                date: "1-1-1",
                isSold: false,
                totalAmount: 0.0,
                customerId: localStorage.cid,
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {


                }
                else {
                    console.log(xhr);
                    //$("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : Cart already Exist</div>");
                }
            }
        });
    }

    createOrder();

});