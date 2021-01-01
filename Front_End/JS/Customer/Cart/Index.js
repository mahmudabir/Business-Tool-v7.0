$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
    }







    var loadCart = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders/" + sessionStorage.oid + "/items",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;


                    sessionStorage.items = JSON.stringify(data);
                    console.log(JSON.parse(sessionStorage.items));

                    $("#itemQuantity1").text(data.length);
                    $("#itemQuantity2").text(data.length);


                    var str = "";

                    str += "<h5 class=\"mb-4\">Cart (<span id=\"itemQuantity1\">" + data.length + "</span> items)</h5>";

                    for (var i = 0; i < data.length; i++) {
                        if (data[i].product.image == null || data[i].product.image == "" || data[i].product.image == undefined) {
                            str += "<div class=\"row mb-4\">"
                                + "<div class=\"col-md-5 col-lg-3 col-xl-3\">"
                                + "<div class=\"view zoom overlay z-depth-1 rounded mb-3 mb-md-0\">"
                                + "<img class=\"img-fluid w-100\" src=\"../../../Image/no_product.jpg\" alt=\"Sample\">"
                                + "</div>"
                                + "</div>"
                                + "<div class=\"col-md-7 col-lg-9 col-xl-9\">"
                                + "<div>"
                                + "<div class=\"d-flex justify-content-between\">"
                                + "<div>"
                                + "<h5>" + data[i].product.name + "</h5>"
                                + "<p class=\"mb-3 text-muted text-uppercase small\">(" + data[i].product.productStatus.status + ")</p>"
                                + "<p class=\"mb-2 text-muted text-uppercase small\"><strong>Type: </strong>" + data[i].product.productType.type + "</p>"
                                + "<p class=\"mb-3 text-muted text-uppercase small\"><strong>Price: </strong>" + data[i].product.sellPrice + "</p>"
                                + "</div>"
                                + "<div>"
                                + "<div class=\"def-number-input number-input safari_only mb-0 w-100\">"
                                + "<button onclick=\"this.parentNode.querySelector('input[type=number]').stepDown()\"  minus=\"" + data[i].id + "\" productID=\"" + data[i].productID + "\" orderID=\"" + data[i].orderID + "\"  class=\"btn btn-outline-danger text-black-50 minus\"><i class=\"fas fa-minus\"></i></button>"
                                + "<input class=\"quantity\" id=\"" + data[i].id + "\" min=\"0\" max=\"" + data[i].product.quantity + "\" name=\"quantity\" value=\"" + parseInt(data[i].quantity) + "\" type=\"number\" style=\"width: 70px; font-size: 18px;\" readonly>"
                                + "<button onclick=\"this.parentNode.querySelector('input[type=number]').stepUp()\"  plus=\"" + data[i].id + "\" productID=\"" + data[i].productID + "\" orderID=\"" + data[i].orderID + "\"  class=\"btn btn-outline-success text-black-50 plus\"><i class=\"fas fa-plus\"></i></button>"
                                + "</div>"
                                + "<small id=\"availableNumber\" class=\"form-text text-muted text-center\">"
                                + "Max: " + data[i].product.quantity + " pcs"
                                + "</small>"
                                + "</div>"
                                + "</div>"
                                + "<div class=\"d-flex justify-content-between align-items-center\">"
                                + "<div>"
                                + "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase mr-3\">"
                                + "<i class=\"fas fa-trash-alt mr-1\"></i> Remove item"
                                + "</a>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr class=\"mb-4\">";
                        }
                        else {
                            str += "<div class=\"row mb-4\">"
                                + "<div class=\"col-md-5 col-lg-3 col-xl-3\">"
                                + "<div class=\"view zoom overlay z-depth-1 rounded mb-3 mb-md-0\">"
                                + "<img class=\"img-fluid w-100\" src=\"" + data[i].product.image.toString() + "\" alt=\"Sample\">"
                                + "</div>"
                                + "</div>"
                                + "<div class=\"col-md-7 col-lg-9 col-xl-9\">"
                                + "<div>"
                                + "<div class=\"d-flex justify-content-between\">"
                                + "<div>"
                                + "<h5>" + data[i].product.name + "</h5>"
                                + "<p class=\"mb-3 text-muted text-uppercase small\">(" + data[i].product.productStatus.status + ")</p>"
                                + "<p class=\"mb-2 text-muted text-uppercase small\"><strong>Type: </strong>" + data[i].product.productType.type + "</p>"
                                + "<p class=\"mb-3 text-muted text-uppercase small\"><strong>Price: </strong>" + data[i].product.sellPrice + "</p>"
                                + "</div>"
                                + "<div>"
                                + "<div class=\"def-number-input number-input safari_only mb-0 w-100\">"
                                + "<button onclick=\"this.parentNode.querySelector('input[type=number]').stepDown()\" minus=\"" + data[i].id + "\" productID=\"" + data[i].productID + "\" orderID=\"" + data[i].orderID + "\" class=\"btn btn-outline-danger text-black-50 minus\"><i class=\"fas fa-minus\"></i></button>"
                                + "<input class=\"quantity\" id=\"" + data[i].id + "\" min=\"0\" max=\"" + data[i].product.quantity + "\" name=\"quantity\" value=\"" + parseInt(data[i].quantity) + "\" type=\"number\" style=\"width: 70px; font-size: 18px;\" readonly>"
                                + "<button onclick=\"this.parentNode.querySelector('input[type=number]').stepUp()\"  plus=\"" + data[i].id + "\" productID=\"" + data[i].productID + "\" orderID=\"" + data[i].orderID + "\" class=\"btn btn-outline-success text-black-50 plus\"><i class=\"fas fa-plus\"></i></button>"
                                + "</div>"
                                + "<small id=\"availableNumber\" class=\"form-text text-muted text-center\">"
                                + "Max: " + data[i].product.quantity + " pcs"
                                + "</small>"
                                + "</div>"
                                + "</div>"
                                + "<div class=\"d-flex justify-content-between align-items-center\">"
                                + "<div>"
                                + "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase mr-3\">"
                                + "<i class=\"fas fa-trash-alt mr-1\"></i> Remove item"
                                + "</a>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr class=\"mb-4\">";
                        }
                    }

                    str += "<p class=\"text-primary mb-0\">"
                        + "<i class=\"fas fa-info-circle mr-1\"></i>"
                        + "Do not delay the purchase, adding items to your cart does not mean booking them.</p>";


                    $("#itemDetails").html(str);



                    $(".plus").click(function () {
                        console.log("Quantity: " + $("#" + $(this).attr("plus")).val());
                        console.log("CartID: " + $(this).attr("plus"));
                        console.log("OrderID: " + $(this).attr("orderId"));
                        console.log("ProductID: " + $(this).attr("productID"));
                        console.log("");
                    });


                    $(".minus").click(function () {

                        if ($("#" + $(this).attr("minus")).val() <= 0) {
                            if (confirm("Do you want to remove the item?")) {


                                alert("Item Removed.");
                            } else {
                                this.parentNode.querySelector('input[type=number]').stepUp();
                                alert("Item not removed.");
                            }
                        }
                        else {
                            console.log("Quantity: " + $("#" + $(this).attr("minus")).val());
                            console.log("CartID: " + $(this).attr("minus"));
                            console.log("OrderID: " + $(this).attr("orderId"));
                            console.log("ProductID: " + $(this).attr("productID"));
                            console.log("");
                        }
                    });

                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : No Item in the Cart</div>");
                }
            }
        });
    }





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












    var loadOrder = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders/saletype/1/orderstatus/6/notissold",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    sessionStorage.oid = data.id;
                    console.log("OrderID: " + sessionStorage.oid);
                    loadCart();


                } else if (xhr.status == 204) {
                    console.log("No Order in the database.");

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


                    loadOrder();


                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    loadUser();
    console.log("CustomerID: " + localStorage.cid);




    //$(".quantity").change(function () {
    //    console.log("Tag ID: ");
    //    console.log($(this).attr("id"));
    //});


    //var inputQuantity = document.getElementsByClassName("quantity");

    //for (var i = 0; i < inputQuantity.length; i++) {
    //    inputQuantity[i].addEventListener('keyup', function () {
    //        console.log(this.id.toString());
    //    });
    //}







    $("#msg").click(function () {
        $(this).attr("hidden", "hidden");
    });



});