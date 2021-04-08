import React from 'react';
import '../css/style.css';

import link_logo from '../images/link.png';
import arrow_down_001 from '../images/arrow_down_001.png';
import K_logo from '../images/K_logo.png';
import header_bg_001 from "../images/header_bg_001.png";
import swap_box from "../images/swap_box.png";

function Swap() {
    return (
        <div className="col-lg-6 justify-content-center">
            <div className="swap_box" style={{ backgroundImage: `url(${swap_box})` }}>
                <div className="swap_box_inner">
                    <div className="swap_inner_area">
                        <div className="swap_box_title">
                            KHHN Swap
                        </div>
                        <div className="swap_address_box">
                            <div className="swap_address_box_title">
                                From
                            </div>
                            <div className="swap_address_box_inner">
                                <div className="enter_amount">
                                    <input type="text " className="enter_amount_input" placeholder="0.0"
                                           spellCheck="false" inputMode="decimal"/>
                                        <div className="company_logo">
                                            <div className="logo"><img src={link_logo} alt=""/></div>
                                            LINK
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="arrow">
                            <img src={arrow_down_001} alt=""/>
                        </div>
                        <div className="swap_address_box">
                            <div className="swap_address_box_title">
                                To
                            </div>
                            <div className="swap_address_box_inner">
                                <div className="enter_amount">
                                    <input type="text " className="enter_amount_input" placeholder="0.0"
                                           spellCheck="false" inputMode="decimal"/>
                                        <div className="company_logo">
                                            <div className="logo"><img src={K_logo} alt=""/></div>
                                            KHHN
                                        </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="button_swap"> Unlock wallet</div>
                </div>
            </div>
        </div>
    );
}

export default Swap;
