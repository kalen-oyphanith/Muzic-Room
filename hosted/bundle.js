"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// React components for the profile page
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
  alert("You made a new post!");
  return false;
}; // handles the update function for the password change


var handleUpdate = function handleUpdate(e) {
  e.preventDefault();
  $("#postMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required to change password");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  alert("You have changed your password");
  sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), redirect);
  return false;
}; // form for user to fill out their blog posts


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
    htmlFor: "nickName"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "nickName",
    type: "text",
    name: "nickName",
    placeholder: "Nick name (optional)"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "blogPost"
  }, "Post: "), /*#__PURE__*/React.createElement("textarea", {
    rows: "5",
    cols: "40",
    id: "postBlogPost",
    type: "text",
    name: "blogPost",
    placeholder: "write a post!"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    id: "postButton",
    className: "formSubmit",
    type: "submit",
    value: "Make Post"
  }));
}; //settings form to change their password


var SettingsForm = function SettingsForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "settingsForm",
    onSubmit: handleUpdate,
    name: "settingsForm",
    action: "/passUpdate",
    method: "POST",
    className: "settingsForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "passwordChange"
  }, "Password change:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "text",
    name: "pass",
    placeholder: "New password"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "text",
    name: "pass2",
    placeholder: "Confirm new password"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Update"
  }));
}; // enables users to delete all their posts


var DeleteForm = function DeleteForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "deleteForm",
    name: "deleteForm",
    action: "/deletePosts",
    method: "POST",
    className: "deleteForm"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    id: "deleteButton",
    className: "formSubmit",
    type: "button",
    name: "deleteButton",
    value: "Delete Posts",
    onClick: deleteAll
  }));
}; // displays the user's posts in divs


var PostList = function PostList(props) {
  if (props.posts.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "postList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyPost"
    }, "No Posts yet"));
  }

  var postNodes = props.posts.map(function (post) {
    // https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/
    var today = new Date(post.createdDate);
    var dayCreated = today.toLocaleDateString();
    console.log(posts);
    return /*#__PURE__*/React.createElement("div", {
      key: post._id,
      className: "post"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/userFace.png",
      alt: "pfp"
    }), /*#__PURE__*/React.createElement("h2", {
      id: "username"
    }, "@", post.username, " "), /*#__PURE__*/React.createElement("p", null, " ", post.nickName, " "), /*#__PURE__*/React.createElement("h3", {
      id: "postHead"
    }, " ", post.heading.replace(/&#x27;|&quot;/gi, "'"), " "), /*#__PURE__*/React.createElement("p", null, " ", post.blogPost.replace(/&#x27;|&quot;/gi, "'"), " "), /*#__PURE__*/React.createElement("p", null, " ", dayCreated, " "));
  });
  return /*#__PURE__*/React.createElement("div", null, postNodes);
}; // the header of feed window


var FeedWindow = function FeedWindow() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "The Muzic Room"), /*#__PURE__*/React.createElement("p", null, "Here's what other people are saying!"));
}; // clear window to substitute others


var ClearWindow = function ClearWindow() {
  return /*#__PURE__*/React.createElement("p", null);
}; //profile window to display heading


var ProfileWindow = function ProfileWindow() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Profile"));
}; // displays heading


var SettingsHeadingWindow = function SettingsHeadingWindow(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Account"));
}; // PremButton enable the music to be hidden then shown 


var PremButton = /*#__PURE__*/function (_React$Component) {
  _inherits(PremButton, _React$Component);

  var _super = _createSuper(PremButton);

  function PremButton() {
    var _this;

    _classCallCheck(this, PremButton);

    _this = _super.call(this);
    _this.state = {
      hidden: true
    };
    return _this;
  }

  _createClass(PremButton, [{
    key: "changeVis",
    value: function changeVis() {
      this.setState({
        hidden: !this.state.hidden
      });
    } // renders the images

  }, {
    key: "render",
    value: function render() {
      var grid = this.state.hidden ? "hidden" : "show";
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        id: "subscribeButton",
        className: "formSubmit",
        type: "submit",
        onClick: this.changeVis.bind(this),
        value: "Subscribe"
      }), /*#__PURE__*/React.createElement("span", {
        id: "gridContainer",
        className: grid
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/sheet_1.png",
        alt: "Sheet Music"
      }), /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/sheet_2.jpg",
        alt: "Sheet Music"
      }), /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/sheet_3.png",
        alt: "Sheet Music"
      }), /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/sheet_4.jpg",
        alt: "Sheet Music"
      }), /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/sheet_5.jpg",
        alt: "Sheet Music"
      }), /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/sheet_6.jpg",
        alt: "Sheet Music"
      })));
    }
  }]);

  return PremButton;
}(React.Component); // header for the window


var PremiumWindow = function PremiumWindow() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Get Your Sheet Music!"), /*#__PURE__*/React.createElement("p", null, "Learn more songs quickly with our sheet music provided!"));
}; // breaks if i dont remove


var PremiumBodyWindow = function PremiumBodyWindow() {
  return /*#__PURE__*/React.createElement("div", {
    id: "gridContainer"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/sheet_1.png",
    alt: "Sheet Music"
  }), /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/sheet_2.jpg",
    alt: "Sheet Music"
  }), /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/sheet_3.png",
    alt: "Sheet Music"
  }), /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/sheet_4.jpg",
    alt: "Sheet Music"
  }), /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/sheet_5.jpg",
    alt: "Sheet Music"
  }), /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/sheet_6.jpg",
    alt: "Sheet Music"
  }));
}; // creates the feed window with all the posts


var createFeedWindow = function createFeedWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(FeedWindow, {
    csrf: csrf
  }), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ClearWindow, null), document.querySelector("#deleteAllPosts"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ClearWindow, null), document.querySelector("#makePost"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
    posts: []
  }), document.querySelector("#posts"));
}; //creates the user's profile with the makePost on page


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
  ReactDOM.render( /*#__PURE__*/React.createElement(DeleteForm, {
    csrf: csrf
  }), document.querySelector("#deleteAllPosts"));
}; // creates the settings window 


var createSettingsWindow = function createSettingsWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SettingsHeadingWindow, null), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ClearWindow, null), document.querySelector("#deleteAllPosts"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ClearWindow, {
    csrf: csrf
  }), document.querySelector("#makePost"));
  ReactDOM.render( /*#__PURE__*/React.createElement(SettingsForm, {
    csrf: csrf
  }), document.querySelector("#posts"));
}; //creates the premium window


var createPremiumWindow = function createPremiumWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PremiumWindow, {
    csrf: csrf
  }), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ClearWindow, null), document.querySelector("#deleteAllPosts"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ClearWindow, {
    csrf: csrf
  }), document.querySelector("#makePost"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PremiumBodyWindow, {
    csrf: csrf
  }), document.querySelector("#posts"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PremButton, null), document.querySelector("#gridContainer")); // after subsribe button is clicked, disable it

  document.querySelector('#subscribeButton').onclick = function () {
    this.disabled = true;
  };
}; // request to delete all posts


var deleteAll = function deleteAll(e) {
  sendAjax('POST', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), loadPostsFromServer());
}; //loads all posts from server


var loadAllPostsFromServer = function loadAllPostsFromServer() {
  sendAjax('GET', '/getAllPosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
      posts: data.posts
    }), document.querySelector("#posts"));
  });
}; // loads posts form server


var loadPostsFromServer = function loadPostsFromServer() {
  sendAjax('GET', '/getPosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
      posts: data.posts
    }), document.querySelector("#posts"));
  });
}; // onclick to add functionality to tabs


var setup = function setup(csrf) {
  var feedButton = document.querySelector("#allPostsButton");
  var profileButton = document.querySelector("#profileButton");
  var premiumButton = document.querySelector("#premiumButton");
  var settingsButton = document.querySelector("#settingsButton");
  feedButton.addEventListener("click", function (e) {
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
  premiumButton.addEventListener("click", function (e) {
    e.preventDefault();
    createPremiumWindow(csrf);
    return false;
  });
  settingsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSettingsWindow(csrf);
    return false;
  });
  loadAllPostsFromServer();
  createFeedWindow(csrf);
}; //creates uniqure sessions


var getToken = function getToken() {
  sendAjax("GET", '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

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
