$(document).ready(function(){

	var chatid;
	var receiver;
	$("#sendMsg").click(function(){
	sendMessage();
	});

	if (localStorage.authUser == null) {
        window.location.href = "Authentication.html";
    }

	


//Starts Get All users connected in chat

var listChat=function(){
	$.ajax({
		url:"https://localhost:44308/api/chats",
		method:"GET",
		headers:{
				//Authorization:"Basic "+ btoa("4:4444")
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				var user;
				var alignment;
				var smsColor;
				
				
				for (var i = 0; i < data.length; i++) {
					if(data[i].senderID== localStorage.username){
						// alignment="right";
						// smsColor="dark";
						// user="<tr><th><span class='badge progress-bar-danger'>Receiver "+data[i].receiverID+"</span></th></tr>"
						// alignment="left";
						// smsColor="success";
						str+="<tr align='left'><td><button btn-id-username="+data[i].receiverID+" id='choseUser' style='padding-left:120px;padding-right:115px;'>"+data[i].receiverID+"</button></td></tr>"
					}
					else if(data[i].receiverID==localStorage.username){
						str+="<tr align='left'><td><button btn-id-username="+data[i].senderID+" id='choseUser' style='padding-left:120px;padding-right:115px;'>"+data[i].senderID+"</button></td></tr>"
					}

					
				}

				
				// $("#chatList thead").html("Messages");
				$("#chatList tbody").html(str);
				
				
			}
			else{
				
			}
		}
	});
}
listChat();
//Ends Get All users connected in chat



//Starts Get All messages  from message
	var listMsg=function(){
	
	user="<tr><th><span class='badge progress-bar-danger'>Receiver</span></th></tr>"
					
	str="<tr><td></td></tr>"
	
	$("#postList thead").html(user);
	$("#postList tbody").html(str);
}
listMsg();
//Ends Get All messages  from message

//Starts Send  messages
var sendMessage=function(){
	$.ajax({
		url:"https://localhost:44308/api/chats",
		method:"POST",
		headers:{
				'Authorization': 'Basic ' + localStorage.authUser
		},
		header:"Content-Type:application/json",
		data:{
			text:$("#textMsg").val(),
			senderID:localStorage.username,
			receiverID:receiver,
			chatID: chatid,
			messageStatusID:1
		},
		complete:function(xmlhttp,status){
			if($("#textMsg").val()!=""){
				
				if(xmlhttp.status==201){
					
			$.ajax({
			url:"https://localhost:44308/api/chats/"+localStorage.username+"/"+receiver,
			method:"GET",
			headers:{
					'Authorization': 'Basic ' + localStorage.authUser
			},
			complete:function(xmlhttp,status){

				if(xmlhttp.status==200){
					var data=xmlhttp.responseJSON;
					var str;
					var user;
					var alignment;
					var smsColor;
					
					chatid=data[0].chat.id;
					
					
					for (var i = 0; i < data.length; i++) {
						if(data[i].senderID==localStorage.username){
							alignment="right";
							smsColor="dark";
							
							user="<tr><th><span class='badge progress-bar-danger'>Receiver "+receiver+"</span></th></tr>"
						}
						else{
							alignment="left";
							smsColor="success";
						}

						str+="<tr align="+alignment+"><td><span class='badge progress-bar-"+smsColor+"'>"+data[i].text+"</span></td></tr>"
					}
					
					$("#postList thead").html(user);
					$("#postList tbody").html(str);
					
				}
				else{
					var noStr="<tr><th></th></tr>";
					var newUser="<tr><th><span class='badge progress-bar-danger'>Receiver "+receiver+"</span></th></tr>";
					$("#postList thead").html(newUser);
					$("#postList tbody").html(noStr);
				}
			}
		});
						$("#textMsg").val("");
					}
					else{
						
					}
				}
				else{
					
				}
			}
	});
}
//Ends Send  messages

//Strats search of users
$("#searchUser").keyup(function(){
			if(localStorage.username != $("#searchUser").val()){
			$.ajax({
			url:"https://localhost:44308/api/chats/"+ $("#searchUser").val(),
			method:"Get",
			headers:{
				'Authorization': 'Basic ' + localStorage.authUser
		},
			complete:function(xmlhttp,status){
				
			if($("#searchUser").val()!=""){
				if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				
				var str;
				str="<tr><td><button btn-id-username="+data.username+" id='choseUser' style='padding-left:120px;padding-right:115px;'>"+data.username+"</button></td></tr>"
				$("#chatList tbody").html(str);
				
			}
			else{
				
				$("#chatList tbody").html("No Data Found");
			}
			}
			else{
				listChat();
			}
			}
		});
		}
	});
//Ends search of users




//Starts Get All messages  from message
	$("#chatList").on("click","#choseUser",function(){
		var button= $(this);
	$.ajax({
		url:"https://localhost:44308/api/chats/"+localStorage.username+"/"+button.attr("btn-id-username"),
		method:"GET",
		headers:{
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){
			receiver=button.attr("btn-id-username");
			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				var user;
				var alignment;
				var smsColor;
				
				chatid=data[0].chat.id;
				
				
				for (var i = 0; i < data.length; i++) {
					if(data[i].senderID==localStorage.username){
						alignment="right";
						smsColor="dark";
						
						user="<tr><th><span class='badge progress-bar-danger'>Receiver "+receiver+"</span></th></tr>"
					}
					else{
						alignment="left";
						smsColor="success";
					}

					str+="<tr align="+alignment+"><td><span class='badge progress-bar-"+smsColor+"'>"+data[i].text+"</span></td></tr>"
				}
				
				$("#postList thead").html(user);
				$("#postList tbody").html(str);
				setInterval(function(){
				refreshChat();
				}, 2000);
				
			}
			else{
				
				var data=xmlhttp.responseJSON;
				chatid=data.id;
				var noStr="<tr><th></th></tr>";
				setInterval(function(){
				refreshChat();
				}, 2000);
				
				var newUser="<tr><th><span class='badge progress-bar-danger'>Receiver "+receiver+"</span></th></tr>";
				$("#postList thead").html(newUser);
				$("#postList tbody").html(noStr);
			}
		}
	});
});

//Ends Get All messages  from message

var refreshChat=function(){
	$.ajax({
		url:"https://localhost:44308/api/chats/"+localStorage.username+"/"+receiver,
		method:"GET",
		headers:{
				'Authorization': 'Basic ' + localStorage.authUser
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				var user;
				var alignment;
				var smsColor;
				
				chatid=data[0].chat.id;
				
				
				for (var i = 0; i < data.length; i++) {
					if(data[i].senderID==localStorage.username){
						alignment="right";
						smsColor="dark";
						
						user="<tr><th><span class='badge progress-bar-danger'>Receiver "+receiver+"</span></th></tr>"
					}
					else{
						alignment="left";
						smsColor="success";
					}

					str+="<tr align="+alignment+"><td><span class='badge progress-bar-"+smsColor+"'>"+data[i].text+"</span></td></tr>"
				}
				
				$("#postList thead").html(user);
				$("#postList tbody").html(str);
				
			}
			else{
				
				var data=xmlhttp.responseJSON;
				chatid=data.id;

				var noStr="<tr><th></th></tr>";
				
				var newUser="<tr><th><span class='badge progress-bar-danger'>Receiver "+receiver+"</span></th></tr>";
				$("#postList thead").html(newUser);
				$("#postList tbody").html(noStr);
			}
		}
	});

}


});
