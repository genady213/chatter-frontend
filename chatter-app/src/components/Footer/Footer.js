
import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';


export function Footer() {

    let navigate = useNavigate();
    const routeChange1 = () => {
        let path = `/AboutUs`;
        navigate(path);
    };
    const routeChange2 = () => {
        let path = `/CompanyPolicy`;
        navigate(path);
    };
    const routeChange3 = () => {
        let path = `/TermsAndConditions`;
        navigate(path);
    };

    function changeBackground(e) {
        e.target.style.background = '#579DAB';
    }

    function changeBackBackground(e) {
        e.target.style.background = 'var(--onlyfriends-color)';
    }
    return (
        <div className='footerArea'>

            <div className='footerOptions'>
                <div className='footerPadding' onMouseOver={changeBackground} onMouseLeave={changeBackBackground} onClick={routeChange1}>About Us</div>
                <div className='footerPadding' onMouseOver={changeBackground} onMouseLeave={changeBackBackground} onClick={routeChange2}>Company Policy</div>
                <div className='footerPadding' onMouseOver={changeBackground} onMouseLeave={changeBackBackground} onClick={routeChange3}>Terms and Conditions</div>
            </div>
            
        </div>
        /*<BrowserRouter>
            <Routes>
                <Route path="routeChange1">About Us</Route>
                    <Route path="routeChange2">Company Policy</Route>
                        <Route path="routeChange3">Terms And Conditions</Route>
            </Routes>
        </BrowserRouter>*/
        );
}
    