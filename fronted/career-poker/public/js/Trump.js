export default class Trump {
    constructor(_kind, _rank) {
        this.f_kind = _kind;
        this.f_rank = _rank;
        this.f_select = false;
        this.f_submittable = false;
    }
    get kind() {
        return this.f_kind;
    }
    isJoker() {
        return this.f_kind === kind.Joker;
    }
    //return type: Integer
    get rank() {
        return this.f_rank;
    }
    get isSelect() {
        return this.f_select;
    }
    setSelect(value) {
        this.f_select = value;
    }
    get isSubmittable() {
        return this.f_submittable;
    }
    setSubmittable(value) {
        this.f_submittable = value;
    }
}
//module.exports = Trump;