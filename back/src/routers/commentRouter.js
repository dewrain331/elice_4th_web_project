import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentService } from "../services/commentService";

const commentRouter = Router();

commentRouter.post("/comment", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const newComment = {
            parent_comment_id : req.body.parent_comment ?? "root",
            user_id : req.body.user_id,
            author_id : req.body.author_id,
            author_name : req.body.author_name,
            text : req.body.text,
        }
    
        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({ newComment });
    
        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }
    
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
})