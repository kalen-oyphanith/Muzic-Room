const handlePost = (e) => {
    e.preventDefault();
    
    $("#postMessage").animate({width: 'hide'}, 350);
    
    if($("#postHeading").val() == '' || $("#postBlogPost").val() == '') {
        handleError("A heading and your post are required!");
        return false;
    }
    
    sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function() {
        loadPostsFromServer();
    });
    
    return false;
};

const handleUpdate = (e) => {
    e.preventDefault();
    
    $("#postMessage").animate({width:'hide'}, 350);
    
    if($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required to change password");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), redirect);
    
    return false;
};

const PostForm = (props) => {
    return (
        <form id="postForm"
            onSubmit={handlePost}
            name="postForm"
            action="/maker"
            method="POST"
            className="postForm"
        >
            <label htmlFor="heading">Heading: </label>
            <input id="postHeading" type="text" name="heading" placeholder="Heading" /> 
            
            <br></br>
            <label htmlFor="blogPost">Post: </label>
            <textarea rows="5" cols="40" id="postBlogPost" type="text" name="blogPost" placeholder="write a post!"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input id="postButton" className="makePostSubmit" type="submit" value="Make Post" />
        </form>
    );
};

const SettingsForm = (props) => {
    return (
        <form id="settingsForm"
            onSubmit={handleUpdate}
            name="settingsForm"
            action="/passUpdate"
            method="POST"
            className="settingsForm"
        >
            
            <label htmlFor="nickName">Name: </label>
            <input id="nickName" type="text" name="nickName" placeholder="Your name" />   
            <br></br>
            
            <label htmlFor="bio">Bio: </label>
            <textarea rows="2" cols="40" id="postBio" type="text" name="bio" placeholder="Write something about yourself! Do you play an instrument? Preferences in music..."></textarea>
            <br></br>
            
            <label htmlFor="passwordChange">Password change:</label>
            <br></br>
            <input id="pass" type="text" name="pass" placeholder="New password" />   
            <br></br>
            <input id="pass2" type="text" name="pass2" placeholder="Confirm new password" />            
            <br></br>
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Update" />
        </form> 
    );
};

const PostList = function(props) {
    if(props.posts.length === 0) {
        return(
            <div className="postList">
                <h3 className="emptyPost">No Posts yet</h3>
            </div>
        );
    } 

    const postNodes = props.posts.map(function(post) {
        return (
            <div key={post._id} className="post">
                <img src="/assets/img/userFace.png" alt="post face" className="postFace" />
                <h1>username:{post.account}</h1>
                <h3 className="postName"> {post.heading} </h3>
                <p className="postAge"> {post.blogPost} </p>              
                <p className="postDate"> {post.createdDate}</p>
            </div>
        );
    });

    return (
        <div className="postList">
            {postNodes}
        </div>
    );
};

const FeedWindow = () => {
    return(
        <div>
            <h1>Let's see what others are saying!</h1>
        </div>
    );
};

const ProfileWindow = () => {
    return (
        <div>
            <h1>My Profile</h1>
            <p>Welcome to your account! Get to blogging</p>
        </div>
    );
};

const SettingsHeadingWindow = function(props) {
    
    return (
        <div>                
            <h1>Account Information</h1>
            <p> Username: (username goes here)</p>
        </div>
    );
};

const PremiumWindow = () => {
    return (
        <div>                
            <h1>Get Your Sheet Music!</h1>
            <p>Learn more songs quickly with our sheet music provided!</p>
        </div>
        
    );
};
const PremiumBodyWindow = () => {
    
    return(
        <div id="gridContainer">
            <img src="/assets/img/sheet_1.png" alt="Sheet Music" />
            <img src="/assets/img/sheet_2.jpg" alt="Sheet Music" />
            <img src="/assets/img/sheet_3.png" alt="Sheet Music" />
            <img src="/assets/img/sheet_4.jpg" alt="Sheet Music" />
            <img src="/assets/img/sheet_5.jpg" alt="Sheet Music" />
            <img src="/assets/img/sheet_6.jpg" alt="Sheet Music" />
        </div>
    );
};

const PremiumPostSection = () => {
    return(
        <p></p>        
    );
};

const createFeedWindow = (csrf) => {
    ReactDOM.render(
        <FeedWindow csrf={csrf} />,
        document.querySelector("#header")
    );
    
    ReactDOM.render(
        <PostList posts={[]} />, 
        document.querySelector("#posts")
    );
};

const createProfileWindow = (csrf) => {

    ReactDOM.render(
        <ProfileWindow csrf={csrf} />, 
        document.querySelector("#header")
    );  
    ReactDOM.render(
        <PostForm csrf={csrf} />, document.querySelector("#makePost")
    );
    
    ReactDOM.render(
        <PostList posts={[]} />, document.querySelector("#posts")
    );

};

const createSettingsWindow = (csrf) => {
    ReactDOM.render(
        <SettingsHeadingWindow csrf={csrf} />, 
        document.querySelector("#makePost")
    );          
    
    ReactDOM.render(
        <SettingsForm csrf={csrf} />, 
        document.querySelector("#posts")
    );               
};

const createPremiumWindow = (csrf) => {
    ReactDOM.render(
        <PremiumWindow csrf={csrf} />, 
        document.querySelector("#header")
    );       
    
    ReactDOM.render(
        <PremiumPostSection csrf={csrf} />, 
        document.querySelector("#makePost")
    );         
    
    ReactDOM.render(
        <PremiumBodyWindow csrf={csrf} />, 
        document.querySelector("#posts")
    );             
};

const loadAllPostsFromServer = () => {
    sendAjax('GET', '/getAllPosts', null, (data) => {
        ReactDOM.render(
            <PostList posts={data.posts} />, document.querySelector("#posts")
        );
    });
};

const loadPostsFromServer = () => {
    sendAjax('GET', '/getPosts', null, (data) => {
        ReactDOM.render(
            <PostList posts={data.posts} />, document.querySelector("#posts")
        );
    });
};

const setup = function(csrf) {
    const FeedButton = document.querySelector("#allPostsButton");
    const profileButton = document.querySelector("#profileButton");
    const premiumButton = document.querySelector("#premiumButton");
    const settingsButton = document.querySelector("#settingsButton");
    
    FeedButton.addEventListener("click", (e) => {
        e.preventDefault();
        createFeedWindow(csrf);
        loadAllPostsFromServer();
        return false;
    });    
    
    profileButton.addEventListener("click", (e) => {
        e.preventDefault();
        createProfileWindow(csrf);
        loadPostsFromServer();
        return false;

    });   
    
    premiumButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPremiumWindow(csrf);
        return false;
    });
        
    settingsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSettingsWindow(csrf);
        return false;

    });

    loadAllPostsFromServer();
    createFeedWindow(csrf);


};

const getToken = () => {
    sendAjax("GET", '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});