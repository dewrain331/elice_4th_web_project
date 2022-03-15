import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

const awardService = {

    addAward : async ({ newAward }) => {
        console.log(newAward);
        const createNewAwardResult = await Award.create({ newAward });
        
        if (!createNewAwardResult) {
            const errorMessage = "수상 이력 추가에 실패했습니다.";
            return { errorMessage };
        }

        return createNewAwardResult;
    },
    getAward : async ({ getAward }) => {
        console.log(getAward);
        const getAwardResult = await Award.findAll({ getAward });

        if (!getAwardResult) {
            const errorMessage = "수상 이력을 불러오는 데 실패했습니다.";
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