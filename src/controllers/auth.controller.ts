import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ER, SR } from "../utils/response";
import { BaseController } from "../domain/BaseController";


export class AuthController extends BaseController {
    constructor() {
        super();
        this.registerRoutes();
    }
    private authService: AuthService = new AuthService();

    protected registerRoutes(): void {
        this.router.post('/signup', this.signup.bind(this));
    }

    public signup = async (req: Request, res: Response): Promise<Response> => {
        console.log({ info: " Controller called." });
        try {
            // const { role, name, email, password } = req.body;
            // const message = await this.authService.signup(role, name, email, password);
            return SR(res, { doctor: 'message' }, 200);
        } catch (error: any) {
            return ER(res, { code: "hello", statusCode: 200, message: error?.message, details: "hello", instance: "helo" });
        };
    }
}