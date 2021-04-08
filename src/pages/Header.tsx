import React from 'react';
import {Route, MemoryRouter as Router, Switch, Redirect, useHistory, Link, BrowserRouter} from "react-router-dom";
import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import '../css/magnific-popup.css';
import '../css/style.css';
import logo from "../images/logo.png";
import header_bg_001 from "../images/header_bg_001.png";
import Home from "./Home";
import Swap from "./Swap";
import Lottery from "./Lottery";
import Viewer from "./Viewer";

function Header() {
    return (
        <div>
            <div className="container-fluid header" style={{ backgroundImage: `url(${header_bg_001})` }}>
                <div className="row header-color">
                    <div className="col-lg-3 ">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <div id="page-title">
                            <h1>Korean Heritage and History NFT </h1>
                            <p>
                                Korean Heritage and History NFT Korean Heritage and History NFT Korean Heritage and
                                History
                                NFT
                                <br/>
                                Korean Heritage and History NFT Korean Heritage and History NFT Korean Heritage and
                                History
                                NFT
                                <br/>
                                Korean Heritage and History NFT Korean Heritage and History NFT
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 ">
                        <a href="" className="connect_button">Connect</a>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <ul id="mmenu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/khhn_swap">
                                KHHN SWAP
                            </Link></li>
                            <li><Link to="/khhn_lottery">KHHN LOTTERY</Link></li>
                            <li><Link to="/khhn_viewer">KHHN VIEWER</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/khhn_swap" component={Swap}/>
                            <Route path="/khhn_lottery" component={Lottery}/>
                            <Route path="/khhn_viewer" component={Viewer}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
