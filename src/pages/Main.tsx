import React, {Component, useCallback, useEffect, useState} from 'react';
import {Route, MemoryRouter as Router, Switch, Redirect, useHistory, Link, BrowserRouter} from "react-router-dom";
import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import '../css/magnific-popup.css';
import '../css/style.css';
import logo from "../images/logo.png";
import header_bg_001 from "../images/1.png";
import header_bg_002 from "../images/2.png";
import header_bg_003 from "../images/3.png";
import header_bg_004 from "../images/4.png";
import flag from "../images/flag.png";
import Home from "./Home";
import Swap from "./Swap";
import Lottery from "./Lottery";
import Viewer from "./Viewer";
import {useWeb3} from '@openzeppelin/network/react';
import {ERC20_ABI, INFURA_KOVAN, LINK_KOVAN} from "../utils/const";

function Main() {

    const web3Context = useWeb3(INFURA_KOVAN);
    const {lib: web3, networkId, accounts, providerName} = web3Context;

    // Methods for requesting accounts access
    const requestAuth = (web3Context: any) => web3Context.requestAuth();
    const requestAccess = useCallback(() => requestAuth(web3Context), []);

    // Querying account balance
    const [balanceEth, setBalanceEth] = useState("0");
    const [balanceLink, setBalanceLink] = useState("0");
    const getBalance = useCallback(async () => {
        let ethBalance = "0";
        let linkBalance = "0";
        if (accounts && accounts.length > 0) {
            ethBalance = await web3.eth.getBalance(accounts[0]);
            ethBalance = (Number.parseFloat(ethBalance) / Math.pow(10, 18)).toFixed(8);
            // @ts-ignore
            const linkContract = new web3.eth.Contract(ERC20_ABI, LINK_KOVAN);
            linkBalance = await linkContract.methods.balanceOf(accounts[0]).call();
            console.log("Balance : " + linkBalance);
            let linkDecimals = await linkContract.methods.decimals().call();
            console.log("Decimals : " + linkDecimals);
            linkBalance = (Number.parseFloat(linkBalance) / Math.pow(10, Number.parseFloat(linkDecimals))).toFixed(2);
        }
        setBalanceEth(ethBalance);
        setBalanceLink(linkBalance);
    }, [accounts, web3.eth, web3.utils]);

    useEffect(() => {
        getBalance();
    }, [accounts, getBalance, networkId]);

    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide " data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item  container-fluid active"
                         style={{backgroundImage: `url(${header_bg_001})`}}>
                        <div className="row header-color">
                            <div className="col-lg-4 main_logo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="col-lg-6">
                                <div className="flag"><img src={flag} alt=""/></div>

                                <div id="page-title">
                                    <h1>Korea Heritage and History NFT </h1>
                                    <p>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean Heritage
                                        and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean
                                        Heritage and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-1 connect_button_respons">
                                {accounts && accounts.length > 0 ? (
                                    <div className="connected_address">{accounts[0]}</div>
                                ) : !!networkId && providerName !== 'infura' ? (
                                    <a href="#" onClick={requestAccess} className="connect_button">Connect</a>
                                ) : (
                                    <div>No accounts access or Metamask not installed</div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="carousel-item container-fluid" style={{backgroundImage: `url(${header_bg_002})`}}>
                        <div className="row header-color">
                            <div className="col-lg-4 main_logo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="col-lg-6">
                                <div className="flag"><img src={flag} alt=""/></div>

                                <div id="page-title">
                                    <h1>Korea Heritage and History NFT </h1>
                                    <p>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean Heritage
                                        and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean
                                        Heritage and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-2 connect_button_respons">
                                <a href="" className="connect_button">Connect</a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item container-fluid" style={{backgroundImage: `url(${header_bg_003})`}}>
                        <div className="row header-color">
                            <div className="col-lg-4 main_logo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="col-lg-6">
                                <div className="flag"><img src={flag} alt=""/></div>

                                <div id="page-title">
                                    <h1>Korea Heritage and History NFT </h1>
                                    <p>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean Heritage
                                        and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean
                                        Heritage and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-2 connect_button_respons">
                                <a href="" className="connect_button">Connect</a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item container-fluid" style={{backgroundImage: `url(${header_bg_004})`}}>
                        <div className="row header-color">
                            <div className="col-lg-4 main_logo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="col-lg-6">
                                <div className="flag"><img src={flag} alt=""/></div>

                                <div id="page-title">
                                    <h1>Korea Heritage and History NFT </h1>
                                    <p>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean Heritage
                                        and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT Korean
                                        Heritage and
                                        History NFT
                                        <br/>
                                        Korea Heritage and History NFT Korea Heritage and History NFT
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-2 connect_button_respons">
                                <a href="" className="connect_button">Connect</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <ul id="mmenu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/khhn_swap">
                                KHHN SWAP
                            </Link></li>
                            <li><Link to="/khhn_lottery">KHHN MINING</Link></li>
                            <li><Link to="/khhn_viewer">KHHN VIEWER</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
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

export default Main;
