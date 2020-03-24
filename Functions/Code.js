function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .createMenu('Custom Menu')
        .addItem('Show Sidebar', 'showSidebar')
        .addToUi();
}

function showSidebar() {
    var template = HtmlService.createTemplateFromFile('SideBar/App/Template/SideBar');
    var ui = template
                .evaluate()
                .setTitle('Pre-admit Sidebar App')
                .setWidth(350);
    SpreadsheetApp.getUi().showSidebar(ui);
}
function include(File) {
    return HtmlService.createHtmlOutputFromFile(File).getContent();
};
function alertCA(patientName, socClinician, supervisorsEmail, reviewByDate){
    if (patientName !== "" && socClinician !== "" && supervisorsEmail !== ""){
        console.log(patientName, socClinician, supervisorsEmail);
        MailApp.sendEmail(supervisorsEmail.toLowerCase().trim(), 'Please Review Referral For ' + patientName + ' by ' + reviewByDate, '')
        return 1
    } else { return 0}
}
function deleteMyReferralRow(patientName, socClinician, caEmail, intakeEmail, reviewByDate, delayBoolean) {
    console.log(patientName, socClinician);
    var dashBoardSheet = SpreadsheetApp.openByUrl(environment.sideBarDashBoarURL).getSheetByName('ReferralsToReview');
    var lastRow = dashBoardSheet.getLastRow();
    var lastCol = dashBoardSheet.getLastColumn();
    var dashBoardObject = dashBoardSheet.getSheetValues(1, 1, lastRow, lastCol);
    for (var i=0; i < lastRow; i++) {
        if (dashBoardObject[i][2] === patientName){
            console.log(String(dashBoardObject[i][7]), String(reviewByDate))
        }
            if (dashBoardObject[i][4] === socClinician){
                if (dashBoardObject[i][5] === caEmail){
                    if (dashBoardObject[i][6] === intakeEmail){
                        console.log(intakeEmail, patientName, caEmail);
                    }
                        if (String(dashBoardObject[i][7]) === String(reviewByDate)){
                            console.log('as far as this needs to go :) + ', i);
                            dashBoardSheet.deleteRow(i + 1);
                            break
                        }
                }
        }
    }
}
function sendIntakeNotification(intake, ca, pn) {
    MailApp.sendEmail(intake.toLowerCase().trim(), ca + ' has finished the referral for ' + pn, '');
}
