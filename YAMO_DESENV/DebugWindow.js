



//classe da janela de debug

function DebugWindow() 

{
	
	 var _dialog = loadWindow("DebugWindow.ui");
	
	
	
	_dialog.btnClose.clicked.connect(function(){
		
		_dialog.close();
		
	});
	
	_dialog.btnClear.clicked.connect(function(){
		
		_dialog.lstDebug.clear();
		
	});
	
	this.printMsg = function(msg){
		
		_dialog.lstDebug.addItem(msg);
		
	}
	
	this.getDialog = function(){
		
		return _dialog;
		
	}
	

	_dialog.show();

}







