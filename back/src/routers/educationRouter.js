import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required)

educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.body.userId;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;

    // 위 데이터를 education db에 추가하기
    const newEducation = await educationService.addEducation({
        userId,
        school,
        major,
        position,
    });
    
    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 data 찾기
    const education = await educationService.getEducation({ educationId });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/educations/:id", async function (req, res, next) {
    try {
      // URI로부터 data id를 추출함.
      const educationId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      // 위 추출된 정보를 이용하여 db의 데이터 수정함
      const education = await educationService.setEducation({ educationId, toUpdate });

      if (education.errorMessage) {
        throw new Error(education.errorMessage);
      }

      res.status(200).json(education);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get("/educationlist/:userId", async function (req, res, next) {
    try {
      // 특정 사용자의 전체 프로젝트 목록을 얻음
      const userId = req.params.userId;
      
      const page = Number(req.query.page || 1) // url 쿼리에서 page 받기, 기본값 1
      const perPage = Number(req.query.perPage || 3) // url 쿼리에서 peRage 받기, 기본값 3

      const { totalPage, "educations": educationList } = await educationService.getEducationList({ userId, page, perPage })
      
      res.status(200).send({ totalPage, "educations": educationList });
    } catch (error) {
      next(error);
    }
  });

educationRouter.delete("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await educationService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});
  
export { educationRouter };
