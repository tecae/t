
function drav(MN) {
 
    var matrix = document.getElementById("matrix");
    if (matrix.children[0]) {
        matrix.removeChild(matrix.children[0]);
    }
    var table = document.createElement("table")
    table.id = "MT";
    table.className = "MN";
    for (let y = 0; y < MN.length; y++) {
        var tr = document.createElement("tr");
        tr.id = y;
        for (let x = 0; x < MN[y].length; x++) {

            var td = document.createElement("td"); /** комірка даних випадкових чисел */
            td.innerText = MN[y][x].Amount;
            td.classList.add("cel", "b");

            td.onclick = function (evnt) {
                var M = evnt.target.parentElement.id;
                var N = evnt.target.cellIndex;
                Store.setAmount(M, N, Store.getAmount(M, N) + 1);
                drav(Store.MN);
            };
            td.onmouseover = function (evnt) {
                // встановити новий стиль
                var x = Store.X;
                var range = 100;//!!! <<<< На скільки наближено -100 +100
                var table = evnt.target.parentElement.parentElement; // document.getElementById("MT");
                // evnt.target.className = "";

                for (var i = 0, row; row = table.rows[i]; i++) {
                    //if (i > table.rows.length - 1) continue;
                    /** лишний проход по последней строчке */
                    for (var j = 0, col; col = row.cells[j]; j++) {
                        //if (i > row.cells.length - 2) continue;
                        /** лишний проход по двум правим колонкам */
                        var varR = 1 * col.innerText - (1 * evnt.target.innerText);
                        /**  4<5<6<7<  8  >9>10>11>12 */

                        if (!x) break; //<<<<

                        if (varR == 0) {
                            col.classList.toggle("same");
                            x -= 1;
                        } else if (varR < 0 && varR >= -1 * range) {
                            col.classList.toggle("less");
                            x -= 1;
                        } else if (varR > 0 && varR <= range) {
                            col.classList.toggle("more");
                            x -= 1;
                        }
                    }
                }
            };
            td.onmouseout = function (evnt) {
                // встановити стиль по заповчуванню
                for (var i = 0, row; row = table.rows[i]; i++) {
                    // if (i > table.rows.length - 1) continue;
                    for (var j = 0, col; col = row.cells[j]; j++) {
                        // if (i > row.cells.length - 2) continue;
                        col.classList.remove("same", "less", "more");
                    }
                };
            };
            tr.appendChild(td);
        }
        var td = document.createElement("td");/** Права колонка сумма по рядку */
        td.classList.add("cel", "cel-sum");
        td.innerText = Store.countSumM(y);
        td.onmouseover = function (evnt) {
            // встановити новий стиль
            var sum = 1 * evnt.target.innerText;
            for (let index = 0; index < evnt.target.parentElement.children.length - 2; index++) {
                var height = (((1 * evnt.target.parentElement.children[index].innerText) / sum) * 100).toFixed(2);
                evnt.target.parentElement.children[index].innerTextSave =
                    evnt.target.parentElement.children[index].innerText;
                evnt.target.parentElement.children[index].innerText = height + "%";
                evnt.target.parentElement.children[index].style.content = height + "%";
                evnt.target.parentElement.children[index].style.height = height + "%";
            }
        };
        td.onmouseout = function (evnt) {
            // встановити стиль по заповчуванню
            for (let index = 0; index < evnt.target.parentElement.children.length - 2; index++) {
                var temp = evnt.target.parentElement.children[index].innerTextSave;
                evnt.target.parentElement.children[index].innerTextSave =
                    evnt.target.parentElement.children[index].innerText;
                evnt.target.parentElement.children[index].innerText = temp;
                evnt.target.parentElement.children[index].style.content = "";
                evnt.target.parentElement.children[index].style.height = "0%";
            }
        };


        tr.appendChild(td);

        var td = document.createElement("td"); /** колонка кнопки видалення рядка */
        td.className = ""
        var button = document.createElement("button");
        button.onclick = function (evnt) {
            var id = evnt.target.parentElement.parentElement.id;
            Store.delRow(id);
            drav(Store.MN);
        }
        button.className = "btn";
        button.innerHTML = `<img src="img/del.png" alt="Удалить." width="30" height="30" srcset="">`;
        td.appendChild(button);
        tr.appendChild(td);

        table.appendChild(tr);
    }

    var tr = document.createElement("tr"); /** рядок сума колонці або середнє по колонці */
    tr.classList.add("row");
    for (let N = 0; N < MN[0].length; N++) {
        var td = document.createElement("td");
        td.classList.add("cel", "cel-sum");

        td.innerText = Store.countAverageN(N);

        // td.innerText = Store.countSumN(N);
        // td.onmouseover = function (evnt) {
        //     // встановити новий стиль
        //     // console.log(evnt.target.innerText);
        // };
        // td.onmouseout = function (evnt) {
        //     // встановити стиль по заповчуванню
        //     // console.log(evnt.target.innerText);
        // };



        tr.appendChild(td);
    }
    table.appendChild(tr);
    matrix.appendChild(table);
}

function generate() {
    var M = document.getElementById("valM");
    Store.M = M.value;
    var N = document.getElementById("valN");
    Store.N = N.value;
    var MN = Store.generate();
    drav(MN);
}
function add() {
    Store.addRow();
    drav(Store.MN)
}
