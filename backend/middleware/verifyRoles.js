const jwt = require('jsonwebtoken');

const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN,
            (err,decoded) => {
                if(err) return res.sendStatus(403);
    
                const userRoles = decoded.userInfo.roles;
                const authorizedRoles = [...allowedRoles];
                const result = userRoles.map(role => authorizedRoles.includes(role)).find(val => val === true);
                if(!result) return res.sendStatus(401);

                next();
            }
        )
    }
}

module.exports = verifyRoles;