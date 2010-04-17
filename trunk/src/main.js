// LIBRARIES
Importer.loadQtBinding("qt.core");
Importer.loadQtBinding("qt.gui");
Importer.loadQtBinding("qt.uitools");

Importer.include("MainWindow.js");
Importer.include("DebugWindow.js");
Importer.include("GerenciamentoTagsWindow.js");
Importer.include("Utils.js");
Importer.include("Queries.js");
Importer.include("CanvasItem.js");
Importer.include("PlayList.js");
Importer.include("InfoRect.js");
Importer.include("Track.js");
//Importer.include("PersistentData.js");
Importer.include("TagValueProgressBar.js");
Importer.include("DialogModifyValue.js");
Importer.include("ItemSelectFilter.js");
Importer.include("TagFilterContainer.js");
Importer.include("YamoCanvas.js");

// PROPERTIES
var mainWindow = null;
var debugWindow = null;
var tracksData = null;

// FUNCTIONS

/**
 *  Print message on debug window.
 *
 *  @param String
 */
function msg(msg) {
    if (!debugWindow)
        return;
    debugWindow.printMsg(msg);
}

/**
 *  Print message on Amarok statusbar.
 *
 *  @param String
 */
function stMsg(msg) {
    Amarok.Window.Statusbar.shortMessage(msg);
}

/**
 *  Initialize windows.
 */
function init() {
    setYAMODatabase();

    if (mainWindow || debugWindow)
        return;
    debugWindow = new DebugWindow();
    mainWindow = new MainWindow();
}

/**
 *  Close windows.
 */
function exit(flagDeletarDados) {
    mainWindow.getDialog().close();
    debugWindow.getDialog().close();
    if (flagDeletarDados) {
        tracksData = null;
    }
    mainWindow.gerenciamentoTagsWindow = null;
    mainWindow = null;
    debugWindow = null;
    Amarok.end();
}

/// Add item on tools menu in Amarok.
if (Amarok.Window.addToolsMenu("yamo", "YAMO", "emblem-favorite-amarok")) {
    var yamo_button = Amarok.Window.ToolsMenu.yamo;
    yamo_button['triggered()'].connect(init);
} else {
    Amarok.debug("YAMO Plugin menu already exists!");
}

/*if (Amarok.Window.addToolsMenu("setYamoDb", "Create YAMO Database", "emblem-favorite-amarok")) {
    var yamo_button2 = Amarok.Window.ToolsMenu.setYamoDb;
    yamo_button2['triggered()'].connect(setYAMODatabase);
} else {
    Amarok.debug("setYamoDb button already exists!");
}*/

if (Amarok.Window.addToolsMenu("deleteYAMO", "Delete YAMO database", "emblem-favorite-amarok")) {
    var deleteYAMO_btn = Amarok.Window.ToolsMenu.deleteYAMO;
    deleteYAMO_btn['triggered()'].connect(deleteYamoDb);
} else {
    Amarok.debug("deleteYamoDb button already exists!");
}