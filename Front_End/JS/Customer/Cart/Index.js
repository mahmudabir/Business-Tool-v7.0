$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Authentication.html";
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

                    sessionStorage.cid = data.customers[0].id;


                    $("#username").text(data.customers[0].name);
                    $("#image").attr("src", data.customers[0].image);


                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    loadUser();
    console.log("CustomerID: " + sessionStorage.cid);






    var loadOrder = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + sessionStorage.cid + "/orders/saletype/1/notissold",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    sessionStorage.oid = data.id;
                    console.log("OrderID: " + sessionStorage.oid);



                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    loadOrder();












    var loadCart = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + sessionStorage.cid + "/orders/" + sessionStorage.oid + "/items",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    console.log(data);


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
                                + " <input class=\"quantity\" min=\"1\" max=\"" + data[i].product.quantity + "\" name=\"quantity\" value=\"1\" type=\"number\" style=\"width: 70px; readonly \">"
                                + "  <button onclick=\"this.parentNode.querySelector('input[type=number]').stepDown()\" class=\"btn btn-outline-danger text-black-50\"><strong>-</strong></button>"
                                + "<button onclick=\"this.parentNode.querySelector('input[type=number]').stepUp()\" class=\"btn btn-outline-success text-black-50\"><strong>+</strong></button>"
                                + "</div>"
                                + "<small id=\"availableNumber\" class=\"form-text text-muted text-center\">"
                                + data[i].product.quantity + " pcs Available"
                                + "</small>"
                                + "</div>"
                                + "</div>"
                                + "<div class=\"d-flex justify-content-between align-items-center\">"
                                + "<div>"
                                + "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase mr-3\">"
                                + "<i class=\"fas fa-trash-alt mr-1\"></i> Remove item"
                                + "</a>"
                                //+ "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase\">"
                                //+ "<i class=\"fas fa-heart mr-1\"></i> Move to wish list"
                                //+ "</a>"
                                + "</div>"
                                //+ "<p class=\"mb-0\"><span><strong>$17.99</strong></span></p>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr class=\"mb-4\">";
                        }
                        else {
                            console.log("Image: " + data[i].product.image);
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
                                + " <input class=\"quantity\" min=\"1\" max=\"" + data[i].product.quantity + "\" name=\"quantity\" value=\"1\" type=\"number\" style=\"width: 70px; readonly \">"
                                + "  <button onclick=\"this.parentNode.querySelector('input[type=number]').stepDown()\" class=\"btn btn-outline-danger text-black-50\"><strong>-</strong></button>"
                                + "<button onclick=\"this.parentNode.querySelector('input[type=number]').stepUp()\" class=\"btn btn-outline-success text-black-50\"><strong>+</strong></button>"
                                + "</div>"
                                + "<small id=\"availableNumber\" class=\"form-text text-muted text-center\">"
                                + data[i].product.quantity + " pcs Available"
                                + "</small>"
                                + "</div>"
                                + "</div>"
                                + "<div class=\"d-flex justify-content-between align-items-center\">"
                                + "<div>"
                                + "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase mr-3\">"
                                + "<i class=\"fas fa-trash-alt mr-1\"></i> Remove item"
                                + "</a>"
                                //+ "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase\">"
                                //+ "<i class=\"fas fa-heart mr-1\"></i> Move to wish list"
                                //+ "</a>"
                                + "</div>"
                                //+ "<p class=\"mb-0\"><span><strong>$17.99</strong></span></p>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr class=\"mb-4\">";

                        }












                        //str += "<div class=\"row mb-4\">"
                        //    + "<div class=\"col-md-5 col-lg-3 col-xl-3\">"
                        //    + "<div class=\"view zoom overlay z-depth-1 rounded mb-3 mb-md-0\">"
                        //    + "<img class=\"img-fluid w-100\" src=\"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg\" alt=\"Sample\">"
                        //    + "</div>"
                        //    + "</div>"
                        //    + "<div class=\"col-md-7 col-lg-9 col-xl-9\">"
                        //    + "<div>"
                        //    + "<div class=\"d-flex justify-content-between\">"
                        //    + "<div>"
                        //    + "<h5>Blue denim shirt</h5>"
                        //    + "<p class=\"mb-3 text-muted text-uppercase small\">Shirt - blue</p>"
                        //    + "<p class=\"mb-2 text-muted text-uppercase small\">Color: blue</p>"
                        //    + "<p class=\"mb-3 text-muted text-uppercase small\">Size: M</p>"
                        //    + "</div>"
                        //    + "<div>"
                        //    + "<div class=\"def-number-input number-input safari_only mb-0 w-100\">"
                        //    + " <input class=\"quantity\" min=\"0\" name=\"quantity\" value=\"1\" type=\"number\" style=\"width: 70px; readonly \">"
                        //    + "  <button onclick=\"this.parentNode.querySelector('input[type=number]').stepDown()\" class=\"btn btn-outline-danger text-black-50\"><strong>-</strong></button>"
                        //    + "<button onclick=\"this.parentNode.querySelector('input[type=number]').stepUp()\" class=\"btn btn-outline-success text-black-50\"><strong>+</strong></button>"
                        //    + "</div>"
                        //    + "<small id=\"passwordHelpBlock\" class=\"form-text text-muted text-center\">"
                        //    + "(Note, 1 piece)"
                        //    + "</small>"
                        //    + "</div>"
                        //    + "</div>"
                        //    + "<div class=\"d-flex justify-content-between align-items-center\">"
                        //    + "<div>"
                        //    + "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase mr-3\">"
                        //    + "<i class=\"fas fa-trash-alt mr-1\"></i> Remove item"
                        //    + "</a>"
                        //    + "<a href=\"#!\" type=\"button\" class=\"card-link-secondary small text-uppercase\">"
                        //    + "<i class=\"fas fa-heart mr-1\"></i> Move to wish list"
                        //    + "</a>"
                        //    + "</div>"
                        //    + "<p class=\"mb-0\"><span><strong>$17.99</strong></span></p>"
                        //    + "</div>"
                        //    + "</div>"
                        //    + "</div>"
                        //    + "</div>"
                        //    + "<hr class=\"mb-4\">";
                    }

                    str += "<p class=\"text-primary mb-0\"><i class=\"fas fa-info-circle mr-1\"></i> Do not delay the purchase, adding items to your cart does not mean booking them.</p>";


                    $("#itemDetails").html(str);


                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                }
            }
        });
    }

    loadCart();











    $("#msg").click(function () {
        $(this).attr("hidden", "hidden");
    });



});