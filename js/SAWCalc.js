
function calculateSAW(){
    var tabData = document.getElementsByName("data[]");
    var bobotData = document.getElementsByName("weightData[]");
    var maxBobotKritData = document.getElementsByName("weightP[]");
    var dataKet;
    var lenData = document.getElementById("jmlData").value;
    var lenKrit = document.getElementById("jmlKrit").value;
    var arrayData = Array();
    var arrayBobot = Array();
    var maxBobotKrit = Array();
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

    // converting into Array
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

    for (let i = 0; i < lenKrit; i++) {
        maxBobotKrit[i] = maxBobotKritData[i]
        maxBobotKrit[i] = parseFloat(maxBobotKrit[i].value);
        limitData[i] = limData(maxBobotKrit[i]);
    }

    // Transpose Matrix Data
    newArrayData = transposeArray(arrayData);

    // Find Max and Min and Weight Limitation
    for (let i = 0; i < newArrayData.length ; i++) {
        topVal[i] = MaxValue(newArrayData[i]);
        lowVal[i] = MinValue(newArrayData[i]);
    }

    // Convert Matrix Data -> Weight Limitation
    for (let i = 0; i < lenKrit; i++) {
        dataConv1[i] = [];
        for (let j = 0; j < lenData; j++) {
            dataConv1[i][j] = ConvertData(newArrayData[i][j], limitData[i], dataKetValue[i]);
        }
    }
    dataConv1 = [
        [1, 4, 4, 4, 4],
        [4, 3, 2, 2, 1],
        [5, 3, 3, 3, 3],
        [5, 5, 5, 3, 3],
        [3, 3, 3, 3, 3]
    ];
    // Find Max and Min Data From dataConvert
    for (let i = 0; i < lenKrit; i++) {
        maxDataConv[i] = MaxValue(dataConv1[i]);
        minDataConv[i] = MinValue(dataConv1[i]);
        dataConv2[i] = [];
        if (dataKetValue[i] === "Benefit"){
            for (let j = 0; j < lenData; j++) {
                dataConv2[i][j] = dataConv1[i][j]/maxDataConv[i];
                dataConv2[i][j] = dataConv2[i][j]*arrayBobot[i];
            }
        } if (dataKetValue[i] === "Cost") {
            for (let j = 0; j < lenData; j++) {
                dataConv2[i][j] = minDataConv[i]/dataConv1[i][j];
                dataConv2[i][j] = dataConv2[i][j]*arrayBobot[i];
            }
        }
    }
    // reTranspose
    dataConv2 = transposeArray(dataConv2);

    console.log(dataConv2);

    // Multiply with Array Bobot
    for (let i = 0; i < lenData; i++) {
        finalData[i] = []
        sum = 0;
        for (let j = 0; j < lenKrit; j++) {
            finalData[i][j] = dataConv2[i][j];
            sum = sum + finalData[i][j];
        }
        finalData[i] = sum;
    }

    //Test Show Data
    console.log(finalData);

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

function limData(Data) {
    var a, b, c;
    a = 3/4*Data;
    b = 2/4*Data;
    c = 1/4*Data;
    return [a, b, c];
}

function ConvertData(Data, limData, ket) {
    if (ket === "Benefit") {
        if (Data >= limData[0]) {
            return 1;
        } else if (Data < limData[0] || Data >= limData[1]) {
            return 0.75;
        } else if (Data < limData[1] || Data >= limData[2]) {
            return 0.5;
        } else {
            return 0.25;
        }
    } else {
        if (Data >= limData[2]) {
            return 1;
        } else if (Data < limData[2] || Data >= limData[1]) {
            return 0.75;
        } else if (Data < limData[1] || Data >= limData[1]) {
            return 0.5;
        } else {
            return 0.25;
        }
    }
}