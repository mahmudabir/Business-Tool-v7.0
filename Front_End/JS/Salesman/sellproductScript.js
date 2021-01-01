$(document).ready(function(){
	var clickedRow="";
	var valueOfI;
	var OrderclickedRow="";
	var valueOfK;
	var opacity=.5;

	if (localStorage.authUser == null || localStorage.userRole!=3) {

        window.location.href = "../Login/Index.html";
    }


//Starts Get All users connected in chat
console.log("ok");
var listProduct=function(){
	

	$.ajax({
		url:"https://localhost:44308/api/sellproducts/availableproducts",
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var dataProduct=xmlhttp.responseJSON;
				var str;
				
				
				for (var i = 0; i < dataProduct.length; i++) {
					
					str+="<tr  btn-id-product="+dataProduct[i].id+" btn-i-val="+i+"><td>"+dataProduct[i].id+"</td><td>"+dataProduct[i].name+"</td><td>"+dataProduct[i].quantity+"</td><td>"+dataProduct[i].sellPrice+"</td><td><button id='cell' class='btn btn-success btn-sm'>Select</td></tr>"

					$("#productList tbody").html(str);
					// for(var j=0;j<dataProduct.length;j++){
					// 	$("#buyQuantity"+[j]).hide();
					// 	$("#addToCart"+[j]).hide();
					// }
					
				}
					
				}
				else
				{	
					$("#productList tbody").html("");
				}

			}
	});
}
listProduct();
//Ends Get All users connected in chat



$("#productList").on("click","#cell",function(){
	var button=$(this);
	clickedRow=button.attr("btn-id-product");
	valueOfI=button.attr("btn-i-val");
	//console.log(clickedRow);
   	// $("#buyQuantity"+[valueOfI]).fadeIn(1000);
   	
   	// $("#addToCart"+[valueOfI]).fadeIn(1000);
 //   	console.log(valueOfI);
	// console.log(clickedRow);
   
});

$("#productList").on("click","#addToCart",function(){
	
// console.log(valueOfI);
	var buyQuantity=$("#buyQuantity").val();
	console.log(buyQuantity);
	if(clickedRow!=""){
	if(OrderclickedRow!=""){
	if(buyQuantity!="")
	{
		confirm(buyQuantity+","+OrderclickedRow);
	}
	else{
		confirm("No quantity is Added!! Add some quantity First");
	}

	}

	else{
		confirm("No Cart is Sellected!! Select a Cart First");
	}
   	}
   	else{
		confirm("No Product is Sellected!! Select a A First");
	}
   
});





var listOrder=function(){
	

	$.ajax({
		url:"https://localhost:44308/api/sellproducts/"+localStorage.username+"/uncheckedorder",
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var dataOrder=xmlhttp.responseJSON;
				var str;
				
				
				for (var k = 0; k < dataOrder.length; k++) {
					
					str+="<tr id='Ordercell' btn-id-order="+dataOrder[k].id+" btn-k-val="+k+"><td>"+dataOrder[k].id+"</td></tr>"

					$("#orderList tbody").html(str);
					
				}
					
				}
				else
				{	
					$("#orderList tbody").html("No data");
				}

			}
	});
}
listOrder();

$("#orderList").on("click","#Ordercell",function(){
	var button=$(this);
	OrderclickedRow=button.attr("btn-id-order");
	valueOfK=button.attr("btn-k-val");
	//console.log(clickedRow);
   	
   
});



// var listPending=function(){
	
// 				$.ajax({
// 				url:"https://localhost:44308/api/deliveryorders/"+localStorage.username+"/"+orderID,
// 				method:"GET",
// 				headers:{
// 						//Authorization:"Basic "+ btoa("4:4444")
// 					'Authorization': 'Basic ' + localStorage.authUser
// 				},
// 				complete:function(xmlhttp,status){

// 				if(xmlhttp.status==200){
					

// 					var data=xmlhttp.responseJSON;
							
// 					for (var j=0; j<data.length; j++)
// 					{
						

// 						for (var k=0; k<data.length; k++)
// 						{
// 							if(data.length==1 || data.length-1==k){
// 								sepration="";
// 							}
// 							else{
// 								sepration="<br>"
// 							}
// 							orderAmount+=data[k].cartAmount;
// 							productNames+="<b>"+data[k].product.name+"</b>= "+data[k].cartAmount+" TK "+sepration;
// 						}
// 						str+="<tr><td><b>"+data[j].order.id+"</b></td><td>"+data.length+" Products</td><td>"+productNames+"</td><td>"+orderAmount+" TK</td><td><button id='Accepted' btn-id-accept="+data[j].order.id+" class='btn btn-success btn-sm'>Accepted</button></td><td><button id='Rejected' btn-id-reject="+data[j].order.id+" class='btn btn-danger btn-sm'>Rejected</button></td></tr>"	
// 						productNames="";
// 						orderAmount=0;
// 						break;
// 					}
// 						$("#pendingList tbody").html(str);
							
// 					}
// 				else
// 				{
// 					console.log("Error from 200 else"+orderID);
// 				}

// 			}
// 	});

// }
// $('#pendingList tr').hover(function(){
//   $(this).css("background-color", "yellow");
//   }, function(){
//   $(this).css("background-color", "pink");
// });


//Strats search
// $("#search").keyup(function(){
// 	var dataOrder;
// 			if($("#search").val() != ""){
// 			$.ajax({
// 			url:"https://localhost:44308/api/deliveryorders/"+ localStorage.username +"/order/"+ $("#search").val(),
// 			method:"Get",
// 			headers:{
// 				'Authorization': 'Basic ' + localStorage.authUser
// 		},
// 			complete:function(xmlhttp,status){
				
			
// 				if(xmlhttp.status==200){
// 					dataOrder=xmlhttp.responseJSON;
					

// 					orderID=dataOrder.id;
// 					str="";
// 					listPending();
				
// 				}
// 				else
// 				{
					
// 				}
				
// 			}
					
// 		});
// 		}
// 		else{
// 				str="";
// 				listPendingOrderID();
// 			}
// 	});
//Ends search




});