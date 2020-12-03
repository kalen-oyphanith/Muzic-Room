// React components for the profile page
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
    
    alert("You made a new post!");

    
    return false;
};

// handles the update function for the password change
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
    alert("You have changed your password");

    sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), redirect);
    
    return false;
};

// form for user to fill out their blog posts
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
            
            <label htmlFor="nickName">Name: </label>
            <input id="nickName" type="text" name="nickName" placeholder="Nick name (optional)" />   
            <br></br>
            
            <label htmlFor="blogPost">Post: </label>
            <textarea rows="5" cols="40" id="postBlogPost" type="text" name="blogPost" placeholder="write a post!"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input id="postButton" className="formSubmit" type="submit" value="Make Post" />
        </form>
    );
};

//settings form to change their password
const SettingsForm = (props) => {
    return (
        <form id="settingsForm"
            onSubmit={handleUpdate}
            name="settingsForm"
            action="/passUpdate"
            method="POST"
            className="settingsForm"
        >   
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

// enables users to delete all their posts
const DeleteForm = (props) => {
  return (
    <form id="deleteForm" 
      name="deleteForm"
      action="/deletePosts"
      method="POST"
      className="deleteForm"
      >
          <input type="hidden" name="_csrf" value={props.csrf} />
          <input id="deleteButton" className="formSubmit" type="button" name="deleteButton" value="Delete Posts" onClick={deleteAll} />
    </form>
  );  
};

// displays the user's posts in divs
const PostList = function(props) {    
    if(props.posts.length === 0) {
        return(
            <div className="postList">
                <h3 className="emptyPost">No Posts yet</h3>
            </div>
        );
    } 
                  
    const postNodes = props.posts.map(function(post) {

        // https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/
        let today = new Date(post.createdDate);
        let dayCreated = today.toLocaleDateString();        
        console.log(posts);
        return (
            <div key={post._id} className="post">
                <img src="/assets/img/userFace.png" alt="pfp" />
                <h2 id="username">@{post.username} </h2>
                <p> {post.nickName} </p>
                <h3 id="postHead"> {post.heading.replace(/&#x27;|&quot;/gi, "'")} </h3>
                <p> {post.blogPost.replace(/&#x27;|&quot;/gi, "'")} </p> 
                <p> {dayCreated} </p> 
            </div> 
        );
    });
    
    return (
        <div>
            {postNodes}
        </div>
    );
};

// the header of feed window
const FeedWindow = () => {
    return(
        <div>
            <h1>The Muzic Room</h1>
            <p>Here's what other people are saying!</p>
        </div>
    );
};

// clear window to substitute others
const ClearWindow = () => {
    return(
        <p></p>
    );
};

//profile window to display heading
const ProfileWindow = () => {
    return (
        <div>
            <h1>My Profile</h1>
        </div>
    );
};

// displays heading
const SettingsHeadingWindow = function(props) {
    return (
        <div>
            <h1>My Account</h1>
        </div>
    );
};

// PremButton enable the music to be hidden then shown 
class PremButton extends React.Component {
  constructor(){
         super();

         this.state = {
              hidden: true
         }
    }

    changeVis(){
        this.setState({hidden: !this.state.hidden})
    }
    
    // renders the images
    render(){
        let grid = this.state.hidden ? "hidden" : "show";
        return(
            <div>
                <input id="subscribeButton" className="formSubmit" type="submit" onClick={this.changeVis.bind(this)} value="Subscribe"/>
                
                <span id="gridContainer" className={grid}>
                <img src="/assets/img/sheet_1.png" alt="Sheet Music" />
                <img src="/assets/img/sheet_2.jpg" alt="Sheet Music" />
                <img src="/assets/img/sheet_3.png" alt="Sheet Music" />
                <img src="/assets/img/sheet_4.jpg" alt="Sheet Music" />
                <img src="/assets/img/sheet_5.jpg" alt="Sheet Music" />
                <img src="/assets/img/sheet_6.jpg" alt="Sheet Music" />
                </span>
            </div>
        );
    };
}

// header for the window
const PremiumWindow = () => {
    return (
        <div>                
            <h1>Get Your Sheet Music!</h1>
            <p>Learn more songs quickly with our sheet music provided!</p>
        </div>  
    ); 
};

// breaks if i dont remove
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

// creates the feed window with all the posts
const createFeedWindow = (csrf) => {
    ReactDOM.render(
        <FeedWindow csrf={csrf} />,
        document.querySelector("#header")
    );    
    
    ReactDOM.render(
        <ClearWindow/>,
        document.querySelector("#deleteAllPosts")
    );    
    
    ReactDOM.render(
        <ClearWindow/>,
        document.querySelector("#makePost")
    );
    
    ReactDOM.render(
        <PostList posts={[]} />, 
        document.querySelector("#posts")
    );
};

//creates the user's profile with the makePost on page
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
    
    ReactDOM.render(
        <DeleteForm csrf={csrf} />, document.querySelector("#deleteAllPosts")
    );
};

// creates the settings window 
const createSettingsWindow = (csrf) => {
    ReactDOM.render(
        <SettingsHeadingWindow />, document.querySelector("#header")
    );
    
    ReactDOM.render(
        <ClearWindow/>,
        document.querySelector("#deleteAllPosts")
    );   
    
    ReactDOM.render(
        <ClearWindow csrf={csrf} />, 
        document.querySelector("#makePost")
    );          
    
    ReactDOM.render(
        <SettingsForm csrf={csrf} />, 
        document.querySelector("#posts")
    );               
};

//creates the premium window
const createPremiumWindow = (csrf) => {
    ReactDOM.render(
        <PremiumWindow csrf={csrf} />, 
        document.querySelector("#header")
    );       
    
    ReactDOM.render(
        <ClearWindow/>,
        document.querySelector("#deleteAllPosts")
    );   
    
    ReactDOM.render(
        <ClearWindow csrf={csrf} />, 
        document.querySelector("#makePost")
    );         
    
    ReactDOM.render(
        <PremiumBodyWindow csrf={csrf} />, 
        document.querySelector("#posts")
    );             
    
    ReactDOM.render(
        <PremButton />, document.querySelector("#gridContainer")
    );
   
    // after subsribe button is clicked, disable it
    document.querySelector('#subscribeButton').onclick = function() {
        this.disabled = true;
    }
};

// request to delete all posts
const deleteAll = (e) => {
    sendAjax('POST', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), loadPostsFromServer());
};

//loads all posts from server
const loadAllPostsFromServer = () => {
    sendAjax('GET', '/getAllPosts', null, (data) => {
        ReactDOM.render(
            <PostList posts={data.posts} />, document.querySelector("#posts")
        );
    });
};

// loads posts form server
const loadPostsFromServer = () => {
    sendAjax('GET', '/getPosts', null, (data) => {
        ReactDOM.render(
            <PostList posts={data.posts} />, document.querySelector("#posts")
        );
    });
};

// onclick to add functionality to tabs
const setup = function(csrf) {
    const feedButton = document.querySelector("#allPostsButton");
    const profileButton = document.querySelector("#profileButton");
    const premiumButton = document.querySelector("#premiumButton");
    const settingsButton = document.querySelector("#settingsButton");
    
    feedButton.addEventListener("click", (e) => {
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

//creates uniqure sessions
const getToken = () => {
    sendAjax("GET", '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});