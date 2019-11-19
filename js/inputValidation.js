function validation() {
    var input = $('#msgtextarea');
    var keyObj = $("#key");
    var keyVal = keyObj.val();
    var check = true;
    //validate Key
    if (keyVal.length < 26) {
        showValidate(keyObj);
        check = false;
    } else if (!allLetters(keyVal)) {
        showValidate(keyObj);
        check = false;
    }
    //validate message
    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }
    if (check == true) {
        hideValidate(input);
        hideValidate(keyObj);
    }
    return check;
}

$('.validate-form .input100').each(function() {
    $(this).focus(function() {
        hideValidate(this);
    });
});

function validate(input) {
    var inputVal = input.value.replace(/\s+$/,"");
    var letters = /^[a-zA-Z ]*$/;

    if (inputVal.trim() == '') {
        return false;
    }

    if (!inputVal.match(letters)) {
        return false
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function allLetters(str) {
    let alpha = new Set("abcdefghijklmnopqrstuvwxyz")
    for (let c of str.toLowerCase()) {
        alpha.delete(c)
        if (alpha.size == 0) return true
    }
    return false
}
