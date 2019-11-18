var algorithm = "encryption";

//==============================================================================
//=============================Switch Algorithms================================
//==============================================================================
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
		$("#key").attr("placeholder","Type your decryption key...");
		$("#runalgorithm").text("ENCRYPT");
		$("#algorithmresult").text("");
	}
});

//==============================================================================
//=============================Run Algorithms===================================
//==============================================================================

$("#runalgorithm").click(function(){
	var msg = $("#msgtextarea").val();
	var key = $("#key").val();
	var result;
	if(algorithm=="encryption")
			result = encrypt(msg,key);

	if(algorithm=="decryption")
		result = decrypt(msg,key);

		$("#algorithmresult").text(result);
});


function encrypt(msg,key){
	var submsg = enSubstitute(msg,key);
	console.log("subsitution: "+ submsg);
	var shiftmsg = enCaesar(submsg,key);
	console.log("shift: "+ shiftmsg);
	return shiftmsg;
}

function decrypt(msg,key){
	var deshiftmsg = enCaesar(msg,key);
	console.log("deshift: "+ deshiftmsg);
	var desmsg = deSubstitute(deshiftmsg,key);
	console.log("desubsitution: "+ desmsg);
	return desmsg;
}

//==============================================================================
//=============================Encryption/Decryption Algorithms===================================
//==============================================================================

//=============Subsitution============
//input str - string - to be encoded
//input key - array - to be encoded by
//return - encoded string
function enSubstitute(str,key){
	var result=str.split('');
	for (var i = 0; i < result.length; i++) {
		if (result[i].match(/^[a-z]*$/g) !== null) {
			result[i]=key[result[i].charCodeAt(0) -97];
		}
		else if (result[i].match(/^[A-Z]*$/g) !== null) {
			result[i]=key[result[i].charCodeAt(0) -65].toUpperCase();
		}
	};
	return result.join('');
}


//input str - string - to be decoded
//input key - array - to be decoded by
//return - decoded string
function deSubstitute(str,key){
	result=str.split('');
	for (var i = 0; i < result.length; i++) {
		if (result[i].match(/^[a-z]*$/g) !== null) {
			result[i]=String.fromCharCode(key.indexOf(result[i])+97);
		}
		else if (result[i].match(/^[A-Z]*$/g) !== null) {
			result[i]=String.fromCharCode(key.indexOf(result[i].toLowerCase())+65);
		}
	};
	return result.join('');
}

	//==========Ceaser Shift============
	//shift a string's letters by x amount (Caesar Cipher)
	//technically a cipher function, but I have it up here because it's not a cipher function for this cipher
	//called in functions: @geneticSubstitutionCrack
	function enCaesar(str,key) {
		key = binarySum(key.charAt(0));
		if(algorithm=="decryption")
			key = 26-key;
		//str - string to be encrypted
		//shift - number 1 - 25 to shift letters to show encoded message
		for (var i = 0, len = str.length; i < len; i++) { //for each char in string
			for (var j = 0, len2 = key; j < len2; j++) { //increment one at a time (easier to loop at z)
				if (str[i].match(/^[a-yA-Y]*$/gi) !== null)
					str = str.replaceAt(i, String.fromCharCode(str[i].charCodeAt(0) + 1));//increment char by 1

				else if (str[i].match(/^[zZ]*$/) !== null) 
					str = str.replaceAt(i, String.fromCharCode(str[i].charCodeAt(0) - 25));//if z circle back to a
				
			}
		}
		return str;
	}

	String.prototype.replaceAt=function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}


function binarySum(char) {
  var str = char.charCodeAt(0).toString(2);
	var result = 0;
  for (var i = 0; i < str.length; i++) {
      result += parseInt(str[i]);
  }
	return result;
}

//input arr - array - to be mutated
//input amount - integer - amount to mutate by
//return - array - mutated array
function mutate(arr,amount) {
	var newCopy = arr.slice(0);
	for (var i = 0; i < amount; i++) {
		var pos1=Math.floor(Math.random() * newCopy.length),
			pos2=Math.floor(Math.random() * newCopy.length),
			temp=newCopy[pos2];
		newCopy[pos2]=newCopy[pos1];
		newCopy[pos1]=temp;
	}
	return newCopy
}
