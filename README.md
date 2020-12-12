# musicCreatoeApi
db table{
    User(id, username, password, accesstoken, list)
    List(id, listname, song)
    Tune(id, tunename, path)
    Song(id, songname, tuneset, playcount, playtime, createtime)
    list = List.id
    song = Song.id
}

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

postman
request body
{
    "account": "userrr3",
    "password": "123456"
}