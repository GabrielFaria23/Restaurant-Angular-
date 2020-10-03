"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
exports.handleAuthentization = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, 'meat-api-password'); //sub: portador do token iss: quem esta emitindo o token, password para assinar o token (não compartilhaa token com cliente assim fica mais seguro)
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
    function isValid(user) {
        if (!user) {
            return false;
        }
        var dbUser = users_1.users[user.email];
        return dbUser !== undefined && dbUser.matches(user);
    }
};
