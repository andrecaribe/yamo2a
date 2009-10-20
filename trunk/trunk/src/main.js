var local = "";

Importer.loadQtBinding( "qt.core" );
Importer.loadQtBinding( "qt.gui" );
Importer.loadQtBinding( "qt.uitools" );
Importer.include(local + "MainWindow.js");
Importer.include(local + "DebugWindow.js");
Importer.include(local + "GerenciamentoTagsWindow.js");
Importer.include(local + "Utils.js");
Importer.include(local + "Queries.js");
Importer.include(local + "CanvasItem.js");
Importer.include(local + "PlayList.js");
Importer.include(local + "InfoRect.js");
Importer.include(local + "Track.js");
//Importer.include("PersistentData.js");
Importer.include(local + "TagValueProgressBar.js");
Importer.include(local + "DialogModifyValue.js");


var mainWindow = null;
var debugWindow = null;
var tracksData = null;




function msg(msg){
    
    if(!debugWindow) return;
    
    debugWindow.printMsg(msg);

}

function stMsg(msg){
	
	Amarok.Window.Statusbar.shortMessage(msg); 
}



function init() {

    if(mainWindow || debugWindow) return;
 
 	debugWindow = new DebugWindow();
	
	
	mainWindow = new MainWindow();
 
   	
  
  
}



function exit(flagDeletarDados){


    mainWindow.getDialog().done(0);
    
	debugWindow.getDialog().done(0);
	
	if (flagDeletarDados) {
	
		stMsg("deletando tracksdata");
	
		tracksData = null;
	}
	
	
	mainWindow.gerenciamentoTagsWindow = null;
	
	mainWindow = null;
	
	debugWindow = null;
	
	Amarok.end();

}

/// Add item on tools menu in Amarok.

if (Amarok.Window.addToolsMenu("yamo", "YAMO", "emblem-favorite-amarok")){
    
	var yamo_button = Amarok.Window.ToolsMenu.yamo;
    
	yamo_button['triggered()'].connect(init);

} 
else {
    Amarok.debug("YAMO Plugin menu already exists!");
}


if (Amarok.Window.addToolsMenu("setYamoDb", "Create YAMO Database", "emblem-favorite-amarok")){
   
    var yamo_button2 = Amarok.Window.ToolsMenu.setYamoDb;
   
    yamo_button2['triggered()'].connect(setYamoDB);
} 
else {
    
	Amarok.debug("setYamoDb button already exists!");
}

if (Amarok.Window.addToolsMenu("deleteYamoDb", "Delete YAMO Database", "emblem-favorite-amarok")){
    
	var yamo_button3 = Amarok.Window.ToolsMenu.deleteYamoDb;
    
	yamo_button3['triggered()'].connect(deleteYamoDb);
} 
else {
    Amarok.debug("deleteYamoDb button already exists!");
}
