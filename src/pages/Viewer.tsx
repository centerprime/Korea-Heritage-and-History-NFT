import React from 'react';
import '../css/style.css';
import featured_02 from '../images/featured-02.jpg';

function Viewer() {
    return (
        <div className="justify-content-center">
            <div id="page-content">

                <div id="slide-container">
                    <div className="slider-item">
                        <div className="featured-img-wrap">
                            {/*<img className="featured-img" src={featured_02} alt="featured project"/>*/}
                            KHHN VIEWER
                            {/*<div className="about_video">*/}
                            {/*    <div className="date"><span>채굴날짜 : </span> 2021.2.3 12:00:00</div>*/}
                            {/*    <div className="fr_area">*/}
                            {/*        <div className="folder">*/}
                            {/*            <span> 채굴홀더 :</span> 0X34832342234211*/}
                            {/*        </div>*/}
                            {/*        <div className="reward">*/}
                            {/*            <span>채굴보상 :</span> 30 LINK*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                        {/*<h3><a href="#">Featured News</a></h3>*/}
                        {/*<div className="featured-parag">*/}
                        {/*    <p>*/}
                        {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien id*/}
                        {/*        risus*/}
                        {/*        ultricies dignissim quis at tellus. Etiam euismod viverra urna, ut facilisis erat*/}
                        {/*        facilisis*/}
                        {/*        vitae. Fusce ullamcorper ultricies egestas.*/}
                        {/*    </p>*/}
                        {/*    <p>*/}
                        {/*        Consectetur adipiscing elit. Pellentesque non sapien id risus ultricies dignissim*/}
                        {/*        quis at*/}
                        {/*        tellus. Etiam euismod viverra urna, ut facilisis erat facilisis vitae. Fusce*/}
                        {/*        ullamcorper*/}
                        {/*        ultricies egestas. Facilisis erat facilisis vitae ullamcorper ultricies egestas.*/}
                        {/*    </p>*/}
                        {/*</div>*/}
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
