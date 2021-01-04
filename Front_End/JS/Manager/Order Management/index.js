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
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailOrder' data-id="+data[i].id+" class='btn btn-warning'>Approve</button>&nbsp;&nbsp;&nbsp;<button type='button' data-id="+data[i].id+" class='btn btn-danger'>Reject</button>"+
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
                url: "https://localhost:44308/api/managers/customername/"+$("#search").val(),
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
                                    "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailOrder' data-id="+data[i].id+" class='btn btn-warning'>Approve</button>&nbsp;&nbsp;&nbsp;<button type='button' id='cancel' btn-id="+data[i].id+" class='btn btn-danger'>Reject</button>" 
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

    //Load Delivery man
    var loadDeliveryman = function () {
        $.ajax({
            url: "https://localhost:44308/api/managers/deliveryby",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            $('#editdeliveryby').append(`<option value="${data[i].id}">  ${data[i].login.username} </option>`); 
                        }
                    }
                    
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    loadDeliveryman();
    //Load Delivery man

    //Load Order Details
    var loadOrderDetails = function(id){
        $.ajax({
            url: "https://localhost:44308/api/orders/"+id,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log("Data For Order details",xhr.responseJSON);

                    var data = xhr.responseJSON;
                    $("#editid").val(data.id);
                    $("#editdate").val(data.date);
                    $("#edittotalamount").val(data.totalAmount);
                    $("#editcustomerid").val(data.customerID);
                    $("#editcustomername").val(data.customerName);  
                    
                }
                else {
                    alert("Data not found.");
                }
            }
        });
    }
    $('#detailOrder').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        loadOrderDetails(id);
    });
    //Load Order Details

    //Approve Order

    var approve = function () {
        $.ajax({
            url: "https://localhost:44308/api/managers/approve/"+$("#editid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editid").val(),
                date: $("#editdate").val(),
                totalAmount: $("#edittotalAmount").val(),
                customerID: $("#editcustomerid").val(),
                customerName: $("#editcustomername").val(),
                SaleTypeID: "2",
                isSold: "false",
                orderStatusID: "2",
                sellBy:$("#editdeliveryby").val()
                
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadAllOrders();
                    alert("Product Approved.")
                } 
                else {
                    alert("Something Wrong.");
                }
            }
        });
    }
    $("#btnapproved").on("click",function(){
        approve();
    });
    //Approve Order
    //Cancel Order
    var cancel = function () {
        $.ajax({
            url: "https://localhost:44308/api/managers/cancel/"+$("#editid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editid").val(),
                date: $("#editdate").val(),
                totalAmount: $("#edittotalAmount").val(),
                customerID: $("#editcustomerid").val(),
                customerName: $("#editcustomername").val(),
                SaleTypeID: "2",
                isSold: "false",
                orderStatusID: "3",
                sellBy:$("#editdeliveryby").val()
                
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadAllOrders();
                    alert("Product Approved.")
                } 
                else {
                    alert("Something Wrong.");
                }
            }
        });
    }
    $("#btncancel").on("click",function(){
        cancel();
    });
    //Cancel Order

    $("cancel").click(function(){
        console.log("btn-id",button.attr("btn-id"));
    })

});