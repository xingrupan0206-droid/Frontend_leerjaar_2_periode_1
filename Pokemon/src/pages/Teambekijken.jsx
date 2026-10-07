import { Link } from 'react-router-dom'


function Teambekijken() {

    return (
        <>
            {/* Navigation */}
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/Teammaken">Teammaken</Link> |{" "}
            </nav>
            <p>Voorbeeld</p>

        </>
    )
}

export default Teambekijken