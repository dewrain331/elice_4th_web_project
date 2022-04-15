import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { searchService } from '../services/searchService';

const searchRouter = Router();

searchService.get("/search", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.body)) {
            throw new Error(
              "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        const result = await searchService.search({  });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);


    } catch (errer) {
        next (errer);
    }
});

export { searchRouter };
