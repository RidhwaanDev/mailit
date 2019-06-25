exports.Commit = function Commit(message){
    this.message = message;
    this.id = id;
    this.counter = 0;
};

Commit.prototype.simplehash = function() {
    let hash = 0;
    if (this.message.length == 0) {
        return hash;
    }
    for (let i = 0; i < this.message.length; i++) {
        let ch = this.message.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
}
