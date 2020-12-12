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

error
(node:4748) UnhandledPromiseRejectionWarning: ReferenceError: results is not defined

(Use `node --trace-warnings ...` to show where the warning was created)

(node:4748) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block,
or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)

(node:4748) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

Error: ER_NO_DEFAULT_FOR_FIELD: Field 'access_token' doesn't have a default value

code: 'ER_NO_DEFAULT_FOR_FIELD',
errno: 1364,
sqlMessage: "Field 'access_token' doesn't have a default value",
sqlState: 'HY000',
index: 0,
sql: 'INSERT INTO User(username, password)       VALUES ("user1", "123456")'
