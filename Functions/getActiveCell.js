function getActiveCell2() {
        var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
        var a1 = cell.getA1Notation();
        var val = cell.getValue();
        return val;
}
function AddToDashBoard(patientName, mrn, socClinician, clinicalSupervisorEmail, reviewByDate, delayBoolean, site) {
    site = locationName;
    var dashBoardSheet = SpreadsheetApp.openByUrl(environment.sideBarDashBoarURL).getSheetByName('ReferralsToReview');
    var lastRow = dashBoardSheet.getLastRow();
    var lastCol = dashBoardSheet.getLastColumn();
    var dashBoardObject = dashBoardSheet.getSheetValues(2, 2, lastRow, lastCol);
    for (var i=0; i < lastRow; i++) {
        if (dashBoardObject[i][1] != '') {
            console.log(dashBoardObject[i][1]);
        }
        if (dashBoardObject[i][1] === ''){
            var ii = i + 2;
            var alertValues = [
                [todayStringMonthDayYear, patientName, mrn, socClinician,clinicalSupervisorEmail, userEmail,
                    reviewByDate, delayBoolean, site]];
            dashBoardSheet.getRange(ii, 2, 1, 9).setValues(alertValues);
            break;
        }
    }
}
