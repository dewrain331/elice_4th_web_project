import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import multer from "multer";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post(
  "/user/withdraw",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body) || !req.body.password) {
        throw new Error(
          "회원탈퇴 시 비밀번호가 필요합니다. 현재 입력된 비밀번호가 없습니다."
        );
      }

      // req (request) 에서 데이터 가져오기
      const password = req.body.password;
      const userId = req.currentUserId;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.withdrawUser({ userId, password });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/recovery",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body) || !req.body.userId) {
        throw new Error("복구시킬 유저 ID가 없습니다. 다시 시도해주세요.");
      }

      // req (request) 에서 데이터 가져오기
      const userId = req.body.userId;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.recoveryUser({ userId });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post("/user/recovery", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body) || !req.body.email || !req.body.password) {
      throw new Error(
        "복구시킬 유저의 email과 password가 없습니다. 다시 시도해주세요."
      );
    }

    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;
    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.recoveryByUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);

  } catch (error) {
    next(error);
  }
});

userAuthRouter.post(
  "/user/password",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body) || !req.body.password) {
        throw new Error("변경할 패스워드를 입력해주세요. 패스워드가 없습니다.");
      }

      const userId = req.currentUserId;
      const password = req.body.password;

      const users = await userAuthService.changePassword({ userId, password });
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const userId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

userAuthRouter.put("/users/:id/like", async function (req, res, next) {
  try {
    // URI로부터 포트폴리오 userId를 추출함.
    const userId = req.params.id;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { currentUserId } = req.body ?? null;

    // 위 추출된 정보를 이용하여 db의 데이터 수정함
    const addedLike = await userAuthService.addLike({ userId, currentUserId });

    if (addedLike.errorMessage) {
      throw new Error(addedLike.errorMessage);
    }

    res.status(200).json(addedLike);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.put("/users/:id/dislike", async function (req, res, next) {
  try {
    // URI로부터 포트폴리오 userId를 추출함.
    const userId = req.params.id;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { currentUserId } = req.body ?? null;

    // 위 추출된 정보를 이용하여 db의 데이터 수정함
    const removedLike = await userAuthService.removeLike({
      userId,
      currentUserId,
    });

    if (removedLike.errorMessage) {
      throw new Error(removedLike.errorMessage);
    }

    res.status(200).json(removedLike);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/auth", async function (req, res, next) {
  try {
    // URI로부터 포트폴리오 userId를 추출함.
    if (is.emptyObject(req.body) || !req.body.email) {
      throw new Error("찾고자 하는 계정의 이메일을 입력하세요.");
    }

    const email = req.body.email;

    // 위 추출된 정보를 이용하여 db의 데이터 수정함
    const result = await userAuthService.findPassword({ email });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/auth/code", async function (req, res, next) {
  try {
    // URI로부터 포트폴리오 userId를 추출함.
    if (is.emptyObject(req.body) || !req.body.email || !req.body.code) {
      throw new Error("찾고자 하는 계정의 이메일 혹은 코드를 입력해주세요.");
    }

    const email = req.body.email;
    const code = req.body.code;

    // 위 추출된 정보를 이용하여 db의 데이터 수정함
    const result = await userAuthService.userEmailAuth({ email, code });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
// profile image 변경 라우터
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/front/elice/portfoliomvp_2/images/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_`+ Date.now() + `_${file.originalname}`)
  }
})
const upload = multer({ storage: storage }) // storage에 저장, 이미지 크기는 3MB로 제한

userAuthRouter.patch(
  "/users/:id/image",
  login_required,
  upload.single('profile'),
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const userId = req.params.id;

      // req.file 은 `profile` 라는 필드의 파일 정보입니다.
      const saveFileName = req.file.filename; // 저장된 파일명​ 
      const saveFilePath = `/images/${saveFileName}` // 업로드된 파일의 경로 (index.html 기준)
    
      const imageInfo = { saveFileName, saveFilePath };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트합니다. 업데이트 요소가 없을 시 생략합니다.
      const updatedImage = await userAuthService.uploadImage({ userId, imageInfo });

      if (updatedImage.errorMessage) {
        throw new Error(updatedImage.errorMessage);
      }

      res.status(200).json(updatedImage);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
