import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from '../services/certificateService';

const certificateRouter = Router();

certificateRouter.post("/certificate/create", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.body)) {
            throw new Error(
              "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const newCertificate = {
            user_id : req.body.user_id,
            title : req.body.title,
            description : req.body.description,
            date : req.body.date
        }

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
        
        if (is.emptyObject(req.query) || is.emptyObject(req.params)) {
            throw new Error(
              "pagination을 위한 쿼리 혹은 유저 아이디가 없습니다."
            );
        }

        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 3);

        const getCertificates = {
            user_id : req.params.user_id,
            page : page,
            perPage : perPage,
        }
        const certificate = await certificateService.getCertificates({ getCertificates });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);

    } catch (error) {
        next (error);
    }   
});

certificateRouter.get("/certificate/:id", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.params)) {
            throw new Error(
              "자격증 아이디를 입력해주세요."
            );
        }
        
        const getCertificate = {
            id : req.params.id,
        }
        const certificate = await certificateService.getCertificate({ getCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);

    } catch (error) {
        next (error);
    }   
});

certificateRouter.post("/certificate/:id", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.body) || is.emptyObject(req.params)) {
            throw new Error(
              "자격증 업데이트에 실패했습니다. 데이터를 확인해주세요."
            );
        }

        const updateCertificate = {
            id : req.params.id,
            title : req.body.title,
            description : req.body.description,
            date : req.body.date
        }

        const certificate = await certificateService.updateCertificate({ updateCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);

    } catch (error) {
        next (error);
    }   
});

certificateRouter.delete("/certificate/:id", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.params)) {
            throw new Error(
              "자격증 아이디를 확인해주세요."
            );
        }
        
        const deleteCertificate = {
            id : req.params.id,
            user_id : req.currentUserId,
        }
        
        const certificate = await certificateService.deleteCertificate({ deleteCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);
        

    } catch (error) {
        next (error);
    }   
});

export { certificateRouter };