$(document).ready(function () {

    reset();

});

$(document).on('click', '#checkoutBtn', function (e) {

    var password = $('#password').val();

    setLoading();
    e.preventDefault();

    $.ajax({
        url: "includes/pawned-password.inc.php",
        method: "POST",
        data: {
            password: password
        },
        dataType: "json",
        success: function (data) {

            console.log(data);

            alertMsgShows('alert-success', "Password was checked out!");

            UnsetLoading();

            if (data == 0) {

                setAlert('#result', 'bg-success', 'text-white', 'Good news — no pwnage found!', "This password wasn't found in any of the Pwned Passwords loaded into Have I Been Pwned. That doesn't necessarily mean it's a good password, merely that it's not indexed on this site. If you're not already using a password manager, go and download 1Password and change all your passwords to be strong and unique.", "");

            } else {

                setAlert('#result', 'bg-danger', 'text-white', 'Oh no — pwned!', 'This password has been seen ' + data + ' times before', "This password has previously appeared in a data breach and should never be used. If you've ever used it anywhere before, change it!");

            }

        },
        error: function (xhr, ajaxOptions, thrownError) {

            UnsetLoading();

            alertMsgShows('alert-danger', "(" + xhr.status + ") " + xhr.statusText);

        }
    });
});

$(document).on('click', '.close', function (e) {
    colorAlertBox();
});

function colorAlertBox() {
    $('#result').hide();
}

function setAlert(focus, bgColor, fontColor, title, text, altText) {

    $(focus).show();
    $('.card').addClass(bgColor);
    $('.card-title').addClass(fontColor);
    $('.card-title').html(title);
    $('.card-text').addClass(fontColor);
    $('.card-text').html(text);
    $('.card-text-desc').addClass(fontColor);
    $('.card-text-desc').html(altText);

}

function setLoading() {

    $('.lds-ring').show();

};

function alertMsgShows(className, message, time = 3000) {

    $('.alert').show();
    $('.alert').addClass(className);
    $('.alert').html(message);

    setTimeout(function () {

        $('.alert').hide();

    }, time);

}

function UnsetLoading() {

    $('.lds-ring').hide();

}

function reset() {

    $('.lds-ring').hide();

    $('.alert').hide();

    $('#result').hide();

}