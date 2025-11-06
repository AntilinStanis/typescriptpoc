import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ER, SR } from "../utils/response";


export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    };

    public signup = async (req: Request, res: Response): Promise<Response> => {
        console.log({ info: " Controller called." });
        try {
            const { role, name, email, password } = req.body;
            const message = await this.authService.signup(role, name, email, password);
            return SR(res, { doctor: message }, 200);
        } catch (error: any) {
            return ER(res, { code: "hello", statusCode: 200, message: error?.message, details: "hello", instance: "helo" });
        };
    }
}