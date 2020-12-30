$(document).ready(function(){
	var orderID;

	var str;
	var nextLine;
	var count=0;
	var productNames="";
	var sepration;
	var orderAmount=0;
	var individualAmount=0;
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
						

						for (var k=0; k<data.length; k++)
						{
							if(data.length==1 || data.length-1==k){
								sepration="";
							}
							else{
								sepration="<br>"
							}
							orderAmount+=data[k].cartAmount;
							productNames+="<b>"+data[k].product.name+"</b>= "+data[k].cartAmount+" TK "+sepration;
						}
						str+="<tr><td><b>"+data[j].order.id+"</b></td><td>"+data.length+" Products</td><td>"+productNames+"</td><td>"+orderAmount+" TK</td><td><button id='Accepted' btn-id-accept="+data[j].order.id+" class='btn btn-success btn-sm'>Accepted</button></td><td><button id='Rejected' btn-id-reject="+data[j].order.id+" class='btn btn-danger btn-sm'>Rejected</button></td></tr>"	
						productNames="";
						orderAmount=0;
						break;
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


//Strats search
$("#search").keyup(function(){
	var dataOrder;
			if($("#search").val() != ""){
			$.ajax({
			url:"https://localhost:44308/api/deliveryorders/"+ localStorage.username +"/order/"+ $("#search").val(),
			method:"Get",
			headers:{
				'Authorization': 'Basic ' + localStorage.authUser
		},
			complete:function(xmlhttp,status){
				
			
				if(xmlhttp.status==200){
					dataOrder=xmlhttp.responseJSON;
					

					orderID=dataOrder.id;
					str="";
					listPending();
				
				}
				else
				{
					
				}
				
			}
					
		});
		}
		else{
				str="";
				listPendingOrderID();
			}
	});
//Ends search


$("#pendingList").on("click","#Accepted",function(){
	var button=$(this);
	var orderid=button.attr("btn-id-accept");
	console.log(orderid);
	$.ajax({
				url:"https://localhost:44308/api/deliveryorders/"+orderid+"/order",
				method:"GET",
				headers:{
						//Authorization:"Basic "+ btoa("4:4444")
					'Authorization': 'Basic ' + localStorage.authUser
				},
				complete:function(xmlhttp,status){

				if(xmlhttp.status==200){
					var orderdata=xmlhttp.responseJSON;
					console.log(orderdata);
					$.ajax({
					url:"https://localhost:44308/api/deliveryorders/"+orderid,
					method:"PUT",
					headers:{
							//Authorization:"Basic "+ btoa("4:4444")
							'Authorization': 'Basic ' + localStorage.authUser
					},
					header:"Content-Type:application/json",
					data:{
							"id": orderid,
							"totalAmount": orderdata.totalAmount,
							"address": orderdata.address,
							
							"customerID": orderdata.customerID,
							"customerName": orderdata.customerName,
							
							
							"saleType": orderdata.saleType,
							"saleTypeID": orderdata.saleTypeID,
							"isSold": true,
							"orderStatusID": 4,
							"sellBy": localStorage.username

				        
						
					},
					complete:function(xmlhttp,status){
						var data=xmlhttp.responseJSON;
						if(xmlhttp.status==200){
								str="";
								listPendingOrderID();
						}
						else{
							console.log("Error");
						}
						}
				});
				}
			}
		});
});







		
	





});