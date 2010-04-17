/**
 *  Debug window class
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 */

/*var debugWindow = null;
var allowInstance = false;

function getDebugWindow(){
    if (!debugWindow){
        allowInstance = true;
        debugWindow = DebugWindow();
        allowInstance = false;
    }   
    return debugWindow;
}*/

function DebugWindow() {
    //if(!allowInstance) {
    //    return;
    //}
    
    var dialog = loadWindow("DebugWindow.ui");
    var txtQuery = dialog.txtQuery;

    /**
     *  Executes an query.
     */
    dialog.btnQuery.clicked.connect(function() {
        var query = txtQuery.plainText;
        var result = sql(query);
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                dialog.lstDebug.addItem(result[i]);
            }
        }
    });

    /**
     *  Close this window.
     */
    dialog.btnClose.clicked.connect(function() {
        dialog.close();
    });

    /**
     *  Clear list
     */
    dialog.btnClear.clicked.connect(function() {
        dialog.lstDebug.clear();
    });

    /**
     *  Print message.
     *
     *  @param String
     */
    this.printMsg = function(msg) {
        dialog.lstDebug.addItem(msg);
    }

    /**
     *  Get this window.
     *
     *  @return QObject
     */
    this.getDialog = function() {
        return dialog;
    }

    dialog.show();
}
