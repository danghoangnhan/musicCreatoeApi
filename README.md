# musicCreatoeApi
db table{
    user(userId, userName, passWord)
    playlist(listId, userId, playListName)
    song(songId, listId, songName, playCount, playTime, createTime, path)
    tune(tuneId, tuneName, path)
    playlist.userId = user.userId
    song.listId = playlist.listId
}

db table{
    user(userId, userName, passWord)
    playlist(listId, userId, playListName)
    song(songId, listId, songName, path)
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
insert: INSERT INTO table_name (column1, column2, column3...)
        VALUES (value1, value2, value3...);

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

src/main/java/com/naman14/timber/Service/JsonApi.java
src/main/java/com/naman14/timber/models/authentication.java
src/main/java/com/naman14/timber/fragments/PlaylistFragment.java
src/main/java/com/naman14/timber/models/Playlist.java
src/main/res/layout/activity_tmp.xml
src/main/java/com/naman14/timber/activities/TmpActivity.java
src/main/java/com/naman14/timber/activities/LoginActivity.java


/Users/andytseng/GitHub/databaseFinaleProject/app/src/main/java/com/naman14/timber/activities/HistoryActivity.java



manifests AndroidManifest.xml{
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.naman14.timber">

    <uses-sdk tools:overrideLibrary="de.Maxr1998.trackselectorlib" />

    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.BROADCAST_STICKY" />
    <uses-permission android:name="com.android.vending.BILLING" />

    <application
        android:name=".TimberApp"
        android:allowBackup="false"
        android:icon="@drawable/login_image"
        android:label="Timber"
        android:networkSecurityConfig="@xml/network_security"
        android:theme="@style/AppTheme.FullScreen.Light"
        tools:replace="android:allowBackup, android:label"
        tools:targetApi="n">
        <activity android:name=".activities.TmpActivity"></activity>
        <activity android:name=".activities.MostPlayActivity" />
        <activity android:name=".activities.LastAddActivity" />
        <activity android:name=".activities.HistoryActivity" />

        <activity
            android:name=".activities.LoginActivity"
            android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".activities.RegisterActivity" />
        <activity
            android:name=".activities.MainActivity"
            android:label="Music Creator"
            android:screenOrientation="portrait">
            <intent-filter>
                <category android:name="android.intent.category.CATEGORY_APP_MUSIC" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />

                <data android:scheme="file" />
                <data android:mimeType="audio/*" />
                <data android:mimeType="application/ogg" />
                <data android:mimeType="application/x-ogg" />
                <data android:mimeType="application/itunes" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data android:scheme="http" />
                <data android:mimeType="audio/*" />
                <data android:mimeType="application/ogg" />
                <data android:mimeType="application/x-ogg" />
                <data android:mimeType="application/itunes" />
            </intent-filter>
            <intent-filter android:priority="-1">
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data android:scheme="content" />
                <data android:mimeType="audio/*" />
                <data android:mimeType="application/ogg" />
                <data android:mimeType="application/x-ogg" />
                <data android:mimeType="application/itunes" />
            </intent-filter>
        </activity>
        <activity
            android:name=".activities.SettingsActivity"
            android:theme="@style/AppThemeNormalLight" />
        <activity
            android:name=".activities.PlaylistDetailActivity"
            android:theme="@style/AppTheme.FullScreen.Light" />
        <activity
            android:name=".activities.SearchActivity"
            android:theme="@style/AppThemeNormalLight" />
        <activity
            android:name=".activities.NowPlayingActivity"
            android:theme="@style/AppTheme.FullScreen.Light" />
        <activity android:name=".activities.DonateActivity" />
        <activity
            android:name=".cast.ExpandedControlsActivity"
            android:label="@string/app_name"
            android:screenOrientation="portrait"
            android:theme="@style/AppTheme.ExpandedCastController" />

        <receiver android:name=".helpers.MediaButtonIntentReceiver">
            <intent-filter>
                <action android:name="android.intent.action.MEDIA_BUTTON" />
                <action android:name="android.media.AUDIO_BECOMING_NOISY" />
            </intent-filter>
        </receiver> <!-- Music service -->
        <service
            android:name=".MusicService"
            android:label="@string/app_name"
            android:process=":main" />
        <service
            android:name=".WearBrowserService"
            android:exported="true">
            <intent-filter>
                <action android:name="android.media.browse.MediaBrowserService" />
            </intent-filter>
        </service>

        <meta-data
            android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
            android:value="com.naman14.timber.cast.CastOptionsProvider" />

        <receiver
            android:name=".widgets.desktop.StandardWidget"
            android:label="@string/widget_standard">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
                <action android:name="com.naman14.timber.metachanged" />
                <action android:name="com.naman14.timber.playstatechanged" />
            </intent-filter>

            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/widget_standard" />
        </receiver>
        <receiver
            android:name=".widgets.desktop.WhiteWidget"
            android:label="@string/widget_white">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
                <action android:name="com.naman14.timber.metachanged" />
                <action android:name="com.naman14.timber.playstatechanged" />
            </intent-filter>

            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/widget_white" />
        </receiver>
        <receiver
            android:name=".widgets.desktop.SmallWidget"
            android:label="@string/widget_small">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
                <action android:name="com.naman14.timber.metachanged" />
                <action android:name="com.naman14.timber.playstatechanged" />
            </intent-filter>

            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/widget_small" />
        </receiver>
    </application>

</manifest>
}

LoginActivity{
package com.naman14.timber.activities;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.naman14.timber.R;
import com.naman14.timber.Service.JsonApi;
import com.naman14.timber.models.authentication;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class LoginActivity extends AppCompatActivity {
    private static authentication userBio;
    private String TAG = LoginActivity.class.getSimpleName();
    private EditText ename;
    private EditText epassword;
    private Button elogin, eregister;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        addControl();
        addEvent();
    }

    private void addControl() {
        ename = findViewById(R.id.editTextTextPersonName);
        epassword = findViewById(R.id.editTextTextPersonName2);
        elogin = findViewById(R.id.button);
        eregister = findViewById(R.id.button3);

    }
    private void addEvent() {

        eregister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // direct to register activity
                // Intent: jump screen type // (LoginActivity.this, (jump to) RegisterActivity.class)
                // direct to tmp activity
                Intent toRegister = new Intent(LoginActivity.this, TmpActivity.class);
                startActivity(toRegister);
                finish();
            }
        });


        elogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try {
                    if (epassword == null && ename == null)
                        return;

                    elogin.setEnabled(true);

                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://140.136.151.130/")
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    JsonApi Jsonapi = retrofit.create(JsonApi.class);
                    Call<authentication> placeHolderApis = Jsonapi.login(ename.getText().toString(), epassword.getText().toString());
                    placeHolderApis.enqueue(new Callback<authentication>() {
                        @Override
                        public void onResponse(@NonNull Call<authentication> call, @NonNull Response<authentication> response) {
                            if (response.isSuccessful()) {//issuccessful() = status(200)

                                Toast toast=Toast.makeText(LoginActivity.this,"welcome "+ename.getText().toString(),Toast.LENGTH_SHORT);
                                toast.show();
                                userBio = response.body();
                                Intent i = new Intent(getApplicationContext(), MainActivity.class);
                                startActivity(i);
                                finish();
                            }
                        }
                        @Override
                        public void onFailure(@NonNull Call<authentication> call, @NonNull Throwable t) {
                            Toast toast=Toast.makeText(LoginActivity.this,t.getMessage(),Toast.LENGTH_SHORT);
                            toast.show();
                            t.printStackTrace();
                        }
                    });

                }
                catch (Exception e){
                    Toast toast=Toast.makeText(LoginActivity.this,e.toString(),Toast.LENGTH_SHORT);
                    toast.show();
                }
                setResult(Activity.RESULT_OK);
            }
        });}
        public static authentication getUser(){
        return  userBio;
        }

}


}

RegisterActivity{
package com.naman14.timber.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.naman14.timber.R;
import com.naman14.timber.Service.JsonApi;
import com.naman14.timber.models.authentication;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegisterActivity extends AppCompatActivity {
    private String TAG = LoginActivity.class.getSimpleName();
    private EditText    rname;
    private EditText    rpassword;
    private EditText    checkpassword;
    private Button      rregister;

    String txt_rpassword;
    String txt_checkpassword;
    String txt_username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        addControl();
        onclick();
    }
    private void addControl() {
        rname = findViewById(R.id.editTextTextPersonName3);
        rpassword = findViewById(R.id.editTextTextPersonName4);
        rregister = findViewById(R.id.button2);
        checkpassword=findViewById(R.id.editTextTextPersonName5);
    }
    private void onclick(){
        rregister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                txt_rpassword = rpassword.getText().toString();// from textbox id get string
                txt_checkpassword = checkpassword.getText().toString();// from textbox id get string
                txt_username = rname.getText().toString();// from textbox id get string
                try {
                    if(validate()==false){
                        Toast toast=Toast.makeText(RegisterActivity.this,"the password is doesn't match",Toast.LENGTH_SHORT);
                        toast.show();
                        return;
                    }
                    // create json object / JSONObject is java inbuild / JsonParser, JsonObject is gson
                    Map<String, String> build = new HashMap<>();
                    build.put("account", txt_username);
                    build.put("password", txt_rpassword);
                    JSONObject RegisterJson = new JSONObject(build);
                    JsonParser jsonParser = new JsonParser();
                    JsonObject ToJson = (JsonObject) jsonParser.parse(RegisterJson.toString());
                    //System.out.println(ToJson);

                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://140.136.151.130/")
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();
                    JsonApi Jsonapi = retrofit.create(JsonApi.class);
                    Call<authentication> placeHolderApis = Jsonapi.register(ToJson);// JsonApi.java register_body
                    placeHolderApis.enqueue(new Callback<authentication>() {
                        @Override
                        public void onResponse(@NonNull Call<authentication> call, @NonNull Response<authentication> response) {
                            Toast toast=Toast.makeText(RegisterActivity.this,response.message().toString(),Toast.LENGTH_SHORT);
                            toast.show();
                            if (response.isSuccessful()) {

                                Intent i = new Intent(getApplicationContext(), LoginActivity.class);
                                startActivity(i);
                                finish();
                            }
                        }
                        @Override
                        public void onFailure(@NonNull Call<authentication> call, @NonNull Throwable t) {
                            Toast toast=Toast.makeText(RegisterActivity.this,"login failed",Toast.LENGTH_SHORT);
                            toast.show();
                            t.printStackTrace();
                        }
                    });
                }
                catch (Exception e){
                    Toast toast=Toast.makeText(RegisterActivity.this,e.toString(),Toast.LENGTH_SHORT);
                    toast.show();
                }
                setResult(Activity.RESULT_OK);
            }
        });}
        public boolean validate(){
        return txt_rpassword.equals(txt_checkpassword);
    }

}

}

TmpActivity{
package com.naman14.timber.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.naman14.timber.R;
import com.naman14.timber.Service.JsonApi;
import com.naman14.timber.models.Playlist;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class TmpActivity extends AppCompatActivity {

    List<Playlist> OUTPUT = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tmp);

        GetPlatList();
    }

    public void GetPlatList()
    {
        JSONObject build = new JSONObject();
        try {
            build.put("userid", 4);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        JsonParser jsonParser = new JsonParser();
        JsonObject ToJsonID = (JsonObject) jsonParser.parse(build.toString());
        System.out.println(ToJsonID);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://140.136.151.130:80/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        JsonApi Jsonapi = retrofit.create(JsonApi.class);

        Call<List<Playlist>> placeHolderApis = Jsonapi.getPlaylist( ToJsonID );
        placeHolderApis.enqueue(new Callback<List<Playlist>>() {
            @Override
            public void onResponse(Call<List<Playlist>> call, Response<List<Playlist>> response) {
                if(response.isSuccessful())System.out.println("PlayList Post OK!");
                for(Playlist pl : response.body())
                    OUTPUT.add(pl);
                for(Playlist playlist : OUTPUT)
                    System.out.println("NOW List have : " + playlist.getPlaylistName());
            }

            @Override
            public void onFailure(Call<List<Playlist>> call, Throwable t) {
                System.out.println("PlayList Failed : " + t.toString());
            }
        });

    }
}

}

JsonApi{
package com.naman14.timber.Service;
import com.google.gson.JsonObject;
import com.naman14.timber.models.Playlist;
import com.naman14.timber.models.Song;
import com.naman14.timber.models.authentication;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface JsonApi {
    @POST("login")
    Call<authentication> login(@Query("username") String username, @Query("password") String password);
    @POST("register")
    Call<authentication> register(@Body JsonObject register_body);
    @GET("getSongByPlayListId")
    Call<Song> getSongByPlayListId(@Query("Id") int id);
    @POST("getPlaylist")
    Call<List<Playlist>> getPlaylist(@Body JsonObject getPlaylist_body);
}

}

modle .java / constructor / getter and setter
history{
public class history {
    @SerializedName("songId")
    private Integer songId;
    @SerializedName("songName")
    private String songName;
    @SerializedName("duration")
    private Integer duration;
    @SerializedName("path")
    private String path;
    @SerializedName("tuneSet")
    private String tuneSet;
    @SerializedName("playCount")
    private Integer playCount;
    @SerializedName("listId")
    private Integer listId;
    @SerializedName("playTime")
    private String playTime;
    @SerializedName("createTime")
    private String createTime;
    @SerializedName("PlayListName")
    private String PlayListName;
    @SerializedName("userId")
    private Integer userId;
}

modle
Playlist{
/*
 * Copyright (C) 2015 Naman Dwivedi
 *
 * Licensed under the GNU General Public License v3
 *
 * This is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 */

package com.naman14.timber.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Playlist {
    @SerializedName("listId")
    @Expose
    public final Integer listId;

    @SerializedName("playListName")
    @Expose
    public final String playlistName;

    @SerializedName("userId")
    @Expose
    public final Integer userId;


    public int songCount;

//    public Playlist() {
//        this. listId= -1;
//        this.playlistName = "";
//        this.userId = -1;
//    }

    public Playlist(int _id, String  playlistName,int userId) {
        this.listId = _id;
        this.playlistName = playlistName;
        this.userId=userId;

    }

    public int getListId() {
        return listId;
    }

    public String getPlaylistName() {
        return playlistName;
    }

    public long getUserId() {
        return userId;
    }
}
}