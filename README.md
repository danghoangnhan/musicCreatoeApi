# musicCreatoeApi
db table{
    user(userId, userName, passWord)
    playlist(listId, userId, playListName)
    song(songId, listId, songName, tuneSet, playCount, playTime, createTime, path)
    tune(tuneId, tuneName, path)
    playlist.userId = user.userId
    song.listId = playlist.listId
}

Mysql
rename attribute: ALTER TABLE user CHANGE password passWord varchar(50);
delete attribute: ALTER TABLE user DROP access_token;
add attribute: ALTER TABLE Customers
               ADD Email varchar(255);
delete: DELETE FROM customers WHERE Name='alex';

CREATE TABLE customers (
    C_Id INT AUTO_INCREMENT,
    Name varchar(50),
    Address varchar(255),
    Phone varchar(20),
    PRIMARY KEY (C_Id)
);

virtual machine
T02FT
VgaK?3464

ip: 140.136.151.130:80

(figma) design UI tool

POSTMAN <POST localhost:3000/register> <Body> <raw>
register: if had register
{
    "account": "user1",
    "password": "123456"
}
register: if new register
{
    "account": "user11",
    "password": "123456"
}
change id data type from int to int NOT NULL AUTO_INCREMENT{
    alter table user MODIFY column userId int NOT NULL AUTO_INCREMENT;
}
login: <POST localhost:3000/login> <Params>{
    key: value
    v username: user1
    v password: 123456
}
history
{
    "userid": 1
}
lastadd
{
    "userid": 1
}
mostplay
{
    "userid": 1
}

song(songId, listId, songName, tuneSet, duration(int), playCount(int), playTime, createTime, path)
createSong
{
    "listid": 1,
    "songname": "star",
    "tuneset": "[1,2,3]",
    "duration": 300,
    "playcount": 0,
    "path": "140.136.151.130:80/music/song/songName.mid"
}
playlist(listId, userId, playListName)
createPlaylist
{
    "userid": 22,
    "playlistname": "all star"
}
deleteSong
{
    "songid": 24
}
deletePlaylist
{
    "listid": 11
}
play
{
    "songid": 23
}
getSong
{
    "userid": 1
}
getPlaylist
{
    "userid": 4
}
getPlaylistSong
{
    "userid": 1,
    "listid": 1
}
.env file{
    DB_HOST="140.136.151.130"
    DB_USER="root"
    DB_PASS="dpproject"
    DB_NAME="dbProject"
    DB_PORT="3306"
    PORT=3000
}

extention{
    forget password
}