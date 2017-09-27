var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://user:user@ds149724.mlab.com:49724/letter');

var app = express();

// view engine setup
console.log("dir name is " + __dirname);

//app.set('views', path.join(__dirname, './client/build/'));
//app.set('view engine', 'jade');
//app.use('/static', express.static(path.join(__dirname, './client/build/static/')));

app.use('/', express.static(path.join(__dirname, 'client/build')));


const dir = path.join(__dirname, 'client/build');

app.use(express.static(dir));


//for socket io use
var users = [];


const LetterSchema = mongoose.Schema({
    id: Number,
    letter: String
});
const LetterModel = mongoose.model('LetterModel', LetterSchema); 



function getRandomLetter() {
    
    return new Promise((resolve, reject) => {

        LetterModel.count({}, function(err, num) {
            if (err) {
                console.log("Fail to count in get...");
            }
            else {
                var rand = Math.floor(Math.random() * num);
                console.log("random id is ..." + rand);

                LetterModel.findOne().skip(rand).exec(function(err, obj) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("obj is ..." + obj);
                        resolve(obj);
                    }
                });
            }
            
        });
    });
}


function postNewLetter(newletter) {

    return new Promise((resolve, reject) => {
        
        
        console.log("type of newletter is ..." + typeof(newletter));

        LetterModel.count({}, function(err, num) {

            console.log("id is ....." + (num + 1));

            var mongoLetter = new LetterModel({id: num + 1, letter: newletter});
            mongoLetter.save(function(err, num) {
                if (err) {
                    console.log("Fail to save....");
                }
                else {
                    resolve(mongoLetter);
                }
                
            });
        });
        
    });
}



app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*:*');

    next();
});







// app.get('/*', function(req, res, next) {
//   res.sendFile("index.html", { root:path.join(__dirname, './client/build/')});
// });


// app.post("/newletter", function(req, res) {
// 	//console.log("request body is " + req.body);
//     console.log("letter is " + req.body["letter"]);
// 	arr.push(req.body["letter"])
// 	console.log("array length is " + arr.length);
//     console.log("in post new letter");
// 	return res.json({
// 		status: "succeed"
// 	});
// })


app.post("/newletter", function(req, res) {
    console.log("the letter to post is ...." + req.body["letter"]);
    postNewLetter(req.body["letter"]);
    // .then(function(letter) {
        //res.json(letter);
        return res.json({
            status: "succeed"
        })
    //}
    // , function(error) {
    //     res.status(400).send('Fail to post');
    // });
})



// app.get("/randomletter", function(req, res) {

//     console.log("get here???");
	
//     var arr = [
//     {
//         'author': 'Jane Austin',
//         'content': 'pride and prejudice'
//     },
//     {
//         'author': 'Matt Demon',
//         'content': 'good will hunting'
//     }];
//     res.json(arr[0]);
// })


app.get("/randomletter", function(req, res) {

    getRandomLetter().then(obj => res.json(obj));
})



var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.set('origins', '*:*');

server.listen(3000, () => {
    console.log("server started on port 3000");
});


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

