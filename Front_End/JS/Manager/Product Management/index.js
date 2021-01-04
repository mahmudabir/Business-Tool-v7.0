$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=2)
    {
        //localStorage.clear();
        window.location.href = "../../Login/index.html";
    }
    $('#content').load("../managernav.html");
    
        //LOAD Product LIST
        var loadAllProducts = function () {
            $.ajax({
                url: "https://localhost:44308/api/products/getAllProductByStatusID",
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
                                            "<td>"+ data[i].name +"</td>"+
                                            "<td>"+ data[i].quantity+ "</td>"+
                                            "<td>" + data[i].buyPrice + "</td>"+
                                            "<td>" + data[i].sellPrice + "</td>"+
                                            "<td>" + data[i].productType.type + "</td>"+
                                            "<td>" + data[i].productStatus.status + "</td>"+
                                            
                                            "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailProduct' data-id="+data[i].id+" class='btn btn-dark'>Details</button>" +
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
    
    
        // search by name
        var productSearch = function () {
            if($.trim($("#search").val()) != "")
            {
                $.ajax({
                    url: "https://localhost:44308/api/products/name/"+$("#search").val(),
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
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].quantity+ "</td>"+
                                        "<td>" + data[i].buyPrice + "</td>"+
                                        "<td>" + data[i].sellPrice + "</td>"+
                                        "<td>" + data[i].productType.type + "</td>"+
                                        "<td>" + data[i].productStatus.status + "</td>"+
                                        
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailProduct' data-id='"+data[i].id+"' class='btn btn-dark'>Details</button>" +
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
                loadAllProducts();
            }
        }
        $("#search").on("keyup change",function(){
            productSearch();
        });
    
    
        //search by name
    
    
        //get product type
            var loadAllProductType = function () {
                $.ajax({
                    url: "https://localhost:44308/api/productType",
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
                                    
                                    $('#type').append(`<option value="${data[i].id}">  ${data[i].type} </option>`);
                                    $('#edittype').append(`<option value="${data[i].id}">  ${data[i].type} </option>`); 
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
            loadAllProductType();
    
        //get product type
    
        
    
        //update product details
        
        var loadProductDetails = function(id){
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
                            if(data[0].productStatus.id == '1')
                            {                    
                                $("#btnnotforsale").removeAttr("hidden", "hidden");
                                $("#btnavailable").attr("hidden", "hidden");
                               
                            }
                            else
                            {
                                $("#btnnotforsale").attr("hidden", "hidden");
                                $("#btnavailable").removeAttr("hidden", "hidden");
                                
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
            loadProductDetails(id);
        });

    //show product details

    // available

    var available = function () {
        $.ajax({
            url: "https://localhost:44308/api/products/available/"+$("#editid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editid").val(),
                name: $("#editname").val(),
                quantity: $("#editquantity").val(),
                buyPrice: $("#editbuyprice").val(),
                sellPrice: $("#editsellprice").val(),
                productTypeID: $("#edittype").val(),
                productStatusID:"1"
                
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadAllProducts();
                    alert("Product available now.")
                } 
                else {
                    alert("Something Wrong.");
                }
            }
        });
    }
    $("#btnavailable").on("click",function(){
        available();
    });

    //available

    //notforsale
    var notForSale = function () {
        $.ajax({
            url: "https://localhost:44308/api/products/unapproved/"+$("#editid").val(),
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                id: $("#editid").val(),
                name: $("#editname").val(),
                quantity: $("#editquantity").val(),
                buyPrice: $("#editbuyprice").val(),
                sellPrice: $("#editsellprice").val(),
                productTypeID: $("#edittype").val(),
                productStatusID:"4"
                
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    loadAllProducts();
                    alert("Product Not For Sale.")
                } 
                else {
                    alert("Something Wrong.");
                }
            }
        });
    }
    $("#btnnotforsale").on("click",function(){
        notForSale();
    });
    //notforsale
    
});