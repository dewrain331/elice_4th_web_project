import { 
    User, Project, Award, Certificate, Education,
    Comment, db, Reply, Auth, Gallery
} from "../db";
import { v4 as uuidv4 } from "uuid";

class searchService {
    /**
     * todo : 모든 mvp 검색 기능 추가
     */

     static search = async ({  }) => {
        // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
        const result = {};
        if (!result) {
          const errorMessage =
            "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
        }
    
        return result;
    }

}

export { searchService };