$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../Login/Authentication.html";
    }






    var loadAllProducts = function () {
        $("#msg").removeAttr("hidden");
        $("#msg").text("");
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


        var low = $("#lowerPrice").val();
        var high = $("#higherPrice").val();
        var sort = $("#sortBy").val();
        var search = $("#search").val()


        if (low == null || low == undefined || low == "") {
            low = 0;
        }
        if (high == null || high == undefined || high == "") {
            high = 0;
        }
        if (sort == null || sort == undefined || sort == "") {
            sort = "nothing";
        }
        if (search == null || search == undefined || search == "") {
            search = "";
        }

        console.log(search);
        console.log(low);
        console.log(high);
        console.log(sort);



        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/products/search/",
            method: "POST",
            headers: {
                //'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            data: {
                search: search,
                sort: sort,
                low: low,
                high: high,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';

                    if (data.length == 0) {
                        $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Relevent products</div>");
                    } else {
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






                }
                else {
                    //$("#msg").removeAttr("hidden");
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Relevent products</div>");
                }
            }
        });
    }


    $("#search").keyup(function () {
        $("#divProducts").html("");
        loadSearch();
    });












    // search request
    var loadSearchBtn = function () {


        var low = $("#lowerPrice").val();
        var high = $("#higherPrice").val();
        var sort = $("#sortBy").val();
        var search = $("#search").val()


        if (low == null || low == undefined || low == "") {
            low = 0;
        }
        if (high == null || high == undefined || high == "") {
            high = 0;
        }
        if (sort == null || sort == undefined || sort == "") {
            sort = "nothing";
        }
        if (search == null || search == undefined || search == "") {
            search = "";
        }

        console.log(search);
        console.log(low);
        console.log(high);
        console.log(sort);



        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/products/search/",
            method: "POST",
            headers: {
                //'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            data: {
                search: search,
                sort: sort,
                low: low,
                high: high,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';

                    if (data.length == 0) {
                        $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Relevent products</div>");
                    } else {
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






                }
                else {
                    //$("#msg").removeAttr("hidden");
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Relevent products</div>");
                }
            }
        });
    }


    $("#btnFilter").click(function () {
        $("#divProducts").html("");
        loadSearchBtn();
    });





    $("#msg").click(function () {
        $(this).attr("hidden", "hidden");
    });





});