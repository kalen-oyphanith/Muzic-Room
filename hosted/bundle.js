"use strict";

////// name = heading /////////    age = blogPost     ///////
var handlePost = function handlePost(e) {
  e.preventDefault();
  $("#postMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#postHeading").val() == '' || $("#postBlogPost").val() == '') {
    handleError("A heading and your post are required!");
    return false;
  }

  sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function () {
    loadPostsFromServer();
  });
  return false;
};

var handleUpdate = function handleUpdate(e) {
  e.preventDefault();
  $("#postMessage").animate({
    width: 'hide'
  }, 350);
  sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), function () {
    loadPostsFromServer();
  });
  return false;
};

var PostForm = function PostForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "postForm",
    onSubmit: handlePost,
    name: "postForm",
    action: "/maker",
    method: "POST",
    className: "postForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "heading"
  }, "Heading: "), /*#__PURE__*/React.createElement("input", {
    id: "postHeading",
    type: "text",
    name: "heading",
    placeholder: "Heading"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "blogPost"
  }, "Post: "), /*#__PURE__*/React.createElement("textarea", {
    rows: "5",
    cols: "40",
    id: "postBlogPost",
    onkeyup: "this.value = this.value.replace(/[&*<>/']/g, '')",
    type: "text",
    name: "blogPost",
    placeholder: "write a post!"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makePostSubmit",
    type: "submit",
    value: "Make Post"
  }));
};

var FeedWindow = function FeedWindow() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Let's see what others are saying!"));
};

var ProfileWindow = function ProfileWindow() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Profile"), /*#__PURE__*/React.createElement("p", null, "Welcome to your account! Get to blogging"));
};

var SettingsWindow = function SettingsWindow(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Account Information"), /*#__PURE__*/React.createElement("p", null, " Username: (username goes here)"));
};

var PostList = function PostList(props) {
  if (props.posts.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "postList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyPost"
    }, "No Posts yet"));
  }

  var postNodes = props.posts.map(function (post) {
    return /*#__PURE__*/React.createElement("div", {
      key: post._id,
      className: "post"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/userFace.png",
      alt: "post face",
      className: "postFace"
    }), /*#__PURE__*/React.createElement("h1", null, "username:", post.owner), /*#__PURE__*/React.createElement("h3", {
      className: "postName"
    }, " ", post.heading, " "), /*#__PURE__*/React.createElement("p", {
      className: "postAge"
    }, " ", post.blogPost, " "), /*#__PURE__*/React.createElement("p", {
      className: "postDate"
    }, " ", post.createdDate));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "postList"
  }, postNodes);
};

var SettingsForm = function SettingsForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "settingForm",
    onSubmit: handleUpdate,
    name: "settingForm",
    action: "/maker",
    method: "POST",
    className: "settingForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "bio"
  }, "Bio: "), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    cols: "40",
    id: "postBio",
    type: "text",
    name: "bio",
    placeholder: "Write something about yourself! Do you play an instrument? Preferences in music..."
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "passwordChange"
  }, "Password change:"), /*#__PURE__*/React.createElement("input", {
    id: "passwordChange",
    type: "text",
    name: "passwordChange",
    placeholder: "New password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makePostSubmit",
    type: "submit",
    value: "Update"
  }));
};

var loadAllPostsFromServer = function loadAllPostsFromServer() {
  sendAjax('GET', '/getAllPosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
      posts: data.posts
    }), document.querySelector("#posts"));
  });
};

var loadPostsFromServer = function loadPostsFromServer() {
  sendAjax('GET', '/getPosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
      posts: data.posts
    }), document.querySelector("#posts"));
  });
};

var createFeedWindow = function createFeedWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(FeedWindow, {
    csrf: csrf
  }), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
    posts: []
  }), document.querySelector("#posts"));
};

var createProfileWindow = function createProfileWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ProfileWindow, {
    csrf: csrf
  }), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostForm, {
    csrf: csrf
  }), document.querySelector("#makePost"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
    posts: []
  }), document.querySelector("#posts"));
};

var createSettingsWindow = function createSettingsWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SettingsWindow, {
    csrf: csrf
  }), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(SettingsForm, {
    csrf: csrf
  }), document.querySelector("#makePost"));
};

var setup = function setup(csrf) {
  var FeedButton = document.querySelector("#allPostsButton");
  var profileButton = document.querySelector("#profileButton");
  var settingsButton = document.querySelector("#settingsButton");
  FeedButton.addEventListener("click", function (e) {
    e.preventDefault();
    createFeedWindow(csrf);
    loadAllPostsFromServer();
    return false;
  });
  profileButton.addEventListener("click", function (e) {
    e.preventDefault();
    createProfileWindow(csrf);
    loadPostsFromServer();
    return false;
  });
  settingsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSettingsWindow(csrf);
    return false;
  });
  loadAllPostsFromServer();
  createFeedWindow(csrf);
};

var getToken = function getToken() {
  sendAjax("GET", '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#postMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#postMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

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
