// contracts/DogNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts@v4.9.6/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@v4.9.6/utils/Counters.sol";
import "@openzeppelin/contracts@v4.9.6/access/Ownable.sol";

contract DogNFT is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    constructor() ERC721("DogZilla VIP Pass", "DOGZ") {}

    function addEdition(address owner, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function numberOfEditions() public view returns (uint256) {
        return _tokenIds.current();
    }

    function numberOfNfts (address nftOwner) public view virtual returns (uint256) {

        uint256 items;
        for (uint256 i = 0; i<numberOfEditions(); i++) 
        {
            if(nftOwner == ownerOf(i))   
                items++;
        }
        return items;
    }

    function ownerOfNfts(address nftOwner) public view virtual returns (uint256 [] memory) {

        uint256 numberOfItems = numberOfNfts(nftOwner);
        uint256 counter       = 0;

        uint256 [] memory ids = new uint256[](numberOfItems);
        for (uint256 i = 0; i<numberOfEditions(); i++) 
        {
            if(nftOwner == ownerOf(i)) {
                ids[counter] = i;
                counter++;
            }               
        }
        return ids;
    }

    function burn(uint256 tokenId) public virtual {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _burn(tokenId);
    }

}