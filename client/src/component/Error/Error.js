import React from "react";
import "./Error.css";

import { Link } from "react-router-dom"

const Error = () => {
    return(
        <div className="error">
            <div className="error_text">
                <p> 404 </p>
                <p1> Sorry, but this page was not found  </p1>
            </div>
            <div className="error_btns">
                <Link to="/" className="error_btn1">
                    BACK TO HOME PAGE
                </Link>
            </div>
            <div className="error_footer">
                <p> © 2021 All Rights Reserved. Terms of Use and Privacy Policy. </p>
            </div>
        </div>
    );
};

export default Error;