$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole==5)
    {
        //localStorage.clear();
        window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
    }

	if(localStorage.userRole==1)
	{
		$('#content').load("../Admin/adminnav.html");
	}
	else if(localStorage.userRole==2)
	{
		$('#content').load("../Manager/managernav.html");
	}
	else if(localStorage.userRole==3)
	{
		$('#content').load("../Salesman/SalesmanNavbar.html");
	}
	else if(localStorage.userRole==4)
	{
		$('#content').load("../Deliveryman/deliverymannav.html");
	}
	else if(localStorage.userRole==6)
	{
		$('#content').load("../Vendor/vendornav.html");
	}
	else
	{
		window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
	}

    //LOAD LIST
    var loadAllNotice = function () {
        $.ajax({
            url: "https://localhost:44308/api/notices",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';
                    var sl = 1;
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            if(sl = 1)
							{
								str += "<div class='card'>"+
										"<div class='card-header' id='heading"+data[i].id+"One"+"'>"+
											"<h5 class='mb-0'>"+
												"<button class='btn btn-link' data-toggle='collapse' data-target='#collapse"+data[i].id+"One"+"' aria-expanded='true' aria-controls='collapse"+data[i].id+"'>"+
													data[i].subject+
												"</button>"+
											"</h5>"+
										"</div>"+
									
										"<div id='collapse"+data[i].id+"One"+"' class='collapse show' aria-labelledby='heading"+data[i].id+"One"+"' data-parent='#accordion'>"+
											"<div class='card-body'>"+
												data[i].description	+
											"</div>"+
										"</div>"+
									"</div><br>";
									sl++;
							}
							else
							{
								str += "<div class='card'>"+
										"<div class='card-header' id='heading"+data[i].id+"One"+"'>"+
											"<h5 class='mb-0'>"+
												"<button class='btn btn-link' data-toggle='collapse' data-target='#collapse"+data[i].id+"One"+"' aria-expanded='false' aria-controls='collapse"+data[i].id+"'>"+
													data[i].subject+
												"</button>"+
											"</h5>"+
										"</div>"+
									
										"<div id='collapse"+data[i].id+"One"+"' class='collapse show' aria-labelledby='heading"+data[i].id+"One"+"' data-parent='#accordion'>"+
											"<div class='card-body'>"+
												data[i].description	+
											"</div>"+
										"</div>"+
									"</div><br>";
									sl++;
							}
                        }
                    }
                    else
                    {
                        str += "<div class='card'>"+
										"<div class='card-header' id='headingOne'>"+
											"<h5 class='mb-0'>"+
												"<button class='btn btn-link' data-toggle='collapse' data-target='#collapseOne' aria-expanded='false' aria-controls='collapse"+data[i].id+"'>"+
													"NO NOTICE"+
												"</button>"+
											"</h5>"+
										"</div>"+
									
										"<div id='collapseOne' class='collapse show' aria-labelledby='headingOne' data-parent='#accordion'>"+
											"<div class='card-body'>"+
												"NO NOTICE"+
											"</div>"+
										"</div>"+
									"</div><br>";
                    }

                    $("#accordion").append(str);
                }
                else 
                {
                    str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    $("#emptable tbody").html(str);
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    loadAllNotice();

});