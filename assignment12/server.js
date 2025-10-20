const http = require('http');
const fs = require('fs');
const url = require('url');



function readPlayers() {
  return JSON.parse(fs.readFileSync('./players.json', 'utf8'));
}

function writePlayers(data) {
  fs.writeFileSync('./players.json', JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  const method = req.method;
 
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (method === 'GET' && path === '/about') {
   
    res.end(JSON.stringify({ name: 'Player API', version: '1.0.0' }));
  }

 
  else if (method === 'GET' && path === '/players') {
    const players = readPlayers();
    const nation = parsedUrl.query.nation;

    if (nation) {
      const filtered = players.filter(p => p.nation.toLowerCase() === nation.toLowerCase());
      res.end(JSON.stringify(filtered));
    } else {
      res.end(JSON.stringify(players));
    }
  }

  else if (method === 'POST' && path === '/players') {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const newPlayer = JSON.parse(body);
        if (!newPlayer.name || !newPlayer.nation) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Missing name or nation' }));
        }

        const players = readPlayers();

        for(let player of players) {
            console.log(player.name.toLowerCase(), newPlayer.name.toLowerCase());
          if (player.name.toLowerCase() === newPlayer.name.toLowerCase()) {
            res.statusCode = 400;
            return  res.end(JSON.stringify({ error: 'Player already exists' }));
          }
        }
        newPlayer.id = players.length ? players[players.length - 1].id + 1 : 1;
        players.push(newPlayer);
     
        writePlayers(players);

        res.end(JSON.stringify({ message: 'Player added' }));
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  else if (method === 'DELETE' && path.startsWith('/players/')) {
    const id = parseInt(path.split('/')[2]);
    if (isNaN(id)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'Invalid ID' }));
    }

    const players = readPlayers();
    const filtered = players.filter(p => p.id !== id);
    if (filtered.length === players.length) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Player not found' }));
    }

    writePlayers(filtered);
    res.end(JSON.stringify({ message: 'Player deleted' }));
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => console.log(`Server running at http://localhost:3000/`));
