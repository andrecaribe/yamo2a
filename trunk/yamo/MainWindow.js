

//=========GLOBALS===========================




var _ballsize = 40;




//=========================================



function MainWindow() 

{	

	
	var _dialog = loadWindow("MainWindow.ui");
	
	var _canvasFilled = false;
	
	var _canvasView = _dialog.canvasView;
	

	_canvasView.setScene(new QGraphicsScene(_canvasView.sceneRect,this));
	
	var _canvas = _canvasView.scene();


	_dialog.btnExit.clicked.connect(function(){
		
		_dialog.close();
		
	});
	
	_dialog.btnGerenciarTags.clicked.connect(function(){
		
		var _gerenciamentoTagsWindow = new GerenciamentoTagsWindow();
		
	});
	
	_dialog.btnGo.clicked.connect(function(){
		
		
		
		msg("entrou em go");
		
		if(_canvasFilled){
	    	
			msg("entrou em canvas filled");
			
			_canvas.clear();
			//msg("Removeu tudo, Qtde Canvas: " + this.canvas.items().length);
			_canvasFilled = false;
	   }	

		
	    var _resultadoTracks = getAllTracksInfoFromCollection();
		
		msg("1");
	    
		var numberOfColumns = 9;
		
	    if(_resultadoTracks.length > 0){
	
	    	msg("2");
			var _collectionTracks = createArrayOfTracks(_resultadoTracks,numberOfColumns);
			msg("3");
	
			var _imagePath = Amarok.Info.scriptPath() + "/bola.png";
			msg("4");
			
		    for(var i = 0; i < _collectionTracks.length; i++){
					
					msg("loop");
					var _canvasItem = new CanvasItem((new QPixmap(_imagePath)).scaled(_ballsize,_ballsize),_collectionTracks[i]);
					msg("5");
					_canvasItem.setPos((Math.random() * (_canvas.width() - _ballsize*2) )+_ballsize,(Math.random() *(_canvas.height() - _ballsize*2))+_ballsize);
					msg("6");
					_canvas.addItem(_canvasItem);
					msg("7");
		    }
		    _canvasFilled = true;
	}
	else{
		Amarok.alert("Query nao retornou resultados!");
	}

		
	});
	_dialog.show();

}













