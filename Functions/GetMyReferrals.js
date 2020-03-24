function GetMyReferrals() {
    var myReferrals = {};
    var dashBoardSheet = SpreadsheetApp.openByUrl(environment.sideBarDashBoarURL).getSheetByName('ReferralsToReview');
    var lastRow = dashBoardSheet.getLastRow();
    var lastCol = dashBoardSheet.getLastColumn();
    var dashBoardObject = dashBoardSheet.getSheetValues(1, 1, lastRow, lastCol);
    console.log(dashBoardObject);
    var tableIndexCount = 0;

    for (var i=0; i < lastRow; i++) {
        if (dashBoardObject[i][6] === userEmail || dashBoardObject[i][5] === userEmail) {
            console.log(dashBoardSheet[i]);
            myReferrals[tableIndexCount] = ({patientName: dashBoardObject[i][2], index: dashBoardObject[i][0],
                                                  mrn: dashBoardObject[i][3], socClinician: dashBoardObject[i][4],
                                                  caEmail: dashBoardObject[i][5], intakeEmail: dashBoardObject[i][6],
                                                  reviewBy: dashBoardObject[i][7], delayBoolean: dashBoardObject[i][8],
                                                  site: dashBoardObject[i][9]
                                                  });
            tableIndexCount += 1;
        }
    }
    const tableColumnNames = ['patientName', 'socClinician', 'caEmail', 'intakeEmail', 'reviewBy', 'delayBoolean', 'site'];
    console.log({tableRowValues: myReferrals, columnNames: tableColumnNames, rowCount: tableIndexCount});
    return {tableRowValues: myReferrals, columnNames: tableColumnNames, rowCount: tableIndexCount}
}

function GenerateMyReferralTable() {
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
                        toAdd = '<td id="my-referrals-' + columnName + '">' + referralTableObject.tableRowValues[ii][columnName].toLocaleDateString() + '</td>';
                    } else {
                        toAdd = '<td id="my-referrals-' + columnName + '">' + referralTableObject.tableRowValues[ii][columnName] + '</td>';
                        break
                    }
                } else {
                    toAdd = '<td id="my-referrals-' + columnName + '">' + referralTableObject.tableRowValues[ii][columnName] + '</td>';
                }
            }
            columnRowsHtml += toAdd;
        }
        var x = Session.getEffectiveUser().getEmail();
        var adminsArray = JSON.parse(getCAEmails());
        for (var i=0; i < adminsArray.length; i++){
            if (x.toLowerCase() === adminsArray[i].toLowerCase()){
                columnRowsHtml += '<th>' +
                    '<input class="my-referrals-clear-button" type="button" value="Remove & Update Intake" onclick="this.parentElement.parentElement.remove(); derp2(this.parentElement.parentElement);">' +
                    '</th>';
            }
        }
        columnRowsHtml += '<th>' +
            '<input class="my-referrals-clear-button" type="button" value="Remove From My Tracking" onclick="this.parentElement.parentElement.remove(); derp(this.parentElement.parentElement);">' +
            '</th>';
        columnRowsHtml += '</tr>';
    }
    return columnRowsHtml;
}
