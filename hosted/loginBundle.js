"use strict";

// handles login username and password
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("#postMessage").animate({
    width: 'hide'
  }, 350); //if user or pass is empty

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val()); //send request POST

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; // handles signup username and password (check)


var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#postMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
}; // home page describes the website's purpose


var HomeWindow = function HomeWindow(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "homePage"
  }, /*#__PURE__*/React.createElement("h1", {
    htmlFor: "heading",
    id: "homeHeading"
  }, "Welcome to the Muzic Room"), /*#__PURE__*/React.createElement("p", {
    htmlFor: "description",
    id: "homeDescription"
  }, "This is a music blog where muscians of any experience level can interact. Looking for some assistance? Just look at each others post. Make sure to make an account if you don't have one! Remember what mama told you! If you have nothing nice to say, don't say it at all!"));
}; // loginWindow Form allows user to login into the app


var LoginWindow = function LoginWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    id: "homeInputs"
  }, /*#__PURE__*/React.createElement("h1", null, "Sign into The Muzic Room"), /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username:  "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password:  "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("div", {
    id: "signupButt"
  }, /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign in"
  }))));
}; // signupWindow form allows user to sign in created user and password from inputs


var SignupWindow = function SignupWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    id: "homeInputs"
  }, /*#__PURE__*/React.createElement("h1", null, "Join the Community"), /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("div", {
    id: "signupButt"
  }, /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign up"
  }))));
}; // gets posts from user


var loadPostsFromServer = function loadPostsFromServer() {
  sendAjax('GET', '/getAllPosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
      posts: data.posts
    }), document.querySelector("#content"));
  });
}; // created a render of the homeWindow


var createHomeWindow = function createHomeWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(HomeWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; // created a render of the createLoginWindow


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; // created a render of the createSignupWindow


var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; // .onclicks allow the tabs on page to show


var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  var homeButton = document.querySelector("#homeButton");
  homeButton.addEventListener("click", function (e) {
    e.preventDefault();
    createHomeWindow(csrf);
    return false;
  });
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createHomeWindow(csrf); //default view
}; // new token for session


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; // calls our token to setup page


$(document).ready(function () {
  getToken();
});
"use strict";

// displays handle error function
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#postMessage").animate({
    width: 'toggle'
  }, 350);
}; // redirects page


var redirect = function redirect(response) {
  $("#postMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
}; // sending requests


var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
