//post object{body,id,userId,title}
const createPost = function (post) {
    console.log("posting creation");
    let postCard = document.createElement('div');
    postCard.classList.add('postCard');
    // Append to posts-grid if it exists, else fallback to body
    const grid = document.querySelector('.posts-grid');
    if (grid) {
        grid.append(postCard);
    } else {
        document.body.append(postCard);
    }

    // Title and body
    let title = document.createElement('h1');
    title.classList.add('postTitle');
    title.innerText = post.title;
    postCard.append(title);

    let postBody = document.createElement('p');
    postBody.classList.add('postBody');
    postBody.innerText = post.body;
    postCard.append(postBody);

    // Buttons section
    let postActions = document.createElement('div');
    postActions.classList.add('post-actions');
    postCard.append(postActions);

    // let viewPostButton = document.createElement('input');
    const viewPostButton = document.createElement('a');
    viewPostButton.setAttribute('type', 'button');
    viewPostButton.innerText = 'View Post';
    viewPostButton.style.textDecoration = "none"
    viewPostButton.classList.add('btn', 'btn-primary');
    viewPostButton.href = '#';
    viewPostButton.addEventListener('click', function (e) {
        e.preventDefault();
        showPostDetails(post.id);
    });
    postActions.append(viewPostButton);

    let deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'Delete');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.onclick = () => { deletePost(post, postCard); }
    postActions.append(deleteButton);

    return postCard;
};


// Enhanced validation functions
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateRequired = (value, fieldName) => {
    if (!value || value.trim().length === 0) {
        return `${fieldName} is required`;
    }
    return null;
};

const validateLength = (value, fieldName, minLength, maxLength) => {
    if (value.length < minLength) {
        return `${fieldName} must be at least ${minLength} characters long`;
    }
    if (maxLength && value.length > maxLength) {
        return `${fieldName} must be no more than ${maxLength} characters long`;
    }
    return null;
};

// Dialog elements
const dialog = document.getElementById('validationDialog');
const dialogMessage = document.getElementById('dialogMessage');
const dialogCloseBtn = document.getElementById('dialogCloseBtn');

// Initialize dialog event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close button event listener
    dialogCloseBtn.addEventListener('click', () => {
        dialog.close();
    });

    // Close dialog when clicking outside
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });

    // Close dialog with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dialog.open) {
            dialog.close();
        }
    });
});

const showMessage = (message, type = 'error') => {
    // Set message content
    dialogMessage.textContent = message;

    // Set dialog styling based on message type
    if (type === 'error') {
        dialogMessage.style.color = 'var(--danger-color)';
    } else {
        dialogMessage.style.color = '#4CAF50';
    }

    // Show the dialog
    dialog.showModal();

    // Auto-close after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (dialog.open) {
                dialog.close();
            }
        }, 5000);
    }
};

const clearValidationErrors = () => {
    document.querySelectorAll('.validation-error').forEach(element => {
        element.classList.remove('validation-error');
    });
};

// SPA: Show Post Details
function showPostDetails(postId) {
    // Hide main UI
    document.querySelector('.posts-grid').style.display = 'none';
    document.querySelector('.addSection').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    // Show details UI
    const postDetailsSection = document.getElementById('postDetailsSection');
    const commentsSection = document.getElementById('commentsSection');

    postDetailsSection.style.display = '';
    commentsSection.style.display = '';

    // Get elements
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsBody = document.getElementById('detailsBody');
    const postMeta = document.getElementById('postMeta');
    const editTitle = document.getElementById('editTitle');
    const editBody = document.getElementById('editBody');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const backBtn = document.getElementById('backBtn');
    const commentsContainer = document.getElementById('commentsContainer');
    const commentTitle = document.getElementById('commentTitle');
    const commentEmail = document.getElementById('commentEmail');
    const commentBody = document.getElementById('commentBody');
    const addCommentBtn = document.getElementById('addCommentBtn');
    let currentPost = null;

    // Reset UI
    detailsTitle.textContent = 'Loading...';
    detailsBody.textContent = '';
    postMeta.innerHTML = '';
    editTitle.value = '';
    editBody.value = '';
    commentsContainer.innerHTML = '';
    commentTitle.value = '';
    commentEmail.value = '';
    commentBody.value = '';
    updateBtn.disabled = false;
    deleteBtn.disabled = false;
    addCommentBtn.disabled = false;

    // Fetch post data
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(post => {
            currentPost = post;
            detailsTitle.textContent = post.title;
            detailsBody.textContent = post.body;
            postMeta.innerHTML = `<strong>Post ID:</strong> ${post.id} &nbsp; <strong>User ID:</strong> ${post.userId}`;
            editTitle.value = post.title;
            editBody.value = post.body;
        })
        .catch(() => {
            detailsTitle.textContent = 'Failed to load post.';
            updateBtn.disabled = true;
            deleteBtn.disabled = true;
            addCommentBtn.disabled = true;
        });
    // Fetch comments
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res => res.json())
        .then(comments => {
            commentsContainer.innerHTML = '';
            if (comments.length === 0) {
                commentsContainer.innerHTML = '<div style="text-align:center;color:var(--text-light);padding:20px;font-style:italic;">No comments yet. Be the first to comment!</div>';
            } else {
                comments.forEach(comment => {
                    const card = document.createElement('div');
                    card.className = 'commentCard';
                    card.innerHTML = `<h3>${comment.name}</h3><p class="commentEmail">Email: ${comment.email}</p><p class="commentBody">${comment.body}</p>`;
                    commentsContainer.appendChild(card);
                });
            }
        });
    // Update post
    updateBtn.onclick = function () {
        clearValidationErrors();
        let valid = true;
        const titleError = validateRequired(editTitle.value, 'Title') || validateLength(editTitle.value, 'Title', 3, 100);
        const bodyError = validateRequired(editBody.value, 'Body') || validateLength(editBody.value, 'Body', 10, 1000);
        if (titleError) {
            editTitle.classList.add('validation-error');
            showMessage(titleError);
            valid = false;
        }
        if (bodyError) {
            editBody.classList.add('validation-error');
            showMessage(bodyError);
            valid = false;
        }
        if (!valid) return;
        updateBtn.value = 'Updating...';
        updateBtn.disabled = true;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: editTitle.value.trim(),
                body: editBody.value.trim()
            }),
            headers: { 'Content-type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                detailsTitle.textContent = data.title;
                detailsBody.textContent = data.body;
                showMessage('Post updated successfully!', 'success');
            })
            .catch(() => showMessage('Failed to update post.'))
            .finally(() => {
                updateBtn.value = 'Update';
                updateBtn.disabled = false;
            });
    };
    // Delete post
    deleteBtn.onclick = function () {
        deleteBtn.value = 'Deleting...';
        deleteBtn.disabled = true;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    showMessage('Post deleted successfully!', 'success');
                    setTimeout(() => {
                        // Hide details, show main UI
                        document.getElementById('postDetailsSection').style.display = 'none';
                        document.getElementById('commentsSection').style.display = 'none';
                        document.querySelector('.posts-grid').style.display = '';
                        document.querySelector('.addSection').style.display = '';
                        document.querySelector('.search-container').style.display = '';
                        // Optionally, refresh posts
                        if (typeof getPosts === 'function') getPosts();
                    }, 1200);
                } else {
                    showMessage("Something went wrong on deleting the post. Please check your internet connection!")
                }
            })
            .catch(() => showMessage('Failed to delete post.'))
            .finally(() => {
                deleteBtn.value = 'Delete';
                deleteBtn.disabled = false;
            });
    };
    // Back button
    backBtn.onclick = function () {
        document.getElementById('postDetailsSection').style.display = 'none';
        document.getElementById('commentsSection').style.display = 'none';
        document.querySelector('.posts-grid').style.display = '';
        document.querySelector('.addSection').style.display = '';
        document.querySelector('.search-container').style.display = '';
    };
    // Add comment
    addCommentBtn.onclick = function () {
        clearValidationErrors();
        let valid = true;
        const titleError = validateRequired(commentTitle.value, 'Comment title') || validateLength(commentTitle.value, 'Comment title', 2, 50);
        const emailError = validateRequired(commentEmail.value, 'Email') || (!validateEmail(commentEmail.value) ? 'Please enter a valid email address' : null);
        const bodyError = validateRequired(commentBody.value, 'Comment body') || validateLength(commentBody.value, 'Comment body', 5, 500);
        if (titleError) {
            commentTitle.classList.add('validation-error');
            showMessage(titleError);
            valid = false;
        }
        if (emailError) {
            commentEmail.classList.add('validation-error');
            showMessage(emailError);
            valid = false;
        }
        if (bodyError) {
            commentBody.classList.add('validation-error');
            showMessage(bodyError);
            valid = false;
        }
        if (!valid) return;
        addCommentBtn.value = 'Adding...';
        addCommentBtn.disabled = true;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                name: commentTitle.value.trim(),
                email: commentEmail.value.trim(),
                body: commentBody.value.trim(),
                postId: postId
            }),
            headers: { 'Content-type': 'application/json' },
        })
            .then(res => res.json())
            .then(comment => {
                const card = document.createElement('div');
                card.className = 'commentCard';
                card.innerHTML = `<h3>${comment.name}</h3><p class=\"commentEmail\">Email: ${comment.email}</p><p class=\"commentBody\">${comment.body}</p>`;
                commentsContainer.appendChild(card);
                showMessage('Comment added successfully!', 'success');
                commentTitle.value = '';
                commentEmail.value = '';
                commentBody.value = '';
            })
            .catch(() => showMessage('Failed to add comment.'))
            .finally(() => {
                addCommentBtn.value = 'Add Comment';
                addCommentBtn.disabled = false;
            });
    };
}