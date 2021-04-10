pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract ERC721_TOKEN is ERC721 {

    constructor (string memory _name, string memory _symbol) public
    ERC721(_name, _symbol)
    {
    }

    /**
    * create NFT token
    */
    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) public
    {
        super._mint(_to, _tokenId);
        // super._setTokenURI(_tokenId, _tokenURI);
    }

}