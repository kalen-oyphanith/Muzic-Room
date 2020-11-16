////// name = heading /////////    age = blogPost     ///////

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
    
    $("#postMessage").animate({width: 'hide'}, 350);
    
    sendAjax('POST', $("#settingsForm").attr("action"), $("#settingsForm").serialize(), function() {
        loadPostsFromServer();
    });
    
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
            <textarea rows="5" cols="40" id="postBlogPost" onkeyup="this.value = this.value.replace(/[&*<>/']/g, '')" type="text" name="blogPost" placeholder="write a post!"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makePostSubmit" type="submit" value="Make Post" />
        </form>
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

const SettingsWindow = function(props) {
        return (
            <div>
                <h1>Account Information</h1>
                <p> Username: (username goes here)</p>
            </div>
        );
}

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
                <h1>username:{post.owner}</h1>
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

const SettingsForm = (props) => {
    return (
        <form id="settingForm"
            onSubmit={handleUpdate}
            name="settingForm"
            action="/maker"
            method="POST"
            className="settingForm"
        >
            <label htmlFor="bio">Bio: </label>
            <textarea rows="2" cols="40" id="postBio" type="text" name="bio" placeholder="Write something about yourself! Do you play an instrument? Preferences in music..."></textarea>
            
            <br></br>
            
            <label htmlFor="passwordChange">Password change:</label>
            <input id="passwordChange" type="text" name="passwordChange" placeholder="New password" />            

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makePostSubmit" type="submit" value="Update" />
        </form> 
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
        <SettingsWindow csrf={csrf} />, 
        document.querySelector("#header")
    );  
    
    ReactDOM.render(
        <SettingsForm csrf={csrf} />,
        document.querySelector("#makePost")
    );
};

const setup = function(csrf) {
    const FeedButton = document.querySelector("#allPostsButton");
    const profileButton = document.querySelector("#profileButton");
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