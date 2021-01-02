$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
    }



    var url_string = window.location;
    var url = new URL(url_string);
    var pid = url.searchParams.get("pid");

    if (pid == null) {
        window.location.href = "../Index.html";
    }



    var loadProduct = function () {
        $("#msg").removeAttr("hidden");
        console.log(pid);
        $.ajax({
            url: "https://localhost:44308/api/products/" + pid,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;


                    if (data.image == null || data.image == "" || data.image == undefined) {
                        $("#productImage").attr("src", "../../../Image/no_product.jpg");
                    }
                    else {
                        $("#productImage").attr("src", data.image);

                    }


                    $("#productName").text(data.name);
                    $("#productAvailability").text(data.productStatus.status);
                    $("#productType").html("<strong>Product Type: </strong>" + data.productType.type);
                    $("#productPrice").html(data.sellPrice + " BDT");
                    $("#productQuantity").html("<strong>Available Quantity: </strong>" + data.quantity + " pcs");


                    if (data.productStatus.status == "AVAILABLE") {

                    } else {
                        $("#addToCart").attr("disabled", "disabled");
                    }

                    if (data.quantity <= 0) {
                        $("#addToCart").attr("disabled", "disabled");
                    }

                }
                else {
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Product unavailable</div>");
                }
            }
        });
    }

    loadProduct();













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


                } else if (xhr.status == 204) {
                    console.log("No Order in the database.");

                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : Unknown</div>");
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




    var insertItem = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/orders/" + sessionStorage.oid + "/items",
            method: "POST",
            data: {
                quantity: 1,
                cartAmount: 1 * $("#productPrice").val(),
                orderId: sessionStorage.oid,
                productId: pid
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    $("#msg").html("<div class=\"alert alert-success\" role=\"alert\">Item Added to the Cart.</div>");

                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : Item already Exist In your Cart</div>");
                }
            }
        });
    }






    $("#addToCart").click(function () {
        insertItem();
    });









    $("#msg").click(function () {
        $(this).attr("hidden", "hidden");
    });

});