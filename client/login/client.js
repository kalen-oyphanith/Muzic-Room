// handles login username and password
const handleLogin = (e) => {
    e.preventDefault();

    $("#postMessage").animate({width: 'hide'}, 350);
    
    //if user or pass is empty
    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    //send request POST
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

// handles signup username and password (check)
const handleSignup = (e) => {
    e.preventDefault();
    
    $("#postMessage").animate({width:'hide'}, 350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    
    return false;
};
 
// home page describes the website's purpose
const HomeWindow = (props) => {
    return ( 
        <div id="homePage">
            <h1 htmlFor="heading" id="homeHeading">Welcome to the Muzic Room</h1>
            <p htmlFor="description" id="homeDescription">This is a music blog where muscians of any experience level can interact. Looking for some assistance? Just look at each others post. Make sure to make an account if you don't have one! Remember what mama told you! If you have nothing nice to say, don't say it at all!</p>
        </div>
    );
};

// loginWindow Form allows user to login into the app
const LoginWindow = (props) => {
    return ( 
        <form id = "loginForm" 
            name = "loginForm"
            onSubmit = {handleLogin}
            action = "/login"
            method = "POST"
            className = "mainForm" 
        >
        <div id="homeInputs">
            <h1>Sign into The Muzic Room</h1>
            <label htmlFor="username">Username:  </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <br></br>
            <label htmlFor="pass">Password:  </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <div id="signupButt">
                <input className="formSubmit" type="submit" value="Sign in" />  
            </div>        
        </div>
    
        </form>
    );
};

// signupWindow form allows user to sign in created user and password from inputs
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
        <div id="homeInputs">
            
            <h1>Join the Community</h1>
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <br></br>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <br></br>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <br></br>
            <input type="hidden" name="_csrf" value={props.csrf} />
                        
            <div id="signupButt">
                <input className="formSubmit" type="submit" value="Sign up" />
            </div>
        </div>
        </form>
    ); 
};

// gets posts from user
const loadPostsFromServer = () => {
    sendAjax('GET', '/getAllPosts', null, (data) => {
        ReactDOM.render(
            <PostList posts={data.posts} />, document.querySelector("#content")
        );
    });
};

// created a render of the homeWindow
const createHomeWindow = (csrf) => {
    ReactDOM.render(
        <HomeWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

// created a render of the createLoginWindow
const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

// created a render of the createSignupWindow
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

// .onclicks allow the tabs on page to show
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const homeButton = document.querySelector("#homeButton");
    
    homeButton.addEventListener("click", (e) => {
        e.preventDefault();
        createHomeWindow(csrf);
        return false;
    });
    
    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });
    
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });    
    
    createHomeWindow(csrf); //default view
};

// new token for session
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

// calls our token to setup page
$(document).ready(function() {
    getToken();
});