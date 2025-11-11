import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { BaseController } from "../domain/BaseController";
import { MSG } from "../config/messages/Auth/auth";
import { AuthValidator } from "../config/validators/Auth.validator";


export class AuthController extends BaseController {
    constructor() {
        super();
        this.registerRoutes();
    }
    private authService: AuthService = new AuthService();

    protected registerRoutes(): void {
        this.router.post('/signup', this.signup.bind(this));
        this.router.post('/:productId', AuthValidator.signup(), this.signup.bind(this));
    }

    public signup = async (req: Request, res: Response): Promise<Response> => {
        console.log({ info: " Controller called." });
        if(req.params?.storeId) {
            console.log("storeId", req.params.storeId);
        }
        if(req.params?.productId) {
            console.log("productId", req.params.productId);
        }
        const [err, response] = await to(new Promise((resolve, reject) => reject(new Error('summa'))));
        console.log('err: ', err);
        if(err) {
            return ReE(res, Object.assign(MSG.SIGNUP_FAILED, {error: err.message}), 500);
        }
        return ReS(res, Object.assign(MSG.SIGNUP_SUCCESS, {data: []}), 200);
    }
}