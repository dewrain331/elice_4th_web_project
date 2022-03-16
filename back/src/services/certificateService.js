import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

const certificateService = {
    addCertificate : async ({ newCertificate }) => {
        const id = uuidv4();
        newCertificate.id = id;

        console.log(newCertificate);
        const createNewCertificateResult = await Certificate.create({ newCertificate });
        
        if (!createNewCertificateResult) {
            const errorMessage = "자격증 추가에 실패했습니다.";
            return { errorMessage };
        }

        return createNewCertificateResult;
    },
    getCertificates : async ({ getCertificates }) => {
        console.log(getCertificates);
        const getCertificatesResult = await Certificate.findAllUser({ getCertificates });

        if (!getCertificatesResult) {
            const errorMessage = "자격증 목록을 불러오는 데 실패했습니다.";
            return { errorMessage };
        }

        return getCertificatesResult;
    },
    getCertificate : async ({ getCertificate }) => {
        console.log(getCertificate);
        const getCertificateResult = await Certificate.findOne({ getCertificate });

        if (!getCertificateResult) {
            const errorMessage = "자격증을 불러오는 데 실패했습니다.";
            return { errorMessage };
        }

        return getCertificateResult;
    },
    deleteCertificate : async({ deleteCertificate }) => {
        console.log(deleteCertificate);

        const deleteCertificateResult = await Certificate.delete({ deleteCertificate });

        if (!deleteCertificateResult) {
            const errorMessage = "자격증 삭제에 실패했습니다.";
            return { errorMessage };
        }

        return deleteCertificateResult;
    },
    updateCertificate : async({ updateCertificate }) => {
        console.log(updateCertificate);

        const updateCertificateResult = await Certificate.update({ updateCertificate });

        if (!updateCertificateResult) {
            const errorMessage = "수상 이력을 수정하는 데 실패했습니다.";
            return { errorMessage };
        }

        return updateCertificateResult;
    }
}

export { certificateService };