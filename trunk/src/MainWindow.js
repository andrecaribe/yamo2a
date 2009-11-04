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
			
			var font = new QFont("Verdana", 22, QFont.Bold);
			
			var defaultColor = new QColor(180,180,180);
			
			var font2 = new QFont("Verdana", 10, QFont.Bold);
			
			var btnApply = dialog.centralWidget.tabs.children()[0].tabFilters.btnApply;
			
			var btnExit = dialog.centralWidget.btnExit;
			
			
			
			var cmbMethod = dialog.centralWidget.tabs.children()[0].tabFilters.cmbMethod;
			
			
			
			var tagFiltersListView = dialog.centralWidget.tabs.children()[0].tabFilters.groupYAMOFilters.tagFiltersList;
			
			
			var tagFiltersContainer = new TagFilterContainer(tagFiltersListView.sceneRect);
			
			tagFiltersListView.setScene(tagFiltersContainer.getScene());
			
			
			var cont = 1;
			
			var cmbGenre = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbGenre;
			
			
			
			var genres = sql("SELECT id, name from genres");
			
			for (i = 0; i < genres.length; i++) {
			
				if (i % 2 == 0) {
				
				
					cmbGenre.addItem(genres[i + 1]);
					cmbGenre.setItemData(cont, genres[i]);
					cont++;
				}
				
			}
			
			
			
			cont = 1;
			
			var cmbArtist = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbArtist;
			
			
			
			var artists = sql("SELECT id, name from artists");
			
			for (i = 0; i < artists.length; i++) {
			
				if (i % 2 == 0) {
				
				
					cmbArtist.addItem(artists[i + 1]);
					cmbArtist.setItemData(cont, artists[i]);
					cont++;
				}
				
			}
			
			
			cont = 1;
			
			var cmbAlbum = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbAlbum;
			
			var albums = sql("SELECT id, name from albums");
			
			for (i = 0; i < albums.length; i++) {
			
				if (i % 2 == 0) {
				
				
				
					cmbAlbum.addItem(albums[i + 1]);
					cmbAlbum.setItemData(cont, albums[i]);
					cont++;
				}
				
			}
			
			cont = 1;
			
			
			var cmbYear = dialog.centralWidget.tabs.children()[0].tabFilters.groupID3Filters.cmbYear;
			
			var years = sql("SELECT id, name from years");
			
			
			for (i = 0; i < years.length; i++) {
			
				if (i % 2 == 0) {
				
				
					cmbYear.addItem(years[i + 1]);
					cmbYear.setItemData(cont, years[i]);
					cont++;
				}
				
			}
			
			
			var cmbZoom = dialog.centralWidget.cmbZoom;
			
			var btnTags = dialog.centralWidget.btnTags;
			
			var gerenciamentoTagsWindow = null;
			
			var canvasFilled = false;
			
			var canvasView = dialog.centralWidget.canvasView;
			
			var canvasScale = 1;
			
			
			function _yamoCanvas(scenerect){
			
				_yamoCanvas.superclass.call(this, scenerect);
				
			}
			extend(_yamoCanvas, QGraphicsScene);
			
			
			var yamoCanvas = new _yamoCanvas(canvasView.sceneRect);
			
			
			canvasView.setScene(yamoCanvas);
			
			var collectionArray = null;
			
			var chkClearCache = dialog.centralWidget.tabs.children()[0].tabOptions.chkClearCache;
			
			var tracks1a10 = null;
			var tracks11a20 = null;
			var tracks21a30 = null;
			var tracks31a40 = null;
			var tracks41a50 = null;
			var tracks51a60 = null;
			var tracks61a70 = null;
			var tracks71a80 = null;
			var tracks81a90 = null;
			var tracks91a100 = null;
			
			
			
			//=============================================================================
			
			
			//=======ON INIT===============================================================
			
			
			dialog.show();
			
			
			
			showTagFilters(1);
			
			//=============================================================================
			
			
			
			//====ACTIONS==================================================================
			
			
			yamoCanvas.wheelEvent = function(wheel){
			
				if (wheel.delta() > 0) {
					canvasView.scale(1.1, 1.1);
				}
				else {
				
					canvasView.scale(0.9, 0.9);
				}
			}
			
			//_____________________________________________________________________________
			
			
			yamoCanvas.mousePressEvent = function(button){
			
				canvasView.dragMode = QGraphicsView.ScrollHandDrag;
				
			}
			
			
			//_____________________________________________________________________________
			
			yamoCanvas.mouseReleaseEvent = function(button){
			
				canvasView.dragMode = QGraphicsView.NoDrag;
				
			}
			
			
			
			
			
			
			//_____________________________________________________________________________
			
			
			cmbZoom['currentIndexChanged(int)'].connect(function(item){
			
			
				canvasView.resetMatrix();
				
				if (item == 1) {
				
					canvasView.scale(0.5, 0.5);
				}
				else 
					if (item == 2) {
					
						canvasView.scale(2.0, 2.0);
					}
				
				
				
			});
			
			
			cmbMethod['currentIndexChanged(int)'].connect(function(index){
			
			
				if (index == 0) {
					
					msg("limpando yamo canvas");
					yamoCanvas.clear();
					
					showTagFilters(1);
					
				}
				
				else 
					if (index == 1) {
						msg("limpando yamo canvas");
						yamoCanvas.clear();
						
						showTagFilters(2);
						
					}
				
			});
			
			
			
			//_____________________________________________________________________________
			btnExit.clicked.connect(function(){
			
				
				yamoCanvas.clear();
				
				tagFiltersContainer.getScene().clear();
				
				
				if (gerenciamentoTagsWindow) {
				
					gerenciamentoTagsWindow.getDialog().done(0);
				}
				
				var flagDeletar = false;
				
				if (chkClearCache.checked) {
				
					flagDeletar = true;
				}
				exit(flagDeletar);
				
				
			});
			
			//_____________________________________________________________________________
			
			
			btnTags.clicked.connect(function(){
			
				if (!gerenciamentoTagsWindow) 
					gerenciamentoTagsWindow = new GerenciamentoTagsWindow(self);
				
				
			});
			
			//_____________________________________________________________________________
			
			btnApply.clicked.connect(function(){
			
			
			
				if (canvasFilled) {
				
					msg("limpando yamo canvas");
					yamoCanvas.clear();
					
					canvasFilled = false;
				}
				
				
				
				var numberOfColumns = 10;
				
				if (tracksData) {
					
					tracksData.clear();
				}
				
				
				var ID3Filters = new Object();
				
				
				if (cmbArtist.currentIndex == 0) 
					ID3Filters.artist = 0;
				else 
					ID3Filters.artist = cmbArtist.itemData(cmbArtist.currentIndex);
				
				
				if (cmbAlbum.currentIndex == 0) 
					ID3Filters.album = 0;
				else 
					ID3Filters.album = cmbAlbum.itemData(cmbAlbum.currentIndex);
				
				if (cmbGenre.currentIndex == 0) 
					ID3Filters.genre = 0;
				else 
					ID3Filters.genre = cmbGenre.itemData(cmbGenre.currentIndex);
				
				if (cmbYear.currentIndex == 0) 
					ID3Filters.year = 0;
				else 
					ID3Filters.year = cmbYear.itemData(cmbYear.currentIndex);
				
				
				var tracksInfo = getAllTracksInfoFromCollection(ID3Filters);
				
				
				if (tracksInfo.length > 0) {
				
					tracksData = createArrayOfTracks(tracksInfo, numberOfColumns);
				}
				
				
				if (cmbMethod.currentIndex == 0) {
					showCirclesVisualization();
					canvasFilled = true;
				}
				else {
				
					showMiniPCAVisualization();
					canvasFilled = true;
					
				}
				
				
				
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
			
				if (cmbMethod.currentIndex == 0) 
					showTagFilters(1);
				else 
					showTagFilters(2);
			}
			
			
			
			//=============================================================================
			
			
			//=====PRIVATE FUNCTIONS=======================================================
			
			
			function showTagFilters(type){
			
				
					
					
					if (tagFiltersContainer.count() > 0) {
					
						tagFiltersContainer.removeAll();
						tagFiltersContainer.getScene().clear();
						msg("limpando tag filters canvas");
						
					}
					
					
					var currentTags = getTags();
					
					
					if (currentTags.length > 0) {
							
					
						for (i = 0; i < currentTags.length; i++) {
						
							
							tagItem = new ItemSelectFilter(type);
							
							
							tagItem.setID(currentTags[i].id);
							
							
							tagItem.setLabel(currentTags[i].tagName);
							
							tagItem.setColor(currentTags[i].color);
							
							tagItem.widget.toolTip = currentTags[i].tagName;
							
						
							
							tagFiltersContainer.addItem(tagItem);
							
						}
						
						
					}
					
				
				
			}
			
			
			//_________________________________________________________________________
			
			function showCirclesVisualization(){
			
			
				
			
			
				if (!collectionArray) {
				
				
					collectionArray = new Array();
				}
				
				if (!tracks1a10) 
					tracks1a10 = new Array();
				
				if (!tracks11a20) 
					tracks11a20 = new Array();
				
				if (!tracks21a30) 
					tracks21a30 = new Array();
				
				if (!tracks31a40) 
					tracks31a40 = new Array();
				
				if (!tracks41a50) 
					tracks41a50 = new Array();
				
				if (!tracks51a60) 
					tracks51a60 = new Array();
				
				if (!tracks61a70) 
					tracks61a70 = new Array();
				
				if (!tracks71a80) 
					tracks71a80 = new Array();
				
				if (!tracks81a90) 
					tracks81a90 = new Array();
				
				if (!tracks91a100) 
					tracks91a100 = new Array();
				
				
				if (collectionArray.length > 0) {
					collectionArray.clear();
				}
				
				
				if (tracks1a10.length > 0) {
				
				
					tracks1a10.clear();
					
				}
				
				if (tracks11a20.length > 0) {
				
					tracks11a20.clear();
					
				}
				
				if (tracks21a30.length > 0) {
					tracks21a30.clear();
					
				}
				
				if (tracks31a40.length > 0) {
					tracks31a40.clear();
					
				}
				
				if (tracks41a50.length > 0) {
					tracks41a50.clear();
					
				}
				
				if (tracks51a60.length > 0) {
					tracks51a60.clear();
					
				}
				
				if (tracks61a70.length > 0) {
					tracks61a70.clear();
					
				}
				
				if (tracks71a80.length > 0) {
					tracks71a80.clear();
					
				}
				
				if (tracks81a90.length > 0) {
					tracks81a90.clear();
					
				}
				
				if (tracks91a100.length > 0) {
					tracks91a100.clear();
					
				}
				
				
				var tagFiltersSelected = new Array();
				
				
					for (i = 0; i < tagFiltersContainer.count(); i++) {
						var item = tagFiltersContainer.getItem(i);
						if (item.widget.chkBox.checked == true) {
							
							item.setValue(item.widget.sldValue.value);
							
							var tagItem = new Object();
							tagItem.name = item.tagName;
							tagItem.id = item.id;
							tagItem.value = item.value;
							tagItem.color = item.color;
							tagFiltersSelected.push(tagItem);
						}
					}
				
				
				
				
				
				if (tracksData) {
				
					
					for (var i = 0; i < tracksData.length; i++) {
					
						
						var ratings = getValuesFromTheeseTags(tagFiltersSelected, tracksData[i].getID());
						
						
						
						
						if(!ratings) continue;
						
						
					
						var resultValue = processPercentage(tagFiltersSelected, ratings);
						
						if (resultValue >= 1 && resultValue <= 10) {
						
							tracks1a10.push(tracksData[i]);
						}
						else 
							if (resultValue >= 11 && resultValue <= 20) {
							
								tracks11a20.push(tracksData[i]);
							}
							
							else 
								if (resultValue >= 21 && resultValue <= 30) {
								
									tracks21a30.push(tracksData[i]);
								}
								
								else 
									if (resultValue >= 31 && resultValue <= 40) {
									
										tracks31a40.push(tracksData[i]);
									}
									else 
										if (resultValue >= 41 && resultValue <= 50) {
										
											tracks41a50.push(tracksData[i]);
											
										}
										else 
											if (resultValue >= 51 && resultValue <= 60) {
											
												tracks51a60.push(tracksData[i]);
												
											}
											else 
												if (resultValue >= 61 && resultValue <= 70) {
												
													tracks61a70.push(tracksData[i]);
													
												}
												else 
													if (resultValue >= 71 && resultValue <= 80) {
													
														tracks71a80.push(tracksData[i]);
														
													}
													
													else 
														if (resultValue >= 81 && resultValue <= 90) {
														
															tracks81a90.push(tracksData[i]);
															
														}
														else 
															if (resultValue >= 91 && resultValue <= 100) {
															
																tracks91a100.push(tracksData[i]);
																
															}
						
						
						
					}
					
					
					
					collectionArray.push(tracks1a10);
					collectionArray.push(tracks11a20);
					collectionArray.push(tracks21a30);
					collectionArray.push(tracks31a40);
					collectionArray.push(tracks41a50);
					collectionArray.push(tracks51a60);
					collectionArray.push(tracks61a70);
					collectionArray.push(tracks71a80);
					collectionArray.push(tracks81a90);
					collectionArray.push(tracks91a100);
					
					
					
					
					buildCirclesVisualization(canvasView.sceneRect.width() / 2, canvasView.sceneRect.height() / 2, 80, collectionArray);
					
					
				}
				else {
					Amarok.alert("Your collection is empty! Try clicking the button 'Rescan Collection'");
				}
				
				
				
				
			}
			
			
			//_________________________________________________________________________
			
			
			
			function showMiniPCAVisualization(){
				
				
				
				var debugItem = function(item){
					
					msg("item name: "+item.name);
					
					if(item.value) {
						msg("item value: " + item.value);
					}
					
					
					if(item.color){
						msg("item color: " + item.color);
					}
					
					if(item.id){
						msg("item id: " + item.id);
					}
				}
				
			
				
				canvasView.resetMatrix();
			
				var tagFiltersSelected = new Array();
				
				
				for (i = 0; i < tagFiltersContainer.count(); i++) {
				
					var item = tagFiltersContainer.getItem(i);
					
					if (item.widget.checked == true) {
						
						var tagItem = new Object();
						
						tagItem.name = item.tagName;
						
						tagItem.id = item.id;
						
						tagItem.color = item.color;
					
						tagFiltersSelected.push(tagItem);
						
					}
				}
				
				
				
				
				if (tracksData) {
					
					
					if (tagFiltersSelected.length == 2) {
					
					
						for (var i = 0; i < tracksData.length; i++) {
						
							var ratings = getValuesFromTheeseTags(tagFiltersSelected, tracksData[i].getID());
							
							if (!ratings) continue;
							
							if (tagFiltersSelected[0].name == ratings[0].name) {
							
								var X = mapValueToScreenCoordinate(ratings[0].value, 40, 'x');
								
								var Y = mapValueToScreenCoordinate(ratings[1].value, 40, 'y');
							}
							else{
								
								var X = mapValueToScreenCoordinate(ratings[1].value, 40, 'x');
								
								var Y = mapValueToScreenCoordinate(ratings[0].value, 40, 'y');
							}
							
							var canvasItem = new CanvasItem(X, Y, 40, 40, defaultColor, tracksData[i], yamoCanvas);
							
							yamoCanvas.addItem(canvasItem);
							
							
							
							
							
						}
					}
					else if (tagFiltersSelected.length > 2){
						
					
						
						
						var minArray = new Array(tagFiltersSelected.length);
						
						var maxArray = new Array(tagFiltersSelected.length);
						
						
						var arraysInitialized = false;
						
						msg("qtde: "+tracksData.length);
						
						
						//GET MAX AND MIN VALUES FROM TAGS//
						for(var i = 0; i < tracksData.length; i++){ 
						
							
							var ratings = getValuesFromTheeseTags(tagFiltersSelected,tracksData[i].getID());
							
							
							if (ratings) {
							
								for (var j = 0; j < ratings.length; j++) {
									
									if(!arraysInitialized){
										
										var item = new Object();
										
										item.name = ratings[j].name;
										item.value = ratings[j].value;
										item.id = ratings[j].id;
										
										var item2 = new Object();
										
										item2.name = ratings[j].name;
										item2.value = ratings[j].value;
										item2.id = ratings[j].id;
										
										minArray[j] = item;
										maxArray[j] = item2;
										
										
									
									}
									
									
									if(ratings[j].value > maxArray[j].value){
										
										maxArray[j].value = ratings[j].value;
										maxArray[j].name = ratings[j].name;
										maxArray[j].id = ratings[j].id;
									}
									
									if(ratings[j].value < minArray[j].value){
										
										minArray[j].value = ratings[j].value;
										minArray[j].name = ratings[j].name;
										minArray[j].id = ratings[j].id;
										
									}
								
								}
								
								
								arraysInitialized = true;
							}
						}
						
						
						var varianceArray = new Array();
						
						msg("max array");
						for(i = 0; i < maxArray.length; i++){
							
							debugItem(maxArray[i]);
						}
						msg("min array");
						for(i = 0; i < minArray.length; i++){
							
							debugItem(minArray[i]);
						}
						
						for (i = 0; i < maxArray.length; i++){
							
							var variance = maxArray[i].value - minArray[i].value;
							
							var varianceItem = new Object();
							
							varianceItem.value = variance;
							varianceItem.name = maxArray[i].name;
							varianceItem.id = maxArray[i].id;
							
							varianceArray.push(varianceItem);
							
							msg("variance array: "+varianceArray[i].name+","+varianceArray[i].value+","+varianceArray[i].id);
						
							
						}
						
						
						
						
						quickSort(varianceArray,1);
						
						
						msg("variance array ordenado:");
						
						for (i = 0; i < varianceArray.length; i++) {
							debugItem(varianceArray[i]);
						}
						
						
						var xAxisItem = varianceArray[varianceArray.length - 1]; //CHOOSE 2 TAGS WITH THE GREATEST 
																				//VARIANCE AS COORDINATES TO PLOT TO SCREEN
						var yAxisItem = varianceArray[varianceArray.length - 2];
						
						msg("x axis: "+xAxisItem.name+","+xAxisItem.value + ", y axis: "+yAxisItem.name+","+yAxisItem.value);
						
						var resultantTagFilters = new Array(xAxisItem,yAxisItem);
						
						
						for (var i = 0; i < tracksData.length; i++) { //PLOT TRACKS ON SCREEN BASED ON ABOVE TAGS
						
						
							var ratings = getValuesFromTheeseTags(resultantTagFilters, tracksData[i].getID());
							
							if (!ratings) continue;
							
							if (ratings[0].name == xAxisItem.name) {
							
								var X = mapValueToScreenCoordinate(ratings[0].value, 40, 'x');
								
								var Y = mapValueToScreenCoordinate(ratings[1].value, 40, 'y');
								
							}
							else{
								
								var X = mapValueToScreenCoordinate(ratings[1].value, 40, 'x');
								
								var Y = mapValueToScreenCoordinate(ratings[0].value, 40, 'y');
							}
							
							var canvasItem = new CanvasItem(X, Y, 40, 40, defaultColor, tracksData[i], yamoCanvas);
							
							yamoCanvas.addItem(canvasItem);
						
						
						}
						
						
						
					}
					else{
						
						Amarok.alert("Choose at least to two tags!");
						return;
					
					}
						
				
				}
				
				
				
			}
			
			
			
			
			//_________________________________________________________________________
			
			
			function mapValueToScreenCoordinate(value,ball_radius,axis){
				
				
				var screenCoordinate;
				
				var screenWidth = yamoCanvas.sceneRect.width();
				
				var screenHeight = yamoCanvas.sceneRect.height();
				
				if(axis == 'x'){
					
					screenCoordinate = (screenWidth * value / 100);
					if(screenCoordinate == screenWidth){
						
						screenCoordinate -= ball_radius;
					}
				}
				else if(axis == 'y'){
					
					screenCoordinate = (screenHeight * value / 100);
					if(screenCoordinate == screenHeight){
						
						screenCoordinate -= ball_radius;
					}
					
				}
				
				
				
				
				return screenCoordinate; 
				
			}
			
			//_________________________________________________________________________
			
			
			function buildCirclesVisualization(x, y, raioinicial, collectionArray){
			
			
				var greatestRadius;
				
				
				if (collectionArray.length == 0) {
				
					return;
				}
				
				
				
				var raio = raioinicial;
				
				var contCores = 1;
				
				//////////////
				var currentColor = new QColor(180, 180, 180);
				////////////////
				
				for (var i = collectionArray.length - 1; i >= 0; i--) {
				
					var guideCircle = new QGraphicsEllipseItem(x - (raio + 18.5), y - (raio + 18.5), (raio + 18.5) * 2, (raio + 18.5) * 2);
					
					
					if (i == 0) {
					
						greatestRadius = (raio + 18.5);
					}
					
					
					/*if (i == 4) {
			 
			 //////////////
			 var textoTag = new QGraphicsSimpleTextItem("Rock");
			 //////////////////
			 textoTag.setBrush(fontBrush);
			 
			 textoTag.setZValue(i + 1);
			 
			 textoTag.setFont(font);
			 
			 textoTag.setPos(x - 35, y - 20);
			 
			 yamoCanvas.addItem(textoTag);
			 }*/
					guideCircle.setZValue(i);
					
					var newColor = new QColor(Math.max(currentColor.red() - contCores * 5, 0), Math.max(currentColor.green() - contCores * 5, 0), Math.max(currentColor.blue() - contCores * 5, 0), 200);
					
					
					currentColor = newColor;
					
					
					linePen.setColor(currentColor);
					
					linePen.setWidth(3);
					
					guideCircle.setPen(linePen);
					
					yamoCanvas.addItem(guideCircle);
					
					var ultimoRaio = drawCircles(x, y, raio, currentColor, collectionArray[i])
					
					raio = raio + 2.5 * ultimoRaio;
					
					
					contCores += 1;
				}
				
				var zoomx = (canvasView.sceneRect.width()) / (greatestRadius * 2);
				var zoomy = (canvasView.sceneRect.height()) / (greatestRadius * 2);
				
				canvasView.resetMatrix();
				canvasView.scale(zoomx, zoomy);
				
				
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
					
					
					var canvasItem = new CanvasItem(x2 - raiomenor, y2 - raiomenor, raiomenor * 2, raiomenor * 2, color, tracks[contador], yamoCanvas);
					
					canvasItem.setZValue(6);
					yamoCanvas.addItem(canvasItem);
					
					contador++;
					
				}
				return raiomenor;
				
				
				
			}
			
			
			
			
			function processPercentage(tagFiltersSelected, ratings){
					
					
					
						
						if (tagFiltersSelected.length != ratings.length) {
							return;
						}
						
						var resultPercentage;
						var somatorium = 0;
						var n = tagFiltersSelected.length;
						
						
						for (i = 0; i < n; i++) {
							
							msg("tag selected value: "+tagFiltersSelected[i].value+"rating value: "+ratings[i].value);
							
							somatorium += Math.abs(tagFiltersSelected[i].value - ratings[i].value);
							
							msg("somatorium = "+somatorium);
						}
						resultPercentage = 100 - (somatorium / n);
						return resultPercentage;
					
				
				
			}
			
		
		
		
		
		//=============================================================================
	
		
}
	
	














