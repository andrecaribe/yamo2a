/**
 * @author rafael
 */


function MainWindow() 

{	

	
		
		
		
		//=============PRIVATE VARIABLES===============================================
	
		var dialog = loadWindow("MainWindow_beta.ui");
		
		var self = this;
		
		var linePen = new QPen(new QColor(61, 61, 61, 180));
		
		var fontBrush = new QBrush(new QColor(200, 200, 200, 200));
		
		var font = new QFont("tahoma", 22, QFont.Bold);
		
		var font2 = new QFont("tahoma", 10, QFont.Bold);
		
		
		var btnApply = dialog.centralWidget.tabs.children()[0].tabFilters.btnApply;
	
		var btnExit = dialog.centralWidget.btnExit;
		
		var listYamoFiltersScroll = dialog.centralWidget.tabs.children()[0].tabFilters.groupYAMOFilters.listYAMOFilters;
		
		var listYamoFilters = new QGroupBox();
		
		var listYamoFiltersLayout = new QVBoxLayout();
		
		listYamoFilters.setLayout(listYamoFiltersLayout);
		
		listYamoFilters.flat = true;
		
		listYamoFiltersScroll.setWidget(listYamoFilters);
		
		
		
		
		
		var cmbGenre = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbGenre;
		
		var cmbArtist = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbArtist;
		
		var cmbAlbum = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbAlbum;
		
		var cmbYear = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbYear;
		
		var btnTags = dialog.centralWidget.btnTags;
		
		var gerenciamentoTagsWindow = null;
		
		var canvasFilled = false;
		
		var canvasView = dialog.centralWidget.canvasView;
		
		canvasView.setRenderHint(QPainter.Antialiasing);
		
		var chkClearCache = dialog.centralWidget.tabs.children()[0].tabOptions.chkClearCache;
		
		canvasView.setScene(new QGraphicsScene(canvasView.sceneRect, this));
		
		var canvas = canvasView.scene();
		
		var collectionArray = new Array();
		
		var tracks1a20 = new Array();
		var tracks21a40 = new Array();
		var tracks41a60 = new Array();
		var tracks61a80 = new Array();
		var tracks81a100 = new Array();
		
		var tagItems = new Array();
		
		
		//=============================================================================
		
		
		//=======ON INIT===============================================================
		
		
		dialog.show();
		
		showTagFilters();
		
		
		
		//=============================================================================
		
		
		
		//====ACTIONS==================================================================
		
		btnExit.clicked.connect(function(){
		
			canvas.clear();
			
			if (gerenciamentoTagsWindow) {
				
				gerenciamentoTagsWindow.getDialog().done(0);
			}
			
			var flagDeletar = false;

			if (chkClearCache.checked) {

				flagDeletar = true;
			}
			exit(flagDeletar);
			
			
		});
		
		
		btnTags.clicked.connect(function(){
		
			if(!gerenciamentoTagsWindow)
				gerenciamentoTagsWindow = new GerenciamentoTagsWindow(self);
	
			
		});
		
		btnApply.clicked.connect(function(){
		
		
		for(i = 0; i < tagItems.length; i++){
			
			if(tagItems[i].widget.chkBox.checked == true){
				
				tagItems[i].setValue(tagItems[i].widget.sldValue.value);
				
				msg(tagItems[i].tagName+" value: "+tagItems[i].value);
			}
		}
		
			/*if (canvasFilled) {
			
				canvas.clear();
				
				canvasFilled = false;
			}
			
			
			
			var numberOfColumns = 10;
			
			if (tracksData) {
				tracksData.clear();
			}
			
			
			
			if (collectionArray.length > 0) {
				collectionArray.clear();
			}
			
			
			if (tracks1a20.length > 0) {
			
				tracks1a20.clear();
				
			}
			
			if (tracks21a40.length > 0) {
			
				tracks21a40.clear();
				
			}
			
			if (tracks41a60.length > 0) {
			
				tracks41a60.clear();
				
			}
			
			if (tracks61a80.length > 0) {
			
				tracks61a80.clear();
				
			}
			
			if (tracks81a100.length > 0) {
			
				tracks81a100.clear();
				
			}
			
			
			
			var tracksInfo = getAllTracksInfoFromCollection();
			
			if (tracksInfo.length > 0) {
			
				tracksData = createArrayOfTracks(tracksInfo, numberOfColumns);
			}
			
			
			
			if (tracksData) {
			
				
				for (var i = 0; i < tracksData.length; i++) {
				
				
				///////////////
					var valorTrack = getValueFromTrackAndThisTag(tracksData[i].getID(), cboTag.currentText);
					////////////////////////
					if (valorTrack >= 1 && valorTrack <= 20) {
					
						tracks1a20.push(tracksData[i]);
					}
					else 
						if (valorTrack >= 21 && valorTrack <= 40) {
						
							tracks21a40.push(tracksData[i]);
						}
						
						else 
							if (valorTrack >= 41 && valorTrack <= 60) {
							
								tracks41a60.push(tracksData[i]);
							}
							
							else 
								if (valorTrack >= 61 && valorTrack <= 80) {
								
									tracks61a80.push(tracksData[i]);
								}
								else 
									if (valorTrack >= 81 && valorTrack <= 100) {
									
										tracks81a100.push(tracksData[i]);
										
									}
					
					
					
				}
				
				
				
				collectionArray.push(tracks1a20);
				collectionArray.push(tracks21a40);
				collectionArray.push(tracks41a60);
				collectionArray.push(tracks61a80);
				collectionArray.push(tracks81a100);
				
				
				
				for (i = 0; i < collectionArray.length; i++) {
				
				
					if (i == 0) 
						msg("faixa 1 a 20\n\n ");
					else 
						if (i == 1) 
							msg("faixa 21 a 40\n\n ");
						else 
							if (i == 2) 
								msg("faixa 41 a 60\n\n ");
							else 
								if (i == 3) 
									msg("faixa 61 a 80\n\n ");
								else 
									if (i == 4) 
										msg("faixa 81 a 100\n\n ");
					
					
					msg("tamanho: " + collectionArray[i].length);
					
					
					for (j = 0; j < collectionArray[i].length; j++) {
					
						msg("faixa: " + collectionArray[i][j].getTitle());
						
					}
				}
				
				
				buildVisualization(450, 300, 80, collectionArray);
				canvasFilled = true;
				
				
			}
			else {
				Amarok.alert("Your collection is empty! Try clicking the button 'Rescan Collection'");
			}
			
			
			
			*/
			
		});
		
		
		
		//=============================================================================
		
		
		
		//=====PUBLIC FUNCTIONS========================================================
		
		this.gerenciamentoTagsClosed = function(){
			
			gerenciamentoTagsWindow = null;
		}
		
		
		this.getDialog = function(){
		
			return dialog;
			
		}
		
		this.updateTagFilters = function(){
			
			showTagFilters();
		}
		
		
		
		//=============================================================================
		
		
		//=====PRIVATE FUNCTIONS=======================================================
		
		
		function showTagFilters(){
			
			var currentTags = getTags();
	
	
			for(i = 0; i < currentTags.length; i++){
			
				var tagItem = new ItemSelectFilter();
				
				tagItem.setLabel(currentTags[i].tagName);
				tagItem.setColor(currentTags[i].color);
				
				tagItem.widget.toolTip = currentTags[i].tagName;
				
				tagItems.push(tagItem);
				
				
				
				listYamoFiltersLayout.addWidget(tagItem.widget,0,Qt.AlignTop);
				
				//
				
			}
			
			listYamoFilters.setFixedHeight(currentTags.length*tagItem.widget.height);
			//listYamoFilters.setFixedWidth(tagItem.widget.width);
			
			
		}
		
		
		function buildVisualization(x, y, raioinicial, collectionArray){
		
		
			if (collectionArray.length == 0) 
				return;
			
			
			var raio = raioinicial;
			
			var contCores = 1;
			
			//////////////
			var currentColor = new QColor(cboTag.itemData(cboTag.currentIndex));
			////////////////
			
			
			for (var i = 4; i >= 0; i--) {
			
				var guideCircle = new QGraphicsEllipseItem(x - (raio + 18.5), y - (raio + 18.5), (raio + 18.5) * 2, (raio + 18.5) * 2);
				
				
				
				if (i == 4) {
				
				//////////////
					var textoTag = new QGraphicsSimpleTextItem(cboTag.currentText);
					//////////////////
					textoTag.setBrush(fontBrush);
					
					textoTag.setZValue(i + 1);
					
					textoTag.setFont(font);
					
					textoTag.setPos(x - 35, y - 20);
					
					canvas.addItem(textoTag);
					
				}
				
				
				guideCircle.setZValue(i);
				
				
				var newColor = new QColor(Math.max(currentColor.red() - contCores * 10, 0), Math.max(currentColor.green() - contCores * 10, 0), Math.max(currentColor.blue() - contCores * 10, 0), 200);
				
				
				currentColor = newColor;
				
				
				
				linePen.setColor(currentColor);
				
				linePen.setWidth(3);
				
				guideCircle.setPen(linePen);
				
				canvas.addItem(guideCircle);
				
				var ultimoRaio = drawCircles(x, y, raio, currentColor, collectionArray[i])
				raio = raio + 2.5 * ultimoRaio;
				
				
				contCores += 1;
			}
			
			
			
		}
		
		
		
		
		function drawCircles(x, y, _rprincipal, color, tracks){
		
			if (tracks.length == 0) {
			
				return 17;
				
			}
			
			
			var contador = 0;
			
			var rprincipal;
			
			
			if (_rprincipal < 50) {
			
				rprincipal = 50;
			}
			
			else {
			
				rprincipal = _rprincipal;
			}
			
			var ultrapassouLimite = false;
			
			
			
			var raiomenor;
			
			if (tracks.length < 3) {
			
				raiomenor = 17.0;
				ultrapassouLimite = true;
				
			}
			else {
			
				raiomenor = rprincipal * Math.sin(Math.PI / tracks.length) / (1 - Math.sin(Math.PI / tracks.length));
			}
			
			
			if (raiomenor > 17.0) {
			
				ultrapassouLimite = true;
				raiomenor = 17.0;
			}
			
			
			var x2;
			var y2;
			
			var comprimento = 2 * Math.PI * rprincipal;
			
			var qtde = comprimento / raiomenor * 2;
			
			
			var angleadd = (2 * Math.asin(raiomenor / (rprincipal + raiomenor)));
			
			
			
			if (!ultrapassouLimite) {
				var maxangle = (degreeToRadian(360));
				
			}
			else {
				var maxangle = (angleadd * tracks.length);
			}
			
			
			
			for (angle = 0; angle < maxangle && contador < tracks.length; angle += angleadd) {
			
			
				x2 = (rprincipal * Math.cos(angle)) + x;
				y2 = (rprincipal * Math.sin(angle)) + y;
				
				
				var canvasItem = new CanvasItem(x2 - raiomenor, y2 - raiomenor, raiomenor * 2, raiomenor * 2, color, tracks[contador], canvas);
				
				canvasItem.setZValue(6);
				canvas.addItem(canvasItem);
				
				contador++;
				
			}
			
			return raiomenor;
			
			
			
		}
		
		
		//=============================================================================
	
		
}
	
	














