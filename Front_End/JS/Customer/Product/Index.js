$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Authentication.html";
    }



    var url_string = window.location;
    var url = new URL(url_string);
    var pid = url.searchParams.get("pid");

    if (pid == null) {
        window.location.href = "../Index.html";
    }



    var loadPost = function () {
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



                }
                else {
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Product unavailable</div>");
                }
            }
        });
    }

    loadPost();


    $("#msg").click(function () {
        $(this).attr("hidden", "hidden");
    });

});