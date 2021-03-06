$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=2)
    {
        //localStorage.clear();
        window.location.href = "../../Login/index.html";
    }
    $('#content').load("../managernav.html");

    //Load All Order
    var loadAllOrders = function () {
        $.ajax({
            url: "https://localhost:44308/api/managers/getorders/",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            
                            str += "<tr>"+
                                "<td align='center'>"+ data[i].id + "</td>"+
                                "<td>"+ data[i].totalAmount+ "</td>"+
                                "<td>" + data[i].customer.login.username + "</td>"+
                                "<td>" + data[i].customerName + "</td>"+
                                "<td>" + data[i].customer.login.mobile + "</td>"+
                                "<td>"+ data[i].date +"</td>"+
                                "<td>"+ data[i].orderStatus.status+"</td>"+
                            "</tr>";
                                
                        }

                    }
                    else
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#table tbody").html(str);



                    $(".edit").click(function(){
                        cancel($(this).attr("data-id"));
                    });


                }
                else 
                {
                    alert("No Data Found");
                }
            }
        });
    }
    loadAllOrders();
    //Load All Order


    //SearchByCustomerName Order

    var orderSearch = function () {
        if($.trim($("#search").val()) != "")
        {
            $.ajax({
                url: "https://localhost:44308/api/managers/customernameOnHistory/"+$("#search").val(),
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        console.log(xhr.responseJSON);
    
                        var data = xhr.responseJSON;
                        
                        var str = '';
                        if(data.length>0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                
                                
                                str += "<tr>"+
                                    "<td align='center'>"+ data[i].id + "</td>"+
                                    "<td>"+ data[i].totalAmount+ "</td>"+
                                    "<td>" + data[i].customer.login.username + "</td>"+
                                    "<td>" + data[i].customerName + "</td>"+
                                    "<td>" + data[i].customer.login.mobile + "</td>"+
                                    "<td>"+ data[i].date +"</td>"+
                                    "<td>"+ data[i].orderStatus.status+"</td>"+
                                "</tr>";
                                
                            }
                            
                        }
                        else
                        {
                            str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                        }
                        $("#table tbody").html(str);
                    }
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
        }
        
        else
        {
            loadAllOrders();
        }
    }
    $("#search").on("keyup change",function(){
        orderSearch();
    });
    //SearchByCustomerName Order
    

});