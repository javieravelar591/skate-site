// // this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await

// // first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections
// // this is used a bit differently, but I think it's just better -- especially if server is doing heavy work.
var connPool = mysql.createPool({
    connectionLimit: 5, // it's a shared resource, let's not go nuts.
    host: "127.0.0.1",// this will work
    user: "",
    database: "",
    password: "", // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
  });
// // later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.

async function deletePost(user_id, post_id){
    // console.log("user " + user_id + " is deleting " + " post " + post_id);
    return await connPool.awaitQuery("DELETE FROM posts WHERE user_id=? AND post_id=?", [user_id, post_id]);
}

async function getPosts(order) {
    // let contact = await connPool.awaitQuery("select * from contact");
    // console.log(contact);
    if (order === 'likes') {
        // console.log("LIKLE LIELKS LIElikes");
        return await connPool.awaitQuery("SELECT * FROM posts ORDER BY likes DESC LIMIT 10");
    } else {
        // console.log("TIME TIME TIME: time");
        return await connPool.awaitQuery("SELECT * FROM posts ORDER BY time_posted DESC LIMIT 10");
    }
}

async function addPost(message, user_id) {
    console.log("adding into posts " + message + " " + user_id);
    return await connPool.awaitQuery("INSERT INTO posts (post_message, user_id) values (?, ?)", [message, user_id]);
}

// User database functions
async function getUser(username) {
    // let contact = await connPool.awaitQuery("select * from contact");
    // console.log(contact);
    return await connPool.awaitQuery("SELECT * FROM user where username=?", [username]);
}

async function addUser(username, password) {
    return await connPool.awaitQuery("INSERT INTO user (username, password) values (?, ?)", [username, password]);
}

async function likePost(user_id, post_id) {
    return await connPool.awaitQuery("UPDATE posts SET likes = likes + 1 WHERE post_id=?", [post_id]);
}

async function downVote(user_id, post_id) {
    return await connPool.awaitQuery("UPDATE posts SET likes = likes - 1 WHERE post_id=?", [post_id]);
}
module.exports = {getPosts, addPost, deletePost, addUser, getUser, likePost, downVote}