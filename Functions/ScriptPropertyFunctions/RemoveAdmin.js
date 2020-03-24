function removeCAEmail(AdminEmail) {
    AdminEmail = String(AdminEmail).replace('<span class="closeulb" onclick="removeCAFromList(this);">        <img src="https://img.icons8.com/material-sharp/12/000000/filled-trash.png">        </span>',
        '');
    AdminEmail = AdminEmail.trim();
    console.log(AdminEmail, ' and ', currentAdminsArray);
    var currentAdminsArray = JSON.parse(ScriptProperties.getProperty('Admins'));
    var newAdmins = [];
    for (var i=0; i < currentAdminsArray.length; i++) {
        if( String(currentAdminsArray[i]).toLowerCase() !== String(AdminEmail).toLowerCase()) {
            console.log(String(currentAdminsArray[i]).toLowerCase(), ' != ', String(AdminEmail).toLowerCase());
            newAdmins.push(currentAdminsArray[i]);
        } else {
            console.log(String(currentAdminsArray[i]).toLowerCase(), ' = ', String(AdminEmail).toLowerCase());
        }

    }
    console.log(newAdmins);
    ScriptProperties.setProperty('Admins', JSON.stringify(newAdmins));
}


if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function()
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
