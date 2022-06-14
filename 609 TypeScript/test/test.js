class test {
    constructor(pr1, pr2) {
        this.pr1 = pr1;
        this.pr2 = pr2;
    }
}
let test1 = new test("mimi", "mama");
let test2 = new test("hehe", "huhu");
let test3 = new test("ahihi", "ahuhu");
let test4 = new test("meme", "momo");
let test5 = new test("ahi", "ahu");

let arr = [test1, test2, test3, test4, test5];

const findAhihi = (element) => element.pr1 == "ahihie";

var indexAhihi = arr.findIndex(findAhihi);
console.log(indexAhihi);
var removeAhihi = arr.splice(indexAhihi, 1);
