# musicCreatoeApi
db table{
    User(id, username, password, accesstoken, list)
    List(id, listname, song)
    Tune(id, tunename, path)
    Song(id, songname, tuneset, playcount, playtime)
    list = List.id
    song = Song.id
}