import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

const awardService = {

    addAward : async ({ newAward }) => {
        const id = uuidv4();
        newAward.id = id;

        console.log(newAward);
        const createNewAwardResult = await Award.create({ newAward });
        
        if (!createNewAwardResult) {
            const errorMessage = "수상 이력 추가에 실패했습니다.";
            return { errorMessage };
        }

        return createNewAwardResult;
    },
    getAwards : async ({ getAward }) => {
        console.log(getAward);
        const getAwardsResult = await Award.findAllUser({ getAward });

        if (!getAwardsResult) {
            const errorMessage = "여러개의 수상 이력을 불러오는 데 실패했습니다.";
            return { errorMessage };
        }

        return getAwardsResult;
    },
    getAward : async ({ getAward }) => {
        console.log(getAward);
        const getAwardResult = await Award.findOne({ getAward });

        if (!getAwardResult) {
            const errorMessage = "특정 수상 이력을 불러오는 데 실패했습니다.";
            return { errorMessage };
        }

        return getAwardResult;
    },
    deleteAward : async({ deleteAward }) => {
        console.log(deleteAward);

        const deleteAwardResult = await Award.delete({ deleteAward });

        if (!deleteAwardResult) {
            const errorMessage = "수상 이력 삭제에 실패했습니다.";
            return { errorMessage };
        }

        return deleteAwardResult;
    },
    updateAward : async({ updateAward }) => {
        console.log(updateAward);

        const updateAwardResult = await Award.update({ updateAward });

        if (!updateAwardResult) {
            const errorMessage = "수상 이력을 수정하는 데 실패했습니다.";
            return { errorMessage };
        }

        return updateAwardResult;
    }
    
}

export { awardService };