const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// CONTROLLERS.
const Logar = require('./Controllers/Logar');
// const Logado = require('./Controllers/Logado');
// const Logout = require('./Controllers/Logout');
const Cadastrar = require('./Controllers/Cadastrar');

// APP 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/Pages', express.static(__dirname + '/Pages'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// DATABASE


// PAGES
app.get('/', (req, res) => {
  if (req.cookies.Token) {
    return res.redirect('/upload');
  }
  res.sendFile(__dirname + '/views/login.html')
});
app.get('/cadastro', (req, res) => res.sendFile(__dirname + '/views/cadastro.html'));

// Only Logged Users
app.get('/upload', (req, res) => res.sendFile(__dirname + '/views/upload.html'));

// ROUTES.

app.post('/api/logar', async (req, res) =>{
  res.send(await Logar(req.body,res));
});

app.get('/api/deslogar', async (req, res) => {
  res.send(await Deslogar());
});

app.post('/api/cadastrar', async (req, res) => {
  res.send(await Cadastrar(req.body));
});

// Inicie o servidor na porta 3000 (você pode alterar a porta se necessário)
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
