export  class TokenIdModel {
    private _tokenId: number;
    private _isAvaliable: boolean;
    private _owner : string;


    constructor(tokenId: number, isAvaliable: boolean, owner: string) {
        this._tokenId = tokenId;
        this._isAvaliable = isAvaliable;
        this._owner = owner;
    }

    get tokenId(): number {
        return this._tokenId;
    }

    set tokenId(value: number) {
        this._tokenId = value;
    }

    get isAvaliable(): boolean {
        return this._isAvaliable;
    }

    set isAvaliable(value: boolean) {
        this._isAvaliable = value;
    }

    get owner(): string {
        return this._owner;
    }

    set owner(value: string) {
        this._owner = value;
    }
}