import NavBar from "../components/NavBar";
import { Link } from 'react-router-dom';

function NotFound404() {
    return ( 
        <>
            <NavBar/>
            <div className="container d-flex flex-wrap flex-row align-items-center justify-content-evenly">
                <h1>Error 404</h1>
                <h3 className="w-100">Oops this page doesnt exists <strong>:v</strong></h3>
                <Link to="/" className="btn btn-primary">Go home</Link>
            </div>
        </> 
    );
}

export default NotFound404;