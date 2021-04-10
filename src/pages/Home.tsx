import React from 'react';
import '../css/style.css';
import home_icons_001 from '../images/home_icons_001.png'
import home_icons_002 from '../images/home_icons_002.png'
import home_icons_003 from '../images/home_icons_003.png'
import home_icons_004 from '../images/home_icons_004.png'
import Order_of_use1 from '../images/Order_of_use1.png'
import home_icons_arrow from '../images/home_icons_arrow.png'
import Order_of_use2 from '../images/Order_of_use2.png'
import Order_of_use3 from '../images/Order_of_use3.png'


function Home() {
    return (
        <div className="home_area">
            <div className="home_icons_001">
                <img src={home_icons_001} alt=""/>
            </div>
            <div className="home_inner_box">
                <div className="hackahtun_title_001">UNESCO & HERITAGE</div>
                <div className="about_cm">
                    <div className="hackahtun_title_002">
                        World Heritage
                    </div>
                    <div className="about_cm_inner">
                        <img src={home_icons_002} alt=""/>
                        <div className="hackahtun_text_001">
                            Natural Heritage <br/>
                            Cultural Heritage <br/>
                            Mixed Heritage
                        </div>
                    </div>
                </div>
                <div className="about_cm">
                    <div className="hackahtun_title_002">
                        Intangible Cultural Heritage
                    </div>
                    <div className="about_cm_inner">
                        <img src={home_icons_003} alt=""/>
                        <div className="hackahtun_text_001">
                            Representative List of the Intangible Cultural Heritage of Humanity <br/>
                            List of Intangible Cultural Heritage in Need of Urgent Safeguarding <br/>
                            Register of Good Safeguarding Practices
                        </div>
                    </div>
                </div>
                <div className="about_cm">
                    <div className="hackahtun_title_002">
                        Memory of the World Register
                    </div>
                    <div className="about_cm_inner">
                        <img src={home_icons_004} alt=""/>
                        <div className="hackahtun_text_001">
                            Memory of the World International List <br/>
                            Memory of the World Area List <br/>
                            Memory of the World Country List <br/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home_inner_box">
                <div className="hackahtun_title_001">UNESCO World Heritage Site</div>
                <p className="hackahtun_text_001"> UNESCO World Heritage refers to a heritage site listed as a
                    cultural heritage, natural
                    heritage, or mixed heritage under UNESCO’s Convention concerning the Protection of the
                    World Cultural and Natural Heritage.</p>
                <div className="hackahtun_title_001">UNESCO Intangible Cultural Heritage</div>
                <p className="hackahtun_text_001"> UNESCO Intangible Cultural Heritage is three lists:
                    Representative List of the Intangible
                    Cultural Heritage of Humanity, a List of Intangible Cultural Heritage in Need of Urgent
                    Safeguarding, and Register of Good Safeguarding Practices under UNESCO's Intangible
                    Cultural Heritage Protection International Convention</p>
                <div className="hackahtun_title_001">UNESCO Memory of the World Register</div>
                <p className="hackahtun_text_001"> UNESCO’s “Memory of the World Register" refers to records that
                    have been finalized and registered
                    with the approval of the UNESCO Secretary-General. The records are first recommended to be
                    registered by the International Advisory Committee (IAC). The Memory of the World Area List are
                    the
                    records of the region listed through the Memory of the World Regional Committee (MOWCAP) and
                    the Memory of the World Country List are the records protected by each country. (In the case of
                    Korea,
                    it is replaced with a cultural property designated by the Cultural Heritage Administration..)
                </p>

            </div>

            <div className="home_inner_box">
                <div className="hackahtun_title_003">Goal</div>
                <p className="hackahtun_text_001"> Heritage is an asset that holds a history of past experiences we
                    have never lived. However, many
                    cultural heritages that have been passed down throughout time have been damaged or lost due to
                    wars and natural disasters. We must preserve our heritage and we have a responsibility to pass
                    it
                    on to our descendants in the future. To do this, it should be recorded through a blockchain NFT
                    that
                    has not been modified or lost. In addition, it is extremely important to record digital
                    ownership and
                    prevent forgery in order to prevent disputes over ownership of the property.</p>

                <div className="hackahtun_title_003">Outline</div>
                <p className="hackahtun_text_001"> Heritage is usually divided into natural heritage and cultural
                    heritage.
                    Natural heritage is a heritage that occurs in nature, meaning the landscape as it originally is.
                    It contains
                    distinguished, universal value that must be preserved, but it is increasingly lost due to
                    environmental
                    destruction in recent years. Cultural heritage is a heritage that refers to technology, science,
                    norms,
                    spiritual or physical cultural properties, and styles that have been passed down or recorded
                    throughout
                    history. Because the records of the past and of culture gave way to development, they have a
                    social and
                    cultural value ​​that should be passed down to descendants. </p>

                <p className="hackahtun_text_001"> This valuable heritage is an intangible and tangible entity that
                    should be preserved in its’ present state
                    as much as possible, recorded, and delivered accurately to future generations. Therefore, we
                    have
                    smart contracted the mining, reward, and donation pool of the heritage that preserves the value
                    of the
                    Korean heritage through the non-fungable token technology (NFT) of the blockchain.</p>

            </div>
            <div className="hackahtun_title_001">[ Order of Use ]</div>
            <div className="home_order_of_use">

                <div className="order_of_use_box">
                    <img src={Order_of_use1} alt=""/>
                    <p>Prepare to experience Korea's cultural heritage and contents by exchanging Chainlink's
                        LINK token with KHHN (Korea Heritage and History NFT).</p>
                </div>
                <div className="arrow">
                    <img src={home_icons_arrow} alt=""/>
                </div>
                <div className="order_of_use_box">
                    <img src={Order_of_use2} alt=""/>
                    <p>Through KHHN exchanged
                        for LINK tokens, countless Korean cultural heritages and history can be mined. If you
                        mine new cultural heritages and history, you can earn rewards for LINK tokens. Get LINK
                        tokens from Chainlink that connect data while studying history, </p>
                </div>
                <div className="arrow">
                    <img src={home_icons_arrow} alt=""/>
                </div>
                <div className="order_of_use_box">
                    <img src={Order_of_use3} alt=""/>
                    <p>Check out and study the various cultural heritages and history of the Republic of Korea
                        that you want to know or do not know, mined by KHHN holders.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
