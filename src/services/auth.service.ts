import { TE } from "../utils/response";

export class AuthService {

    public async signup(role: string, name: string, email: string, password: string) {
        let user;
        switch (role.toLowerCase()) {
            // case "admin":
            //     user = new AdminUser(name, email, password);
            //     await this.adminRepo.create({ name, email, password });
            //     break;
            // case "merchant":
            //     user = new MerchantUser(name, email, password);
            //     await this.merchantRepo.create({ name, email, password });
            //     break;
            // case "partner":
            //     user = new PartnerUser(name, email, password);
            //     await this.partnerRepo.create({ name, email, password });
            //     break;
            // default:
            //     throw new Error("Invalid role");
        }

        // return user.signup();
    }
}
