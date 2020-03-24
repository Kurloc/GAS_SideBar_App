/**
 * @return {string}
 */
function GetCAList() {
    html = '';
    var currentAdminsArray = JSON.parse(ScriptProperties.getProperty('Admins'));
    console.log('currentAdminsArray - ', currentAdminsArray);
    if (currentAdminsArray !== null) {
        for (var i = 0; i < currentAdminsArray.length; i++) {
            html += '<li>' +
                currentAdminsArray[i] +
                '    <span class="closeulb" onclick="removeCAFromList(this);">' +
                '        <img src="https://img.icons8.com/material-sharp/12/000000/filled-trash.png"/>' +
                '        </span>' +
                '        </li>'
        }
        console.log(html);
        return html;
    }
}
