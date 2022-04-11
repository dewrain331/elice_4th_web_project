import { useState } from "react"
import TechCard from "./TechCard"
import TechEditForm from "./TechEditForm"

const Tech = ({ tech, isEditable }) => {
    // useState를 이용하여 '수정중' 상태를 관리
    // 최초에는 수정중이 아니므로, 초기값은 false로 설정.
    const [isEditing, setIsEditing] = useState(false)
    
    return (
        <>
            {/* isEditing에 따라 수정중(true)이라면 수정 양식(TechEditForm)을 보내고, 아니라면 Tech 목록(TechCard)을 표시 */}
            {isEditing ? (
                <TechEditForm
                    currentTech={tech}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <TechCard 
                    tech={tech}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    )
}

export default Tech