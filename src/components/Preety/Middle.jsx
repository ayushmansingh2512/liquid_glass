const Middle = () => {
    const firstHalf = ['P', 'R', 'E'];
    const secondHalf = ['E', 'T', 'Y'];

    return (
        <div className="middle">
            {firstHalf.map((letter, index) => (
                <span key={`first-${index}`} className="letter">
                    {letter}
                </span>
            ))}

            <span className="coming-soon">COMING SOON</span>

            {secondHalf.map((letter, index) => (
                <span key={`second-${index}`} className="letter">
                    {letter}
                </span>
            ))}
        </div>
    )
}
export default Middle;