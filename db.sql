-- Active: 1673856812674@@pijardb-do-user-13063919-0.b.db.ondigitalocean.com@25060@telechat@public
CREATE TABLE users (
    id varchar NOT NULL,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    bio VARCHAR NOT NULL,
    number BIGINT

);

CREATE Table chat(
    id SERIAL PRIMARY KEY NOT NULL,
    receiver_id VARCHAR ,
    sender_id VARCHAR,
    message varchar,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT chats.id, chats.message, userSender.username AS sender, userReceiver.username AS receiver
        FROM chats
        LEFT JOIN users AS userSender ON chats.sender_id=userSender.id
        LEFT JOIN users AS userReceiver ON chats.receiver_id=userReceiver.id
        WHERE
        (sender_id=${sender} AND receiver_id=${receiver})
        OR (sender_id=${receiver} AND receiver_id=${sender});