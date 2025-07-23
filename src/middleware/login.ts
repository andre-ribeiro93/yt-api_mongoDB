import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const login = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({message: 'No token provided!'});
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, process.env.SECRET as string); //descriptografando o token //

    req.user = decoded;
    next(); //serve para dizer que caso o token estaja validado, deve-se dar continuidade no processo.

  } catch (error) {
    return res.status(401).json({message: 'Access denied!'})
  }
}

export { login };