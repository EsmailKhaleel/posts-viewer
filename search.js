let searchTextBox = document.querySelector('#searchBar');
const searching = function (allPosts) {
    searchTextBox.addEventListener('input', function () {
        const seachText = searchTextBox.value.toLowerCase();
        let filteredPosts = allPosts.filter(post => {
            return post.title.toLowerCase().includes(seachText) ||
                post.body.toLowerCase().includes(seachText);
        }
        );
        displayPosts(filteredPosts);
    });
}