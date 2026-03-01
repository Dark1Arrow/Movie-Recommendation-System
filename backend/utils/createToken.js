 import jwt from "jsonwebtoken";

 const genrateToken = (res,userId) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "30D"
    })

    //set jwt as an HTTP-ONLY cookie

    res.cookie("jwt",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV != "developent",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token
 }

 export default genrateToken;