$(document).ready(function(){
	var clickedRow;
	var noteDesc;
	var title;
	var empID;
	var check=0;
	var checkbox=1;
	var imp;
	var showImportant;
	var date;
	var checked;

	if (localStorage.authUser == null) {

        window.location.href = "../Login/Index.html";
    }

    


//Starts Get All users connected in chat

var listUser=function(){
	$("#noteUpdateField").hide();
	$("#noteDetailsTable").hide();
	if(check==0){
	$("#noteAddTable").hide();
	}
	$("#noteTable").fadeIn(1000);

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
					if(data[i].login.id==localStorage.username)
					{
						empID=data[i].id;
						
						listNote();
						
					}
					else
					{}

					}
					
					
				}
				else{
					

				}

			}
	});
}
listUser();
//Ends Get All users connected in chat



//Starts Get All users connected in chat

var listNote=function(){
	$("#noteUpdateField").hide();
	$("#noteDetailsTable").hide();

	if(check==0){
	$("#noteAddTable").hide();
	}
	$("#noteTable").fadeIn(1000);

	$.ajax({
		url:"https://localhost:44308/api/notes/"+localStorage.username+"/"+empID,
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
					if(data[i].employee.login.id==localStorage.username)
					{

						if(data[i].important=="YES"){
							showImportant="Important";
						}
						else{
							showImportant="";
						}

						empID=data[0].employeeID;
						
						str+="<tr id='cell' btn-id-date="+data[i].date+" btn-id-checked="+data[i].important+" btn-id-noteID="+data[i].id+"><td>"+data[i].subject+"<span style='float:right; font-style: italic; font-size:13px; color:red;'>"+showImportant+"</span><br><span style='float:left; font-style: italic; font-size:10px; color:blue;'>"+data[i].date+"</span></td></tr>"	
					}
					else
					{}

					}
					$("#noteList tbody").html(str);
					
				}
				else{
					$("#noteList tbody").html("");

				}

			}
	});
}

//Ends Get All users connected in chat




var listNoteDetails=function(){
	$("#btnprint").fadeIn(1000);
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
				// console.log(data);
				var str;
				var sub;
				var impMsg;
				title=data.subject;
				noteDesc=data.description;
				empID=data.employeeID;
				date=data.date;
				if(checked=="YES"){
					impMsg="Important";
				}
				else{
					impMsg="";
				}

				sub="<tr><th style='color:white;'>TITLE - "+data.subject+"<span style='float:right; font-style: italic; font-size:14px; color:red;'>"+impMsg+"</span></th></tr>"
				str="<tr><td><b>-</b>"+data.description+"<br><span style='float:left; font-style: italic; font-size:10px; color:blue;'>"+date+"</span><br><button id='delete' btn-id-noteID="+data.id+" class='btn btn-danger btn-sm'>Delete</button> &nbsp <button id='update' btn-id-noteID="+data.id+" class='btn btn-info btn-sm'>Update</button><button id='back' class='btn btn-warning btn-sm' style='float:right;'>Back</button></td></tr>"

				$("#noteDetails thead").html(sub);	
				$("#noteDetails tbody").html(str);
					
				}

			}
	});
}







$("#noteList").on("click","#cell",function(){
	var button=$(this);
	clickedRow=button.attr("btn-id-noteID")
	checked=button.attr("btn-id-checked")
	date=button.attr("btn-id-date")
	// console.log(button.attr("btn-id-noteID"));
	$("#noteAddTable").fadeOut(1000);
   $("#noteTable").fadeOut(1000,function(){
   	$("#noteDetailsTable").fadeIn(1000);
   	listNoteDetails();
   });
   
});

$("#noteDetails").on("click","#delete",function(){
	var button=$(this);
	var noteID=button.attr("btn-id-noteID");
	if(confirm("Are you sure to delete this note?")){
		$.ajax({
		url:"https://localhost:44308/api/notes/"+noteID,
		method:"DELETE",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==204){
				listNote();
					
				}
			}
	});
	}
});

$("#noteDetails").on("click","#update",function(){
	var button=$(this);
	noteID=button.attr("btn-id-noteID")
	// console.log(button.attr("btn-id-noteID"));
   	$("#noteText").val(noteDesc);
   	$("#noteUpdateField").fadeToggle(1000);
   	
   
});

$("#noteDetails").on("click","#back",function(){
  listNote(); 
});


$("#noteTable").on("click","#addNote",function(){
   	$("#noteAddTable").fadeToggle(1000);
   	$('#important').attr('checked', false);
   
});


$("#noteUpdateField").on("click","#saveNote",function(){
	
	if($("#noteText").val()!=""){
		
   	$.ajax({
		url:"https://localhost:44308/api/notes/"+noteID,
		method:"PUT",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		header:"Content-Type:application/json",
		data:{
			"subject": title,
	        "description": $("#noteText").val(),
	        "employeeID": empID,
	        "important":checked
	        
			
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200){
				$("#noteText").val("")
				$("#noteUpdateField").fadeOut(1000);
				listNoteDetails();
			}
			else
			{
				
			}
		}
		});
	}
	else{

	}
   
});



$("#noteAddTable").on("click","#createNote",function(){
	if($("#addSub").val()!="" && $("#addDesc").val()!=""){

		if(checkbox==2){
			imp="YES";
		}
		else{
			imp="NO";
		}
		
		
   	$.ajax({

		url:"https://localhost:44308/api/notes",
		method:"POST",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		header:"Content-Type:application/json",
		data:{
			"subject": $("#addSub").val(),
	        "description": $("#addDesc").val(),
	        "employeeID": empID,
	        "important": imp
			
		},

		complete:function(xmlhttp,status){
			
			if(xmlhttp.status==201){
				$("#addSub").val("")
				$("#addDesc").val("")
				check=1;
				listNote();
				
				$('#important').attr('checked', false);
			}
			else
			{
				
			}
		}
		});
	}
	else{

	}
	
	
});

$('#important').change(function () {

	if(checkbox==1){
	checkbox=2;
	}
	else if(checkbox==2){
	checkbox=1;
	}
	
		
});




function savePDF()
    {
        var sTable = document.getElementById('noteDetailsTable').innerHTML;

        var style = "<style>";
        style = style + "table{width: 100%;font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;border-collapse: collapse;font-style: bold;}";
        style = style + "table th {border: 2px solid #000000;}";
        style = style + "table td{border: 2px solid #000000;padding: 8px;}";
        //style = style + "table tr:nth-child(even) {background-color: #f2f2f2;}";
        //style = style + "table tr:nth-child(odd) {background-color: #E6E6FA;}";
        style = style + "table th {padding-top: 8px;padding-bottom: 8px;text-align: center;background-color: #000000;color: white;}";
        style = style + "</style>";


        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write('<title>PDF</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.

        //$("#hide").attr("hidden", "hidden"); 
    }
    $("#btnprint").on("click",function(){
        //$("#hide").removeAttr("hidden", "hidden");
      	
		listNote(); 
       $("#delete").hide();
       $("#update").hide();
       $("#back").hide();
       $("#btnprint").hide();
        savePDF();
        //$("#hide").attr("hidden", "hidden"); 
        
    });





});