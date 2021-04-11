pragma solidity ^0.5.17;

import "../utils/ownership/Ownership.sol";
import "../token/ERC20/ERC20.sol";
import "../token/ERC721/ERC721Full.sol";

contract CenterprimeNFTPool is Ownable {

    event Sent(address indexed payee, uint256 amount, uint256 balance);
    event Received(address indexed payer, uint256 tokenId, uint256 amount, uint256 balance);

    ERC721Full public nftAddress;
    ERC20 public linkAddress;
    uint256 public currentPrice;
    mapping(uint256 => address) public tokenSeller;

    /**
    * @dev Contract Constructor
    * @param _nftAddress address for non-fungible token contract
    * @param _currentPrice initial price
    */
    constructor(address _nftAddress, address _linkAddress, uint256 _currentPrice) public {
        require(_nftAddress != address(0) && _nftAddress != address(this));
        require(_currentPrice > 0);
        nftAddress = ERC721Full(_nftAddress);
        linkAddress = ERC20(_linkAddress);
        currentPrice = _currentPrice;
    }

    /**
    * @dev Deposit _tokenId
    * @param _tokenId uint256 token ID
    */
    function depositToken(uint256 _tokenId) public {
        require(msg.sender != address(0) && msg.sender != address(this));
        require(msg.sender == nftAddress.ownerOf(_tokenId),"You are Owner of NFT");
        nftAddress.transferFrom(msg.sender, address(this), _tokenId);
        tokenSeller[_tokenId] = msg.sender;
    }

    /**
    * @dev Purchase _tokenId
    * @param _tokenId uint256 token ID
    */
    function purchaseTokenETH(uint256 _tokenId) public payable {
        require(msg.sender != address(0) && msg.sender != address(this),"wrong addresses interaction");
        // require(msg.value >= currentPrice,"not enough ETH funds");
        address temp = tokenSeller[_tokenId];
        address payable Seller = address(uint160(temp));
        Seller.transfer(msg.value);
        nftAddress.transferFrom(address(this), msg.sender, _tokenId);

        emit Received(msg.sender, _tokenId, msg.value, address(this).balance);
    }

    /**
    * @dev Purchase _tokenId
    * @param _tokenId uint256 token ID
    * @param _amount uint256 amount of ERC20 Link
    */
    function purchaseTokenLink(uint256 _tokenId, uint256 _amount) public returns (bool) {
        require(msg.sender != address(0) && msg.sender != address(this),"wrong addresses interaction");
        // require(_amount >= currentPrice,"not enough Link funds");
        address temp = tokenSeller[_tokenId];
        require(linkAddress.transferFrom(msg.sender, temp, _amount),"Not Enough tokens Transfered");
        nftAddress.transferFrom(address(this), msg.sender, _tokenId);
        emit Received(msg.sender, _tokenId, _amount, address(this).balance);
        return true;
    }

    /**
    * @dev set _currentPrice
    */
    function setCurrentPrice(uint256 _currentPrice) public onlyOwner {
        require(_currentPrice >= 0);
        currentPrice = _currentPrice;
    }

    function getCurrentRate() public view returns (uint256) {
        return currentPrice;
    }

}