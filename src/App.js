import './App.css';
import { Link } from "react-router-dom";


function App( ) {
    return (
        <div>
            <h1> Hello Arsentii </h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                }}
            >
                <Link to="/auth">Auth</Link> |{" "}
                <Link to="/patients">Doctor</Link>
            </nav>
        </div>

    )
}

export default App;
