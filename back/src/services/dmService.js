import { DM } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class dmService {
  static createNewDM = async ({ fromUserId, toUserId }) => {
    // id 는 유니크 값 부여
    const roomId = uuidv4();
    const newDM = { roomId, participants: [ fromUserId, toUserId ] };

    // db에 저장
    const createdNewDM = await DM.create({ newDM });
    createdNewDM.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewDM;
  }

  static getDMList = async({ userId }) => {
    const DMList = await DM.findByUserId({ userId });
    return DMList;
  }

}

export { dmService };