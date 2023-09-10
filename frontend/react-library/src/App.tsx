import React from 'react';
import './App.css';
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import {Footer} from "./layouts/NavbarAndFooter/Footer";
import {Homepage} from "./layouts/Homepage/Homepage";
import {SearchBooksPage} from "./layouts/SearchBooksPage/SearchBooksPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {BookCheckoutPage} from "./layouts/BookCheckoutPage/BookCheckoutPage";

export const App = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar/>
                <div className='flex-grow-1'>
                    <Switch>
                        <Route path='/' exact>
                            <Redirect to='/home' />
                        </Route>
                        <Route path='/home' exact>
                            <Homepage/>
                        </Route>
                        <Route path='/search' exact>
                            <SearchBooksPage />
                        </Route>
                        <Route path='/checkout/:bookId' exact>
                            <BookCheckoutPage />
                        </Route>
                    </Switch>
                </div>
            <Footer/>
        </div>
    );
}
