import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class EducationService {
  static addEducation = async ({ user_id, school, major, position }) => {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, user_id, school, major, position };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEducation;
  }

  static getEducation = async ({ educationId }) => {
    // education db에 존재 여부 확인
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }

  static getEducationList = async({ user_id }) => {
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

  static setEducation = async ({ educationId, toUpdate }) => {
    let education = await Education.findById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    return education;
  }
}

export { EducationService };
