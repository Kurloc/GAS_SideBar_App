function addCAEmail(AdminEmail) {
    var currentAdminsArray = JSON.parse(ScriptProperties.getProperty('Admins'));
    console.log('currentAdminsArray - ', currentAdminsArray);
    newAdmins = [];
    if (currentAdminsArray !== null) {

        for (var i=0; i < currentAdminsArray.length; i++) {
            if (currentAdminsArray !== '') {
                newAdmins.push(currentAdminsArray[i]);
            }
        }
        newAdmins.push(AdminEmail);
        ScriptProperties.setProperty('Admins', JSON.stringify(newAdmins));
    } else {
        newAdmins.push(AdminEmail);
        ScriptProperties.setProperty('Admins', JSON.stringify(newAdmins));
    }
}
