import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { BaseController } from "../domain/BaseController";
import { MSG } from "../config/messages/Auth/auth";


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
        const [err, response] = await to(new Promise((resolve, reject) => reject('solla mudiyathu')));
        if(err) {
            return ReE(res, Object.assign(MSG.SIGNUP_FAILED, {error: 'error'}), 500);
        }
        return ReS(res, Object.assign(MSG.SIGNUP_SUCCESS, {data: []}), 200);
    }
}