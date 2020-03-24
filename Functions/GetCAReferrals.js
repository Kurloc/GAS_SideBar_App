function GetCAReferrals() {
    var myReferrals = {};
    var dashBoardSheet = SpreadsheetApp.openByUrl(environment.sideBarDashBoarURL).getSheetByName('ReferralsToReview');
    var lastRow = dashBoardSheet.getLastRow();
    var lastCol = dashBoardSheet.getLastColumn();
    var dashBoardObject = dashBoardSheet.getSheetValues(1, 1, lastRow, lastCol);
    var tableIndexCount = 0;
    for (var i=0; i < lastRow; i++) {
        if (dashBoardObject[i][6] === userEmail) {
            myReferrals[tableIndexCount] = ({patientName: dashBoardObject[i][2], index: dashBoardObject[i][0],
                mrn: dashBoardObject[i][3], socClinician: dashBoardObject[i][4],
                caEmail: dashBoardObject[i][5], intakeEmail: dashBoardObject[i][6],
                reviewBy: dashBoardObject[i][7], delayBoolean: dashBoardObject[i][8]
            });
            tableIndexCount += 1;
        }
    }
    const tableColumnNames = ['patientName', 'socClinician', 'caEmail', 'reviewBy', 'delayBoolean'];
    console.log({tableRowValues: myReferrals, columnNames: tableColumnNames, rowCount: tableIndexCount});
    return {tableRowValues: myReferrals, columnNames: tableColumnNames, rowCount: tableIndexCount}
}

function GenerateCAReferralTable() {
    referralObject = GetMyReferrals();
    myReferrals = referralObject.tableRowValues;
    columnNames = referralObject.columnNames;
    html_table = '<table class="my-referrals-table" id="my-referrals-table">' +
        '<thead>' +
        '<tr>' +
        GenerateTableColumnsHTML(columnNames, 'my-referrals-table', ['mrn', 'index', 'date']) +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        GenerateTableRowsHTML(columnNames, referralObject, ['mrn', 'index', 'date']) +
        '</tbody>' +
        '</table>';
    console.log(html_table);
    return html_table;
}
function GenerateTableColumnsHTML(columnNamesArray, tableName, valuesToHide) {
    var columnNamesHtml = '<thead>';
    for (i=0; i < columnNamesArray.length; i++){
        for (var iii=0; iii < valuesToHide.length; iii++) {
            var toAdd = "";
            if (columnNamesArray[i] === valuesToHide[iii]){
                var toAdd = '<th hidden class=name-column-' + tableName + '>' + columnNamesArray[i] + '</th>';
                break
            } else {
                var toAdd = '<th class=name-column-' + tableName + '>' + columnNamesArray[i] + '</th>';
            }
        }
        columnNamesHtml += toAdd;
    }
    return columnNamesHtml;
}
function GenerateTableRowsHTML(columnNamesArray, referralTableObject, valuesToHide) {
    var columnRowsHtml = '';
    for (var ii=0; ii < referralTableObject.rowCount; ii++) {
        columnRowsHtml += '<tr>';
        for (var i=0; i < columnNamesArray.length; i++) {
            var columnName = columnNamesArray[i];
            for (var iii=0; iii < valuesToHide.length; iii++) {
                var toAdd = "";
                if (columnName === valuesToHide[iii]){
                    if(columnName === 'reviewBy'){
                        toAdd = '<td> ' + referralTableObject.tableRowValues[ii][columnName].toLocaleDateString() + '</td>';
                    } else {
                        toAdd = '<td> ' + referralTableObject.tableRowValues[ii][columnName] + '</td>';
                        break
                    }
                } else {
                    toAdd = '<td> ' + referralTableObject.tableRowValues[ii][columnName] + '</td>';
                }
            }
            columnRowsHtml += toAdd;
        }
        columnRowsHtml += '</tr>';
    }
    return columnRowsHtml;
}
