import { CertificateModel } from "../schemas/certificate";

class Certificate {

    static async create({ newCertificate }) {
        const checkAlreadyExist = await CertificateModel.findOne({
            userId : newCertificate.userId,
            title : newCertificate.title,
            active : true,
        });
        if (checkAlreadyExist) {
            return checkAlreadyExist;
        }
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }

    static async delete({ deleteCertificate }) {
        const deleteCertificateResult = await CertificateModel.deleteOne({ 
            id : deleteCertificate.id,
            userId : deleteCertificate.userId,
            active : true,
        });
        return deleteCertificateResult;

    }

    static async findAllToUser({ getCertificates }) {

        const total = await CertificateModel.countDocuments({ 
            userId : getCertificates.userId,
        });

        const limit = getCertificates.perPage;
        const offset = (getCertificates.page - 1) * limit;

        const certificates = await CertificateModel.find({ 
            userId : getCertificates.userId,
            active : true,
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
            active : true,
        })
        return certificate;
    }

    static async update({ updateCertificate }) {
        const filter = { 
            id : updateCertificate.id ,
            active : true,
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

    static async withdrawByUserId({ userId, delayTime }) {
        const withdrawResult = await CertificateModel.updateMany(
          { userId : userId, active : true, },
          { $set : { expiredAt : delayTime, active : false } },
          { returnOriginal : false },
        )
    
        return withdrawResult;
    }

    static async recoveryByUserId({ userId }) {
        const recoveryResult = await CertificateModel.updateMany(
          { userId : userId, active : false, },
          { $set : { active : true }, $unset : { expiredAt : true } },
          { returnOriginal : false },
        )
    
        return recoveryResult;
    }
}

export { Certificate };
