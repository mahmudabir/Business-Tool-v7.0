$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
    }



    var url_string = window.location;
    var url = new URL(url_string);
    var oid = url.searchParams.get("oid");

    if (oid == null) {
        window.location.href = "..";
    }


    var loadOrderCarts = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/orders/" + oid + "/items",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;
                    var str = "";
                    var total = 0;

                    console.log(data[0].order.customerID);



                    for (var i = 0; i < data.length; i++) {
                        if (localStorage.cid != data[i].order.customerID) {
                            window.location.href = "../";
                        } else {
                            str += "<tr>"
                                + "<th scope=\"row\">" + data[i].product.name + "</th>"
                                + "<td><p>" + data[i].quantity + "</p></td>"
                                + "<td class=\"text-right\"><p>" + data[i].cartAmount + "</p></td>"
                                + "</tr>";
                            total += data[i].cartAmount;
                        }
                    }

                    str += "<tr class=\"bg-dark\">"
                        + "<th scope=\"row\"></th>"
                        + "<th class=\"text-right text-light\">Total: </th>"
                        + "<th class=\"text-right text-light\"><div >" + total + "</div></th>"
                        + "</tr>";

                    $("h2").text("Items On Order Number : " + oid);
                    $("tbody").html(str);


                } else if (xhr.status == 204) {
                    console.log("No Canceled Order in the database.");
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Invalid Order.</div>");
                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }


            }


        });
    }


    loadOrderCarts();

});