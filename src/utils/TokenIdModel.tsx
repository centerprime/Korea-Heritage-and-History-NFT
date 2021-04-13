export class TokenIdModel {
    _tokenId: string;
    _isAvaliable: boolean;
    _owner : string;

    constructor() {
        this._tokenId = "0";
        this._isAvaliable = true;
        this._owner = "";
    }

}