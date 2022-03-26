import { useState } from "react"
import CertificateCard from "./CertificateCard"
import CertificateEditForm from "./CertificateEditForm"

const Certificate = ({ certificate, setCertificates, isEditable, page, setPage, setAllPage, allPage }) => {
    // useState를 이용하여 '수정중' 상태를 관리
    // 최초에는 수정중이 아니므로, 초기값은 false로 설정.
    const [isEditing, setIsEditing] = useState(false)
    
    return (
        <>
            {/* isEditing에 따라 수정중(true)이라면 수정 양식(CertificateEditForm)을 보내고, 아니라면 목록(CertificateCard)을 표시 */}
            {isEditing ? (
                <CertificateEditForm
                    currentCertificate={certificate}
                    setCertificates={setCertificates}
                    setIsEditing={setIsEditing}
                    page={page}
                />
            ) : (
                <CertificateCard 
                    certificate={certificate}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    setCertificates={setCertificates}
                    setAllPage={setAllPage}
                    page={page}
                    setPage={setPage}
                />
            )}
        </>
    )
}

export default Certificate
