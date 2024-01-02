const express = require('express');
const data = require('./data');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');

const app = express();
const port = 4131;

app.set('views', 'templates')
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}));
app.use(express.json());;
app.use('/resources', express.static('resources'))

// app.use(function(req,res,next){
//     res.locals.session = req.session;
//     next();
// });
// app.use(app.router); // from stackoverflow, not completely sure how works so should avoid

app.use(session({
    secret: 'test'
}));

const authMiddleware = (req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/login');
    }
}

// GET requests
// app.get('/', authMiddleware, async (req, res) => {
//     try {
//         let posts = await data.getPosts(req.session.userid);
//         // console.log(posts);
//         res.render('mainpage.pug', { posts, cur_user: req.session.userid });
//     } catch {
//         res.status(404).send('Page could not be opened');
//     }
// });

app.get('/main', authMiddleware, async (req, res) => {
    try {
        // console.log("IN MAIN " + order);
        console.log(req.session.order);
        let posts = await data.getPosts(req.session.order);
        // console.log(posts);
        res.render('mainpage.pug', { posts, cur_user: req.session.userid});
    } catch {
        res.status(404).send('Page could not be opened');
    }
});

app.get('/profile', authMiddleware, async (req, res) => {
    try {
        res.render('profile.pug');
    } catch {
        res.status(404).send('Page could not be opened');
    }
});


app.get('/friends', authMiddleware, async (req, res) => {
    try {
        res.render('friends.pug');
    } catch {
        res.status(404).send('Page could not be opened');
    }
});


app.get('/notifications', authMiddleware, async (req, res) => {
    try {
        res.render('notifications.pug');
    } catch {
        res.status(404).send('Page could not be opened');
    }
});

app.get('/register', (req, res) => {
    try {
        res.render('registration.pug');
    } catch {
        res.status(404).send('Could not open page');
    }
});

app.get('/login', (req, res) => {
    try {
        res.render('login.pug');
    } catch { 
        res.status(404).send('Could not open page');
    }
})

app.get('/edit', authMiddleware, (req, res) => {
    try {
        console.log(req.body);
        console.log(req.session.message);
        res.render('edit.pug', { message: req.session.message });
    } catch { 
        res.status(404).send('Could not open page');
    }
})

// POST requests
app.post('/api/edit', authMiddleware, (req, res) => {
    // console.log(req.body);
    res.session.message = req.body.post_message;
    console.log(req.body);
    let { message, post_id } = req.body;
    // console.log(post_id)
    // console.log(message)
    res.render('edit.pug', { message, post_id });
});

app.post('/register', async (req, res) => {
    let { username, password } = req.body;
    // console.log(req.body);
    // console.log(req.body.username);
    // console.log(req.body.password);
    let hash = await bcrypt.hash(req.body.password, saltRounds);
    // console.log(hash);

    try {
        let result = await data.addUser(username, hash);

        if (result.affectedRows > 0) {
            res.redirect('/login');
        } else {
            res.status(500).send('Could not register user');
        }
    } catch {
        res.status(500).send('Error registering user');
    }
});

app.post('/main', authMiddleware, async (req, res) => {
    // console.log(req.body);
    let message = req.body.userpost;
    // console.log(message);
    // console.log(req.session.userid)
    await data.addPost(message, req.session.userid);
    res.redirect('/main');
    // console.log("baby")
    // console.log(req.session.userid);
    // let posts = await data.getPosts(req.session.userid);
    // res.render('mainpage.pug', { posts, cur_user: req.session.user_id});
});

app.post('/login', async (req, res) => {
    let { username, password } = req.body;

    let user = await data.getUser(username);
    // console.log(user);
    // console.log(password);
    // console.log(user[0]);
    let is_match = await bcrypt.compare(password, user[0].password);
    
    if (is_match) {
        let user_data = user[0];
        // console.log(user_data);
        // console.log(user_data.username);
        req.session.username = user_data.username;
        req.session.order = 'time_posted'
        // console.log(req.session.username);
        req.session.userid = user_data.user_id;
        console.log(req.session.userid);
        res.redirect('/main');
    } else {
        res.status(400).send("username/password mismatch");
    }
});

app.post('/api/like', authMiddleware, async (req, res) => {
    let postid = req.body.post_id;
    console.log(postid);
    console.log(req.session.userid);
    await data.likePost(req.session.userid, postid);
});

app.post('/api/downvote', authMiddleware, async (req, res) => {
    let postid = req.body.post_id;
    console.log(postid);
    console.log(req.session.userid);
    await data.downVote(req.session.userid, postid);
});

app.post('/api/sort', authMiddleware, async (req, res) => {
    // console.log(req.body);
    // let order = req.body.order;
    // console.log("ORDER IS: " + order);
    if (req.session.userid) {
        // console.log("req.session exists")
        req.session.order = 'likes';
        // console.log("req.session equal to " + req.session.order);
    }

    // console.log(posts);

    res.redirect('/main');
    // console.log(sorted_posts);
    // console.log("TEST");
});

// DELETE request
app.delete('/api/posts', async (req, res) => {
    console.log(req.body);
    let post_id = req.body.post_id;
    let user_id = req.body.user_id;
    // console.log(res);
    console.log(post_id);
    console.log(user_id);
    // console.log(req.session.userid)
    if (req.session.userid === parseInt(user_id)) {
        console.log("TESTTTSET")
        await data.deletePost(user_id, post_id)
        res.send("item deleted successfully");
        // res.redirect('/main');
    } else {
        console.log("YOU CAN'T DELETE OTHERS POSTS");
    }
    // res.redirect('/main');

    // let posts = await data.getPosts(req.session.userid);
    // res.render('mainpage.pug', { posts });
});

app.use((req, res) => {
    res.status(404).render('404.pug')
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});