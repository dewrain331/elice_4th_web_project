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
            user_id : req.body.user_id,
            author_id : req.body.author_id,
            author_name : req.body.author_name,
            text : req.body.text,
        }
        console.log('Router Create Comment');
        console.log(newComment);
        
        const comment = await commentService.addComment({ newComment });
    
        if (comment.errorMessage) {
            throw new Error(comment.errorMessage);
        }
    
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
})

commentRouter.post("/comment/reply", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const newReply = {
            parent_comment_id : req.body.parent_comment_id,
            author_id : req.body.author_id,
            author_name : req.body.author_name,
            text : req.body.text,
        }
        console.log('Router Reply');
        console.log(newReply);
        
        const reply = await commentService.addReply({ newReply });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})

commentRouter.get("/comment/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params)) {
            throw new Error(
                "param에 받고싶은 댓글 아이디를 입력하세요."
            );
        }

        const getReply = {
            id : req.params.id
        }

        console.log('getReply');
        console.log(getReply);
        
        const reply = await commentService.getCommentAndReply({ getReply });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})

commentRouter.get("/user/comment/:user_id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params)) {
            throw new Error(
                "param에 받고싶은 댓글 아이디를 입력하세요."
            );
        }

        const getReply = {
            user_id : req.params.user_id
        }

        console.log('getReply To User');
        console.log(getReply);
        
        const reply = await commentService.getCommentToUser({ getReply });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})


export { commentRouter };
