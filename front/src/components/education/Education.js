import {useState} from 'react'
import EducationCard from './EducationCard'
import EducationEditForm from './EducationEditForm'

const Education=({ education, setEducations, isEditable, page, setAllPage})=>{
    const [isEditing, setIsEditing]=useState(false)
    
    return(
        <>
          {isEditing ? (
              <EducationEditForm
                education={education}
                setEducations={setEducations}
                setIsEditing={setIsEditing}
                page={page}
              />
          ):(
              <EducationCard
                education={education}
                setEducations={setEducations}
                isEditable={isEditable}
                setIsEditing={setIsEditing}
                page={page}
                setAllPage={setAllPage}
              />
          )}  
        </>
    )
}

export default Education