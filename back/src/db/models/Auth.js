import { AuthModel } from "../schemas/auth";
import { EXPIRE_CODE_TIME } from "../../constant";

class Auth {
    static create = async ({ email, code }) => {
        const auth = await AuthModel.create({
            email,
            code,
            expiredAt : Date.now() + EXPIRE_CODE_TIME
        });
        return auth;
    }

    static findAuth = async ({ email }) => {

        const auth = await AuthModel.findOne({ email });
        return auth;
    }

    static deleteAuth = async ({ email }) => {
        const auth = await AuthModel.deleteMany({ email });
        if (auth.deletedCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }

}

export { Auth };
