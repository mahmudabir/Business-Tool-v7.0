$(document).ready(function(){
	var clickedRow="";
	var valueOfI;
	var OrderclickedRow="";
	var valueOfK;
	var price=0;
	var opacity=.5;
	var productName;
	var productid;
	var buyQuantity;
	var updatedQuantity;
	var dataCart;
	var totalAmount=0;
	var orderTotalAmount=0;
	var cartamount=0;
	var tAmount=0;
	var dataCartList;
	if (localStorage.authUser == null || localStorage.userRole!=3) {

        window.location.href = "../Login/Index.html";
    }


//Starts Get All users connected in chat
console.log("ok");
var listProduct=function(){
	$("#checkList").hide();

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
					
					str+="<tr  btn-id-product="+dataProduct[i].id+" btn-i-val="+i+"><td>"+dataProduct[i].id+"</td><td>"+dataProduct[i].name+"</td><td>"+dataProduct[i].quantity+"</td><td>"+dataProduct[i].sellPrice+"</td><td colspan='2'><button style='float:right' id='cell' btn-price-quantity="+dataProduct[i].quantity+" btn-price-product="+dataProduct[i].sellPrice+" btn-id-product="+dataProduct[i].id+" class='btn btn-success btn-sm'>Select</td></tr>"	
				}
					$("#productList tbody").html(str);
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
	price=button.attr("btn-price-product");
	valueOfI=button.attr("btn-i-val");
   	var quan=button.attr("btn-price-quantity");
    buyQuantity=$("#buyQuantity").val();
	

	
	
	if(clickedRow!=""){
	if(OrderclickedRow!=""){
	if(parseInt(buyQuantity)<=parseInt(quan)){
	if(buyQuantity!="" && buyQuantity>0)
	{
		var msg="This Product will be added as";
		if(confirm(msg+"..................                                                  "+                                                        
			"OrderID: "+OrderclickedRow+"     Quantity: "+buyQuantity+"    ProductID:"+clickedRow)){
			updateDataInTables();
		}
	}
	else{
		confirm("No quantity is Added!! Add some quantity First");
	}

	}
	else{
		confirm("Quantity can't be greater than available");
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
				}

				$("#orderList tbody").html(str);	

				}
				else
				{	
					$("#orderList tbody").html("No cart is available");
				}

			}
	});
}
listOrder();

$("#orderList").on("click","#Ordercell",function(){
	var btn=$(this);
	OrderclickedRow=btn.attr("btn-id-order");
	valueOfK=btn.attr("btn-k-val");
	$("#cartList").fadeIn(1000);
	orderCartShow();

   
});




var orderCartShow=function(){
	

	$.ajax({
		url:"https://localhost:44308/api/sellproducts/"+OrderclickedRow+"/cart",
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				dataCart=xmlhttp.responseJSON;
				var str;
				
				var productNames="";
				var head="<tr id='th'><th><span style='color:White;''>#OrderCART "+OrderclickedRow+"</span></th></tr>"
				
				for (var j = 0; j < dataCart.length; j++) {
					totalAmount=0;
					

					for (var k=0; k<dataCart.length; k++)
						{
							if(dataCart.length==1 || dataCart.length-1==k){
								sepration="";
							}
							else{
								sepration="<br>"
							}
							totalAmount+=dataCart[k].cartAmount;
							productNames+=(k + 1)+")"+dataCart[k].product.name+": "+dataCart[k].quantity+"pieces "+dataCart[k].cartAmount+" TK "+sepration;
						
						}

						str="<tr><td><b>Total Products: "+dataCart.length+"</b><br><b>ProductNames:<br>"+productNames+"</b><br><b style='color:red;'>Total Amount: "+totalAmount+"</b><br><br><button id='checkout' class='btn btn-warning btn-sm'>Go to Checkout</button></td></tr>"
						productNames="";
						orderTotalAmount=totalAmount;
						
						break;
				}
					
					$("#cartList tbody").html(str);
					$("#cartList thead").html(head);

				}
				else
				{	
					var head="<tr id='th'><th><span style='color:White;''>#OrderCART "+OrderclickedRow+"</span></th></tr>"
					$("#cartList thead").html(head);
					$("#cartList tbody").html("No data");
				}

			}
});

}



// $("#cartList").on("click","#deleteOrder",function(){
	
// 	if(confirm("Are you sure to delete this Order Cart?")){
// 		$.ajax({

// 		url:"https://localhost:44308/api/sellproducts/"+OrderclickedRow,
// 		method:"DELETE",
// 		headers:{
// 				//Authorization:"Basic "+ btoa("4:4444")
// 				'Authorization': 'Basic ' + localStorage.authUser
// 		},

// 		complete:function(xmlhttp,status){
// 			var data=xmlhttp.responseJSON;
			
// 			if(xmlhttp.status==204)
// 			{
// 				console.log("okk");
// 				$("#cartList tbody").html("No data");
// 				listOrder();
				
// 			}
// 			else
// 			{
// 				console.log("error");
// 			}
// 		}
// 	});
// 	}
   
// });


var updateDataInTables=function(){
	cartamount=price*buyQuantity;
	console.log(buyQuantity);
	console.log(cartamount);
	console.log(OrderclickedRow);
	console.log(clickedRow);

	$.ajax({
		url:"https://localhost:44308/api/sellproducts/orderCartproduct/"+OrderclickedRow+"/"+clickedRow,
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var checkCartdata=xmlhttp.responseJSON;
				if(checkCartdata.length!=0){
					console.log("OKKKK now Put");
				if(confirm("Item is Already exist in this cart....Do you want to increase the cart quantity?")){
					$.ajax({

					url:"https://localhost:44308/api/sellproducts/orderCartUpdate/"+checkCartdata[0].id,
					method:"PUT",
					headers:{
							//Authorization:"Basic "+ btoa("4:4444")
							'Authorization': 'Basic ' + localStorage.authUser
					},
					header:"Content-Type:application/json",
					data:{
						"id": checkCartdata[0].id,
						"quantity": parseInt(checkCartdata[0].quantity) + parseInt(buyQuantity),
				        "cartAmount": checkCartdata[0].cartAmount + cartamount,
				        "orderID": OrderclickedRow,
				        "productID": clickedRow
					},

					complete:function(xmlhttp,status){
						var data=xmlhttp.responseJSON;
						
						if(xmlhttp.status==200)
						{
							
							
							productid=data.productID;

							getTheProduct();
						}
						else
						{
							
						}
					}
				});
				}

				}
				else{
					
				}
				

			}
			else{
				console.log("OKKKK now Insert");
				  	$.ajax({

					url:"https://localhost:44308/api/sellproducts",
					method:"POST",
					headers:{
							//Authorization:"Basic "+ btoa("4:4444")
							'Authorization': 'Basic ' + localStorage.authUser
					},
					header:"Content-Type:application/json",
					data:{
						"quantity": buyQuantity,
				        "cartAmount": cartamount,
				        "orderID": OrderclickedRow,
				        "productID": clickedRow
					},

					complete:function(xmlhttp,status){
						var data=xmlhttp.responseJSON;
						
						if(xmlhttp.status==201)
						{
							
							
							productid=data.productID;

							getTheProduct();
						}
						else
						{
						}
					}
				});
			}
		}

	});

 
	
	
}

var getTheProduct=function(){
	$.ajax({
		url:"https://localhost:44308/api/sellproducts/product/"+productid,
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var productQuantity=data.quantity;
				updatedQuantity=productQuantity - buyQuantity;
				$.ajax({

				url:"https://localhost:44308/api/sellproducts/"+productid+"/product",
				method:"PUT",
				headers:{
						//Authorization:"Basic "+ btoa("4:4444")
						'Authorization': 'Basic ' + localStorage.authUser
				},
				header:"Content-Type:application/json",
				data:{
							"id": productid,
							"name": data.name,
							"quantity": updatedQuantity,
							
							"buyPrice": data.buyPrice,
							"sellPrice": data.sellPrice,
							"image": data.image,
							
							//"productType": productdata.productType,
							"productTypeID": data.productTypeID,
							"productStatus": data.productStatus,
							"productStatusID": data.productStatusID,
							
							"vendorID": data.vendorID,
							
							"modifiedBy": data.modifiedBy
				},

				complete:function(xmlhttp,status){
					
					
					if(xmlhttp.status==200)
					{
						var data=xmlhttp.responseJSON;
						orderCartShow();
						listProduct();
						
					}
					else
					{
						
					}
				}
			});
			

					}
					else{
						console.log("error");
					}
				}
			});

}






$("#orderList").on("click","#addnewOrder",function(){
	
	$.ajax({

		url:"https://localhost:44308/api/sellproducts/"+localStorage.username+"/orderadd",
		method:"POST",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		header:"Content-Type:application/json",
		data:{
			"totalAmount": 0,
			"address": null,
										
			"customerID": null,
			"customerName": null,
			"saleTypeID": 2,
			"isSold": false,
			"orderStatusID": 2,
			"sellBy": localStorage.username
		},

		complete:function(xmlhttp,status){
			var data=xmlhttp.responseJSON;
			
			if(xmlhttp.status==201)
			{
				listOrder();
				orderCartShow();
			}
			else
			{
				console.log("Error");
			}
		}
	});
   
});


$("#search").keyup(function(){
	var dataOrder;
			if($("#search").val() != ""){
			$.ajax({
			url:"https://localhost:44308/api/sellproducts/product/"+ $("#search").val(),
			method:"Get",
			headers:{
				'Authorization': 'Basic ' + localStorage.authUser
		},
			complete:function(xmlhttp,status){
				var str;
			
				if(xmlhttp.status==200){
					dataProduct=xmlhttp.responseJSON;
					str+="<tr  btn-id-product="+dataProduct.id+" btn-i-val="+0+"><td>"+dataProduct.id+"</td><td>"+dataProduct.name+"</td><td>"+dataProduct.quantity+"</td><td>"+dataProduct.sellPrice+"</td><td colspan='2'><button style='float:right' id='cell' btn-price-quantity="+dataProduct.quantity+" btn-price-product="+dataProduct.sellPrice+" btn-id-product="+dataProduct.id+" class='btn btn-success btn-sm'>Select</td></tr>"	
					$("#productList tbody").html(str);
				}
				else
				{
					str="";
					listProduct();
				}
				
			}
					
		});
		}
		else{
				str="";
				listProduct();
			}
	});


$("#cartList").on("click","#checkout",function(){
	$("#productList").hide();
	$("#orderList").hide();
	$("#cartList").hide();
	$("#checkList").fadeIn(1000);
	
	$.ajax({
			url:"https://localhost:44308/api/sellproducts/orderCart/"+ OrderclickedRow,
			method:"Get",
			headers:{
				'Authorization': 'Basic ' + localStorage.authUser
		},
			complete:function(xmlhttp,status){
				var checkStr;
				var tAmount=0;
				if(xmlhttp.status==200){
					dataCartList=xmlhttp.responseJSON;
					for (var i = 0; i < dataCartList.length; i++) {
						tAmount+=dataCartList[i].cartAmount;
						checkStr+="<tr><td>"+dataCartList[i].productID+"</td><td>"+dataCartList[i].product.name+"</td><td>"+dataCartList[i].quantity+"</td><td>"+dataCartList[i].cartAmount+"</td><td><button id='deleteFromCart' btn-id-I="+i+" btn-id-acutualQuant="+dataCartList[i].product.quantity+" btn-id-quant="+dataCartList[i].quantity+" btn-id-prodid="+dataCartList[i].productID+" style='float:right;' class='btn btn-danger btn-sm'>Delete</button></td></tr>"	
					}
					sessionStorage.am = tAmount;
					checkStr+="<tr id='th3'><td colspan='3'><b>Total Amount</b></td><td colspan=''><b>"+tAmount+"</b></td><td><button id='checkout' style='float:right;' class='btn btn-success btn-sm'>CheckOut</button></td></tr>"
					$("#checkList tbody").html(checkStr);
				}
				else
				{
					console.log("error");
				}
				
			}
					
		});


});


$("#checkList").on("click","#back",function(){
	listProduct();
	listOrder();
	$("#productList").fadeIn(1000);
	$("#orderList").fadeIn(1000);
	
	$("#checkList").hide();

});


$("#checkList").on("click","#deleteFromCart",function(){
	var button=$(this);
	var proID=button.attr("btn-id-prodid");
	var quant=button.attr("btn-id-quant");
	var Actualquant=button.attr("btn-id-acutualQuant");
	var index=button.attr("btn-id-I");
	var upQuant= parseInt(quant) + parseInt(Actualquant);
	console.log(quant);
	console.log(dataCartList[index].product.quantity);
	console.log(upQuant);
	if(confirm("Are you sure to delete this item?")){
				$.ajax({

				url:"https://localhost:44308/api/sellproducts/"+proID+"/product",
				method:"PUT",
				headers:{
						//Authorization:"Basic "+ btoa("4:4444")
						'Authorization': 'Basic ' + localStorage.authUser
				},
				header:"Content-Type:application/json",
				data:{
							"id": proID,
							"name": dataCartList[index].product.name,
							"quantity": upQuant,
							
							"buyPrice": dataCartList[index].product.buyPrice,
							"sellPrice": dataCartList[index].product.sellPrice,
							"image": dataCartList[index].product.image,
							
							//"productType": productdata.productType,
							"productTypeID": dataCartList[index].product.productTypeID,
							"productStatus": dataCartList[index].product.productStatus,
							"productStatusID": dataCartList[index].product.productStatusID,
							
							"vendorID": dataCartList[index].product.vendorID,
							
							"modifiedBy": dataCartList[index].product.modifiedBy
				},

				complete:function(xmlhttp,status){
					
					
					if(xmlhttp.status==200)
					{	
						$.ajax({

							url:"https://localhost:44308/api/sellproducts/deleteProduct/"+dataCartList[index].id,
							method:"DELETE",
							headers:{
									//Authorization:"Basic "+ btoa("4:4444")
									'Authorization': 'Basic ' + localStorage.authUser
							},

							complete:function(xmlhttp,status){
								var data=xmlhttp.responseJSON;
								
								if(xmlhttp.status==204)
								{
									console.log("okk");
									$.ajax({
									url:"https://localhost:44308/api/sellproducts/orderCart/"+ OrderclickedRow,
									method:"Get",
									headers:{
										'Authorization': 'Basic ' + localStorage.authUser
								},
									complete:function(xmlhttp,status){
										var checkStr;
										var tAmount=0;
										if(xmlhttp.status==200){
											dataCartList=xmlhttp.responseJSON;
											for (var i = 0; i < dataCartList.length; i++) {
												tAmount+=dataCartList[i].cartAmount;
												
												checkStr+="<tr><td>"+dataCartList[i].productID+"</td><td>"+dataCartList[i].product.name+"</td><td>"+dataCartList[i].quantity+"</td><td>"+dataCartList[i].cartAmount+"</td><td><button id='deleteFromCart' btn-id-I="+i+" btn-id-acutualQuant="+dataCartList[i].product.quantity+" btn-id-quant="+dataCartList[i].quantity+" btn-id-prodid="+dataCartList[i].productID+" style='float:right;' class='btn btn-danger btn-sm'>Delete</button></td></tr>"	
											}
											sessionStorage.am = tAmount;
											checkStr+="<tr id='th3'><td colspan='3'><b>Total Amount</b></td><td colspan=''><b>"+tAmount+"</b></td><td><button btn-id-tquant="+tAmount+" id='checkout' style='float:right;' class='btn btn-success btn-sm'>CheckOut</button></td></tr>"
											$("#checkList tbody").html(checkStr);
											
										}
										else
										{
											
											$("#checkList tbody").html("");
										}
										
									}
											
								});
									
								}
								else
								{
									console.log("error");
								}
							}
						});
					}
					else{
						console.log("Error");
					}

				}

			});
		}

});



$("#checkList").on("click","#checkout",function(){
	
      console.log("Total Amount: " + sessionStorage.am);
 if(confirm("The order Cart will be checkedout")){
							$.ajax({

							url:"https://localhost:44308/api/sellproducts/"+OrderclickedRow+"/order",
							method:"PUT",
							headers:{
									//Authorization:"Basic "+ btoa("4:4444")
									'Authorization': 'Basic ' + localStorage.authUser
							},
							header:"Content-Type:application/json",
							data:{
										"id": OrderclickedRow,
										"totalAmount": sessionStorage.am,
										"address": null,
										
										"customerID": null,
										"customerName": null,
										"saleTypeID": 2,
										"isSold": true,
										"orderStatusID": 5,
										"sellBy": localStorage.username
							},

							complete:function(xmlhttp,status){
								
								
								if(xmlhttp.status==200)
								{
									var data=xmlhttp.responseJSON;
									$("#checkList tbody").html("");
									listProduct();
									listOrder();
									$("#productList").fadeIn(1000);
									$("#orderList").fadeIn(1000);
									OrderclickedRow="";
									$("#checkList").hide();
									
								}
								else
								{
									
								}
							}
						});
	}

});






});