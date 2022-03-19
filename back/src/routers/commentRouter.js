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

commentRouter.get("/comment/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params)) {
            throw new Error(
                "param에 받고싶은 댓글 아이디를 입력하세요."
            );
        }

        const getComment = {
            id : req.params.id
        }

        console.log('getComment');
        console.log(getComment);
        
        const reply = await commentService.getCommentAndReply({ getComment });
    
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

        const getComment = {
            user_id : req.params.user_id
        }

        console.log('getComment To User');
        console.log(getComment);
        
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
        if (is.emptyObject(req.params)) {
            throw new Error(
                "param에 받고싶은 댓글 아이디를 입력하세요."
            );
        }

        const deleteComment = {
            id : req.params.id
        }

        console.log('deleteComment');
        console.log(deleteComment);
        
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
        if (is.emptyObject(req.params) || is.emptyObject(req.body)) {
            throw new Error(
                "param 혹은 body를 체워주세요."
            );
        }

        const updateComment = {
            id : req.params.id,
            text : req.body.text
        }

        console.log('updateComment');
        console.log(updateComment);
        
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

commentRouter.delete("/comment/reply/:parent_comment_id/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params)) {
            throw new Error(
                "대댓글의 ID를 입력해주세요. 혹은 부모 comment id를 입력해주세요."
            );
        }

        const deleteReply = {
            id : req.params.id,
            parent_comment_id : req.params.parent_comment_id
        }

        console.log('Router delete');
        console.log(deleteReply);
        
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
        if (is.emptyObject(req.body) || is.emptyObject(req.params)) {
            throw new Error(
                "API를 다시 확인해주세요. 입력된 정보가 부족합니다."
            );
        }

        const updateReply = {
            id : req.params.id,
            text : req.body.text,
        }
        console.log('Router update');
        console.log(updateReply);
        
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
