// displays handle error function
const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#postMessage").animate({width: 'toggle'}, 350);
};

// redirects page
const redirect = (response) => {
    $("#postMessage").animate({width: 'hide'}, 350);
    window.location = response.redirect;
};

// sending requests
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
