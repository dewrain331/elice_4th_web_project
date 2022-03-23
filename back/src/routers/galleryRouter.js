import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { galleryService } from "../services/galleryService";
import multer from "multer";

const galleryRouter = Router();
galleryRouter.use(login_required)

galleryRouter.post("/gallery/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { userId, title, description, fromDate, toDate } = req.body;

    // 위 데이터를 프로젝트 db에 추가하기
    const newProject = await projectService.addProject({
        userId,
        title,
        description,
        fromDate,
        toDate
    });
    
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

galleryRouter.get("/gallery/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const projectId = req.params.id;

    // 위 id를 이용하여 db에서 data 찾기
    const project = await projectService.getProject({ projectId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

galleryRouter.put("/gallery/:id", async function (req, res, next) {
    try {
      // URI로부터 data id를 추출함.
      const projectId = req.params.id;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { title, description, fromDate, toDate } = req.body ?? null;
      const toUpdate = { title, description, fromDate, toDate };

      // 위 추출된 정보를 이용하여 db의 데이터 수정함
      const updatedProject = await projectService.setProject({ projectId, toUpdate });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

galleryRouter.get("/galleryList/:userId", async function (req, res, next) {
    try {
      // 특정 사용자의 전체 프로젝트 목록을 얻음
      const userId = req.params.userId;
      
      const page = Number(req.query.page) || 1 // url 쿼리에서 page 받기, 기본값 1
      const perPage = Number(req.query.perPage) || 3 // url 쿼리에서 perRage 받기, 기본값 3

      const { totalPage, projects: projectList } = await projectService.getProjectList({ userId, page, perPage })
      
      res.status(200).send({ totalPage, projects: projectList });
    } catch (error) {
      next(error);
    }
  });

galleryRouter.delete("/gallery/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const projectId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await projectService.deleteProject({ projectId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});


// profile image 변경 라우터
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../front/public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_`+ Date.now() + `_${file.originalname}`)
    }
  })

const upload = multer({ storage: storage, limits: {fileSize: 5 * 1024 * 1024} }) // storage에 저장, 이미지 크기는 5MB로 제한
  
userAuthRouter.post(
"/gallery/uploads",
login_required,
upload.single('uploadImage'),
async function (req, res, next) {
    try {
    // req.file 은 `uploadImage` 라는 필드의 파일 정보입니다.
    const saveFileName = req.file.filename; // 저장된 파일명​ 
    const saveFilePath = `\\images\\${saveFileName}` // 업로드된 파일의 경로 (index.html 기준)
    
    const imageInfo = { saveFileName, saveFilePath };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트합니다. 업데이트 요소가 없을 시 생략합니다.
    const uploadedImage = await userAuthService.uploadImage({ userId, imageInfo });

    if (uploadedImage.errorMessage) {
        throw new Error(uploadedImage.errorMessage);
    }

    res.status(200).json(uploadedImage);
    } catch (error) {
    next(error);
    }
}
);  

export { galleryRouter };
