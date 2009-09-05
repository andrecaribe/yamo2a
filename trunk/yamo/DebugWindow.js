



//classe da janela de debug

function DebugWindow() 

{
	
	 var _dialog = loadWindow("DebugWindow.ui");
	
	
	
	_dialog.btnClose.clicked.connect(function(){
		
		_dialog.close();
		
	});
	
	this.printMsg = function(msg){
		
		_dialog.lstDebug.addItem(msg);
		
	}

	_dialog.show();

}







