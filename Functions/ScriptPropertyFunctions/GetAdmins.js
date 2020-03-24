function getCAEmails() {
    var admins = ScriptProperties.getProperty('Admins');
    console.log(admins);
    return String(admins).replace("\\", "");
}
