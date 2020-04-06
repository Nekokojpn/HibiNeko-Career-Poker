const li = ['S', 'C', 'H', 'D', 'J'];
//let Trump = require('./Trump.js');
//let Kind = require('./Kind.js');
import Trump from './Trump.js';
import Kind from './Kind.js';

export default class ClientNekoCareerPoker {
    //lists: Array<[char, Integer]> : player's trumps
    constructor(lists) {
        this.kind = new Kind();
        this.f_trumps = new Array();
        lists.forEach(elm => this.trumps.push(new Trump(this.kind.getKind(elm[0]), elm[1])));
        this.f_submits = new Array();
        this.f_selects = new Array();
    }
    //lists: Array<[char, Integer]> : Trumps submitted
    setSubmits(lists) {
        this.f_submits.length = 0;
        lists.forEach(elm => this.submits.push(new Trump(this.kind.getKind(elm[0]), elm[1])));
    }
    updateSubmittable() {
        //No cards submitted
        if(this.submits.length === 0) {
            this.trumps.forEach((elm) => elm[2] = true);
            return;
        }
        for(let i = 0, l = this.submits.length; i < l; i++) {
            let t = this.genSubmittableList(this.submits[i]);
        }

    }
    select(list) {
        this.selects.push(new Trump(this.kind.getKind(list[0]), list[1]));
        //
        this.trumps.forEach(elm => {
            if(elm.rank !== list[1])
                elm.setSubmittable(false);
            if(this.submits.length === this.selects.length)
                elm.setSubmittable(false);
        });
    }
    //get player's trumps
    get trumps() {
        return this.f_trumps;
    }
    get submits() {
        return this.f_submits;
    }
    get selects() {
        return this.f_selects;
    }
    get rawTrumps() {
        let lists = new Array();
        this.trumps.forEach(elm => lists.push([this.kind.getKindChar(elm.kind), elm.rank, elm.isSubmittable]));
        return lists;
    }
    //private:
    genSubmittableList(list) {
        let can = new Array();
        for(let i = list.rank + 1; ; i++) {

            let t = this.trumps.find((elm) => !elm.isSelect && elm.rank === i);
            if(t !== void 0) {
                t.setSubmittable(true);
                t.setSelect(true);
                t = this.trumps.find((elm) => !elm.isSubmittable && elm.rank === i);
                while(t !== void 0) {
                    t.setSubmittable(true);
                    t = this.trumps.find((elm) => !elm.isSubmittable && elm.rank === i);
                }
            }
            else {
                t = this.trumps.find((elm) => elm.isSelect && elm.rank === i);
                while(t !== void 0) {
                    t.setSubmittable(false);
                    t = this.trumps.find((elm) => elm.isSubmittable && elm.rank === i);
                }
            }
            if(i == 13)
                i = 0;
            else if(i == 2)
                i = 13;
            else if(i == 14)
                break;
        }
        return can;
    }
    submit() {
        if(this.submits.length !== this.selects.length) {
            console.log("ちゃんと選べバーカ");
            return null;
        }
        this.f_submits = this.sort(this.f_submits);
        this.f_selects = this.sort(this.f_selects);
        let map = new Map([
            ['restrict', this.restrict],
            [5, this.five],
            [7, this.seven],
            [10, this.ten],
            [11, this.isJBack]
        ]);
        this.f_submits.length = 0;
        this.f_selects.forEach(elm => {
            this.submits.push(new Trump(elm.kind, elm.rank));
            for(let i = 0, l = this.trumps.length; i < l; i++) {
                let cur = this.trumps[i];
                if(cur.rank === elm.rank && cur.kind === elm.kind) {
                    this.trumps.splice(i, 1);
                    l--;
                }
            }
        });

        this.f_selects.length = 0;
        return map;
    }
    addTrumps(lists) {
        lists.forEach(elm => this.trumps.push(new Trump(this.kind.getKind(elm[0]), elm[1])));
        this.f_trumps = this.sort(this.trumps);
    }
    deleteTrumps(lists) {
        for(let i = 0, l = lists.length; i < l; i++) {
            let cur = lists[i];
            for(let j = 0, ll = this.trumps.length; j < ll; j++) {
                if(cur[1] === this.trumps[j].rank && cur[0] === this.kind.getKindChar(this.trumps[j].kind)) {
                    this.trumps.splice(j, 1);
                    ll--;
                }
            }
        }
    }
    //Return type: null | array
    get restrict() {
        for(let i = 0, l = this.submits.length; i < l; i++) {
            if(this.selects[i].kind !== this.submits[i].kind)
                return null;
        }
        let restrictKind = new Array();
        this.selects.forEach(elm => restrictKind.push(this.kind.getKindChar(elm.kind)));
        return restrictKind;
    }
    get five() { return this.countNumber(5) }
    get seven() { return this.countNumber(7) }
    get ten() { return this.countNumber(10) }
    get isJBack() { return this.selects.some(elm => elm.rank === 11) }
    countNumber(n) {
        let i = 0;
        this.submits.forEach(elm => {
            if(elm.rank === n)
                i++;
        });
        return i;
    }
    sort(lists) {
        let cur = lists;
        let t = new Array();
        let st = new Array();
        let newones = new Array(cur.length);
        for(let i = 3, pos = 0; ; i++) {
            for(let j = 0, l = cur.length; j < l; j++) {
                if(i === cur[j].rank)
                    t.push(j);
            }
            for(let j = 0, l = li.length; j < l; j++) {
                for(let k = 0, ll = t.length; k < ll; k++) {
                    if(cur[t[k]].kind === this.kind.getKind(li[j]))
                        st.push(cur[t[k]]);
                }
            }
            st.forEach(elm => newones[pos++] = elm);
            for(let j = 0, l = st.length; j < l; j++) {
                newones[pos++] = st[j];
            }
            t.length = 0;
            if(i == 13)
                i = 0;
            else if(i == 2)
                i = 13;
            else if(i == 14)
                break;
        }
        return st;
    }
};
//module.exports = ClientNekoCareerPoker;

/*
let test = [[ 'C', 4 ],  [ 'C', 5 ],
[ 'S', 8 ],  [ 'C', 9 ],
[ 'H', 9 ],  [ 'D', 9 ],
[ 'D', 10 ], [ 'D', 11 ],
[ 'S', 12 ], [ 'H', 12 ],
[ 'D', 12 ], [ 'S', 1 ],
[ 'H', 2 ],  [ 'J', 14 ]];
let nk = new ClientNekoCareerPoker(test);

nk.addTrumps([['C', 12]]);
nk.deleteTrumps([['C', 12]]);
nk.setSubmits([['C', 3], ['H', 3]]);
nk.updateSubmittable();
console.log(nk.trumps);
nk.select(['H', 9]);
console.log(nk.rawTrumps);
nk.select(['C', 9]);
console.log(nk.trumps);
nk.trumps.forEach(elm => console.log(elm.isSubmittable));

console.log(nk.submit());

console.log(nk.trumps);
console.log(nk.submits);
console.log(nk.rawTrumps);
*/