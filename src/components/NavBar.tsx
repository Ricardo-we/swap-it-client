import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { VscThreeBars, VscSearch } from 'react-icons/vsc';
import swapitLogo from '../assets/img/swapit-logo-small.jpg';
import { AppContext } from "../App";
import { useContext, useState } from 'react';
import Product from "../interfaces/Product";
import { getProductsRequest } from "../services/products-requests";

interface NavBarProps {
    onError?: (error: string) => void | any;
    searchDisabled?: boolean;
    onSearchResults?: (value: any) => void | any;
}

export default function NavBar({ searchDisabled=true, onError,onSearchResults }: NavBarProps){
    const { storedUser } = useContext<any>(AppContext);
    const [search, setSearch] = useState<string>('');

    const onSearch = (e: any) => {
        e.preventDefault();
        return getProductsRequest({ query: 'name', value: search })
            .then(res => {
                onSearchResults && onSearchResults(res);
            })
            .catch(error => onError ? onError(error.toString) : console.error(error))
    }

    return (
        <>
            <style>{`
                .navbar-toggler {
                    outline: none;
                    border: none;
                }
                .navbar-toggler:focus {
                    outline: none;
                    box-shadow: none;
                    border: 1px solid black;
                }
                .logo-img {
                    object-fit: cover;
                    height: 100%;
                }
              
            `}</style>        
            <Navbar bg="white" expand="lg">
                <Container>
                    <Navbar.Brand href="/"><img className="logo-img" src={swapitLogo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <VscThreeBars size="23px"/>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto w-100">
                        <form onSubmit={onSearch} className="w-75 mx-auto d-flex flex-row align-items-center justify-content-start">
                            <input
                                disabled={searchDisabled} 
                                onChange={e => setSearch(e.target.value)} 
                                type="text" 
                                placeholder="Search" 
                                className="form-control w-100 mx-auto" 
                            />
                            <button disabled={searchDisabled} className="btn btn-primary"><VscSearch/></button>
                        </form>
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/account" className="nav-link">
                            Account
                        </NavLink>
                        {storedUser.user && storedUser.auth_token ?
                            <NavLink to="/logout" className="btn btn-outline-danger">
                                Logout
                            </NavLink>                            
                            :
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}