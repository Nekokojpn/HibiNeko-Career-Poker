class Kind {
    constructor() {
        this.Spade = 1;
        this.Clover = 2;
        this.Heart = 3;
        this.Dia = 4;
        this.Joker = 5;
    }
    getKind(_cKind) {
        switch (_cKind) {
            case 'S':
                return this.Spade;
            case 'C':
                return this.Clover;
            case 'H':
                return this.Heart;
            case 'D':
                return this.Dia;
            case 'J':
                return this.Joker;
            default:
                break;
        }
    }
}
module.exports = Kind;