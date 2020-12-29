$(document).ready(function(){
	var orderID;
	if (localStorage.authUser == null || localStorage.userRole!=4) {
        window.location.href = "../Login/Authentication.html";
    }


//Starts Get All users connected in chat
console.log("ok");
var listPendingOrderID=function(){
	

	$.ajax({
		url:"https://localhost:44308/api/deliveryorders/"+localStorage.username,
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				
				
				var str;
				for (var i = 0; i < data.length; i++) {
					
					orderID=data[i].id;
					listPending()

					}
					
					
				}
				else
				{	

				}

			}
	});
}
listPendingOrderID();
//Ends Get All users connected in chat


var listPending=function(){
	console.log(orderID);
		$.ajax({
		url:"https://localhost:44308/api/deliveryorders/"+localStorage.username+"/"+orderID,
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				
				console.log(data);
				var str;
				for (var i=0; i<data.length; i++){
				str+="<tr id='cell'><td>"+data[i].product.name+"</td><td>"+data[i].product.sellPrice+"</td><td>"+data[i].product.quantity+"</td></tr>"	
				}
				$("#pendingList tbody").html(str);
					
				}
				else{
					console.log("okk");

				}

			}
	});

}



});