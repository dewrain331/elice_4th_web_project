import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from '../services/awardService';

const awardRouter = Router();

awardRouter.get("/awardlist/:user_id", login_required, async (req, res, next) => {
    try {
        const getAward = {
            user_id : req.params.user_id,
        }

        console.log("router");

        const award = await awardService.getAwards({ getAward });

        if (award.errorMessage) {
            console.log(award.errorMessage);
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})
awardRouter.get("/awards/:id", login_required, async (req, res, next) => {
    try {

        const getAward = {
            id : req.params.id,
        }

        console.log("router");

        const award = await awardService.getAward({ getAward });

        if (award.errorMessage) {
            console.log(award.errorMessage);
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})
awardRouter.post("/award/create", login_required, async (req, res, next) => {
    
    try {
        const newAward = {
            user_id : req.body.user_id,
            award : req.body.award,
            description : req.body.description,
        }

        console.log("router");

        const award = await awardService.addAward({ newAward });

        if (award.errorMessage) {
            console.log(award.errorMessage);
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})

awardRouter.delete("/awards/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const deleteAward = {
            user_id : user_id,
            id : req.params.id,
        }

        console.log("router");

        const award = await awardService.deleteAward({ deleteAward });

        if (award.errorMessage) {
            console.log(award.errorMessage);
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})

awardRouter.post("/award/:id", login_required, async (req, res, next) => {
    try {
        //const user_id = req.currentUserId;
        const updateAward = {
            id : req.params.id,
            changeAward : req.body.changeAward,
            changeDescription : req.body.changeDescription
        }

        console.log("router");

        const award = await awardService.updateAward({ updateAward });

        if (award.errorMessage) {
            console.log(award.errorMessage);
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})

export { awardRouter };