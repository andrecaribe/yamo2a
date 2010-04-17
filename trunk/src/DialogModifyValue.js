/**
 *  Modify value window class.
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 *  @param Number
 *  @param Number
 *  @param QObject
 */
function DialogModifyValue(trackID, tagID, parent) {
    var dialog = loadWindow("DialogModifyValue.ui");
    var btnOK = dialog.btnOK;
    var btnCancel = dialog.btnCancel;
    var txtValue = dialog.txtValue;

    /**
     *  Close window and modify value.
     */
    btnOK.clicked.connect(function() {
        if (txtValue.text != "") {
            modifyValue(trackID, tagID, txtValue.text);
            parent.notifyModifiedValue();
            dialog.close();
        } else {
            Amarok.alert("Value field is blank!");
        }
    });

    /**
     *  Close window without modify value.
     */
    btnCancel.clicked.connect(function() {
        dialog.close();
    });

    dialog.show();
}
