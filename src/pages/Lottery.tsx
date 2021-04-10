import React from 'react';
import '../css/style.css';
import K_logo from '../images/K_logo.png';
import swap_box from "../images/swap_box.png";
function Lottery() {














    return (
        <div className="justify-content-center">
            <div className="swap_box" style={{ backgroundImage: `url(${swap_box})` }}>
                <div className="swap_box_inner">
                    <div className="swap_inner_area">
                        <div className="swap_box_title">
                            KHHN Swap
                        </div>
                        <div className="MINING_viewer">
                            KHHN MINING Viewer
                            <div className="MINING_viewer_change" id="panel"></div>
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

export default Lottery;
