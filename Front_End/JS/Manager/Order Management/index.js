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
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailOrder' data-id="+data[i].id+" class='btn btn-warning'>Approve</button>" +
                                        "<td align='center'> <button type='button' data-target='#cancel' data-id="+data[i].id+" class='btn btn-danger'>Reject</button>" +
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
                                    "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailOrder' data-id="+data[i].id+" class='btn btn-warning'>Approve</button>" +
                                    "<td align='center'> <button type='button' data-target='#cancel' data-id="+data[i].id+" class='btn btn-danger'>Reject</button>" +
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
            url: "https://localhost:44308/api/products/id/"+id,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log("Data For product",xhr.responseJSON);

                    var data = xhr.responseJSON;
                    console.log("Product info",data)
                    if(data.length>0)
                    {
                        $("#editid").val(data[0].id);
                        $("#editname").val(data[0].name);
                        $("#editquantity").val(data[0].quantity);
                        $("#editbuyprice").val(data[0].buyPrice);
                        $("#editsellprice").val(data[0].sellPrice);  
                        $("#edittype option[value='"+data[0].productTypeID+"']").attr("selected", "selected");
                        
                        console.log(data[0].productType.type);
                        console.log(data[0].productStatus.id);
                        if(data[0].productStatus.id == '3')
                        {                    
                            $("#updateMesg").attr("hidden", "hidden");
                            $("#btnunapproved").attr("hidden", "hidden");
                            $("#btnunavailable").removeAttr("hidden", "hidden");
                            $("#btnupdate").removeAttr("hidden", "hidden");
                        }
                        else if(data[0].productStatus.id == '2')
                        {
                            $("#updateMesg").attr("hidden", "hidden");
                            $("#btnunavailable").attr("hidden", "hidden");
                            $("#btnunapproved").removeAttr("hidden", "hidden");
                            $("#btnupdate").removeAttr("hidden", "hidden");
                        }
                        else
                        {
                            $("#updateMesg").attr("hidden", "hidden");
                            $("#btnupdate").attr("hidden", "hidden");
                            $("#btnunavailable").attr("hidden", "hidden");
                            $("#btnunapproved").attr("hidden", "hidden");
                        }
                    }
                    else
                    {
                        alert("Product Not Found");
                    }
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    $('#detailProduct').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        loadOrderDetails(id);
    });

    //Load Order Details



});