window.addEventListener("DOMContentLoaded", () => {
    async function editPost() {
        let button = document.getElementById('submit-edit-button');
        console.log(button);
        button.addEventListener("click", async () => {
            let message = document.querySelector('.edit-post').innerText;
            console.log(message);
            const result = await fetch ('/api/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"post_message": message})
            })
        })
    }
    editPost();
})