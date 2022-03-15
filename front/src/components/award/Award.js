import { useState } from "react"
import AwardCard from "./AwardCard"
import AwardEditForm from "./AwardEditForm"

const Award = ({ award, setAwards, isEditable }) => {
    // useState를 이용하여 '수정중' 상태를 관리
    // 최초에는 수정중이 아니므로, 초기값은 false로 설정.
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            {/* isEditing에 따라 수정중(true)이라면 수정 양식(AwardEditForm)을 보내고, 아니라면 Award 목록(AwardCard)을 표시 */}
            {isEditing ? (
                <AwardEditForm
                    currentAward={award}
                    setAwards={setAwards}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <AwardCard 
                    award={award}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    )
}

export default Award