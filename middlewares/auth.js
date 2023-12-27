const { decodeToken } = require("../utils/jwt");

exports.auth = () => {
    return async function (req, res, next) {
        let token = req.headers["authorization"];
        if (!token) {
            return next(new Error("Something went wrong"));
        }
        token = token.split(" ")[1];
        console.log(token);
        try {
            const payload = decodeToken(token);
            console.log(payload);
            res.locals.place_id = payload._doc.id;
            next();
        }catch(error){
            next(error); 
        }
        
    }
};