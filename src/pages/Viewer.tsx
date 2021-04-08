import React from 'react';
import '../css/style.css';
import featured_01 from '../images/featured-01.jpg';
import featured_02 from '../images/featured-02.jpg';
import featured_03 from '../images/featured-03.jpg';
import goto_arr from '../images/goto-arr.png';

function Viewer() {
    return (
        <div className="col-lg-6 justify-content-center">
            <div id="page-content">

                <div id="slide-container">

                    <div className="slider-item">
                        <div className="featured-img-wrap"><img className="featured-img" src={featured_01}
                                                                alt="featured project"/>
                            <div className="about_video">
                                <div className="date">채굴날짜 : 2021.2.3 12:00:00</div>
                                <div className="justify-content-between d-flex">
                                    <div className="folder">
                                        채굴홀더 : 0X34832342234211
                                    </div>
                                    <div className="reward">
                                        채굴보상 : 30 LINK
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3><a href="folio-webdes.html">Featured Portfolio Item</a></h3>
                        <div className="featured-parag">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien id
                                risus
                                ultricies dignissim quis at tellus. Etiam euismod viverra urna, ut facilisis erat
                                facilisis
                                vitae. Fusce ullamcorper ultricies egestas.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien id
                                <a href="">risus ultricies</a> dignissim quis at tellus. Consectetur adipiscing
                                elit.
                                Pellentesque non sapien id risus ultricies dignissim quis at tellus.<a
                                className="read-more" href="folio-webdes.html">Read More</a><img
                                src={goto_arr} alt="Read More"/>
                            </p>
                        </div>
                    </div>
                    <div className="slider-item">
                        <div className="featured-img-wrap"><img className="featured-img" src={featured_02}
                                                                alt="featured project"/>
                            <div className="about_video">
                                <div className="date">채굴날짜 : 2021.2.3 12:00:00</div>
                                <div className="justify-content-between d-flex">
                                    <div className="folder">
                                        채굴홀더 : 0X34832342234211
                                    </div>
                                    <div className="reward">
                                        채굴보상 : 30 LINK
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3><a href="news-item01.html">Featured News</a></h3>
                        <div className="featured-parag">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien id
                                risus
                                ultricies dignissim quis at tellus. Etiam euismod viverra urna, ut facilisis erat
                                facilisis
                                vitae. Fusce ullamcorper ultricies egestas.
                            </p>
                            <p>
                                Consectetur adipiscing elit. Pellentesque non sapien id risus ultricies dignissim
                                quis at
                                tellus. Etiam euismod viverra urna, ut facilisis erat facilisis vitae. Fusce
                                ullamcorper
                                ultricies egestas. Facilisis erat facilisis vitae ullamcorper ultricies egestas.<a
                                className="read-more" href="news-item01.html">Read More</a><img
                                src={goto_arr} alt="Read More"/>
                            </p>
                        </div>
                    </div>
                    <div className="slider-item">
                        <div className="featured-img-wrap"><img className="featured-img" src={featured_03}
                                                                alt="featured project"/>
                            <div className="about_video">
                                <div className="date">채굴날짜 : 2021.2.3 12:00:00</div>
                                <div className="justify-content-between d-flex">
                                    <div className="folder">
                                        채굴홀더 : 0X34832342234211
                                    </div>
                                    <div className="reward">
                                        채굴보상 : 30 LINK
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3><a href="services-details.html">Featured Service</a></h3>
                        <div className="featured-parag">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien id
                                risus
                                ultricies dignissim quis at tellus. Etiam euismod viverra urna, ut facilisis erat
                                facilisis
                                vitae. Fusce ullamcorper ultricies egestas.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien id
                                risus
                                ultricies dignissim quis at tellus. Consectetur adipiscing elit. Pellentesque non
                                sapien id
                                risus ultricies dignissim quis at tellus. Etiam euismod viverra urna, ut facilisis
                                erat
                                facilisis. Yltricies sit amet.
                            </p>
                            <p>
                                Consectetur adipiscing elit. Etiam euismod viverra urna, ut facilisis erat facilisis
                                vitae.
                                Fusce ullamcorper ultricies egestas. consectetur adipiscing elit. Pellentesque non
                                sapien.
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
