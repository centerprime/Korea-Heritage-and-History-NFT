import React, {useCallback, useState} from 'react';
import '../css/style.css';
import K_logo from '../images/K_logo.png';
import swap_box from "../images/lottery.png";
import {useWeb3} from "@openzeppelin/network/lib/react";

import Dictionary, {
    CHAINLINK_VRF_CONTRACT,
    CHAINLINK_VRF_CONTRACT_ABI,
    ERC20_ABI,
    INFURA_KOVAN,
    LINK_KOVAN,
    ERC721_ABI,
    ERC721_CONTRACT,
    NFT_MARKETPLACE_CONTRACT
} from "../utils/const";
import Web3 from "web3";
// // @ts-ignore
// TOKEN_URI["6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"] = "https://www.youtube.com/watch?v=Ksp8Juzqw3w&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl"
// TOKEN_URI["d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35"] = "https://www.youtube.com/watch?v=2nO2CE2bcNQ&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=2"

let token_uri_map = new Dictionary<string>();

token_uri_map.add('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'https://www.youtube.com/watch?v=Ksp8Juzqw3w&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl');
token_uri_map.add('d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35', 'https://www.youtube.com/watch?v=2nO2CE2bcNQ&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=2');
token_uri_map.add('4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce', 'https://www.youtube.com/watch?v=cKYEjwV5iyI&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=3');
token_uri_map.add('4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', 'https://www.youtube.com/watch?v=VHd6EYqSekI&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=4');
token_uri_map.add('ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d', 'https://www.youtube.com/watch?v=8tKd0P_UrN8&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=5');
token_uri_map.add('e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683', 'https://www.youtube.com/watch?v=DQ6e3t5ahlY&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=6');
token_uri_map.add('7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451', 'https://www.youtube.com/watch?v=ThvYsTkGeIQ&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=7');
token_uri_map.add('2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3', 'https://www.youtube.com/watch?v=xFgI79Z_U6s&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=8');
token_uri_map.add('19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7', 'https://www.youtube.com/watch?v=-SSZr4MJCvc&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=9');
token_uri_map.add('4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5', 'https://www.youtube.com/watch?v=E2xfbq_lsOk&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=10');
token_uri_map.add('4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8', 'https://www.youtube.com/watch?v=iR7n7D6yYwE&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=11');
token_uri_map.add('6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918', 'https://www.youtube.com/watch?v=67bcR2mHh-0&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=12');
token_uri_map.add('3fdba35f04dc8c462986c992bcf875546257113072a909c162f7e470e581e278', 'https://www.youtube.com/watch?v=kaw8UcjRmgE&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=13');
token_uri_map.add('8527a891e224136950ff32ca212b45bc93f69fbb801c3b1ebedac52775f99e61', 'https://www.youtube.com/watch?v=SLlWqT3CQt0&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=14');
token_uri_map.add('e629fa6598d732768f7c726b4b621285f9c3b85303900aa912017db7617d8bdb', 'https://www.youtube.com/watch?v=uDcJVY4iUoA&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=17');

function Lottery() {

    var provider = new Web3.providers.HttpProvider(INFURA_KOVAN);
    // @ts-ignore
    const web3Context = useWeb3(provider);
    const {lib: web3, networkId, accounts, providerName} = web3Context;
    // Methods for requesting accounts access
    const requestAuth = (web3Context: any) => web3Context.requestAuth();
    const requestAccess = useCallback(() => requestAuth(web3Context), []);// Querying account balance
    const [balanceEth, setBalanceEth] = useState("0");
    const [balanceLink, setBalanceLink] = useState("0");
    const [isApproved, setApproved] = useState(true);
    const getBalance = useCallback(async () => {
        var ethBalance = "0";
        var linkBalance = "0";
        if (accounts && accounts.length > 0) {
            ethBalance = await web3.eth.getBalance(accounts[0]);
            // @ts-ignore
            const linkContract = new web3.eth.Contract(ERC20_ABI, LINK_KOVAN);
            linkBalance = await linkContract.methods.balanceOf(accounts[0]).call();

            console.log("Link Balance : " + linkBalance);

            // get allowance
            let allowance = await linkContract.methods.allowance(accounts[0], NFT_MARKETPLACE_CONTRACT).call();
            console.log("allowance Balance : " + allowance);
            let linkDecimals = await linkContract.methods.decimals().call();
            linkBalance = (Number.parseFloat(linkBalance) / Math.pow(10, Number.parseFloat(linkDecimals))).toFixed(2);
            setApproved(Number.parseFloat(allowance) === 0);

        }
        setBalanceEth(ethBalance);
        setBalanceLink(linkBalance);
    }, [accounts, web3.eth, web3.utils]);

    const [linkAmount, setLinkAmount] = useState('0.01');
    const [khhnAmount, setKhhnAmount] = useState('0');

    const [drawTx, setDrawTx] = useState("");

    const [drawResult, setDrawResult] = useState("");

    const [loadingText, setLoadingText] = useState("");

    async function draw() {
        try {
            // @ts-ignore
            const chainlinkVRFContract = new web3.eth.Contract(CHAINLINK_VRF_CONTRACT_ABI, CHAINLINK_VRF_CONTRACT);
            // @ts-ignore
            const nftErc721Contract = new web3.eth.Contract(ERC721_ABI, ERC721_CONTRACT);

            let toKhhnTokenId = Number.parseFloat(khhnAmount);
            console.log("KhhnTokenId : " + toKhhnTokenId);
            let owner = (accounts ?? "")[0]


            let nftTokenIdApprovalAddress = await nftErc721Contract.methods.getApproved(toKhhnTokenId).call();
            console.log("Is approval nftTokenIdApprovalAddress : " + nftTokenIdApprovalAddress);
            if (nftTokenIdApprovalAddress != CHAINLINK_VRF_CONTRACT) {
                console.log("Need Approve all");
                setLoadingText("Loading............. Approve");
                let approveResult = await nftErc721Contract.methods.approve(CHAINLINK_VRF_CONTRACT, toKhhnTokenId).send({
                    from: owner
                });
                setLoadingText("");
                console.log(approveResult);
                return;
            }
            setLoadingText("Loading............. DRAWING");
            let result = await chainlinkVRFContract.methods.draw(toKhhnTokenId, 1234567890).send(
                {
                    from: owner
                }
            );
            // setDrawTx(result.transactionHash);
            checkTokenIdResult(toKhhnTokenId);
            console.log(result);
        } catch (e) {
            setLoadingText("");
            console.log(e);
            alert(e);
        }

    }

    function checkTokenIdResult(tokenId: any) {
        const interval = setInterval(async () => {
            // @ts-ignore
            const chainlinkVRFContract = new web3.eth.Contract(CHAINLINK_VRF_CONTRACT_ABI, CHAINLINK_VRF_CONTRACT);
            // @ts-ignore
            const nftErc721Contract = new web3.eth.Contract(ERC721_ABI, ERC721_CONTRACT);

            let tokenId_RequestId = await chainlinkVRFContract.methods.tokenIdToRequestId(tokenId).call();

            console.log("TokenId _ Request Id : " + tokenId_RequestId);

            let randomResult_RequestId = await chainlinkVRFContract.methods.requestIdToRandomResult(tokenId_RequestId).call();
            console.log("RandomResult _ Request Id : " + randomResult_RequestId);
            // eslint-disable-next-line eqeqeq
            if (randomResult_RequestId != 0) {
                clearInterval(interval);
                console.log("TokenId : " + tokenId);

                // eslint-disable-next-line eqeqeq
                if (randomResult_RequestId == tokenId) {
                    var tokenURI = await nftErc721Contract.methods.tokenURI(tokenId).call();
                    console.log("TokenURI : " + tokenURI);
                    var youtubeURL = token_uri_map.getItem(tokenURI);
                    console.log("TokenURI youtube url : " + youtubeURL);
                    // eslint-disable-next-line no-useless-concat
                    alert("Your Token ID :  " + tokenId + " Movie ID : " + randomResult_RequestId + " SUCCESS\n" + " Youtube URL : " + youtubeURL);
                } else {
                    // eslint-disable-next-line no-useless-concat
                    alert("NOT MATCH\n" + "Token ID : " + tokenId + " MovieID : " + randomResult_RequestId)
                }

                setLoadingText("");
            }
        }, 5000);
    }


    return (
        <div className="justify-content-center">
            <div className="swap_box" style={{backgroundImage: `url(${swap_box})`}}>
                <div className="swap_box_inner">
                    <div className="swap_inner_area">
                        <div className="swap_box_title">
                            KHHN Mining
                        </div>
                        <div className="MINING_viewer">
                            KHHN MINING Viewer
                            <div className="MINING_viewer_change" id="panel"></div>
                        </div>

                        <div className="swap_address_box">
                            <div className="swap_address_box_title">
                                Token Id
                            </div>
                            <div className="swap_address_box_inner">
                                <div className="enter_amount">
                                    <input type="text " className="enter_amount_input" placeholder="0.0"
                                           value={khhnAmount} onChange={e => setKhhnAmount(e.target.value)}
                                           spellCheck="false" inputMode="decimal"/>
                                    <div className="company_logo">
                                        <div className="logo"><img src={K_logo} alt=""/></div>
                                        KHHN
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {loadingText}
                        </div>
                    </div>
                    {accounts && accounts.length ? (
                        isApproved ? <div className="button_swap" onClick={async () => {
                                await draw();
                            }}> Upload</div> :
                            <div className="button_swap" onClick={async () => {
                                await draw();
                            }}> Approve</div>
                    ) : !!networkId && providerName !== 'infura' ? (
                        <div onClick={requestAccess} className="button_swap"> Unlock wallet</div>
                    ) : (
                        <div>No accounts access</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Lottery;
