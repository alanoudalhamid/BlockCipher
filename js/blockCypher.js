var algorithm = "encryption";
$("#reverse").click(function(){

	if(algorithm=="encryption"){
		algorithm = "decryption";
		$(this).text( "Encrypt" );
		$("#msgimage").attr("src","images/Decrypted.png");
		$("formtitile").text("Encrypt Your Message!");
		$("#msgtextarea").attr("placeholder","Type your cypher text here");
		$("#runalgorithm").text("DECRYPT");
		$("#algorithmresult").text("");
	}

	else{
		algorithm = "encryption";
		$(this).text( "Decrypt" );
		$("#msgimage").attr("src","images/Encrypted.png");
		$("formtitile").text("Decrypt Your Message!");
		$("#msgtextarea").attr("placeholder","Type your plain text here");
		$("#runalgorithm").text("ENCRYPT");
		$("#algorithmresult").text("");
	}
});

$("#runalgorithm").click(function(){
	console.log("button clicked");
	var result = $("#msgtextarea").val();
	console.log("entered value: "+ result);
	if(algorithm=="encryption"){
	//============
	//encryption algorithm
	//============
	}

	if(algorithm=="decryption"){
	//============
	//decryption algorithm
	//============
	}

	$("#algorithmresult").text(result);
});