$(document).ready(function () {
    if (localStorage.authUser == null || localStorage.userRole != 5) {
        window.location.href = "../../Login/Index.html";
    }





    var loadGraph = function () {
        $("#msg").removeAttr("hidden");
        $.ajax({
            url: "https://localhost:44308/api/customers/" + localStorage.cid + "/reports",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: data[0], //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                            datasets: [{
                                label: '# of Orders',
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
                        },
                        options: {
                            responsive: true,
                            title: { display: true, text: 'Different Orders number by their status' },
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
                    $("#msg").html("<div class=\"alert alert-danger\" role=\"alert\">No Feedback.</div>");
                }
            }
        });
    };



    loadGraph();


});