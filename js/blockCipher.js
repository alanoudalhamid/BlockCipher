
var algorithm = "encryption";

//==============================================================================
//=============================Switch Algorithms================================
//==============================================================================
function switchAlgorithm(){

	if(algorithm=="encryption"){
		algorithm = "decryption";
		$("#reverse").text( "Encrypt" );
		$("#msgimage").attr("src","images/Decrypted.png");
		$("formtitile").text("Encrypt Your Message!");
		$("#msgtextarea").attr("placeholder","Type your cypher text here");
		$("#runalgorithm").text("DECRYPT");
		$("#algorithmresult").text("");
	}

	else{
		algorithm = "encryption";
		$("#reverse").text( "Decrypt" );
		$("#msgimage").attr("src","images/Encrypted.png");
		$("formtitile").text("Decrypt Your Message!");
		$("#msgtextarea").attr("placeholder","Type your plain text here");
		$("#key").attr("placeholder","Type your decryption key...");
		$("#runalgorithm").text("ENCRYPT");
		$("#algorithmresult").text("");
	}
}

//==============================================================================
//=============================Run Algorithms===================================
//==============================================================================

function runAlgorithm(){

	var msg = $("#msgtextarea").val();
	var key = $("#key").val();
	var result;
	if(algorithm=="encryption")
			result = encrypt(msg,key);

	if(algorithm=="decryption")
		result = decrypt(msg,key);

		$("#algorithmresult").text(result);
}


function encrypt(msg,key){
	var middle = Math.floor(msg.length / 2);
	var s1 = msg.substr(0, middle);
	var s2 = msg.substr(middle);
//first half
	var half1 = enSubstitute(s1,key);
	half1 = enCaesar(half1,key);
	//second half
	var half2 = enCaesar(s2,key);
	half2 = enSubstitute(half2,key);

	var result = half2+half1;
	for(var i=0; i<2; i++){
		result = enSubstitute(result,key);
		result = enCaesar(result,key);
	}
	return result;
}

function decrypt(msg,key){
	var result = msg;
	for(var i=0; i<2; i++){
		result = enCaesar(result,key);
		result = deSubstitute(result,key);
	}
	var middle = Math.ceil(msg.length / 2);
	var s1 = result.substr(0, middle);
	var s2 = result.substr(middle);

	var half1 = enCaesar(s2,key);
		half1 = deSubstitute(half1,key);
		//second half
		var half2 = deSubstitute(s1,key);
		half2 = enCaesar(half2,key);

		result = half1+half2;
	return result;
}

//==============================================================================
//=============================Encryption/Decryption Algorithms===================================
//==============================================================================

function enSubstitute(str,key){
	var result=str.split('');
	key = key.split('');
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

function deSubstitute(str,key){
	var result=str.split('');
	key = key.split('');
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

	function enCaesar(str,key) {
		key = binarySum(key.charAt(0));
		if(algorithm=="decryption")
			key = 26-key;
		for (var i = 0, len = str.length; i < len; i++) {
			for (var j = 0, len2 = key; j < len2; j++) {
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
