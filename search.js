let searchTextBox = document.querySelector('#searchBar');
let searchTimeout;

const searching = function (allPosts) {
    searchTextBox.addEventListener('input', function () {
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // Add debouncing to improve performance
        searchTimeout = setTimeout(() => {
            const searchText = searchTextBox.value.toLowerCase().trim();
            
            if (searchText === '') {
                // Show all posts if search is empty
                displayPosts(allPosts);
                return;
            }
            
            let filteredPosts = allPosts.filter(post => {
                return post.title.toLowerCase().includes(searchText) ||
                       post.body.toLowerCase().includes(searchText);
            });
            
            displayPosts(filteredPosts);
            
            // Show search results count
            if (searchText.length > 0) {
                const resultCount = filteredPosts.length;
                const message = resultCount === 1 ? 
                    `Found 1 post matching "${searchText}"` : 
                    `Found ${resultCount} posts matching "${searchText}"`;
                showMessage(message, resultCount > 0 ? 'success' : 'error');
            }
        }, 300); // 300ms debounce delay
    });
    
    // Add placeholder text animation
    searchTextBox.addEventListener('focus', function() {
        if (this.value === '') {
            this.placeholder = 'Type to search posts...';
        }
    });
    
    searchTextBox.addEventListener('blur', function() {
        if (this.value === '') {
            this.placeholder = 'Search posts by title or body...';
        }
    });
};