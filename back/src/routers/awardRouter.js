import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from '../services/awardService';

const awardRouter = Router();

awardRouter.get("/award/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.params.id;

        const getAward = {
            id : user_id,
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
awardRouter.post("/award/register", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const newAward = {
            id : user_id,
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

awardRouter.delete("/award/:award", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const deleteAward = {
            id : user_id,
            award : req.params.award,
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

awardRouter.post("/award/:award", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const updateAward = {
            id : user_id,
            award : req.params.award,
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