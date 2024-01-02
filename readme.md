# Thread Pool

## Features

1. Register: Users are able to register new accounts by going to the /register path. From there, they will be prompted to input a username and password which will them be added to the database. Note: After creating an account the user will automatically be redirected to the login page where they can login to their new account with their credentials.
2. Login: Users with accounts are able to login using their created username and password via the /login path - users' passwords are securely stored in the database by utilizing bcrypt.
3. Creating Posts: Once users are logged in, they have the ability to create text posts which they can post to the conversation by pressing the "post" button at the top or by pressing "enter" on their keyboard.
4. Deleting Posts: Users are able to delete their **own posts** by hitting the small "x" button underneath their post. Note: Users are only allowed to delete their own posts and will not be show the delete option for posts that don't belong to them.
5. Like/Downvote: Users can upvote or downvote posts on the page -- Note: users are currently able to upvote and downvote as much as they want right now!
6. Sorting: User is able to switch the posts to sort by number of likes (most likes at the top) instead of time posted. Currently, only works once if you set the sorting by likes -- is automatically sorted by likes. Note: you have to refresh the page when you sort by likes
7. Page pagination is not implemented fully, number of items per page is implemented but does not include multiple pages. Editing posts is also not implemented correctly, currently redirects you to a page to edit the post but was unable to get the original message in the page and couldn't properly send the edited message to the edit page.
8. Incompleted Functions: Currently, there are tabs for users to access their friend pool, notifications, and profile. These are not implemented currently.

## Prerequisites

The site utilizes Node.js and npm so the user needs to have these installed before attempting to run the site. Additionally, the program utilizes the UMN's mysql server, therefore, the user must have access to the MySql server provided by the UMN.
The site also utilizes the following additional dependencies that can be installed using npm:
1. Express for the server
2. Express session
3. Pug/Pugjs
4. MySql await
5. Bcrypt

Database Login information:
Username: C4131F23U23
Password: 579

## Running the site
To run the site from the Project root folder, the user needs to type in the following command:
```node server.js ```

You can either run this by ssh-ing into a UMN lab machine and use live-server port forwarding (you will have to set host to the UMN MySql server) or by using the tunnel.js