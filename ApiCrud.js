const postTitle = document.querySelector('#postTitle');
const postBody = document.querySelector('#postBody');
const addButton = document.querySelector('input[value="Add Post"]');
let allPosts = [];

// Enhanced validation for adding posts
const validateAddPost = () => {
    clearValidationErrors();
    let isValid = true;
    
    const titleError = validateRequired(postTitle.value, 'Post title');
    if (titleError) {
        postTitle.classList.add('validation-error');
        showMessage(titleError);
        isValid = false;
    } else {
        const titleLengthError = validateLength(postTitle.value, 'Post title', 3, 100);
        if (titleLengthError) {
            postTitle.classList.add('validation-error');
            showMessage(titleLengthError);
            isValid = false;
        }
    }
    
    const bodyError = validateRequired(postBody.value, 'Post body');
    if (bodyError) {
        postBody.classList.add('validation-error');
        showMessage(bodyError);
        isValid = false;
    } else {
        const bodyLengthError = validateLength(postBody.value, 'Post body', 10, 1000);
        if (bodyLengthError) {
            postBody.classList.add('validation-error');
            showMessage(bodyLengthError);
            isValid = false;
        }
    }
    
    return isValid;
};

const getPosts = function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            allPosts = data;
            displayPosts(data);
            storedPosts(allPosts);
        }).catch(function (error) {
            console.warn(error);
            showMessage("Failed to load posts. Please check your internet connection.");
        });
}

const displayPosts = function (posts) {
    document.querySelectorAll('.postCard').forEach(postCard => postCard.remove());
    if (posts.length === 0) {
        showMessage("No posts found matching your search criteria.", 'error');
    } else {
        posts.forEach(post => createPost(post));
    }
}

getPosts();

const storedPosts = function (allPosts) {
    console.log(allPosts);
    searching(allPosts);
}

addButton.addEventListener('click', function () {
    // Enhanced validation
    if (!validateAddPost()) {
        return;
    }
    
    // Disable button during submission
    addButton.disabled = true;
    addButton.value = 'Adding...';
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitle.value.trim(),
            body: postBody.value.trim(),
            userId: 1, // Adding userId for completeness
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            createPost(data);
            showMessage("Post added successfully!", 'success');
            // Clear form
            postTitle.value = '';
            postBody.value = '';
            // Add to allPosts array for search functionality
            allPosts.unshift(data);
        })
        .catch(function (error) {
            console.warn(error);
            showMessage("Failed to add post. Please try again.");
        })
        .finally(() => {
            // Re-enable button
            addButton.disabled = false;
            addButton.value = 'Add Post';
        });
});

const deletePost = function (post, postCard) {
    // Show loading state
    const deleteButton = postCard.querySelector('.btn-danger');
    const originalValue = deleteButton.value;
    deleteButton.value = 'Deleting...';
    deleteButton.disabled = true;
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'DELETE',
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`postObject ${post.id} is deleted`);
        postCard.remove();
        showMessage("Post deleted successfully!", 'success');
        
        // Remove from allPosts array for search functionality
        const postIndex = allPosts.findIndex(p => p.id === post.id);
        if (postIndex !== -1) {
            allPosts.splice(postIndex, 1);
        }
    }).catch((error) => {
        console.log(error);
        showMessage("Failed to delete post. Please try again.");
        // Reset button state on error
        deleteButton.value = originalValue;
        deleteButton.disabled = false;
    });
}
