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
                    var icon = "";
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            if(data[i].login.accessStatusID == 1)
                            {
                                icon = '<i style="color: green;" class="fas fa-user-check"></i>';
                            } 
                            else
                            {
                                icon = '<i style="color: red;" class="fas fa-user-slash"></i>';
                            }
                            str += "<tr>"+
                                        "<td align='center'>"+ data[i].id + "</td>"+
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].quantity+ "</td>"+
                                        "<td>" + data[i].buyPrice + "</td>"+
                                        "<td>" + data[i].sellPrice + "</td>"+
                                        "<td>" + data[i].productType.type + "</td>"+
                                        
                                        "<td align='center'> <button type='button' data-toggle='modal' data-target='#detailProduct' data-id="+data[i].id+" class='btn btn-outline-dark'>Details</button>" +
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

})