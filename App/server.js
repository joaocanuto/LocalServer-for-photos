const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Verifica se a pasta "uploads" existe e a cria, se necessário
const uploadsFolderPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsFolderPath)) {
  fs.mkdirSync(uploadsFolderPath);
}

// Configuração do Multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Rota para servir a página inicial
app.get('/', (req, res) => {
if (!fs.existsSync(uploadsFolderPath)) {
    fs.mkdirSync(uploadsFolderPath);
    console.log("Hello")
    }
    console.log("Hello2")
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para processar o formulário e os arquivos enviados
app.post('/upload', upload.array('photos', 1000), (req, res) => {
  const { name } = req.body;
  const files = req.files;

  // Cria a pasta com o nome do cliente se não existir
  const clientFolderPath = path.join(uploadsFolderPath, name);
  if (!fs.existsSync(clientFolderPath)) {
    fs.mkdirSync(clientFolderPath);
  }

  // Move os arquivos para a pasta do cliente
  files.forEach(file => {
    const filePath = path.join(clientFolderPath, file.filename);
    fs.renameSync(file.path, filePath);
  });

  res.send('Pedido recebido e fotos enviadas com sucesso!');
});

// Configuração para servir os arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static('uploads'));

// Inicie o servidor na porta 3000 (você pode alterar a porta se necessário)
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
