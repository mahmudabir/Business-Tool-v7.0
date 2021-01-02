$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=6)
    {
        //localStorage.clear();
        window.location.href = "../../Login/index.html";
    }

    $('#content').load("../vendornav.html");

    //LOAD EMPLOYEES LIST
    var loadAllProducts = function () {
        $.ajax({
            url: "https://localhost:44308/api/products/all",
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
            $.ajax({
                url: "https://localhost:44308/api/products/add",
                method: "POST",
                data: {
                    
                },
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 201) {
                        $("#insertMesg").removeAttr("hidden", "hidden");
                    }
                    else {
                        $("#insertMesg").attr("hidden", "hidden");
                        alert("Something Wrong"); 
                        console.log(xhr);
                    }
                }
            });
        }
        $("#btnadd").on("click",function(){
            insertProduct();
        });
    //insert product

})