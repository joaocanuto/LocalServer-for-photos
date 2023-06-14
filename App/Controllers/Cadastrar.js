const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');

async function Cadastrar(body){
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../Database/db.json'), 'utf8'));
    const user = users.find(user => user.phone === body.phone);
    if(user){
        return { erro: 'Usuário já cadastrado.' };
    }
    console.log(body)
    users.push(body);
    fs.writeFileSync(path.resolve(__dirname, '../Database/db.json'), JSON.stringify(users));
    return { ok: true };
}

module.exports = Cadastrar;