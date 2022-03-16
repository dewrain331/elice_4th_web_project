import { CertificateModel } from "../schemas/certificate";

class Certificate {

    static async create({ newCertificate }) {
        console.log(newCertificate);
        const checkAlreadyExist = await CertificateModel.findOne({
            certificate : newCertificate.certificate
        });
        if (checkAlreadyExist) {
            return checkAlreadyExist;
        }
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }

    static async delete({ deleteCertificate }) {
        console.log("delete");
        console.log(deleteCertificate);
        const deleteCertificateResult = await CertificateModel.deleteOne({ 
            id : deleteCertificate.id,
            user_id : deleteCertificate.user_id 
        });
        return deleteCertificateResult;

    }

    static async findAllUser({ getCertificate }) {
        console.log("findAll");
        console.log(getCertificate);
        const certificates = await CertificateModel.find({ 
            user_id : getCertificate.user_id,
        });
        return certificates;
    }

    static async findOne({ getCertificate }) {
        const certificate = await CertificateModel.findOne({
            id : getCertificate.id,
        })
        return certificate;
    }

    static async update({ updateCertificate }) {
        console.log(updateCertificate);
        const filter = { 
            id : updateCertificate.id ,
        };
        const update = {
            certificate : updateCertificate.certificate,
            description : updateCertificate.description,
            when_date : updateCertificate.when_date,
        };
        const option = { returnOriginal: false };

        const updateCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updateCertificate;
    }
}

export { Certificate };
