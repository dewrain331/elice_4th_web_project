const TechPercentage = (title, percentage) => {
    if(title === 'javascript') {
        return (
            <div style={{
                borderRadius: "40px",
                background: "#ccc",
                height: "40px"
            }}>
                <span
                    style={{
                        textAlign: "right",
                        background: "rgb(200, 170, 90)",
                        lineHeight: "40px",
                        borderRadius: "40px",
                        width: `${percentage}%`,
                        boxSizing: "border-box"
                    }}
                >{percentage}%</span>
            </div>
        )
    } else if(title === 'html') {
        return (
            <div style={{
                borderRadius: "40px",
                background: "#ccc",
                height: "40px"
            }}>
                <span
                    style={{
                        textAlign: "right",
                        background: "rgb(200, 130, 50)",
                        lineHeight: "40px",
                        borderRadius: "40px",
                        width: `${percentage}%`,
                        boxSizing: "border-box"
                    }}
                >{percentage}%</span>
            </div>
        )
    } else if(title === 'css') {
        return (
            <div style={{
                borderRadius: "40px",
                background: "#ccc",
                height: "40px"
            }}>
                <span
                    style={{
                        textAlign: "right",
                        background: "rgb(50, 100, 200)",
                        lineHeight: "40px",
                        borderRadius: "40px",
                        width: `${percentage}%`,
                        boxSizing: "border-box"
                    }}
                >{percentage}%</span>
            </div>
        )
    } else if(title === 'react') {
        return (
            <div style={{
                borderRadius: "40px",
                background: "#ccc",
                height: "40px"
            }}>
                <span
                    style={{
                        textAlign: "right",
                        background: "rgb(30, 170, 200)",
                        lineHeight: "40px",
                        borderRadius: "40px",
                        width: `${percentage}%`,
                        boxSizing: "border-box"
                    }}
                >{percentage}%</span>
            </div>
        )
    } else if(title === 'nodejs') {
        return (
            <div style={{
                borderRadius: "40px",
                background: "#ccc",
                height: "40px"
            }}>
                <span
                    style={{
                        textAlign: "right",
                        background: "rgb(70, 180, 100)",
                        lineHeight: "40px",
                        borderRadius: "40px",
                        width: `${percentage}%`,
                        boxSizing: "border-box"
                    }}
                >{percentage}%</span>
            </div>
        )
    } else if(title === 'java') {
        return (
            <div style={{
                borderRadius: "40px",
                background: "#ccc",
                height: "40px"
            }}>
                <span
                    style={{
                        textAlign: "right",
                        background: "rgb(200, 50, 50)",
                        lineHeight: "40px",
                        borderRadius: "40px",
                        width: `${percentage}%`,
                        boxSizing: "border-box"
                    }}
                >{percentage}%</span>
            </div>
        )
    }
    
}

export default TechPercentage