import bcrypt from "bcrypt";
//for password encryption
const saltRounds=10;
export const hashPassword=(password)=>{
    const salt=bcrypt.genSaltSync(saltRounds);
   return bcrypt.hashSync(password,salt);
}
export const comparePassword=(plain,hashed)=>{
    return bcrypt.compareSync(plain,hashed);
}