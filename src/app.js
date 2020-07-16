require('dotenv').config()
let express = require('express')
let request = require('request')
let querystring = require('querystring')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

let app = express()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = process.env.REDIRECT_URI

console.log(process.env);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: 'user-read-private user-read-email user-read-playback-state user-top-read playlist-modify-public',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(
        client_id + ':' + client_secret
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    const access_token = body.access_token
    const refresh_token = body.refresh_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:8888'
    res.cookie('JWT_access_token', `${access_token}`, {
      maxAge: 3600000,
      httpOnly: true
      });
    res.cookie('JWT_refresh_token', `${refresh_token}`, {
      maxAge: 604800000,
      httpOnly: true
      });
    res.redirect(uri + '?access_token=' + access_token + '&refresh_token=' + refresh_token)
  })
})


app.get('/refresh_token', function(req, res) {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.json({
        'access_token': access_token
      });
    }
  });
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;
