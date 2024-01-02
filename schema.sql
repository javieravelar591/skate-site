CREATE TABLE user (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_id INT AUTO_INCREMENT,
    PRIMARY KEY (user_id) 
);

CREATE TABLE posts (
    post_message VARCHAR(255) NOT NULL,
    post_id INT AUTO_INCREMENT,
    user_id INT,
    likes INT DEFAULT 0,
    time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);