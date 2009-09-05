

//=========GLOBALS===========================




var _ballsize = 40;




//=========================================



function MainWindow() 

{	

	
	var _dialog = loadWindow("MainWindow.ui");
	
	var btnGo = _dialog.btnGo;
	
	var btnExit = _dialog.btnExit;
	
	var btnGerenciarTags = _dialog.btnGerenciarTags;
	
	var _gerenciamentoTagsWindow = null;
	
	var _canvasFilled = false;
	
	var _canvasView = _dialog.canvasView;
	

	_canvasView.setScene(new QGraphicsScene(_canvasView.sceneRect,this));
	
	var _canvas = _canvasView.scene();

	_canvas.mousePressEvent = function(event){
		
		msg("asd");
		msg("X: "+event.pos().x()+", Y: "+event.pos().y());
	}
	
	btnExit.clicked.connect(function(){
		
		exit();

		
	});
	
	
	
	btnGerenciarTags.clicked.connect(function(){
		

		_gerenciamentoTagsWindow = new GerenciamentoTagsWindow();
		
	});
	
	btnGo.clicked.connect(function(){
		
		
		
		if(_canvasFilled){
			_canvas.clear();
			_canvasFilled = false;
	   }	

		
	    var _resultadoTracks = getAllTracksInfoFromCollection();
		 
		var numberOfColumns = 10;
		
	    if(_resultadoTracks.length > 0){
	  	
			var _collectionTracks = createArrayOfTracks(_resultadoTracks,numberOfColumns);
			
			var _imagePath = Amarok.Info.scriptPath() + "/bola.png";
			
			var _ballPixMap = (new QPixmap(_imagePath)).scaled(_ballsize,_ballsize);
			
		    for(var i = 0; i < _collectionTracks.length; i++){
					
					var _canvasItem = new CanvasItem(_ballPixMap,_collectionTracks[i],_canvas);
					_canvasItem.setPosition((Math.random() * (_canvas.width() - _ballsize*2) )+_ballsize,(Math.random() *(_canvas.height() - _ballsize*2))+_ballsize);
					_canvas.addItem(_canvasItem);
					
		    }

		    _canvasFilled = true;
	    
	    
	}
	else{
		Amarok.alert("Query nao retornou resultados!");
	}

		
	});
	
	this.getDialog = function(){
		
		return _dialog;
		
	}
	


	
	_dialog.show();

}













