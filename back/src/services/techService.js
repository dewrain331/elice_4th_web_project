import { Tech } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class techService {
  static addTech = async ({ userId, title, percent, description }) => {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newTech = { id, userId, title, percent, description };

    // db에 저장
    const createdNewTech = await Tech.create({ newTech });
    createdNewTech.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewTech;
  }

  static getTechList = async({ userId }) => {
    // education db에서 해당 유저의 학력 리스트를 가져옴
    const techList = await Tech.findByUserId({ userId });
    return techList;
  }

  static setTech = async ({ techId, toUpdate }) => {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    let tech = await Tech.findById({ techId });
    if (!tech) {
      const errorMessage =
        "해당 id를 가진 기술 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const updatedTech = await Tech.update({ techId, toUpdate });
    return updatedTech;
  }

  static deleteTech = async ({ techId }) => {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    const isDataDeleted = await Tech.deleteById({ techId });
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 기술 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { techService };