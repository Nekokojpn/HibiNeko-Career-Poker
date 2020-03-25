let undefined;
class ClientNekoCareerPoker {
    setCurrentTrump(lists) {
        this.curtrump = lists;
    }
    setSubmits(lists) {
        this.submits = lists;
    }
    updateSubmittable() {
        if(this.submits === undefined) {
            console.error("Call setSubmits and then call updateSubmittable!");
            return;
        }
        if(this.submits.length === 0) {
            for(let i = 0, l = this.curtrump.length; i < l; i++)
                this.curtrump[i][2] = true;
            return;
        }
        
    }
};
let nk = new ClientNekoCareerPoker();