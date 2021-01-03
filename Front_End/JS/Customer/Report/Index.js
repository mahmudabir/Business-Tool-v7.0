$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
    }





    var loadGraph = function () {
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
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Feedback.</div>");
                }
            }
        });
    };



    //loadGraph();


});