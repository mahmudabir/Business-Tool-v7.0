$(document).ready(function(){
	var clickedRow;
	//Starts Get All users connected in chat

var listNote=function(){
	$("#noteDetailsTable").hide();
	$.ajax({
		url:"https://localhost:44308/api/notes",
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
					
					str+="<tr id='cell' btn-id-noteID="+data[i].id+"><td>"+data[i].subject+"</td></tr>"	


					}
					$("#noteList tbody").html(str);
					
				}

			}
	});
}
listNote();
//Ends Get All users connected in chat




var listNoteDetails=function(){
	$.ajax({
		url:"https://localhost:44308/api/notes/"+clickedRow,
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
				var sub;
				
				sub="<tr><th style='color:white;'>TITLE - "+data.subject+"</th></tr>"
				str="<tr><td><b>-</b>"+data.description+"<br><br><button class='btn btn-danger btn-xs'>Delete</button> &nbsp <button class='btn btn-info btn-xs'>Update</button></td></tr>"

				$("#noteDetails thead").html(sub);	
				$("#noteDetails tbody").html(str);
					
				}

			}
	});
}







$("#noteList").on("click","#cell",function(){
	var button=$(this);
	clickedRow=button.attr("btn-id-noteID")
	console.log(button.attr("btn-id-noteID"));
   $("#noteTable").fadeOut(1000,function(){
   	$("#noteDetailsTable").fadeIn(1000);
   	listNoteDetails();
   });
   
});


});