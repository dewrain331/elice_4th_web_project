import { CertificateModel } from "../schemas/certificate";

class Certificate {

    static async create({ newCertificate }) {
        console.log("create");
        const checkAlreadyExist = await CertificateModel.findOne({
            user_id : newCertificate.user_id,
            title : newCertificate.title
        });
        if (checkAlreadyExist) {
            return checkAlreadyExist;
        }
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }

    static async delete({ deleteCertificate }) {
        console.log("delete");
        const deleteCertificateResult = await CertificateModel.deleteOne({ 
            id : deleteCertificate.id,
            user_id : deleteCertificate.user_id 
        });
        return deleteCertificateResult;
    }

    static async findAllToUser({ getCertificates }) {
        console.log("findAll");

        const total = await CertificateModel.countDocuments({ 
            user_id : getCertificates.user_id,
        });

        const limit = getCertificates.perPage;
        const offset = (getCertificates.page - 1) * limit;

        const certificates = await CertificateModel.find({ 
            user_id : getCertificates.user_id,
        }).limit(limit).skip(offset);

        const newCertificates = { 
            "total" : total,
            certificates : certificates
        }

        return newCertificates;
    }

    static async findOne({ getCertificate }) {
        const certificate = await CertificateModel.findOne({
            id : getCertificate.id,
        })
        return certificate;
    }

    static async update({ updateCertificate }) {
        console.log("update");
        const filter = { 
            id : updateCertificate.id ,
        };
        const update = {
            title : updateCertificate.title,
            description : updateCertificate.description,
            date : updateCertificate.date,
        };
        const option = { returnOriginal: false };

        const updateCertificateResult = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updateCertificateResult;
    }
}

export { Certificate };
