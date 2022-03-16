import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from '../services/certificateService';

const certificateRouter = Router();

certificateRouter.post("/certificate/create", login_required, async (req, res, next) => {
    try {
        const newCertificate = {
            user_id : req.body.user_id,
            title : req.body.title,
            description : req.body.description,
            date : req.body.date
        }

        console.log("router");

        const certificate = await certificateService.addCertificate();
        

    } catch (errer) {
        next (errer);
    }
});
certificateRouter.get("");
certificateRouter.get("");
certificateRouter.delete("");