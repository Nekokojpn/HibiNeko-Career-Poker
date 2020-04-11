export default class Kind {
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
    getKindChar(_kind) {
        switch(_kind) {
            case this.Spade:
                return 'S';
            case this.Clover:
                return 'C';
            case this.Heart:
                return 'H';
            case this.Dia:
                return 'D';
            case this.Joker:
                return 'J';
            default:
                break;
        }
    }
}
//module.exports = Kind;