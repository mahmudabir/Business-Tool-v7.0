$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
    }


    var loadRecievedOrdered = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders/recieved",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;
                    var str = "";

                    for (var i = 0; i < data.length; i++) {
                        str += "<tr>"
                            + "<th scope=\"row\">" + data[i].id + "</th>"
                            + "<td><p>" + data[i].date + "</p></td>"
                            + "<td><p>" + data[i].totalAmount + "</p></td>"
                            + "<td align=\"center\"><a href=\"http://localhost/Business-Tool-v7.0-api/Front_End/Html/Customer/Order/Cart/Index.html?oid=" + data[i].id + "\" class=\"btn btn-dark\">Details</a></td>"
                            + "</tr>";
                    }

                    var count = data.length;
                    $("#count").html(count);
                    $("tbody").html(str);


                } else if (xhr.status == 204) {
                    console.log("No Canceled Order in the database.");
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Recieved Order in the database.</div>");
                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }


            }


        });
    }



    var loadUser = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/logins/" + localStorage.userId,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    //console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    localStorage.cid = data.customers[0].id;
                    console.log("CustomerID :" + localStorage.cid);


                    loadRecievedOrdered();


                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    loadUser();

});