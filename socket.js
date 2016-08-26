var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Pokedex = require('pokedex-promise-v2');

var P = new Pokedex();

io.on('connection', function(client) {
    console.log('A client connected');
    client.emit('messages', { hello: 'world'});
    client.on('messages', function(data){
       console.log(data);
    });
    client.on('pokemon', function(data){
      P.getPokemonByName(data) // with Promise
        .then(function(response) {
          client.emit('messages', response);
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
        });

       console.log(data);
    });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
