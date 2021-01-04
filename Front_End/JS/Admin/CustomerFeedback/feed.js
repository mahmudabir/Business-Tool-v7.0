$(document).ready(function(){
    if (localStorage.authUser == null || localStorage.userRole!=1)
    {
        //localStorage.clear();
        window.location.href = "http://localhost/Business-Tool-v7.0-api/Front_End/Html/Login/";
    }

	$('#content').load("../adminnav.html");

    //LOAD LIST
    var loadAllNotice = function () {
        $.ajax({
            url: "https://localhost:44308/api/feedbacks",
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
							sl=i+1;
                            if(sl = 1)
							{
								str += "<div class='card'>"+
										"<div class='card-header' id='heading"+data[i].id+"One"+"'>"+
											"<h2 class='mb-0'>"+
												"<button class='btn btn-link' data-toggle='collapse' data-target='#collapse"+data[i].id+"One"+"' aria-expanded='false' aria-controls='collapse"+data[i].id+"'>"+
													data[i].subject+" &nbsp;&nbsp;&nbsp; <span style='font-style: italic; color:#b3b3b3'>(<b> By "+data[i].customer.name+" - "+data[i].customer.login.email+", "+data[i].customer.login.mobile+"</b>)</span>"+
												"</button>"+
											"</h2>"+
										"</div>"+
									
										"<div id='collapse"+data[i].id+"One"+"' class='collapse show' aria-labelledby='heading"+data[i].id+"One"+"' data-parent='#accordion'>"+
											"<div class='card-body'>"+
												data[i].description	+
											"</div>"+
										"</div>"+
									"</div><br>";
									//sl++;
							}
							else
							{
								str += "<div class='card'>"+
										"<div class='card-header' id='heading"+data[i].id+"One"+"'>"+
											"<h5 class='mb-0'>"+
												"<button class='btn btn-link' data-toggle='collapse' data-target='#collapse"+data[i].id+"One"+"' aria-expanded='false' aria-controls='collapse"+data[i].id+"'>"+
												data[i].subject+" &nbsp;&nbsp;&nbsp; <span style='font-style: italic; color:#b3b3b3'>(<b> By "+data[i].customer.name+" - "+data[i].customer.login.email+", "+data[i].customer.login.mobile+"</b>)</span>"+
												"</button>"+
											"</h5>"+
										"</div>"+
									
										"<div id='collapse"+data[i].id+"One"+"' class='collapse show' aria-labelledby='heading"+data[i].id+"One"+"' data-parent='#accordion'>"+
											"<div class='card-body'>"+
												data[i].description	+
											"</div>"+
										"</div>"+
									"</div><br>";
									//sl++;
							}
							sl=i+1;
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
					// alert(sl);
                    $("#accordion").append(str);
                }
                else 
                {
                    str += "<div class='card'>"+
								"<div class='card-header' id='headingOne'>"+
									"<h5 class='mb-0'>"+
										"<button class='btn btn-link' data-toggle='collapse' data-target='#collapseOne' aria-expanded='false' aria-controls='collapse"+data[i].id+"'>"+
											"NO FEEDBACKS"+
										"</button>"+
									"</h5>"+
								"</div>"+
							
								"<div id='collapseOne' class='collapse show' aria-labelledby='headingOne' data-parent='#accordion'>"+
									"<div class='card-body'>"+
										"NO FEEDBACKS"+
									"</div>"+
								"</div>"+
							"</div><br>";
					$("#accordion").append(str);
                }
            }
        });
    }
    loadAllNotice();

});