const EducationCard=({ education, setIsEditing, isEditable})=>{
    return(
        <div>
            <div>{education.school}</div>
            <div>{education.major}({education.position})</div>
            {isEditable && 
                <button onClick={()=>setIsEditing(true)}>편집</button>}
        </div>
    )
}

export default EducationCard