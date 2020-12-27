$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../Login/Authentication.html";
    }






    var loadAllProducts = function () {
        $.ajax({
            url: "https://localhost:44308/api/products/",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].image == null || data[i].image == "" || data[i].image == undefined) {
                            str += "<div class=\"col-md-4 mb-5\">"
                                + "<div class=\"card\" style=\"width: 18rem; \">"
                                + "<img src=\"../../Image/no_product.jpg\" class=\"card-img-top\" alt=\"../../Image/no_product.jpg\" height=\"200\" width=\"200\">"
                                + "<div class=\"card-body\">"
                                + " <h5 class=\"card-title\">" + data[i].name + " <small> (" + data[i].productStatus.status + ")</small>" + "</h5>"
                                + "<p class=\"card-text\">Type: " + data[i].productType.type + "</p>"
                                + "<p class=\"card-text\">Price: " + data[i].sellPrice + "</p>"
                                + "<a href=\"Product/Index.html?pid=" + data[i].id + "\" class=\"btn btn-primary\">Details</a>"
                                + "</div>"
                                + "</div>"
                                + "</div>";
                        } else {

                            str += "<div class=\"col-md-4 mb-5\">"
                                + "<div class=\"card\" style=\"width: 18rem; \">"
                                + "<img src=\"" + data[i].image + "\" class=\"card-img-top\" alt=\"...\" height=\"200\" width=\"200\">"
                                + "<div class=\"card-body\">"
                                + " <h5 class=\"card-title\">" + data[i].name + " <small> (" + data[i].productStatus.status + ")</small>" + "</h5>"
                                + "<p class=\"card-text\">Type: " + data[i].productType.type + "</p>"
                                + "<p class=\"card-text\">Price: " + data[i].sellPrice + "</p>"
                                + "<a href=\"Product/Index.html?pid=" + data[i].id + "\" class=\"btn btn-primary\">Details</a>"
                                + "</div>"
                                + "</div>"
                                + "</div>";
                        }
                    }

                    $("#divProducts").html(str);


                }
                else {
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No products available</div>");
                }
            }
        });
    }

    loadAllProducts();





    // search request
    var loadSearch = function () {
        if ($("#search").val() == null || $("#search").val() == "") {
            loadAllProducts();
            return 0;
        }

        $.ajax({
            url: "https://localhost:44308/api/products/search/" + $("#search").val(),
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';

                    for (var i = 0; i < data.length; i++) {
                        if (data[i].image == null || data[i].image == "" || data[i].image == undefined) {
                            str += "<div class=\"col-md-4 mb-5\">"
                                + "<div class=\"card\" style=\"width: 18rem; \">"
                                + "<img src=\"../../Image/no_product.jpg\" class=\"card-img-top\" alt=\"../../Image/no_product.jpg\" height=\"200\" width=\"200\">"
                                + "<div class=\"card-body\">"
                                + " <h5 class=\"card-title\">" + data[i].name + " <small> (" + data[i].productStatus.status + ")</small>" + "</h5>"
                                + "<p class=\"card-text\">Type: " + data[i].productType.type + "</p>"
                                + "<p class=\"card-text\">Price: " + data[i].sellPrice + "</p>"
                                + "<a href=\"Product/Index.html?pid=" + data[i].id + "\" class=\"btn btn-primary\">Details</a>"
                                + "</div>"
                                + "</div>"
                                + "</div>";
                        } else {

                            str += "<div class=\"col-md-4 mb-5\">"
                                + "<div class=\"card\" style=\"width: 18rem; \">"
                                + "<img src=\"" + data[i].image + "\" class=\"card-img-top\" alt=\"...\" height=\"200\" width=\"200\">"
                                + "<div class=\"card-body\">"
                                + " <h5 class=\"card-title\">" + data[i].name + " <small> (" + data[i].productStatus.status + ")</small>" + "</h5>"
                                + "<p class=\"card-text\">Type: " + data[i].productType.type + "</p>"
                                + "<p class=\"card-text\">Price: " + data[i].sellPrice + "</p>"
                                + "<a href=\"Product/Index.html?pid=" + data[i].id + "\" class=\"btn btn-primary\">Details</a>"
                                + "</div>"
                                + "</div>"
                                + "</div>";
                        }
                    }

                    $("#divProducts").html(str);


                }
                else {
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Relevent products</div>");
                }
            }
        });
    }


    $("#search").keyup(function () {
        $("#divProducts").html("");
        loadSearch();
    });











});