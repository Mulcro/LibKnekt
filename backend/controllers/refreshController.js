const jwt = require('jsonwebtoken');
const User = require('../model/User');

//Had to store refresh token in body because I couldn't get cookies to send through the browser
const handleRefresh = async (req,res) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401)

    const token = authHeader.split(' ');
    if(token.length !== 2) return res.sendStatus(401);
    if(token[0] !== 'Bearer') return res.sendStatus(401);;

    const refreshToken = token[1];
    const foundUser = await User.findOne({refreshToken: refreshToken}).populate('books').exec();
    
    if(!foundUser) return res.sendStatus(404);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err,decoded) => {
            const roles = Object.values(foundUser.roles);
            if(err || decoded.username !== foundUser.username) return res.sendStatus(403);
            
            const accessToken = jwt.sign({
                "userInfo":{
                    "username": decoded.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN,
            {expiresIn: "300s"});

            return res.json({"accessToken":accessToken,"user":foundUser.username,"books":foundUser.books,"roles":foundUser.roles});
        }
    );
}

module.exports = {handleRefresh};