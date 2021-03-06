import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class educationService {
  static addEducation = async ({ userId, school, major, position }) => {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, userId, school, major, position };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEducation;
  }

  static getEducation = async ({ educationId }) => {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }

  static getEducationList = async({ userId, page, perPage }) => {
    // education db에서 해당 유저의 학력 리스트를 가져옴
    const { totalPage, educations } = await Education.findByUserId({ userId, page, perPage });
    return { totalPage, educations };
  }

  static setEducation = async ({ educationId, toUpdate }) => {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    let education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const updatedEducation = await Education.update({ educationId, toUpdate });
    return updatedEducation;
  }

  static async deleteEducation({ educationId }) {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    const isDataDeleted = await Education.deleteById({ educationId });
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { educationService };