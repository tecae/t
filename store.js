/**cell*/
function generateCell(ID) {

    function getAmount() {
        /* випадок 0 */
        while (true) {
            var Amount = Math.floor(Math.random() * 1000);
            if (Amount) break
        }
        /* хибний шлях доопрацювати*/
        if (Amount < 10) {
            Amount *= 100;
        }
        if (Amount < 100) {
            Amount *= 10;
        }
        return Amount
    }
    return { ID: ID, Amount: getAmount() }
}

/** MN */
var Store = {
    lestID: 0,
    M: 10,   // начало с 1
    N: 10,   // начало с 1
    X: 10,
    MN: [],
    setM: function (v) {
        this.M = v;
        //return this.generate();
    },
    setN: function (v) {
        this.N = v;
        //return this.generate();
    },
    setX: function (v) {
        this.X = v;
        // return this.generate();
    },
    generateRow: function () {
        var arr = [];
        for (let index = 0; index <= this.N - 1; index++) {
            arr.push(generateCell(this.lestID += 1));
        }
        return arr;
    },
    generate: function () {
        this.MN = [];
        for (let index = 0; index <= this.M - 1; index++) {
            this.MN.push(this.generateRow());
        }
        return this.MN;
    },
    countSumM: function (M) {
        var count = 0;
        for (let index = 0; index < this.MN[M].length; index++) {
            count += this.MN[M][index].Amount;
        }
        return count;
    },
    countSumN: function (N) {
        var count = 0;
        for (let index = 0; index < this.MN.length; index++) {
            count += this.MN[index][N].Amount;
        }
        return count;
    },
    countAverageM: function (M) {
        return (this.countSumM(M) / this.MN[M].length).toFixed(1);
    },
    countAverageN: function (N) {
        return (this.countSumN(N) / this.MN.length).toFixed(1);
    },
    addRow: function () {
        var addRow = this.generateRow()
        this.MN.push(addRow);
        return addRow;
    },
    delRow: function (v) {
        var delRow = this.MN[v];
        this.MN.splice(v, 1);
        return delRow;
    },
    getAmount:function(M,N){
        return this.MN[M][N].Amount;
    },
    setAmount:function(M,N,V){
        this.MN[M][N].Amount = V;
    },

}
// /**TEST */
// console.log(/**TEST */);

// /** TEST */
// for (let index = 0; index < 100; index++) {
//     console.log(generateCell(index + 1))
// }

// Store.M = 10;
// Store.N = 10;

// console.log(Store.generateRow());

// console.log(Store.generate());
// /** lestID не меняется */
// console.log(Store.setM(10));
// console.log(Store.setN(10));

// console.log(Store.countSumM(0));


// console.log(Store.countSumN(4));

// console.log(Store.countAverageM(1));

// console.log(Store.countAverageN(2));

// console.log(Store.addRow());
// console.log(Store.MN);
// console.log(Store.delRow(4));
// console.log(Store.MN);

// console.log(Store.getAmount(1,2));
// console.log(Store.setAmount(1,2,341));
// console.log(Store.getAmount(1,2));
