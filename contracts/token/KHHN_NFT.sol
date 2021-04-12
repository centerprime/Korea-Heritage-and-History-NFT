pragma solidity ^0.8.0;

import "./ERC721/ERC721.sol";

contract ERC721_TOKEN is ERC721 {


    constructor () public ERC721("Korea Heritage and History NFT", "KHHN")
    {}

    /**
    * create NFT token
    */
    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId,
        string memory  _IPFSHASH
    ) public
    {
        super._mint(_to, _tokenId);
        super._setIPFSHASH(_tokenId, _IPFSHASH);
    }


}