$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=6)
    {
        //localStorage.clear();
        window.location.href = "../Login/index.html";
    }
    $('#content').load("vendornav.html");


        //Load Login
        var loadUser = function () {
            //$("#msg").removeAttr("hidden");
            $.ajax({
                url: "https://localhost:44308/api/logins/" + localStorage.userId,
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        console.log(xhr.responseJSON);
    
                        var data = xhr.responseJSON;
    
                        sessionStorage.vendorID1 = data.vendors[0].id;
                    }
                    else {
                        console.log(xhr);
                        $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Error : " + xhr.responseJSON.message + "</div>");
                    }
                }
            });
        }
    
        loadUser();
        
        //load Login
    //Report Generate
    var loadGraph2 = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/products/productstatus/"+ sessionStorage.vendorID1,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;
                    console.log(data);




                    var canvas = document.getElementById("myChart1");
                    var ctx = canvas.getContext('2d');

                    // Global Options:
                    Chart.defaults.global.defaultFontColor = 'black';
                    Chart.defaults.global.defaultFontSize = 16;

                    var data = {
                        labels: data[0],
                        datasets: [{
                            //label: 'Product Status',
                            data: data[1], //[12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 56, 103, 1)',
                                'rgba(56, 179, 255, 1)',
                                'rgba(138, 255, 247, 1)',
                                'rgba(102, 255, 153, 1)'
                            ],
                            borderColor: [
                                'rgba(54, 59, 153, 1)',
                                'rgba(59, 135, 168, 1)',
                                'rgba(156, 168, 45, 1)',
                                'rgba(168, 86, 45, 1)'
                            ],
                            borderWidth: 1
                        }]
                    };

                    // Notice the rotation from the documentation.

                    var options = {
                        title: {
                            display: true,
                            text: 'Product Count Of Different Status',
                            position: 'top'
                        },
                        rotation: -0.7 * Math.PI
                    };


                    // Chart declaration:
                    var myBarChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: data,
                        options: options
                    });
                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Can not Retrive Data for Graph 2.</div>");
                }
            }
        });
    };



    loadGraph2();
    //report generate

});