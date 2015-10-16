var _players = [];

$("#addPlayer").on("click", function () {
  var playerName = $("#playerName").val();
  var playerPosition = $("#playerPosition").val();
  var playerNumber = $("#playerNumber").val();
  _players.push(createPlayer(playerName, playerPosition, playerNumber))
  $(".player-roster").append('<div class="player-card">' +
    '<div>' +
    '<img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" />' +
    '</div>' +
    '<div>' +
    '<span>' + playerName + '</span>' +
    '</div>' +
    '<div>' +
    '<span>' + playerPosition + '</span>' +
    '</div>' +
    '<div>' +
    '<span>' + playerNumber + '</span>' +
    '</div>' +
    '</div>')
});

function createPlayer(name, position, num) {
  this.name = name;
  this.position = position;
  this.number = num;
}

/*$("#addPlayer").on("click", function(){
  alert("you clicked add");
});*/

var playerService = function () {

  return {
    loadPlayers: function () {
      var url = "http://bcw-getter.herokuapp.com/?url=";
      var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(url2);
      $.getJSON(apiUrl, function (response) {
        _players = response.body.players;
        console.log(response);
      })
    },
    getPlayers: function () {
      return _players.slice();
    },
    getPlayersByTeam: function (team) {
      var requestedTeam = _players.filter(function (player) {
        return player.pro_team === team;
      })
      return requestedTeam;
    },
    getPlayersByName: function (name) {
      var theName = _players.filter(function (player){
        return player.fullname === name;
      })
      return theName;
      }
    }
  }
var ps = playerService();