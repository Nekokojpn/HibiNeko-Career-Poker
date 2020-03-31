class NekoCareerPoker {
    constructor() {
        this.trumps = new Array(4);
        this.trumps.push(new Array());
        this.cardinfo = new Array(53);
        this.li = ['S', 'C', 'H', 'D'];
        let cnt = 0;
        for(let i = 0; i < 52; i++) {
            if(i != 0 && i % 13 == 0)
                cnt++;
            this.cardinfo[i] = [this.li[cnt], i % 13 + 1];
        }
        this.cardinfo[52] = ['J', 14];
        this.submits = new Array();
    }
    //init method works with shuffle and divide method.
    init() {
        this.shuffle();
        this.divide();
        //sort client's trump
        for(let i = 0; i < 4; i++)
            this.sort(i);
    }
    shuffle() {
        for(let i = 0; i < 53; i++) {
            let t = this.cardinfo[i];
            let r = Math.ceil(Math.random() * 52);
            this.cardinfo[i] = this.cardinfo[r];
            this.cardinfo[r] = t;
        }
    }
    //divide for 4 players.
    divide() {
        this.ones = new Array(4);
        for(let i = 0, diff = 0; i < 4; i++, diff += 13) {
            this.ones[i] = this.cardinfo.slice(diff, diff + 13);
        }
        this.ones[3].push(this.cardinfo[52]);
    }
    sort(index) {
        let cur = this.ones[index];
        let t = new Array();
        let st = new Array();
        let newones = new Array(cur.length);
        for(let i = 3, flg = false, pos = 0; !flg; i++) {
            if(i == 0)
                flg = true;
            for(let j = 0, l = cur.length; j < l; j++) {
                if(i === cur[j][1])
                    t.push(j);
            }
            //Insert sort code here which kind of trump
            for(let j = 0, l = this.li.length; j < l; j++) {
                for(let k = 0, ll = t.length; k < ll; k++) {
                    if(cur[t[k]][0] == this.li[j])
                        st.push(cur[t[k]]);
                }
            }
            
            for(let j = 0, l = st.length; j < l; j++) {
                newones[pos++] = st[j];
            }
            t.length = 0;
            if(i == 13)
                i = 0;
            if(i == 2)
                i = -1;
        }
        console.log(st);
        this.ones[index] = st;
    }
    // index: Integer
    // return type: Array<[char, num]>
    getCardInfo(index) {
        return this.ones[index];
    }
};
//Debug 
/*
let nk = new NekoCareerPoker();
nk.init();
*/
module.exports = NekoCareerPoker;