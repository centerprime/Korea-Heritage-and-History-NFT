import React, {useCallback, useEffect, useState} from 'react';
import '../css/style.css';

import link_logo from '../images/link.png';
import arrow_down_001 from '../images/arrow_down_001.png';
import K_logo from '../images/K_logo.png';
import header_bg_001 from "../images/header_bg_001.png";
import swap_box from "../images/swap_box.png";
import {useWeb3} from "@openzeppelin/network/lib/react";
import {ERC20_ABI, INFURA_ROPSTEN, LINK_ROPSTEN, NFT_MARKETPLACE_ABI, NFT_MARKETPLACE_CONTRACT} from "../utils/const";

function Swap() {
    const web3Context = useWeb3(INFURA_ROPSTEN);
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
            const linkContract = new web3.eth.Contract(ERC20_ABI, LINK_ROPSTEN);
            linkBalance = await linkContract.methods.balanceOf(accounts[0]).call();

            console.log("Link Balance : " + linkBalance);

            // get allowance
            let allowance = await linkContract.methods.allowance(accounts[0], NFT_MARKETPLACE_CONTRACT).call();
            console.log("allowance Balance : " + allowance);

            setApproved(Number.parseFloat(allowance) === 0);

        }
        setBalanceEth(ethBalance);
        setBalanceLink(linkBalance);
    }, [accounts, web3.eth, web3.utils]);

    useEffect(() => {
        const interval = setInterval(async () => {
            await getBalance();
        }, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [accounts, getBalance, networkId]);


    const [linkAmount, setLinkAmount] = useState('0');
    const [khhnAmount, setKhhnAmount] = useState('0');


    async function swap() {
        try {
            let fromLinkAmount = Number.parseFloat(linkAmount);
            let toKhhnAmount = Number.parseFloat(khhnAmount);

            let owner = (accounts ?? "")[0]

            // @ts-ignore
            const nftMarketplaceContract = new web3.eth.Contract(NFT_MARKETPLACE_ABI, NFT_MARKETPLACE_CONTRACT);
            let amount = web3.utils.toWei('0.01', 'ether')

            // @ts-ignore
            const linkContract = new web3.eth.Contract(ERC20_ABI, LINK_ROPSTEN);

            let linkAllowanceToNFT = await linkContract.methods.allowance(owner, NFT_MARKETPLACE_CONTRACT).call();
            linkAllowanceToNFT = web3.utils.toWei(linkAllowanceToNFT, 'ether');
            console.log("Allowance : " + linkAllowanceToNFT);
            console.log("Amount : " + amount);
            if (Number.parseFloat(linkAllowanceToNFT) <= Number.parseFloat(amount)) {
                console.log("Need Allowance : " + linkAllowanceToNFT);
                let approveResult = await linkContract.methods.approve(NFT_MARKETPLACE_CONTRACT, amount).send({
                    from: owner
                });

                console.log(approveResult);
                return;
            }
            console.log("Enough Allowance : " + linkAllowanceToNFT);

            let result = await nftMarketplaceContract.methods.purchaseTokenLink(4, amount).send(
                {
                    from: owner
                }
            );
            console.log(result);
        } catch (e) {
            console.log(e);
        }

    }

    async function approve() {

    }


    return (
        <div className="col-lg-6 justify-content-center">
            <div className="swap_box" style={{backgroundImage: `url(${swap_box})`}}>
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
                                           value={linkAmount} onChange={e => setLinkAmount(e.target.value)}
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
                                           value={khhnAmount} onChange={e => setKhhnAmount(e.target.value)}
                                           spellCheck="false" inputMode="decimal"/>
                                    <div className="company_logo">
                                        <div className="logo"><img src={K_logo} alt=""/></div>
                                        KHHN
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {accounts && accounts.length ? (
                        isApproved ? <div className="button_swap" onClick={async () => {
                                await swap();
                            }}> Swap</div> :
                            <div className="button_swap" onClick={async () => {
                                await approve();
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

export default Swap;
