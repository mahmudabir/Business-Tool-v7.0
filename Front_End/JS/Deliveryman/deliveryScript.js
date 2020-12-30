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
				var dataOrder=xmlhttp.responseJSON;
				
				
				var str;
				for (var i = 0; i < dataOrder.length; i++) {
					
					orderID=dataOrder[i].id;
					listPending();

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
							
					for (var j=0; j<data.length; j++)
					{

					str+="<tr><td>"+data[j].product.name+"</td><td>"+data[j].product.sellPrice+"</td><td>"+data[j].product.quantity+"</td></tr>"	
	
					}
					$("#pendingList tbody").html(str);
							
					}
				else
				{
					console.log("Error from 200 else"+orderID);
				}

			}
	});

}
// $('#pendingList tr').hover(function(){
//   $(this).css("background-color", "yellow");
//   }, function(){
//   $(this).css("background-color", "pink");
// });


});