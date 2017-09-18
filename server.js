var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cors = require('cors');

var app = express();

// view engine setup
console.log("dir name is " + __dirname);

//app.set('views', path.join(__dirname, './client/build/'));
//app.set('view engine', 'jade');
//app.use('/static', express.static(path.join(__dirname, './client/build/static/')));
app.use('/', express.static(path.join(__dirname, './client/build')));


var users = [];


var arr = [`There is another sky,\r\n
Ever serene and fair,\r\n
And there is another sunshine,\r\n
Though it be darkness there;
Never mind faded forests, Austin,
Never mind silent fields -
Here is a little forest,
Whose leaf is ever green;
Here is a brighter garden,
Where not a frost has been;
In its unfading flowers
I hear the bright bee hum:
Prithee, my brother,
Into my garden come!
`, 
`I can write no stately proem
As a prelude to my lay;
From a poet to a poem
I would dare to say.

For if of these fallen petals
One to you seem fair,
Love will waft it till it settles
On your hair.

And when wind and winter harden
All the loveless land,
It will whisper of the garden,
You will understand.
`, 
`For books are more than books, 
they are the life, the very heart and core of ages past, 
the reason why men worked and died, the essence and quintessence of their lives
`];



app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*:*');

    next();
});

app.get('/*', function(req, res, next) {

  res.sendFile("index.html", { root:path.join(__dirname, './client/build/')});

});


function getRandomLetter(arr) {
    var len = arr.length;
    var random = Math.floor(Math.random() * len);
    console.log("random is " + random);
    return arr[random];
}

app.post('/newletter', function(req, res) {
	console.log(req.body);
	arr.push(req.body["letter"])
	console.log(arr.length);
	return res.json({
		status: "succeed"
	});
})

app.get('/randomletter', function(req, res) {

	var letter = getRandomLetter(arr);

	console.log(typeof(letter));

	return res.json({
		let: letter 
	});
})

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('origins', '*:*');

server.listen(3000, () => {
    console.log("server started on port 3000");
});

// var server = app.listen(3000, function() {
//     console.log("server started on port 3000");
// })



// io.on('connection', (socket) => {
//     console.log('A user just joined on', socket.id);
// });



io.on('connection', (socket) => {
	console.log('a user connected', socket.id);

	//new user login
    socket.on('login', (nickname) => {
        console.log("nickname is " + nickname);
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
        };
    });
    //user leaves
    socket.on('disconnect', () => {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });
    //new message get
    socket.on('postMessege', (msg) => {
      console.log("received msg: " + msg);
      console.log("socket is " + socket.nickname);
      //socket.broadcast.emit('newMessege', socket.nickname, msg);
      io.sockets.emit('newMessege', socket.nickname, msg);
    });


})


module.exports = app;

