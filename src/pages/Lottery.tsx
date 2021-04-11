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
// // @ts-ignore
// TOKEN_URI["6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"] = "https://www.youtube.com/watch?v=Ksp8Juzqw3w&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl"
// TOKEN_URI["d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35"] = "https://www.youtube.com/watch?v=2nO2CE2bcNQ&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=2"

let token_uri_map = new Dictionary<string>();

token_uri_map.add('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'https://www.youtube.com/watch?v=Ksp8Juzqw3w&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl');
token_uri_map.add('d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35', 'https://www.youtube.com/watch?v=2nO2CE2bcNQ&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=2');
token_uri_map.add('4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce', 'https://www.youtube.com/watch?v=cKYEjwV5iyI&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=3');
token_uri_map.add('4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', 'https://www.youtube.com/watch?v=VHd6EYqSekI&list=PLiIvEKksarFAOZRGqIRB2CxlVGlgIa9cl&index=4');

function Lottery() {
    const web3Context = useWeb3(INFURA_KOVAN);
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
                    alert("SUCCESS\n" + " Youtube URL : " + youtubeURL);
                } else {
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
                            KHHN Swap
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
