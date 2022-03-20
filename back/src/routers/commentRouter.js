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
        
        const comment = await commentService.addComment({ newComment });
    
        if (comment.errorMessage) {
            throw new Error(comment.errorMessage);
        }
    
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
})

commentRouter.get("/comment/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params) || !req.params.id) {
            throw new Error(
                "params의 Comment ID를 확인해주세요."
            );
        }

        const getComment = {
            id : req.params.id
        }
        
        const reply = await commentService.getComment({ getComment });
    
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
        if (is.emptyObject(req.params) || !req.params.user_id) {
            throw new Error(
                "param에 받고싶은 댓글 ID를 입력하세요."
            );
        }

        const getComment = {
            user_id : req.params.user_id
        }
        
        const reply = await commentService.getCommentToUser({ getComment });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})

commentRouter.delete("/comment/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params) || !req.params.id) {
            throw new Error(
                "param에 받고싶은 댓글 ID를 입력하세요."
            );
        }

        const deleteComment = {
            id : req.params.id
        }
        
        const reply = await commentService.deleteComment({ deleteComment });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})

commentRouter.post("/comment/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params) || is.emptyObject(req.body) || !req.params.id) {
            throw new Error(
                "Params의 comment ID 혹은 update를 위한 ID, TEXT가 Body에 존재하는 지 체크하십시오."
            );
        }

        const updateComment = {
            id : req.params.id,
            text : req.body.text
        }
        
        const reply = await commentService.updateComment({ updateComment });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})

//-------------------------------- reply ---------------------------

commentRouter.post("/reply", login_required, async (req, res, next) => {
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
        
        const reply = await commentService.addReply({ newReply });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})

commentRouter.delete("/comment/reply/:parent_comment_id/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params) || !req.params.parent_comment_id || !req.params.id) {
            throw new Error(
                "댓글 혹은 대댓글의 ID를 입력해주세요."
            );
        }

        const deleteReply = {
            id : req.params.id,
            parent_comment_id : req.params.parent_comment_id
        }
        
        const reply = await commentService.deleteReply({ deleteReply });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})

commentRouter.post("/comment/reply/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body) || is.emptyObject(req.params) || !req.params.id) {
            throw new Error(
                "대댓글의 ID를 입력해주세요."
            );
        }

        const updateReply = {
            id : req.params.id,
            text : req.body.text,
        }
        
        const reply = await commentService.updateReply({ updateReply });
    
        if (reply.errorMessage) {
            throw new Error(reply.errorMessage);
        }
    
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
})


export { commentRouter };
