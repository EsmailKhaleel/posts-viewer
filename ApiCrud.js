const postTitle = document.querySelector('input[placeholder="Enter Tilte"]');
const postBody = document.querySelector('input[placeholder="Enter Body"]');
const addButton = document.querySelector('input[value="Add Post"]');
let allPosts = [];
//***************************************  Get *******************************************************************************/
const getPosts = function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) { //data is an array of posts objects
            allPosts = data;
            displayPosts(data);
            storedPosts(allPosts);
        }).catch(function (error) {
            console.warn(error);
            alert("Failed to load posts. Please check your internet connection.");
        });
}
const displayPosts = function (posts) {
    document.querySelectorAll('.postCard').forEach(postCard => postCard.remove());
    posts.forEach(post => createPost(post));
}
getPosts();
const storedPosts = function (allPosts) {
    console.log(allPosts);
    searching(allPosts);
}
//***************************************  Insert *******************************************************************************/
addButton.addEventListener('click', function () {
    // Validation
    if (!postTitle.value.trim() || !postBody.value.trim()) {
        alert("Title and body cannot be empty!");
        return;
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitle.value,
            body: postBody.value,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            createPost(data);
            alert("Post added successfully!");
        })
        .catch(function (error) {
            console.warn(error);
            alert("Failed to add post. Please try again.");
        });
});
//***************************************  Update *******************************************************************************/
const updatePost = function (post, updatedTitle, updatedBody, titleTextBox, bodyTextBox) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title: titleTextBox.value,
            body: bodyTextBox.value,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updatedTitle.innerText = data.title;
            updatedBody.innerText = data.body;
            titleTextBox.value = '';
            bodyTextBox.value = '';
            alert("Post updated successfully!");
        }).catch((error) => {
            console.log('not updated');
            alert("Failed to update post.");
        });
}
//***************************************  Delete Post *******************************************************************************/
const deletePost = function (id, postCard) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    }).then(() => {
        console.log(`postObject ${id} is deleted`);
        postCard.remove();
        alert("Post deleted successfully!");
    }).catch((error) => {
        console.log(error);
        alert("Failed to delete post.");
    });
}

// ****************************************** Fetch comments for the post****************************************************************
const getComments = function (post, commentsContainer) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((response) => response.json())
        .then((comments) => {
            console.log(comments);
            comments.forEach((comment) => {
                createCommentCard(comment, commentsContainer);
            });
        })
        .catch((error) => {
            console.warn('Error fetching comments:', error);
            alert("Failed to load comments. Please try again.");
        });
}
