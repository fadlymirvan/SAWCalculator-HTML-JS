
function calculateSAW(){
    var tabData = document.getElementsByName("data[]");
    var bobotData = document.getElementsByName("weightData[]");
    var dataKet;
    var printStep = document.getElementById("stepCalculating");
    var lenData = document.getElementById("jmlData").value;
    var lenKrit = document.getElementById("jmlKrit").value;
    var limitDataTotal = document.getElementById("jmlBobotP").value;
    var printResult = document.getElementById("showdata");
    var arrayData = Array();
    var arrayBobot = Array();
    var newArrayData;
    var topVal = Array();
    var lowVal = Array();
    var counter = 0
    var dataConv1 = Array();
    var maxDataConv = Array();
    var minDataConv = Array();
    var dataConv2 = Array();
    var limitData = Array();
    var finalData = Array();
    var sum;
    var dataKetValue = Array();

    while (printResult.hasChildNodes()) {
        printResult.removeChild(printResult.lastChild);
    }

    while (printStep.hasChildNodes()) {
        printStep.removeChild(printStep.lastChild);
    }

    // converting into Array
    printStep.appendChild(document.createTextNode("Matrix Awal : "));
    printStep.appendChild(document.createElement("br"));
    for (let i = 0; i < lenData; i ++) {
        arrayData[i] = [];
        for (let j = 0; j < lenKrit; j++) {
            arrayData[i][j] = tabData[counter];
            arrayData[i][j] = parseFloat(arrayData[i][j].value);
            counter++;
        }
    }

    for (let i = 0; i < lenKrit; i++) {
        dataKet = document.getElementById("selectKet"+(i+1));
        dataKetValue[i] = dataKet.options[dataKet.selectedIndex].value;
    }

    for (let i = 0; i < lenKrit; i++) {
        arrayBobot[i] = bobotData[i];
        arrayBobot[i] = parseFloat(arrayBobot[i].value);
    }

    limitDataTotal = parseFloat(limitDataTotal);

    // Print First Step to HTML
    printStep.appendChild(createTable(arrayData));

    // Transpose Matrix Data
    newArrayData = transposeArray(arrayData);

    // Find Max and Min and Weight Limitation
    for (let i = 0; i < newArrayData.length ; i++) {
        topVal[i] = MaxValue(newArrayData[i]);
        lowVal[i] = MinValue(newArrayData[i]);
        limitData[i] = limData(limitDataTotal, topVal[i]);
    }
    // Convert Matrix Data -> Weight Limitation
    for (let i = 0; i < lenKrit; i++) {
        dataConv1[i] = [];
        for (let j = 0; j < lenData; j++) {
            dataConv1[i][j] = ConvertData(newArrayData[i][j], limitData[i], limitData[i].length, dataKetValue[i]).toFixed(2);
        }
    }

    // Print Matrix Conv
    printStep.appendChild(document.createElement("br"));
    printStep.appendChild(document.createTextNode("Matrix Konversi ke Bobot : "));
    printStep.appendChild(document.createElement("br"));
    printStep.appendChild(createTable(transposeArray(dataConv1)));

    // Find Max and Min Data From dataConvert
    var dataConv2flag = Array();
    for (let i = 0; i < lenKrit; i++) {
        maxDataConv[i] = MaxValue(dataConv1[i]);
        minDataConv[i] = MinValue(dataConv1[i]);
        dataConv2[i] = [];
        dataConv2flag[i] = [];
        if (dataKetValue[i] === "Benefit"){
            for (let j = 0; j < lenData; j++) {
                dataConv2[i][j] = dataConv1[i][j]/maxDataConv[i];
                var a = dataConv2[i][j]*arrayBobot[i];
                dataConv2[i][j] = a;
                dataConv2flag[i][j] = a.toFixed(2);
            }
        } if (dataKetValue[i] === "Cost") {
            for (let j = 0; j < lenData; j++) {
                dataConv2[i][j] = minDataConv[i]/dataConv1[i][j];
                var b = dataConv2[i][j]*arrayBobot[i];
                dataConv2[i][j] = b;
                dataConv2flag[i][j] = b.toFixed(2);
            }
        }
    }

    // reTranspose
    dataConv2 = transposeArray(dataConv2);

    // Print Matrix Normal
    printStep.appendChild(document.createElement("br"));
    printStep.appendChild(document.createTextNode("Matrix Normalisasi : "));
    printStep.appendChild(document.createElement("br"));
    printStep.appendChild(createTable(transposeArray(dataConv2flag)));

    // Multiply with Array Bobot
    for (let i = 0; i < lenData; i++) {
        finalData[i] = []
        sum = 0;
        for (let j = 0; j < lenKrit; j++) {
            finalData[i][j] = dataConv2[i][j];
            sum = sum + finalData[i][j];
        }
        finalData[i] = sum.toFixed(2);
    }

    // Show Data
    var lenfinalData = finalData.length;
    showData(finalData, lenfinalData);
}

function transposeArray(matrixData) {
    return matrixData[0].map((col, c) => matrixData.map((row, r) => matrixData[r][c]));
}

function MaxValue(Data) {
    return Math.max.apply(null, Data);
}

function MinValue(Data) {
    return Math.min.apply(null, Data);
}

function limData(limData, Data) {
    var limitDataW = [];
    for (let i = 0; i < limData; i++) {
        limitDataW[i] = i/limData * Data;
    }
    return limitDataW;
}

function ConvertData(Data, limData, lenLimData, ket) {
    if (ket === "Benefit") {
        let a = true;
        let i = 0;
        while(a) {
            if (limData[i] === 0){
                i++;
            } else if (Data <= limData[i]) {
                a = false;
                return i/lenLimData;
            } else if (i === lenLimData){
                a = false;
                return 1;
            } else {
                i++;
            }
        }
    } else {
        let b = true;
        limData = limData.sort().reverse();
        let i = 0;
        while(b) {
            if (limData[i] === 0){
                b = false;
                return 1;
            } else if (Data > limData[i]) {
                b = false;
                return (i+1)/lenLimData;
            } else {
                i++;
            }
        }
    }
}

function showData(data, lenData) {
    var printResult = document.getElementById("showdata");
    printResult.appendChild(document.createTextNode("Hasil Akhir : "));
    printResult.appendChild(document.createElement("br"));
    var maxVal = MaxValue(data);
    var indexMaxVal = Array();

    for (let i = 0; i < lenData; i++) {
        if ((data[i]) >= maxVal) {
            indexMaxVal.push(i);
        }
    }

    for (let i = 0; i < lenData; i++) {
        printResult.appendChild(document.createTextNode("Data " + (i+1) + " : "));
        if (data[i] === maxVal) {
            // var markRes = document.createElement("span");
            // var c = document.appendChild(document.createTextNode(data[i]));
            // markRes.appendChild(c);
            // printResult.appendChild(markRes);
            // markRes.style.color = "00FF00";
            var container = document.createElement("span");
            var text = document.createTextNode("data[i]");
            container.appendChild(text);
            printResult.appendChild(container);

            container.style.color = "blue";
        } else {
            printResult.style.color = "000000";
            printResult.appendChild(document.createTextNode(data[i]));
        }
        printResult.appendChild(document.createElement("br"));
    }
    printResult.appendChild(document.createElement("br"));

    for (let j = 0; j < indexMaxVal.length; j++) {
        printResult.appendChild(document.createTextNode("Nilai Tertinggi ada pada Data ke-" + (j+1)));
        printResult.appendChild(document.createTextNode(", dengan Nilai : " + maxVal));
        printResult.appendChild(document.createElement("br"));
    }
}

function createTable(Data) {
    var table =  document.createElement("table");
    for (let i = 0; i < Data.length; i++) {
        var row = document.createElement("tr");
        for (let j = 0; j < Data[i].length; j++) {
            var col = document.createElement("td");
            col.textContent = Data[i][j];
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    return table;
}