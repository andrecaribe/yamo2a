Importer.loadQtBinding( "qt.core" );
Importer.include("window.js");
Importer.include("debug_window.js");



//classe main yamo

function yamo(){

    
    
    this.createYAMOWindow = function(){

	this.yamoWindow = new yamoWindow();
	this.yamoWindow.show();

    }
    
    this.createDebugWindow = function(){

	this.debugWindow = new debugWindow();
	this.debugWindow.show();


    }
    
    this.sendMsg = function(str){
	
	this.debugWindow.printMsg(str);
    
    }
    

    
}
var yamo = new yamo();



//metodo que imprime mensagem na janela de debug

function msg(str){

    yamo.sendMsg(str);

}


//ao feixar a janela principal feixe a janela de debug...
function exit(){

    yamo.debugWindow.close();
    

}





function showWindowCallback() {
    
  
   yamo.createYAMOWindow();  
    
   
   yamo.createDebugWindow();
  
}

/// Add item on tools menu in Amarok.
if (Amarok.Window.addToolsMenu("yamo", "YAMO", "emblem-favorite-amarok")){
    var yamo_button = Amarok.Window.ToolsMenu.yamo;
    yamo_button['triggered()'].connect(showWindowCallback);
} else {
    Amarok.debug("YAMO Plugin menu already exists!");
}



