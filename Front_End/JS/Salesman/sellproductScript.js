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
					
					str+="<tr  btn-id-product="+dataProduct[i].id+" btn-i-val="+i+"><td>"+dataProduct[i].id+"</td><td>"+dataProduct[i].name+"</td><td>"+dataProduct[i].quantity+"</td><td>"+dataProduct[i].sellPrice+"</td><td colspan='2'><button style='float:right' id='cell' btn-price-product="+dataProduct[i].sellPrice+" btn-id-product="+dataProduct[i].id+" class='btn btn-success btn-sm'>Select</td></tr>"	
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
   
});

$("#productList").on("click","#addToCart",function(){
	

	buyQuantity=$("#buyQuantity").val();
	
	if(clickedRow!=""){
	if(OrderclickedRow!=""){
	if(buyQuantity!="")
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
					$("#orderList tbody").html("No data");
				}

			}
	});
}
listOrder();

$("#orderList").on("click","#Ordercell",function(){
	var btn=$(this);
	OrderclickedRow=btn.attr("btn-id-order");
	valueOfK=btn.attr("btn-k-val");
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
				var totalAmount=0;
				var productNames="";
				var head="<tr id='th'><th><span style='color:White;''>#OrderCART "+OrderclickedRow+"</span></th></tr>"
				
				for (var j = 0; j < dataCart.length; j++) {
					
					

					for (var k=0; k<dataCart.length; k++)
						{
							if(dataCart.length==1 || dataCart.length-1==k){
								sepration="";
							}
							else{
								sepration="<br>"
							}
							totalAmount+=dataCart[k].cartAmount;
							productNames+=dataCart[k].product.name+"= "+dataCart[k].cartAmount+" TK "+sepration;
						
						}

						str="<tr><td><b>Total Products: "+dataCart.length+"</b><br><b>Total Amount: "+totalAmount+"</b><br><b>ProductName:<br>"+productNames+"</b><br><br><button class='btn btn-danger btn-sm'>Go to Checkout</button></td></tr>"
						productNames="";
						totalAmount=0;
						break;
				}
				
					$("#cartList tbody").html(str);
					$("#cartList thead").html(head);

				}
				else
				{	
					$("#cartList tbody").html("No data");
				}

			}
});

}





var updateDataInTables=function(){
	var cartamount=price*buyQuantity;
	console.log(buyQuantity);
	console.log(cartamount);
	console.log(OrderclickedRow);
	console.log(clickedRow);

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
			
			
			if(xmlhttp.status==201)
			{
				var data=xmlhttp.responseJSON;
				
				productid=data.productID;

				getTheProduct();
			}
			else
			{
				
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
						
						console.log("OKK from productUpdate");
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



});