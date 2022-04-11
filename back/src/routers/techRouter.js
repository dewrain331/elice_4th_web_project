import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { techService } from "../services/techService";

const techRouter = Router();
techRouter.use(login_required)

techRouter.post("/tech/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { userId, title, percent, description } = req.body;

    // 위 데이터를 education db에 추가하기
    const newTech = await techService.addTech({
        userId,
        title,
        percent,
        description,
    });
    
    res.status(201).json(newTech);
  } catch (error) {
    next(error);
  }
});

techRouter.put("/techs/:id", async function (req, res, next) {
    try {
      // URI로부터 data id를 추출함.
      const techId = req.params.id;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { title, percent, description } = req.body ?? null;
      const toUpdate = { title, percent, description };

      // 위 추출된 정보를 이용하여 db의 데이터 수정함
      const updatedTech = await techService.setTech({ techId, toUpdate });

      if (updatedTech.errorMessage) {
        throw new Error(updatedTech.errorMessage);
      }

      res.status(200).json(updatedTech);
    } catch (error) {
      next(error);
    }
  }
);

techRouter.get("/techList/:userId", async function (req, res, next) {
    try {
      // 특정 사용자의 전체 학력 목록을 얻음
      const userId = req.params.userId;

      const techList = await techService.getTechList({ userId })
      
      res.status(200).send(techList);
    } catch (error) {
      next(error);
    }
  });

techRouter.delete("/techs/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const techId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await techService.deleteTech({ techId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});
  
export { techRouter };