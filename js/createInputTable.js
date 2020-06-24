function generateTable() {
    var dataLen = document.getElementById("jmlData").value;
    var rowValue = document.getElementById("rowValue");
    var rowValKet = document.getElementById("rowValKet");
    var colLen = document.getElementById("jmlKrit").value;
    var weightValue = document.getElementById("weightValue");
    // var weightValPValue = document.getElementById("weightValP");

    while (rowValue.hasChildNodes()) {
        rowValue.removeChild(rowValue.lastChild);
    }

    rowValue.appendChild(document.createTextNode("Data"));
    rowValue.appendChild(document.createElement("br"));

    for (let i = 0; i < dataLen; i++){
        rowValue.appendChild(document.createTextNode("Data Ke-" + (i + 1)));
        rowValue.appendChild(document.createElement("br"));

        for (let j = 0; j < colLen; j++) {
            rowValue.appendChild(document.createTextNode("Data Kriteria " + (j + 1) + " "));
            var rowInput = document.createElement("input");
            rowInput.type = "text";
            rowInput.id = "data[]";
            rowInput.name = "data[]";
            rowValue.appendChild(rowInput);
            rowValue.appendChild(document.createElement("br"));
        }
        rowValue.appendChild(document.createElement("br"));
    }

    for (let i = 0; i < colLen; i++) {
        var ket;
        ket = ["Benefit", "Cost"];
        rowValKet.appendChild(document.createTextNode("Keterangan Kriteria ke-" + (i + 1)));
        rowValKet.appendChild(document.createElement("br"));
        var rowValKetInput = document.createElement("select");
        rowValKetInput.id = "selectKet"+(i+1);
        rowValKetInput.name = "selectKet"+(i+1);
        rowValKet.appendChild(rowValKetInput);
        rowValKet.appendChild(document.createElement("br"));
        for (let k = 0; k < ket.length; k++) {
            var rowValKetOpt = document.createElement("option");
            rowValKetOpt.value = ket[k];
            rowValKetOpt.text = ket[k];
            rowValKetInput.appendChild(rowValKetOpt);
        }
        rowValKet.appendChild(document.createElement("br"));
    }

    while (weightValue.hasChildNodes()) {
        weightValue.removeChild(weightValue.lastChild);
    }

    weightValue.appendChild(document.createTextNode("Bobot"));
    weightValue.appendChild(document.createElement("br"));

    for (let k = 0; k < colLen; k++) {
        weightValue.appendChild(document.createTextNode("Bobot " + (k + 1) + " "));
        var weightInput = document.createElement("input");
        weightInput.type = "text";
        weightInput.id = "weightData[]";
        weightInput.name = "weightData[]";
        weightValue.appendChild(weightInput);
        weightValue.appendChild(document.createElement("br"));
    }
}