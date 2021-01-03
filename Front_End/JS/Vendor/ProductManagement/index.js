$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=6)
    {
        //localStorage.clear();
        window.location.href = "../../Login/index.html";
    }
    $('#content').load("../vendornav.html");

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
    
                        localStorage.vendorID = data.vendors[0].id;
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
    
        //LOAD EMPLOYEES LIST
        var loadAllProducts = function () {
            $.ajax({
                url: "https://localhost:44308/api/products/vendorId/"+localStorage.vendorID,
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
                                    // sessionStorage.name = data[i].name;
                                    // console.log(sessionStorage.name);
                                    
                                    // console.log("vendor id",sessionStorage.vendorLoginId);
                            }
                            //sessionStorage.vendorLoginId = data[0].vendor.ID;
    
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
    
            //LOAD EMPLOYEES DESIGNATIONS LIST
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
                                for (var i = 0; i < data.length-2; i++) 
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
    
        //insert Product
            var insertProduct = function () {
                if($("#name").val()!="" && $("#quantity").val()!="" && $("#buyprice").val()!="" && $("#sellprice").val()!="" && $("#type").val()!="")
                {
                    // if(sessionStorage.vendorLoginId==localStorage.userId && $("#name").val()!=sessionStorage.name)
                    // {
                        $.ajax({
                            url: "https://localhost:44308/api/products/add",
                            method: "POST",
                            data: {
                                name: $("#name").val(),
                                quantity: $("#quantity").val(),
                                buyPrice: $("#buyprice").val(),
                                sellPrice: $("#sellprice").val(),
                                productTypeID: $("#type").val(),
                                productStatusID:"3",
                                vendorID: "1",
                                modifiedBy:"1"
                            },
                            headers: {
                                'Authorization': 'Basic ' + localStorage.authUser,
                            },
                            complete: function (xhr, status) {
                                if (xhr.status == 201) {
                                    loadAllProducts();
                                    $("#insertMesg").removeAttr("hidden", "hidden");
                                    $("#name").val("");
                                    $("#quantity").val("");
                                    $("#buyprice").val("");
                                    $("#sellprice").val("");
                                    $("#type").val("");
                                }
                                else {
                                    $("#insertMesg").attr("hidden", "hidden");
                                    console.log(xhr);
    
    
                                    if(xhr.responseJSON.message=="The request is invalid.")
                                    {
                                        if(xhr.responseJSON.modelState["product.Quantity"] !=undefined)
                                        {
                                            alert(xhr.responseJSON.modelState["product.Quantity"]);
                                        }
                                        if(xhr.responseJSON.modelState["product.BuyPrice"] !=undefined)
                                        {
                                            alert(xhr.responseJSON.modelState["product.BuyPrice"]);
                                        }
                                        if(xhr.responseJSON.modelState["product.SellPrice"] !=undefined)
                                        {
                                            alert(xhr.responseJSON.modelState["product.SellPrice"]);
                                        }
                                        
                                    }
                                    else
                                    {
                                        if(xhr.responseJSON.message!=null || xhr.responseJSON.message!="" || xhr.responseJSON.message!=undefined)
                                        {
                                            alert(xhr.responseJSON.message);
                                        }
                                    }
                                }
                            }
                        });
                    
                }
                else
                {
                    if ($("#name").val() == "") {
                        $("#msg1").html("*");
                    }
                    if ($("#quantity").val() == "") {
                        $("#msg2").html("*");
                    }
                    if ($("#buyprice").val() == "") {
                        $("#msg3").html("*");
                    } if ($("#sellprice").val() == "") {
                        $("#msg4").html("*");
                    } if ($("#type").val() == "") {
                        $("#msg5").html("*");
                    }
                }
    
            }
            $("#btnadd").on("click",function(){
                insertProduct();
            });
    
            $("#name").keyup(function () {
                $("#msg1").hide();
            })
            $("#quantity").keyup(function () {
                $("#msg2").hide();
            })
            $("#buyprice").keyup(function () {
                $("#msg3").hide();
            })
            $("#buyprice").keyup(function () {
                $("#msg4").hide();
            })
            $("#sellprice").keyup(function () {
                $("#msg5").hide();
            })
        //insert product
    
        //update product
        
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
                            $("#editbuyprice").val(data[0].buyPrice);//EMPLOYEE
                            $("#editsellprice").val(data[0].sellPrice);
                            
                            
                            $('#edittype option[value="'+data[0].productType.type+'"]').attr("selected", "selected");
                            if(data[0].productStatus.id == '2')
                            {                    
                                $("#updateMesg").attr("hidden", "hidden");
                                $("#enableMesg").attr("hidden", "hidden");
                                $("#disableMesg").attr("hidden", "hidden");
                                $("#btnactive").attr("hidden", "hidden");
                                $("#btndeactive").removeAttr("hidden", "hidden");
                                $("#btnupdate").removeAttr("hidden", "hidden");
                            }
                            else if(data[0].productStatus.id == '3')
                            {
                                $("#updateMesg").attr("hidden", "hidden");
                                $("#enableMesg").attr("hidden", "hidden");
                                $("#disableMesg").attr("hidden", "hidden");
                                $("#btndeactive").attr("hidden", "hidden");
                                $("#btnactive").removeAttr("hidden", "hidden");
                                $("#btnupdate").removeAttr("hidden", "hidden");
                            }
                            else
                            {
                                $("#updateMesg").attr("hidden", "hidden");
                                $("#enableMesg").attr("hidden", "hidden");
                                $("#disableMesg").attr("hidden", "hidden");
                                $("#btnupdate").attr("hidden", "hidden");
                                $("#btndeactive").attr("hidden", "hidden");
                                $("#btnactive").attr("hidden", "hidden");
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
        //loadProductDetails(1);
        $('#detailProduct').on('show.bs.modal', function(e) {
            var id = $(e.relatedTarget).data('id');
            loadProductDetails(id);
        });
    
    
        //update product
});