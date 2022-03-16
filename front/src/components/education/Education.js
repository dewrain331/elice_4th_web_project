import {useState} from 'react'
import EducationCard from './EducationCard'
import EducationEditForm from './EducationEditForm'

const Education=({ id, education, setEducations, isEditable})=>{
    const [isEditing, setIsEditing]=useState(false)
    
    return(
        <>
          {isEditing ? (
              <EducationEditForm
                id={id}
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