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

        const certificate = await certificateService.addCertificate({ newCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);


    } catch (errer) {
        next (errer);
    }
});

certificateRouter.get("/certificatelist/:user_id", login_required, async (req, res, next) => {
    try {

        const getCertificates = {
            user_id : req.params.user_id
        }

        const certificate = await certificateService.getCertificates({ getCertificates });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);

    } catch (e) {
        next (errer);
    }   
});

certificateRouter.post("/certificate/:id", login_required, async (req, res, next) => {
    try {

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

    } catch (e) {
        next (errer);
    }   
});

certificateRouter.delete("/certificate/:id", login_required, async (req, res, next) => {
    try {

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

    } catch (e) {
        next (errer);
    }   
});