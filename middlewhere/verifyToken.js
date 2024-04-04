const jwt = require('jsonwebtoken');
const secretKey = 'vikashmishra123';
const verifyToken = async(req,res,next)=>{
    const Header = req.headers    ;
    let authorization = Header.authorization;
    authorization = authorization.split(" ");

    const Token = authorization[1];
   
    jwt.verify(Token, secretKey, (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error('Token verification failed:', err.message);
           return res.json({redirectTo:'/',verify:false});
        } else {
          // Token verification successful
          //console.log('Token verification successful');
          //console.log('Decoded token payload:', decoded);
          next();
        }
      });
      

}

module.exports=verifyToken;