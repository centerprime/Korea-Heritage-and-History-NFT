pragma solidity ^0.6.6;

import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/VRFConsumerBase.sol";

// ERC721 interface
abstract contract IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) virtual public;
}

// ERC20 interface
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract CenterprimeMiningPool is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    // random Movie Id
    uint256 public randomMovieId;
    // erc721 tokenId owner
    mapping (uint256 => address) public tokenOwners;
    // tokenId to Indexing
    mapping (uint256 => bool) public tokenIdtoIndex;
    // tokenIds
    uint256[] tokenIds;
    // movie id is already checked. tokenId -> count
    mapping (uint256 => uint256) public movieIdToCount;
    // NFT market place
    IERC721 public nftMarketPlace;
    // LINK token contract
    IERC20 public linkTokenContract;
    // mapping tokenId to requestId
    mapping (uint256 => bytes32) public tokenIdToRequestId;
    // mapping requestId to tokenId
    mapping (bytes32 => uint256) public requestIdToTokenId;
    // mapping movieId to Url
    mapping (uint256 => string) public movieIdToUrl;
    // mapping tokenId to RandomResult
    mapping (uint256 => uint256) public tokenIdToRandomResult;
    // mapping tokenId to Owner address
    mapping (uint256 => address) public tokenIdToOwnerAddress;
    // mapping tokenId to Draw status : True or False
    mapping (uint256 => bool) public tokenIdToDrawStatus;
    // mapping tokenId to Response
    mapping (uint256 => bool) public tokenIdToResponse;
    // defualt reward in 0.0001 LINK
    uint256 rewardLink =  0.0001 * 10 ** 18;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor(address _nftMarketPlace)
    VRFConsumerBase(
        0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
        0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
    ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (varies by network)
        nftMarketPlace = IERC721(_nftMarketPlace);
        linkTokenContract = IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);
    }


    /**
     * Draw token Id
     */
    function draw(uint256 _tokenId,uint256 userProvidedSeed) tokenExists(_tokenId) public returns (bytes32 requestId) {
        // check tokenId existence
        tokenIdtoIndex[_tokenId] = true;
        tokenIdToOwnerAddress[_tokenId] = msg.sender;
        // deposit tokenId to this contract
        nftMarketPlace.transferFrom(msg.sender, address(this), _tokenId);
        return getRandomNumber(userProvidedSeed,_tokenId);
    }



    modifier tokenExists(uint256 _id) {
        require(!tokenIdtoIndex[_id], "Token Id exist already.");
        _;
    }


    /**
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed, uint256 _tokenId) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        tokenIdToRequestId[_tokenId] = requestId;
        requestIdToTokenId[requestId] = _tokenId;
        return requestId;
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        // random result
        randomMovieId = randomness.mod(10).add(1);
        // tokenId by requestIdToTokenId
        uint256 tokenId = requestIdToTokenId[requestId];
        // tokenId response as received
        tokenIdToResponse[tokenId] = true;
        // mapping tokenId with randomMovieId
        tokenIdToRandomResult[tokenId] = randomMovieId;
        // get tokenId owner
        address ownerOfTokenId = tokenIdToOwnerAddress[tokenId];
        // check tokenId is equal movieId
        if (tokenId == randomMovieId){
            tokenIdToDrawStatus[tokenId] = true;
            // transfer reward 0.0001 LINK
            linkTokenContract.transfer(ownerOfTokenId, rewardLink);
        } else {
            tokenIdToDrawStatus[tokenId] = false;
        }
        // refund tokenId back
        nftMarketPlace.transferFrom(address(this), ownerOfTokenId , tokenId);
        // check movieId (randomResult) has been drawed.
        uint256 count = movieIdToCount[randomMovieId];
        movieIdToCount[randomMovieId] = count + 1;

    }
}