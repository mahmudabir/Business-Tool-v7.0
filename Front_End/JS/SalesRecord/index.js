$(document).ready(function(){
    if (localStorage.authUser == null && localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "../Login/index.html";
    }
    else if(localStorage.authUser == null && localStorage.userRole!=2)
    {
        window.location.href = "../Login/index.html";
    }
    else if(localStorage.authUser == null && localStorage.userRole!=3)
    {
        window.location.href = "../Login/index.html";
    }

    //load nav
    if(localStorage.userRole==1)
    {
        $('#content').load("../Admin/adminnav.html");
    }
    if(localStorage.userRole==2)
    {
        $('#content').load("../Manager/managernav.html");
    }
    if(localStorage.userRole==3)
    {
        $('#content').load("../Salesman/salesmannav.html");
    }

    //load nav


    // Load all Data
    var loadAllSalesRecord = function () {
        $.ajax({
            url: "https://localhost:44308/api/SaleRecords",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    // console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;
                    // console.log(data);
                    var str = '';
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            
                            str += "<tr>"+
                                        "<td>"+ data[i].id + "</td>"+
                                        "<td>"+ data[i].totalAmount +"</td>"+
                                        "<td>"+ data[i].date+ "</td>"+
                                        "<td>" + data[i].orderID + "</td>"+
                                "</tr>";
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
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
    loadAllSalesRecord();
    // Load all Data

    //Search Data
    var searchSalesRecordsByID = function () {
        if($.trim($("#search").val()) !== "")
        {
            $.ajax({
                url: "https://localhost:44308/api/SaleRecords/"+$("#search").val(),
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        // console.log(xhr.responseJSON);
    
                        var data = xhr.responseJSON;
                        console.log(data);
                        var str = '';
                        //if(data.length>0)
                        //{
                            //for (var i = 0; i < data.length; i++) 
                            //{
                                
                                str += "<tr>"+
                                            "<td>"+ data.id + "</td>"+
                                            "<td>"+ data.totalAmount +"</td>"+
                                            "<td>"+ data.date+ "</td>"+
                                            "<td>" + data.orderID + "</td>"+
                                    "</tr>";
                                sl++;
                            // }
                        //}
                        //else
                        //{
                            //str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                        //}

                        $("#table tbody").html(str);
                    }
                    else {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                        //alert("Something Went Wrong.");
                    }
                }
            });
        }
        
        else
        {
            loadAllSalesRecord();
        }
    }
    $("#search").on("keyup change",function(){
        searchSalesRecordsByID();
    });

    //Search Data
});