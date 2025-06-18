//post object{body,id,userId,title}
const createPost = function (post) {
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
    
    let viewPostButton = document.createElement('input');
    viewPostButton.setAttribute('type', 'button');
    viewPostButton.setAttribute('value', 'View Post');
    viewPostButton.classList.add('btn', 'btn-primary');
    viewPostButton.addEventListener('click', function() {
        window.location.href = `post.html?id=${post.id}`;
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

// ********************************************** create comment card ****************************************************************
const createCommentCard = function (commentObject, commentsContainer) {
    let commentCard = document.createElement('div');
    commentCard.classList.add('commentCard');

    let commentName = document.createElement('h3');
    commentName.innerText = commentObject.name; // Comment name (title)
    commentCard.append(commentName);

    let commentEmail = document.createElement('p');
    commentEmail.innerText = `Email: ${commentObject.email}`; // Comment email
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
        name: commentTitleTextBox.value.trim(),
        email: commentEmailTextBox.value.trim(),
        body: commentBodyTextBox.value.trim(),
    };
    createCommentCard(fakeCommentObject, commentsSection);
}

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

// Enhanced validation for update post
const validateUpdatePost = (titleTextBox, bodyTextBox) => {
    clearValidationErrors();
    let isValid = true;
    
    const titleError = validateRequired(titleTextBox.value, 'Title');
    if (titleError) {
        titleTextBox.classList.add('validation-error');
        showMessage(titleError);
        isValid = false;
    } else {
        const titleLengthError = validateLength(titleTextBox.value, 'Title', 3, 100);
        if (titleLengthError) {
            titleTextBox.classList.add('validation-error');
            showMessage(titleLengthError);
            isValid = false;
        }
    }
    
    const bodyError = validateRequired(bodyTextBox.value, 'Body');
    if (bodyError) {
        bodyTextBox.classList.add('validation-error');
        showMessage(bodyError);
        isValid = false;
    } else {
        const bodyLengthError = validateLength(bodyTextBox.value, 'Body', 10, 1000);
        if (bodyLengthError) {
            bodyTextBox.classList.add('validation-error');
            showMessage(bodyLengthError);
            isValid = false;
        }
    }
    
    return isValid;
};

// Enhanced comment validation
const validateComment = (titleTextBox, emailTextBox, bodyTextBox) => {
    clearValidationErrors();
    let isValid = true;
    
    const titleError = validateRequired(titleTextBox.value, 'Comment title');
    if (titleError) {
        titleTextBox.classList.add('validation-error');
        showMessage(titleError);
        isValid = false;
    } else {
        const titleLengthError = validateLength(titleTextBox.value, 'Comment title', 2, 50);
        if (titleLengthError) {
            titleTextBox.classList.add('validation-error');
            showMessage(titleLengthError);
            isValid = false;
        }
    }
    
    const emailError = validateRequired(emailTextBox.value, 'Email');
    if (emailError) {
        emailTextBox.classList.add('validation-error');
        showMessage(emailError);
        isValid = false;
    } else if (!validateEmail(emailTextBox.value)) {
        emailTextBox.classList.add('validation-error');
        showMessage('Please enter a valid email address');
        isValid = false;
    }
    
    const bodyError = validateRequired(bodyTextBox.value, 'Comment body');
    if (bodyError) {
        bodyTextBox.classList.add('validation-error');
        showMessage(bodyError);
        isValid = false;
    } else {
        const bodyLengthError = validateLength(bodyTextBox.value, 'Comment body', 5, 500);
        if (bodyLengthError) {
            bodyTextBox.classList.add('validation-error');
            showMessage(bodyLengthError);
            isValid = false;
        }
    }
    
    return isValid;
};

