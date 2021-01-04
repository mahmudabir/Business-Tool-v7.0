$(document).ready(function () {

    if (localStorage.authUser == null) {

        window.location.href = "../Login/Index.html";
    }

    else if(localStorage.userRole  == 1){
        window.location.href = "../Admin/";
    }

    else if(localStorage.userRole  == 2){
        window.location.href = "../Manager/";
    }
    else if(localStorage.userRole  == 4){
        window.location.href = "../Deliveryman/";
    }
    else if(localStorage.userRole  == 5){
        window.location.href = "../Customer/";
    }
    else if(localStorage.userRole  == 6){
        window.location.href = "../Vendor/";
    }





    var loadGraph = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/sellproducts/" + localStorage.username + "/total_sell/reports",
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
                            //label: '# of Orders',
                            data: data[1], //[12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    };

                    // Notice the rotation from the documentation.

                    var options = {
                        title: {
                            display: true,
                            text: 'Total sell by You',
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







    // var loadGraph2 = function () {
    //     $("#msg").removeAttr("hidden");
    //     $.ajax({
    //         url: "https://localhost:44308/api/customers/" + 1 + "/reports/order_amounts",
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Basic ' + localStorage.authUser,
    //         },
    //         complete: function (xhr, status) {
    //             if (xhr.status == 200) {

    //                 var data = xhr.responseJSON;

    //                 var ctx = document.getElementById('myChart2').getContext('2d');
    //                 var myChart = new Chart(ctx, {
    //                     type: 'line',
    //                     data: {
    //                         labels: data[0], //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //                         datasets: [{
    //                             label: 'Amount(BDT)',
    //                             data: data[1], //[12, 19, 3, 5, 2, 3],
    //                             backgroundColor: [
    //                                 'rgba(54, 162, 235, 0.2)',
    //                             ],
    //                             borderColor: [
    //                                 'rgba(255, 99, 132, 1)',
    //                             ],
    //                             borderWidth: 1
    //                         }]
    //                     },
    //                     options: {
    //                         responsive: true,
    //                         title: { display: true, text: 'Recieved Orders\' Amounts' },
    //                         scales: {
    //                             yAxes: [{
    //                                 ticks: {
    //                                     beginAtZero: true
    //                                 }
    //                             }]
    //                         }
    //                     }
    //                 });
    //             }
    //             else {
    //                 console.log(xhr);
    //                 $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">Can not Retrive Data for Graph 2.</div>");
    //             }
    //         }
    //     });
    // };



    // loadGraph2();










});