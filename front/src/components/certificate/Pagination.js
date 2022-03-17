const Pagination = ({total, page, setPage}) => {
    const numPages = Math.ceil(total / 3)

    return (
        <>
            <nav>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>앞으로</button>
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                <button onClick={() => setPage(page + 1)} disabled={page === numPages}>뒤로</button>
            </nav>
        </>
    )
}

export default Pagination