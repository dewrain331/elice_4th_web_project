import {useState} from 'react'
import EducationCard from './EducationCard'

const Education=({ education, setEducations, isEditable})=>{
    const [isEditing, setIsEditing]=useState(false)
    
    return(
        <>
          {isEditing ? (
              <EducationEditForm
                education={education}
                setEducations={setEducations}
                setIsEditing={setIsEditing}
              />
          ):(
              <EducationCard
                education={education}
                isEditable={isEditable}
                setIsEditing={setIsEditing}
              />
          )}  
        </>
    )
}

export default Education