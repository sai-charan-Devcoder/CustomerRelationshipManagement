import jwt from 'jsonwebtoken';
class JwtService{
    static sign(payload,expiry='6000s',secret){
     return jwt.sign(payload,"secret",{expiresIn:expiry});
    }
    
}

export default JwtService;