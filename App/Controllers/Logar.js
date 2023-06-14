const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

async function Logar(body,res) {
    const phone = body.phone;

    //Verifica o telefone
    if (!phone) {
        return { erro: 'Telefone não informado.' };
    }

    //Busca o telefone no arquivo de usuários dentro de Database/db.json
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../Database/db.json'), 'utf8'));
    const user = users.find(user => user.phone === phone);
    
    //Verifica se o usuário existe
    if (!user) {
        res.sendStatus(401);
        return { erro: 'Usuário não cadastrado.' };
    }
    // Gera o token
    Token = await jwt.sign({
        phone: user.phone,
        name: user.name,
    }, 'SenhaParaProtetorDeRotas');

    res.cookie('Token', Token);
    res.sendStatus(200);
}

module.exports = Logar;