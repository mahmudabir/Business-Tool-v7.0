$(document).ready(function(){

	if (localStorage.authUser == null) {

        window.location.href = "../Login/Index.html";
    }

    else if(localStorage.userRole  == 1){
    	window.location.href = "../Admin/";
    }

    else if(localStorage.userRole  == 2){
    	window.location.href = "../Manager/";
    }
    else if(localStorage.userRole  == 3){
    	window.location.href = "../Salesman/";
    }
    else if(localStorage.userRole  == 5){
    	window.location.href = "../Customer/";
    }
    else if(localStorage.userRole  == 6){
    	window.location.href = "../Vendor/";
    }




	$("#div7").animate({right:"10px"},800,function(){
	$("#div6").animate({right:"40px"},800,function(){
	$("#div5").animate({right:"80px"},800,function(){
	$("#div4").animate({right:"110px"},800,function(){
	$("#div3").animate({right:"140px"},800,function(){
	$("#div2").animate({right:"170px"},800,function(){
	$("#div1").animate({right:"200px"},800,function(){
	$("#div8").animate({right:"-60px"},800,function(){
	
	});
	});
	});
	});
	});
	});
	});
	});

});