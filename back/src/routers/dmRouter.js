import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { dmService } from "../services/dmService";

const dmRouter = Router();
dmRouter.use(login_required)

dmRouter.post("/room/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const fromUserId = req.currentUserId
    const { toUserId } = req.body;

    const newDM = await dmService.createNewDM({
      fromUserId,
      toUserId,
    });
    
    res.status(201).json(newDM);
  } catch (error) {
    next(error);
  }
});

dmRouter.get("/rooms/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const DMList = await dmService.getDMList({ userId })
    
    res.status(200).send(DMList);
  } catch (error) {
    next(error);
  }
});
  
export { dmRouter };