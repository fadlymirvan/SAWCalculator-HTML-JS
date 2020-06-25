function clearAllInput() {
    var printResult = document.getElementById("showdata");
    var printStep = document.getElementById("stepCalculating");
    var rowValue = document.getElementById("rowValue");
    var rowValKet = document.getElementById("rowValKet");
    var weightValue = document.getElementById("weightValue");



    while (printResult.hasChildNodes()) {
        printResult.removeChild(printResult.lastChild);
    }

    while (printStep.hasChildNodes()) {
        printStep.removeChild(printStep.lastChild);
    }

    while (rowValue.hasChildNodes()) {
        rowValue.removeChild(rowValue.lastChild);
    }

    while (rowValKet.hasChildNodes()) {
        rowValKet.removeChild(rowValKet.lastChild);
    }

    while (weightValue.hasChildNodes()) {
        weightValue.removeChild(weightValue.lastChild);
    }
}