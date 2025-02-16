
//post object{body,id,userId,title}
const createPost = function (post) {
    let postCard = document.createElement('div');
    postCard.classList.add('postCard');
    document.body.append(postCard);
    //****************************************** title and body ***************************************************/
    let title = document.createElement('h1');
    title.classList.add('postTitle');
    title.innerText = post.title;
    postCard.append(title);
    let postBody = document.createElement('p');
    postBody.classList.add('postBody');
    postBody.innerText = post.body;
    postCard.append(postBody);
    
    //****************************************** inputs **********************************************************/
    let titleTextBox = document.createElement('input');
    titleTextBox.setAttribute('type', 'text');
    titleTextBox.setAttribute('placeholder', 'Enter Post Title');
    titleTextBox.classList.add('titleTextBox');
    postCard.append(titleTextBox);
    let bodyTextBox = document.createElement('textarea');
    bodyTextBox.setAttribute('placeholder', 'Enter Post Body');
    bodyTextBox.classList.add('bodyTextBox');
    postCard.append(bodyTextBox);
    let br = document.createElement('br');
    postCard.append(br);
    //****************************************** buttons **********************************************************/
    let updateButton = document.createElement('input');
    updateButton.setAttribute('type', 'button');
    updateButton.setAttribute('value', 'Update');
    updateButton.classList.add('#updateButton');
    updateButton.onclick = () => { updatePost(post, title, postBody, titleTextBox, bodyTextBox); }
    postCard.append(updateButton);
    let showDetailsButton = document.createElement('input');
    showDetailsButton.setAttribute('type', 'button');
    showDetailsButton.setAttribute('value', 'Show Comments');
    showDetailsButton.classList.add('showDetailsButton');
    showDetailsButton.addEventListener('click',function updateHandler() { 
        showDetails(post, postCard ,showDetailsButton ,updateHandler); 
        this.removeEventListener('click',updateHandler);
        this.disabled=true;
    });
    postCard.append(showDetailsButton);
    let deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'Delete');
    deleteButton.classList.add('deleteButton');
    deleteButton.onclick = () => { deletePost(post, postCard); }
    postCard.append(deleteButton);
    return postCard;
}
// ********************************************** create comment section ****************************************************************
const showDetails = function (post, postCard ,showDetailsButton ,updateHandler) {
    let commentsSection = document.createElement('div'); // create Comments Section
    postCard.append(commentsSection);

    let commentsHeader = document.createElement('h2');
    commentsHeader.innerText = 'Comments';
    commentsSection.append(commentsHeader);

    let commentsContainer = document.createElement('div');// create container hold comments cards
    commentsContainer.classList.add('commentsContainer'); 
    commentsSection.append(commentsContainer);
    //fetch comments
    getComments(post, commentsContainer); 
    // ****************************************** Add comments Section ****************************************************************
    let commentTitleTextBox = document.createElement('input');
    commentTitleTextBox.setAttribute('type', 'text');
    commentTitleTextBox.setAttribute('placeholder', 'Enter Comment Title');
    commentTitleTextBox.classList.add('commentTitleTextBox');
    commentsSection.append(commentTitleTextBox);

    let commentEmailTextBox = document.createElement('input');
    commentEmailTextBox.setAttribute('type', 'text');
    commentEmailTextBox.setAttribute('placeholder', 'Enter E-mail');
    commentEmailTextBox.classList.add('commentEmailTextBox');
    commentsSection.append(commentEmailTextBox);

    let commentBodyTextBox = document.createElement('textarea');
    commentBodyTextBox.setAttribute('placeholder', 'Enter Comment Body');
    commentBodyTextBox.classList.add('commentBodyTextBox');
    commentsSection.append(commentBodyTextBox);

    let br = document.createElement('br');
    commentsSection.append(br);

    let addCommentButton = document.createElement('input');
    addCommentButton.setAttribute('type', 'button');
    addCommentButton.setAttribute('value', 'Add Comment');
    addCommentButton.classList.add('addCommentButton');
    addCommentButton.onclick = () => {
        addComment(commentsContainer, commentTitleTextBox, commentEmailTextBox, commentBodyTextBox);
        alert("Comment added successfully!");
        commentTitleTextBox.value = '';
        commentEmailTextBox.value = '';
        commentBodyTextBox.value = '';
    }
    commentsSection.append(addCommentButton);


    let backButton = document.createElement('input'); // create Back Button
    backButton.setAttribute('type', 'button');
    backButton.setAttribute('value', 'Back');
    backButton.classList.add('backButton');
    backButton.onclick = () => {
        commentsSection.remove(); // Remove the details card
        backButton.remove(); //Removes the back button
        showDetailsButton.addEventListener('click',updateHandler);
        showDetailsButton.disabled=false;
    };
    commentsSection.append(backButton);
    
};
// ********************************************** create comment card ****************************************************************
const createCommentCard = function (commentObject, commentsContainer) {
    let commentCard = document.createElement('div');
    commentCard.classList.add('commentCard');

    let commentName = document.createElement('h3');
    commentName.innerText = commentObject.name; // Comment name (title)
    commentCard.append(commentName);

    let commentEmail = document.createElement('p');
    commentEmail.innerText = `email: ${commentObject.email}`; // Comment email
    commentEmail.classList.add('commentEmail');
    commentCard.append(commentEmail);

    let commentBody = document.createElement('p');
    commentBody.innerText = commentObject.body; // Comment body
    commentBody.classList.add('commentBody');
    commentCard.append(commentBody);

    commentsContainer.append(commentCard);
}


// ****************************************** fake adding comments functionality ****************************************************************
const addComment = function (commentsSection, commentTitleTextBox, commentEmailTextBox, commentBodyTextBox) {
    let fakeCommentObject = {
        name: commentTitleTextBox.value,
        email: commentEmailTextBox.value,
        body: commentBodyTextBox.value,
    };
    createCommentCard(fakeCommentObject, commentsSection);
}

