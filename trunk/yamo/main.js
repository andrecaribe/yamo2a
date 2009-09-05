

Importer.loadQtBinding( "qt.core" );
Importer.loadQtBinding( "qt.gui" );
Importer.loadQtBinding( "qt.uitools" );
Importer.include("MainWindow.js");
Importer.include("DebugWindow.js");
Importer.include("GerenciamentoTagsWindow.js");
Importer.include("Utils.js");
Importer.include("Queries.js");
Importer.include("CanvasItem.js");




var _mainWindow = null;
var _debugWindow = null;


//msg e visivel para todo mundo inclusive nos outros arquivos
function msg(msg){
    
    if(!_debugWindow) return;
    
    _debugWindow.printMsg(msg);

}



function init() {

    
   _mainWindow = new MainWindow();

   _debugWindow = new DebugWindow();
  
  
}



function exit(){
    
    
    _mainWindow.close();
    _debugWindow.close(); 
     Amarok.end();
    
   

}



/// Add item on tools menu in Amarok.

if (Amarok.Window.addToolsMenu("yamo", "YAMO", "emblem-favorite-amarok")){
    var yamo_button = Amarok.Window.ToolsMenu.yamo;
    yamo_button['triggered()'].connect(init);
} else {
    Amarok.debug("YAMO Plugin menu already exists!");
}


if (Amarok.Window.addToolsMenu("setYamoDb", "Set YAMO Database", "emblem-favorite-amarok")){
    var yamo_button2 = Amarok.Window.ToolsMenu.setYamoDb;
    yamo_button2['triggered()'].connect(setYamoDB);
} else {
    Amarok.debug("setYamoDb button already exists!");
}

if (Amarok.Window.addToolsMenu("deleteYamoDb", "Delete YAMO Database", "emblem-favorite-amarok")){
    var yamo_button3 = Amarok.Window.ToolsMenu.deleteYamoDb;
    yamo_button3['triggered()'].connect(deleteYamoDb);
} else {
    Amarok.debug("deleteYamoDb button already exists!");
}






