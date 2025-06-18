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
    viewPostButton.classList.add('btn', 'btn-primary');
    viewPostButton.addEventListener('click', function () {
        viewPostButton.href = `post.html?id=${post.id}`;
        // window.location.href = `post.html?id=${post.id}`;
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