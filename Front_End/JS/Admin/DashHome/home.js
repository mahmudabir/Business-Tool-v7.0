$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 1) {
        //localStorage.clear();
        window.location.href = "../Login/index.html";
    }

    $('#content').load("adminnav.html");


    ///GRAPHS
    var loadGraph = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/orders/typecount",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    var canvas = document.getElementById("myChart1");
                    var ctx = canvas.getContext('2d');

                    // Global Options:
                    Chart.defaults.global.defaultFontColor = 'black';
                    Chart.defaults.global.defaultFontSize = 16;

                    var data = {
                        labels: data[0],
                        datasets: [{
                            label: '# of Orders',
                            data: data[1], //[12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)', 
                                'rgba(200, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.2)', 
                                'rgba(200, 159, 64, 0.2)'
                            ],
                            borderWidth: 1
                        }]
                    };

                    // Notice the rotation from the documentation.

                    var options = {
                        title: {
                            display: true,
                            text: 'Sales (ONLINE vs OFFLINE)',
                            position: 'top'
                        },
                        rotation: -0.7 * Math.PI
                    };


                    // Chart declaration:
                    var myBarChart = new Chart(ctx, {
                        type: 'pie',
                        data: data,
                        options: options
                    });

                    // Fun Fact: I've lost exactly 3 of my favorite T-shirts and 2 hoodies this way :|

                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Can not Retrive Data for Graph 1.</div>");
                }
            }
        });
    };



    loadGraph();







    var loadGraph2 = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/products/typecount",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    var ctx = document.getElementById('myChart2').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data[0], //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                            datasets: [{
                                label: "Product Type",
                                data: data[1], //[12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    // 'rgba(255, 99, 132, 0.2)',
                                    // 'rgba(244, 94, 255, 0.2)',
                                    'rgba(158, 94, 255, 0.2)'//,
                                    // 'rgba(54, 59, 153, 0.2)',
                                    // 'rgba(59, 135, 168, 0.2)',
                                    // 'rgba(45, 168, 156, 0.2)',
                                    // 'rgba(45, 168, 90, 0.2)',
                                    // 'rgba(156, 168, 45, 0.2)',
                                    // 'rgba(168, 86, 45, 0.2)'
                                ],
                                borderColor: [
                                    // 'rgba(255, 99, 132, 1)',
                                    // 'rgba(244, 94, 255, 1)',
                                    // 'rgba(158, 94, 255, 1)',
                                    // 'rgba(54, 59, 153, 1)',
                                    // 'rgba(59, 135, 168, 1)',
                                    // 'rgba(45, 168, 156, 1)',
                                    // 'rgba(45, 168, 90, 1)',
                                    // 'rgba(156, 168, 45, 1)',
                                    'rgba(168, 86, 45, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            title: { display: true, text: 'Product Types' },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Can not Retrive Data for Graph 2.</div>");
                }
            }
        });
    };

    // var loadGraph2 = function () {
    //     $("#msg").removeAttr("hidden");
    //     $.ajax({
    //         url: "https://localhost:44308/api/products/typecount",
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Basic ' + localStorage.authUser,
    //         },
    //         complete: function (xhr, status) {
    //             if (xhr.status == 200) {

    //                 var data = xhr.responseJSON;

    //                 var canvas = document.getElementById("myChart2");
    //                 var ctx = canvas.getContext('2d');

    //                 // Global Options:
    //                 Chart.defaults.global.defaultFontColor = 'black';
    //                 Chart.defaults.global.defaultFontSize = 16;

    //                 var data = {
    //                     labels: data[0],
    //                     datasets: [{
    //                         label: '# of Orders',
    //                         data: data[1], //[12, 19, 3, 5, 2, 3],
    //                         backgroundColor: [
    //                             'rgba(255, 99, 132, 0.2)',
    //                             'rgba(244, 94, 255, 0.2)',
    //                             'rgba(158, 94, 255, 0.2)',
    //                             'rgba(54, 59, 153, 0.2)',
    //                             'rgba(59, 135, 168, 0.2)',
    //                             'rgba(45, 168, 156, 0.2)',
    //                             'rgba(45, 168, 90, 0.2)',
    //                             'rgba(156, 168, 45, 0.2)',
    //                             'rgba(168, 86, 45, 0.2)'
    //                         ],
    //                         borderColor: [
    //                             'rgba(255, 99, 132, 1)',
    //                             'rgba(244, 94, 255, 1)',
    //                             'rgba(158, 94, 255, 1)',
    //                             'rgba(54, 59, 153, 1)',
    //                             'rgba(59, 135, 168, 1)',
    //                             'rgba(45, 168, 156, 1)',
    //                             'rgba(45, 168, 90, 1)',
    //                             'rgba(156, 168, 45, 1)',
    //                             'rgba(168, 86, 45, 1)'
    //                         ],
    //                         borderWidth: 1
    //                     }]
    //                 };

    //                 // Notice the rotation from the documentation.

    //                 var options = {
    //                     title: {
    //                         display: true,
    //                         text: 'Different Orders number by their status',
    //                         position: 'top'
    //                     },
    //                     rotation: -0.7 * Math.PI
    //                 };


    //                 // Chart declaration:
    //                 var myBarChart = new Chart(ctx, {
    //                     type: 'bar',
    //                     data: data,
    //                     options: options
    //                 });

    //                 // Fun Fact: I've lost exactly 3 of my favorite T-shirts and 2 hoodies this way :|

    //             }
    //             else {
    //                 console.log(xhr);
    //                 $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Can not Retrive Data for Graph 1.</div>");
    //             }
    //         }
    //     });
    // };



    //loadGraph();



    loadGraph2();


    var loadGraph3 = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/logins/typecount",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    var canvas = document.getElementById("myChart3");
                    var ctx = canvas.getContext('2d');

                    // Global Options:
                    Chart.defaults.global.defaultFontColor = 'black';
                    Chart.defaults.global.defaultFontSize = 16;

                    var data = {
                        labels: data[0],
                        datasets: [{
                            label: '# Count',
                            data: data[1], //[12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(54, 59, 153, 0.2)',
                                'rgba(59, 135, 168, 0.2)',
                                'rgba(45, 168, 156, 0.2)',
                                'rgba(45, 168, 90, 0.2)',
                                'rgba(156, 168, 45, 0.2)',
                                'rgba(168, 86, 45, 0.2)'
                            ],
                            borderColor: [
                                'rgba(54, 59, 153, 1)',
                                'rgba(59, 135, 168, 1)',
                                'rgba(45, 168, 156, 1)',
                                'rgba(45, 168, 90, 1)',
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
                            text: 'System Users Ratio',
                            position: 'top'
                        },
                        rotation: -0.7 * Math.PI
                    };


                    // Chart declaration:
                    var myBarChart = new Chart(ctx, {
                        type: 'bar',
                        data: data,
                        options: options
                    });

                    // Fun Fact: I've lost exactly 3 of my favorite T-shirts and 2 hoodies this way :|

                }
                else {
                    console.log(xhr);
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Can not Retrive Data for Graph 1.</div>");
                }
            }
        });
    };



    loadGraph3();
});