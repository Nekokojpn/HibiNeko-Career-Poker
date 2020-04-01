const li = ['S', 'C', 'H', 'D', 'J'];
class ClientNekoCareerPoker {
    //lists: Array<[char, Integer]> : player's trumps
    constructor(lists) {
        this.trumps = lists;
        this.submits = new Array();
        //Add submittable flag to elements.
        this.trumps.forEach((elm) => elm.push(false));
        //Add select flag to elements.
        this.trumps.forEach((elm) => elm.push(false));
        this.selects = new Array();
    }
    //lists: Array<[char, Integer]> : player's trumps
    setCurrentTrump(lists) {
        this.trumps = lists;
    }
    //lists: Array<[char, Integer]> : Trumps submitted
    setSubmits(lists) {
        this.submits = lists;
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
        if(this.selects.length < this.submits.length) {
            this.trumps.forEach((elm) => {
                if(elm[1] != list[1])
                    elm[2] = false;
            });
            this.selects.push(list);
            if(this.selects.length === this.submits.length) {
                //TODO: here
            }
        }
    }
    //get player's trumps
    getTrumps() {
        return this.trumps;
    }

    //private:
    genSubmittableList(list) {
        let can = new Array();
        for(let i = list[1] + 1; ; i++) {
            let t = this.trumps.find((elm) => elm[3] === false && elm[1] === i);
            if(t !== void 0) {
                t[2] = t[3] = true;
                t = this.trumps.find((elm) => elm[2] === false && elm[1] === i);
                while(t !== void 0) {
                    t[2] = true;
                    t = this.trumps.find((elm) => elm[2] === false && elm[1] === i);
                }
            }
            else {
                t = this.trumps.find((elm) => elm[3] === true && elm[1] === i);
                while(t !== void 0) {
                    t[2] = false;
                    t = this.trumps.find((elm) => elm[2] === true && elm[1] === i);
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
};
let test = [[ 'C', 4 ],  [ 'C', 5 ],
[ 'S', 8 ],  [ 'S', 9 ],
[ 'H', 9 ],  [ 'D', 9 ],
[ 'D', 10 ], [ 'D', 11 ],
[ 'S', 12 ], [ 'H', 12 ],
[ 'D', 12 ], [ 'S', 1 ],
[ 'H', 2 ],  [ 'J', 14 ]];
let nk = new ClientNekoCareerPoker(test);
nk.setSubmits([['C', 3], ['H', 3]]);
nk.updateSubmittable();
nk.select(['S', 9]);
nk.select(['H', 9]);
console.log(nk.getTrumps());