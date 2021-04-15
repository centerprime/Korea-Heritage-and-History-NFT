import React from 'react';
import '../css/style.css';
import featured_02 from '../images/featured-02.jpg';

function Viewer() {
    return (
        <div className="">
            <div id="page-content">

                <div id="slide-container">
                    <div className="slider-item">
                        <div className="featured-img-wrap">
                            {/*<img className="featured-img" src={featured_02} alt="featured project"/>*/}
                            KHHN VIEWER

                        </div>

                        <h3><a href="#">KHHN VIEWER</a></h3>
                        <div className="featured-parag">
                            <p>
                               You can watch mined heritage content video in live through KHHN Viewer
                            </p>
                        </div>
                    </div>

                </div>

                <span id="nextarr" className="control"></span>
                <div id="meta-pagination">
                    <span className="curr-item-num"></span>
                    <span className="num-div">|</span>
                    <span className="all-item-num"></span>
                </div>
                <span id="prevarr" className="control"></span>

            </div>

        </div>
    );
}

export default Viewer;
