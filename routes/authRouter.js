import { Router } from "express";
import { loginAction, logoutAction, refreshTokenAction, registerAction, revalidarToken } from "../controllers/authController.js";
import { bodyLoginValidator, bodyRegisterValidator, requireRefreshToken, validarTokenOnHeader } from "../middlewares/index.js";

const authRouter = Router();

// Ruta de registro
authRouter.post("/register", [bodyRegisterValidator], registerAction);

// Ruta de login
authRouter.post("/login", [bodyLoginValidator], loginAction);

// Construir un nuevo Token
authRouter.get("/refresh", [requireRefreshToken], refreshTokenAction);
 
authRouter.get('/renew', [ validarTokenOnHeader ] , revalidarToken );

// Remover las cookies
authRouter.get("/logout", logoutAction);

export { authRouter };
