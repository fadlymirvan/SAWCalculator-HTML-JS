
function calculateSAW(){
    var tabData = document.getElementsByName("data[]");
    var bobotData = document.getElementsByName("weightData[]");
    var dataKet;
    var lenData = document.getElementById("jmlData").value;
    var lenKrit = document.getElementById("jmlKrit").value;
    var limitDataTotal = document.getElementById("jmlBobotP").value;
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

    limitDataTotal = parseFloat(limitDataTotal);

    // Transpose Matrix Data
    newArrayData = transposeArray(arrayData);

    // Find Max and Min and Weight Limitation
    for (let i = 0; i < newArrayData.length ; i++) {
        topVal[i] = MaxValue(newArrayData[i]);
        lowVal[i] = MinValue(newArrayData[i]);
        limitData[i] = limData(limitDataTotal, topVal[i]);
    }
    console.log(limitData);
    // Convert Matrix Data -> Weight Limitation
    for (let i = 0; i < lenKrit; i++) {
        dataConv1[i] = [];
        for (let j = 0; j < lenData; j++) {
            dataConv1[i][j] = ConvertData(newArrayData[i][j], limitData[i], limitData[i].length, dataKetValue[i]);
        }
    }

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

    // Show Data
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