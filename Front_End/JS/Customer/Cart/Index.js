$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
    }


    //if ($("#cartTotal").val() <= 0) {
    //    $("#btnCeckout").attr("disabled", "disabled");
    //}


    var updateOrder = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/orders/update_amount/" + sessionStorage.oid,
            method: "PUT",
            data: {
                id: sessionStorage.oid,
                date: sessionStorage.odate,
                totalAmount: sessionStorage.ototalAmount,
                address: sessionStorage.oaddress,
                customerID: sessionStorage.ocustomerID,
                customerName: sessionStorage.ocustomerName,
                saleTypeID: sessionStorage.osaleTypeID,
                isSold: sessionStorage.oisSold,
                orderStatusID: sessionStorage.oorderStatusID,
                sellBy: sessionStorage.osellBy

            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadCart();
                    loadOrder();
                } else {
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Error : Could not update the Item.</div>");
                }
            }
        });
    }



    var updateCartItem = function (q, ocID, oID, pID) {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders/" + oID + "/items/" + pID,
            method: "PUT",
            data: {
                id: ocID,
                quantity: q,
                cartAmount: 0.0,
                orderID: oID,
                productID: pID,

            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    //$("#cartMemo").html("");

                    //loadCart();
                    updateOrder();
                    //loadOrder();
                } else {
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Error : Could not update the Item.</div>");
                }
            }
        });
    }




    var deleteCartItem = function (q, ocID, oID, pID) {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders/" + oID + "/items/" + ocID,
            method: "DELETE",
            header: "Content-Type:application/json",
            data: {
                id: ocID,
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    $("#cartMemo").html("");
                    //loadCart();
                    updateOrder();
                    //loadOrder();
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Item removed from your cart.</div>");
                    alert("Item Removed.");

                } else {
                    console.log(xhr.responseJSON);
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Error : Could not update the Item.</div>");
                }
            }
        });
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
                    var memo = "";

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
                                + "<button type=\"button\" class=\"btn btn-danger small text-uppercase mr-3 remove\" remove=\"" + data[i].id + "\" productID=\"" + data[i].productID + "\" orderID=\"" + data[i].orderID + "\">"
                                + "<i class=\"fas fa-trash-alt mr-1\"></i> Remove item"
                                + "</button>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr class=\"mb-4\">";


                            memo += "<li class=\"list-group-item d-flex justify-content-between lh-condensed\">"
                                + "<div>"
                                + "<h6 class=\"my-0\">" + data[i].product.name + "</h6>"
                                + "<small class=\"text-muted\">Unit Price:" + data[i].product.sellPrice + "</small>"
                                + "</div>"
                                + "<span class=\"text-muted\">" + data[i].quantity * data[i].product.sellPrice + "</span>"
                                + "</li>";
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
                                + "<button type=\"button\" class=\"btn btn-danger small text-uppercase mr-3 remove\" remove=\"" + data[i].id + "\" productID=\"" + data[i].productID + "\" orderID=\"" + data[i].orderID + "\">"
                                + "<i class=\"fas fa-trash-alt mr-1\"></i> Remove item"
                                + "</button>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr class=\"mb-4\">";



                            memo += "<li class=\"list-group-item d-flex justify-content-between lh-condensed\">"
                                + "<div>"
                                + "<h6 class=\"my-0\">" + data[i].product.name + "</h6>"
                                + "<small class=\"text-muted\">Unit Price:" + data[i].product.sellPrice + "</small>"
                                + "</div>"
                                + "<span class=\"text-muted\">" + data[i].quantity * data[i].product.sellPrice + "</span>"
                                + "</li>";
                        }
                    }

                    str += "<p class=\"text-primary mb-0\">"
                        + "<i class=\"fas fa-info-circle mr-1\"></i>"
                        + "Do not delay the purchase, adding items to your cart does not mean booking them.</p>";


                    $("#itemDetails").html(str);
                    $("#cartMemo").html(memo);



                    $(".plus").click(function () {
                        console.log("Quantity: " + $("#" + $(this).attr("plus")).val());
                        console.log("CartID: " + $(this).attr("plus"));
                        console.log("OrderID: " + $(this).attr("orderId"));
                        console.log("ProductID: " + $(this).attr("productID"));
                        console.log("");

                        var q = $("#" + $(this).attr("plus")).val();
                        var ocID = $(this).attr("plus");
                        var oID = $(this).attr("orderId");
                        var pID = $(this).attr("productID");

                        updateCartItem(q, ocID, oID, pID);
                    });


                    $(".minus").click(function () {

                        var q = $("#" + $(this).attr("minus")).val();
                        var ocID = $(this).attr("minus");
                        var oID = $(this).attr("orderId");
                        var pID = $(this).attr("productID");



                        if ($("#" + $(this).attr("minus")).val() <= 0) {
                            if (confirm("Do you want to remove the item?")) {
                                deleteCartItem(q, ocID, oID, pID);


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


                            updateCartItem(q, ocID, oID, pID);
                        }
                    });


                    $(".remove").click(function () {

                        var q = $("#" + $(this).attr("remove")).val();
                        var ocID = $(this).attr("remove");
                        var oID = $(this).attr("orderId");
                        var pID = $(this).attr("productID");

                        if (confirm("Do you want to remove the item?")) {
                            deleteCartItem(q, ocID, oID, pID);

                        } else {
                            alert("Item not removed.");
                        }
                    });

                }
                else {
                    console.log(xhr);
                    $("#itemDetails").html("");
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
                    sessionStorage.odate = data.date;
                    sessionStorage.ototalAmount = data.totalAmount;
                    sessionStorage.oaddress = data.address;
                    sessionStorage.ocustomerID = data.customerID;
                    sessionStorage.ocustomerName = data.customerName;
                    sessionStorage.osaleTypeID = data.saleTypeID;
                    sessionStorage.oisSold = data.isSold;
                    sessionStorage.oorderStatusID = data.orderStatusID;
                    sessionStorage.osellBy = data.sellBy;

                    console.log("OrderID: " + sessionStorage.oid);
                    console.log("Order Date: " + sessionStorage.odate);
                    console.log("Order Amount: " + sessionStorage.ototalAmount);
                    console.log("Order Address: " + sessionStorage.oaddress);
                    console.log("Order CustomerID: " + sessionStorage.ocustomerID);
                    console.log("Order Customer Name: " + sessionStorage.ocustomerName);
                    console.log("Order SaleTypeID: " + sessionStorage.osaleTypeID);
                    console.log("Order IsSold: " + sessionStorage.oisSold);
                    console.log("Order OrderStatusID: " + sessionStorage.oorderStatusID);
                    console.log("Order SellBy: " + sessionStorage.osellBy);

                    //var cartTotal = "<li class=\"list-group-item d-flex justify-content-between\">"
                    //    + "<span>Total (BDT)</span>"
                    //    + "<strong>" + data.totalAmount + "</strong>"
                    //    + "</li>";




                    loadCart();
                    $("#cartTotal").text(data.totalAmount);

                    $("#btnCeckout").click(function () {
                        if ($("#cartTotal").text() <= 0) {
                            console.log("Value is \"" + $("#cartTotal").text() + "\", which is less than or equal to zero.");
                            alert("You don't have anything to checkout.");
                        } else {
                            console.log("Value is " + $("#cartTotal").text() + ", which is greater than zero.");

                            $.ajax({
                                url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders/saletype/1/orderstatus/6/notissold",
                                method: "PUT",

                            });

                        }
                    });



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






    $("#msg").click(function () {
        $(this).attr("hidden", "hidden");
    });



});