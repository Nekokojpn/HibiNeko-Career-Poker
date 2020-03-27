class NekoCareerPoker {
    constructor() {
        this.trumps = new Array(4);
        this.trumps.push(new Array());
        this.cardinfo = new Array(53);
        let li = ['S', 'C', 'H', 'D'];
        let cnt = 0;
        for(let i = 0; i < 52; i++) {
            if(i != 0 && i % 13 == 0)
                cnt++;
            this.cardinfo[i] = [li[cnt], i % 13 + 1];
        }
        this.cardinfo[52] = ['J', 14];
        this.submits = new Array();
    }
    //init method works with shuffle and divide method.
    init() {
        this.shuffle();
        this.divide();
        this.sort(0);
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
        let newones = new Array(cur.length);
        let pos = 0;
        for(let i = 3, flg = false; !flg; i++) {
            if(i == 0)
                flg = true;
            for(let j = 0, l = cur.length; j < l; j++) {
                if(i === cur[j][1])
                    t.push(j);
            }
            //Insert sort code here which kind of trump
            
            
            for(let j = 0, l = t.length; j < l; j++) {
                newones[pos++] = cur[t[j]];
            }
            t.length = 0;
            if(i == 13)
                i = 0;
            if(i == 2)
                i = -1;
            
        }
        console.log(cur);
        console.log(newones);
    }
    // index: Integer
    // return type: Array<[char, num]>
    getCardInfo(index) {
        return this.ones[index];
    }
    // list: [char, num]
    // return type: Integer - Failed = -1 
    find(index, list) {
        for(let i = 0, l = this.ones[index].length; i < l; i++) {
            if(this.ones[index][i][1] == list[1] && this.ones[index][i][0] == list[0])
                return i;
        }
        return -1;
    }
    // list: Array<[char, num]>
    submit(index, lists) {
        this.submits.length = 0;
        for(let i = 0, l = list.length; i < l; i++) {
            let t = find(index, list[i]);
            if(t != -1) {
                if(isSubmittable(this.ones[index][t])) {
                    this.submits.push(this.ones[index][t]);
                    this.ones[index].splice(t, 1);
                }
                else {
                    console.error("May be system bug!\nassertion failed! isSubmittable(...) == true");
                }
            }
            else {
                console.error("May be system bug!\nassertion failed! find(...) == true");
            }
        }

    }
    // list: [char, num]
    isSubmittable(list) {
        let cur;
        for(let i = 0, l = this.submits.length; i < l; i++) {
            cur = this.submits[i];
            let elms = genSubmittableList(cur);           
        }
    }
    genSubmittableList(lists) {
        let elms = new Array();
        for(let i = list[1] + 1 != 14 ? list[1] + 1 : 1, flg = false; !flg; i++) {
            if(i == 13)
                i = 0;
            if(i == 2)
                i = -1;
            elms.push('A', i);
            if(i == 0)
                flg = true;
        }
        elms.push(list[0], list[1] - 1);
        return elms;
    }
};
let nk = new NekoCareerPoker();
nk.init();