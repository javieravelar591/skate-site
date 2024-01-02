window.addEventListener("DOMContentLoaded", () => {
    // console.log("test");
    async function deletePost() {
        const buttons = document.querySelectorAll(".delete-button");
        // console.log(buttons);
        buttons.forEach((button) => {
            // console.log(button);
            button.addEventListener("click", async ()=> {
                let currentRow = button.parentNode;
                // console.log(currentRow);
                // maybe change how i get these
                let post_id = currentRow.getAttribute('post_id');
                console.log("POST_ID: " + post_id);
                let user_id = currentRow.getAttribute('user_id');
                console.log("USER_ID: " + user_id);
                // console.log(post_id)
                const result = await fetch("/api/posts", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"post_id": post_id, "user_id": user_id})
                })
                console.log(result);
                // if (result.ok) {
                //     // let section = currentRow.parentNode;
                //     console.log("WAHOOO");
                //     location.reload();
                //     // currentRow.remove();
                // } else {
                //     console.log("not deleting correctly");
                // }
                location.reload();
            })
        })
    }
    console.log("about to delete post");
    deletePost();

    console.log("test2");
    async function likePost() {
        const like_buttons = document.querySelectorAll('.like-button');

        // console.log(like_buttons);

        like_buttons.forEach((button) => {
            // console.log(button);
            button.addEventListener("click", async ()=> {
                let currentLikes = parseInt(button.previousSibling.firstChild.innerText);
                // console.log("current likes: "+ currentLikes);
                // let likes = document.getElementsByClassName('numlikes')[0];
                // console.log(currentLikes);
                currentLikes = currentLikes + 1;
                button.previousSibling.firstChild.innerText = currentLikes;
                let post_id = button.closest('.post-data').getAttribute('post_id');
                console.log(post_id);
                console.log(button.parentNode)
                const result = await fetch ('/api/like', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"post_id": post_id})
                })
                location.reload();
            })
        })
    }
    likePost();

    async function downVote() {
        const downvote_buttons = document.querySelectorAll('.downvote-button');
        // console.log(downvote_buttons);
        
        downvote_buttons.forEach((button) => {
            button.addEventListener("click", async ()=> {
                let currentLikes = parseInt(button.previousSibling.previousSibling.firstChild.innerText);
                console.log(currentLikes);
                // let likes = document.getElementsByClassName('numlikes')[0];
                // console.log(currentLikes);
                currentLikes = currentLikes - 1;
                button.previousSibling.previousSibling.firstChild.innerText = currentLikes;
                let post_id = button.closest('.post-data').getAttribute('post_id');
                // console.log(post_id);
                // console.log(button.parentNode)
                const result = await fetch ('/api/downvote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"post_id": post_id})
                })
            })
        });  
    }
    downVote();

    async function sortPosts() {
        let post_container = document.getElementsByClassName("post-container");
        console.log(post_container);
        let sort_buttons = document.querySelectorAll(".sort-button");
        // console.log(sort_buttons);

        sort_buttons.forEach((button) => {
            button.addEventListener("click", async () => {
                let order = button.getAttribute('order');
                // console.log(order);
                
                const result = await fetch ('/api/sort', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"order": order})
                })
            })
        })
    }
    sortPosts();
});