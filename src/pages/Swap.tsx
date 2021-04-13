import React, {useCallback, useEffect, useState} from 'react';
import '../css/style.css';

import link_logo from '../images/link.png';
import arrow_down_001 from '../images/arrow_down_001.png';
import K_logo from '../images/K_logo.png';
import header_bg_001 from "../images/header_bg_001.png";
import swap_box from "../images/swap.png";
import {useWeb3} from "@openzeppelin/network/lib/react";
import {ERC20_ABI, INFURA_KOVAN, LINK_KOVAN, NFT_MARKETPLACE_ABI, NFT_MARKETPLACE_CONTRACT} from "../utils/const";
import {TokenIdModel} from "../utils/TokenIdModel";
import swap_guide_001 from "../images/swap_guide_001.png";
import swap_guide_002 from "../images/swap_guide_002.png";
import swap_guide_003 from "../images/swap_guide_003.png";
import swap_guide_004 from "../images/swap_guide_004.png";

function Swap() {
    const web3Context = useWeb3(INFURA_KOVAN);
    const {lib: web3, networkId, accounts, providerName} = web3Context;
    // Methods for requesting accounts access
    const requestAuth = (web3Context: any) => web3Context.requestAuth();
    const requestAccess = useCallback(() => requestAuth(web3Context), []);
    // Querying account balance
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

    const loadTokenIdMoldes = useCallback(async () => {
        let transactions: any = await loadTokenIds();
        console.log(transactions)
        setTokenIdModels(transactions)
    }, []);

    useEffect(() => {
        loadTokenIdMoldes();
        const interval = setInterval(async () => {
            await getBalance();
        }, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [accounts, getBalance, networkId]);


    const [linkAmount, setLinkAmount] = useState('0.01');
    const [khhnAmount, setKhhnAmount] = useState('0');
    const [swapTx, setSwapTx] = useState("");

    const [loadingText, setLoadingText] = useState("");
    const [tokenIdModels, setTokenIdModels] = useState<TokenIdModel[]>([])

    async function loadTokenIds() {
        // @ts-ignore
        const nftMarketplaceContract = new web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE_CONTRACT);
        console.log("Loading Token models");
        let tokenCounts = await nftMarketplaceContract.methods.countOfTokens().call();
        console.log(tokenCounts);
        var listOfTokenModels = [];
        for (let i = 1; i <= tokenCounts; i++) {
            let tokenModel = await nftMarketplaceContract.methods.tokenModelMapping(i).call();
            console.log("Token ID : " + tokenModel['tokenId']);
            console.log("Owner : " + tokenModel['owner']);
            console.log("Available : " + tokenModel['isAvailable']);
            var tokenModel1 = new TokenIdModel();
            tokenModel1._tokenId = tokenModel['tokenId'];
            tokenModel1._owner = tokenModel['owner'];
            tokenModel1._isAvaliable = tokenModel['isAvailable'];
            listOfTokenModels.push(tokenModel1);
        }
        return listOfTokenModels;
    }

    async function swap() {
        try {
            let fromLinkAmount = linkAmount;
            let toKhhnAmount = Number.parseFloat(khhnAmount);

            console.log("KhhnAmount : " + toKhhnAmount);

            let owner = (accounts ?? "")[0]

            // @ts-ignore
            const nftMarketplaceContract = new web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE_CONTRACT);
            let amount = web3.utils.toWei(fromLinkAmount, 'ether');

            // @ts-ignore
            const linkContract = new web3.eth.Contract(ERC20_ABI, LINK_KOVAN);

            let linkAllowanceToNFT = await linkContract.methods.allowance(owner, NFT_MARKETPLACE_CONTRACT).call();
            linkAllowanceToNFT = web3.utils.toWei(linkAllowanceToNFT, 'ether');
            console.log("Allowance : " + linkAllowanceToNFT);
            console.log("Amount : " + amount);
            if (Number.parseFloat(linkAllowanceToNFT) <= Number.parseFloat(amount)) {
                console.log("Need Allowance : " + linkAllowanceToNFT);
                setLoadingText("Loading............. Approve");
                let approveResult = await linkContract.methods.approve(NFT_MARKETPLACE_CONTRACT, amount).send({
                    from: owner
                });
                setLoadingText("");
                console.log(approveResult);
                return;
            }
            console.log("Enough Allowance : " + linkAllowanceToNFT);
            setLoadingText("Loading............. SWAP");
            let result = await nftMarketplaceContract.methods.purchaseTokenLink(toKhhnAmount, amount).send(
                {
                    from: owner
                }
            );
            setSwapTx(result.transactionHash);
            setLoadingText("");
            console.log(result);
        } catch (e) {
            console.log(e);
            setLoadingText("");
            alert(e);
        }

    }


    function onClickTokenId(tokenId: string) {
        console.log("tokenId : " + tokenId);
        setKhhnAmount(tokenId)
    }

    return (

        <div className="row">
            <div className="col-lg-6">
                <div className="justify-content-start">
                    <div className="swap_box" style={{backgroundImage: `url(${swap_box})`}}>
                        <div className="swap_box_inner">
                            <div className="swap_inner_area">
                                <div className="swap_box_title">
                                    KHHN Swap
                                </div>
                                <div className="swap_address_box">
                                    <div className="swap_address_box_title">
                                        <div className="from_to">From</div>
                                        <div className="total_amount">
                                            {balanceLink}
                                        </div>
                                    </div>
                                    <div className="swap_address_box_inner">
                                        <div className="enter_amount">
                                            <input type="text " className="enter_amount_input" placeholder="0.0"
                                                   value={linkAmount} onChange={e => setLinkAmount(e.target.value)}
                                                   spellCheck="false" inputMode="decimal" readOnly={!!linkAmount}/>
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
                                <div>
                                    {swapTx && swapTx.length > 0 ? (
                                        <p>Tx : <a href={'https://kovan.etherscan.io/tx/' + swapTx}
                                                   target="_blank">SwapTx</a></p>) : (<p></p>)}
                                </div>
                            </div>
                            <p className="avaiblable_token">Available Token Ids for purchase</p>
                            <div className="select_tokken_area">
                                {tokenIdModels.map((value, index) => {
                                    // @ts-ignore
                                    if (value._isAvaliable) {
                                        // @ts-ignore
                                        return <div className="tokken_id_001"
                                                    onClick={() => onClickTokenId(value._tokenId)}>
                                            {value._tokenId}
                                        </div>
                                    } else {
                                        return <div className="tokken_id_002">
                                            {value._tokenId}
                                        </div>
                                    }
                                })}
                            </div>
                            {accounts && accounts.length ? (
                                isApproved ? <div className="button_swap" onClick={async () => {
                                        await swap();
                                    }}> Swap</div> :
                                    <div className="button_swap" onClick={async () => {
                                        await swap();
                                    }}> Swap</div>
                            ) : !!networkId && providerName !== 'infura' ? (
                                <div onClick={requestAccess} className="button_swap"> Unlock wallet</div>
                            ) : (
                                <div>No accounts access</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="home_area_002">
                    <div className="hackahtun_title_001">Guide</div>
                    <div className="guide_box">
                        <div className="hackahtun_title_002">
                            Step 1
                        </div>
                        <div className="guide_box_image" style={{backgroundImage: `url(${swap_guide_001})`}}>
                        </div>
                        <p className="hackahtun_text_001">
                            03. After connect MetaMask you will see your wallet address. <br/>
                            04. As you see there, I have already LINK in my wallet.
                            (If you have no LINK yet you have to get it first. As well as ETH for gas fee)<br/>
                            05. This 0.01 LINK is fixed amount<br/>
                            06. This is Token ID. You can choose any random number from ‘1’ to ’15’<br/>
                            07. This is KHHN NFT Token
                        </p>
                    </div>
                    <div className="guide_box">
                        <div className="hackahtun_title_002">
                            Step 2
                        </div>
                        <div className="guide_box_image" style={{backgroundImage: `url(${swap_guide_002})`}}>
                        </div>
                        <p className="hackahtun_text_001">
                            08. Click Swap <br/>
                            09. You will see Loading….. Approve and MetaMask Popup <br/>
                            10. Click Confirm and wait until disappearing Loading….. Approve. Then click Swap again </p>
                    </div>
                    <div className="guide_box">
                        <div className="hackahtun_title_002">
                            Step 3
                        </div>
                        <div className="guide_box_image" style={{backgroundImage: `url(${swap_guide_003})`}}>
                        </div>
                        <p className="hackahtun_text_001">
                            11. Click Swap and you will see Loading…. SWAP <br/>
                            12. Click Confirm and wait until disappearing Loading….. SWAP </p>
                    </div>
                    <div className="guide_box">
                        <div className="hackahtun_title_002">
                            Step 4
                        </div>
                        <div className="guide_box_image" style={{backgroundImage: `url(${swap_guide_004})`}}>
                        </div>
                        <p className="hackahtun_text_001">
                            13. After Confirm you will see SwapTx You can check your transaction by clicking SwapTx
                            (that link direct you https://kovan.etherscan.io/tx/) </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Swap;
