$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=2)
    {
        //localStorage.clear();
        window.location.href = "../../Login/index.html";
    }
    $('#content').load("../managernav.html");

    //Load All Order
    var loadAllProducts = function () {
        $.ajax({
            url: "https://localhost:44308/api/managers/getorder/",
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
                                         "<td>"+ data[i].date +"</td>"+
                                        "<td>"+ data[i].totalAmount+ "</td>"+
                                        "<td>" + data[i].customerID + "</td>"+
                                        "<td>" + data[i].customerName + "</td>"+
                                        "<td>" + data[i].orderStatus.status + "</td>"+
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailProduct' data-id="+data[i].id+" class='btn btn-warning'>Approve</button>" +
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailProduct' data-id="+data[i].id+" class='btn btn-danger'>Reject</button>" +
                                "</tr>";
                                
                        }

                    }
                    else
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#table tbody").html(str);
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    loadAllProducts();
    //Load All Order


    //Search Order

    //Search Order

});