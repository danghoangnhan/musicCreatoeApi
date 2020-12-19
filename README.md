# musicCreatoeApi
db table{
<<<<<<< Updated upstream
    user(userId, userName, passWord)
    playlist(listId, userId, playListName)
    song(songId, listId, songName, tuneSet, duration, playCount, playTime, createTime, path)
    tune(tuneId, tuneName, path)
    playlist.userId = user.userId
    song.listId = playlist.listId
=======
    User(id, username, password, accesstoken, list)
    List(id, listname, song)
    Tune(id, tunename, path)
    Song(id, songname, path, tuneset, playcount, playtime, createtime)
    list = List.id
    song = Song.id
>>>>>>> Stashed changes
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

postman
request body
{
    "account": "userrr3",
    "password": "123456"
}