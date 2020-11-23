# musicCreatoeApi
complete db table{
    User(id, username, password, accesstoken, list)
    List(id, song)
    Tune(id, tunename, path)
    Song(id, songname, tuneset, playcount, playtime)
    Playlist(id, playlistname, song)
    list = List.id
    song = Song.id
}

current db table{
    User(id, username, password, accesstoken, list)
    List(id, song)
    Tune(id, tunename, path)
    Song(id, songname, tuneset, playcount, playtime)
    list = List.id
    song = Song.id
}