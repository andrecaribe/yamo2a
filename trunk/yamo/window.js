Importer.loadQtBinding( "qt.core" );
Importer.loadQtBinding( "qt.gui" );
Importer.loadQtBinding( "qt.uitools" );



//===========GLOBALS===========================
var rects = new Array();
var albumItems = new Array();
var imgsize = 96;




var background_color = QApplication.palette().color(QPalette.Mid);
var background_color2 = QApplication.palette().color(QPalette.Button);
var background_colorw = QApplication.palette().color(QPalette.Dark);
var background_gradient = new QLinearGradient( new QPointF(0, 0), new QPointF(512, 0));
background_gradient.setColorAt(0, background_color);
background_gradient.setColorAt(1, background_color2);
var background_gradient2 = new QLinearGradient( new QPointF(0, 0), new QPointF(512, 0));
background_gradient2.setColorAt(0, background_color2);
background_gradient2.setColorAt(1, background_color);
var background_brush = new QBrush(background_gradient);
var background_brush2 = new QBrush(background_gradient2);
var background_pen   = new QPen(background_color);

//=========================================


function extend(subclass, superclass) {    //metodo que implementa herança 
    function Dummy(){} 
    
    Dummy.prototype = superclass.prototype; 
    subclass.prototype = new Dummy();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass;
    subclass.superproto = superclass.prototype;
}

function yamaAlbumItem(imagePath,rect) { //classe que representa o item album na lista , esta classe devera ficar num .JS separado no futuro
    
    
    
    yamaAlbumItem.superclass.call(this,imagePath,rect); //chama construtor da superclasse (QGraphicsPixmapItem) 
							
    
    //cada item possui id e id do album ...
    this.id;        
    this.albumTitle;
    
    this.setID = function(ID){
	   
	    this.id = ID;
    
    }
    
    this.getID = function(){
    
	return this.id;
    }
    
    this.setAlbumTitle = function(albumTitle){
	   
	    this.albumTitle = albumTitle;
    
    }
    
    this.getAlbumTitle = function(){
    
	return this.albumTitle;
    }
    
    this.mousePressEvent = function(){ //mousePressEvent pertence a QGraphicsPixmapItem mas 
					//como esta classe herda dela(QGraphicsPixmapItem) ela tem acesso

	msg(this.getID());
	msg(this.getAlbumTitle()); //sempre que clicar no album retorne o id e o nome do album do mesmo

    }
    
}

extend(yamaAlbumItem, QGraphicsPixmapItem); //yamaAlbumItem extende de QGraphicsPixmapItem



function yamoWindow() 

{
 

    QMainWindow.call(this, null); //herda de QMainWindow
    
    
    
    this.windowTitle = "YAMO";
    
    this.minimumWidth = 800;
    this.minimumHeight = 600;
    this.maximumWidth = 800;
    this.maximumHeight = 600;
    
    
 
    
   
   
   
   this.closeEvent = function(event){ exit(); } 

   

     
  
	this.comboBoxWidth = new QComboBox(this);
	with(this.comboBoxWidth) {
		resize(120, 30);
		move(10, 10);
		addItem("Album", 0);
		addItem("Artist", 1);
		addItem("Name", 2);
	}

	this.comboBoxHeight = new QComboBox(this);
	with(this.comboBoxHeight) {
		resize(120, 30);
		move(150, 10);
		addItem("Album", 0);
		addItem("Artist", 1);
		addItem("Name", 2);
	}
	
	this.okButton = new QPushButton("Ok", this);
	with(this.okButton) {
		resize(60, 30);
		move(290, 10);
	}
	this.okButton['released()'].connect(this,this.okButtonHandler);

	
	this.queryButton1 = new QPushButton("Collection to Table", this);
	with(this.queryButton1){
	    resize(120,30);
	    move(380,10);
	}
	
	this.queryButton1['released()'].connect(this,this.queryButton1Handler);
	

	this.scrollAreaData     = new QGraphicsScene(0, 0, 800, 250, this);
	this.scrollAreaResults  = new QGraphicsView(this.scrollAreaData, this);
	this.scrollAreaData.backgroundBrush = new QBrush(QApplication.palette().color(QPalette.Button), Qt.SolidPattern);
	


	this.scrollAreaData.sceneRect = new QRectF(0,0,800, 250);
	
	
	
	
	with(this.scrollAreaResults){
	  move(0,80);
	  resize(800,250);
	}


	
    
	var arrayColuna = new Array("Artista","ID artista","Album","ID Album","Image");    
    
	this.listaResultados = new QTableWidget(10,arrayColuna.length,this);
    
	with(this.listaResultados){
	    move(10,400);
	    resize(780,200);
	    setHorizontalHeaderLabels(arrayColuna);
	}
	
	
	this.labelCanvas = new QLabel("CANVAS",this);
	with(this.labelCanvas){
	  
	  move(10,56);
	  textFormat = "bold";
	}
	
	


}





yamoWindow.prototype.okButtonHandler = function(){

    msg("X: " + this.comboBoxWidth.currentText + " Y: " + this.comboBoxHeight.currentText);

}
	

yamoWindow.prototype.queryButton1Handler = function(){
	    
	    
	    
    var query = "SELECT a.name, a.id, b.name,b.id, c.path  FROM artists a JOIN albums b ON (a.id = b.artist) LEFT JOIN images c ON ( b.image = c.id )";
    //traga nome do artista ,id do artista,nome do album, id do album. se album tiver imagem traga tambem senao traga sem imagem (LEFT JOIN) 
    
    
    msg("excutando query...");
    var resArtists = Amarok.Collection.query( query );//metodo da api do amarok que executa internamente uma requisicao mysql com a query passada
    msg("ok...");

    msg("preenchendo tabela e canvas");
    
    
    var recty = 50;
    var totalSizeY = 250;
    for(var i = 0; i < resArtists.length; i++){
	 this.listaResultados.setItem(parseInt(i/this.listaResultados.columnCount),parseInt(i%this.listaResultados.columnCount),new QTableWidgetItem(resArtists[i].toString()));    
	 
	 //resultado e retornado como uma lista ex.: [Artista1 , 2 , Album1 , 3 , image.jpg , Artista2, 3, Album1, 5, image.jpg]...
	 
	 
	if(i == 0 || i%5 == 0){ //...logo temos um novo item(no caso album) quando i for 0 
				//no inicio ou sempre que i for multiplo de 5 ja que existem cinco colunas nesse exemplo 
	    
	    //monta a visualizacao desenhando retangulos para cada album com sua respectiva capa de album
	    
	    
	    var rect = this.scrollAreaData.addRect(210, recty, 380, 96, background_pen, background_brush)
	   rects.push(rect);
	    
	    
	    
	    
	
	    var imagePath = resArtists[i+4];
	   
	    if(imagePath != ""){
	    
		var albumItem = new yamaAlbumItem((new QPixmap(imagePath)).scaled(imgsize,imgsize), rect);
	    
		albumItem.setID(resArtists[i+3]);
		albumItem.setAlbumTitle(resArtists[i+2]);
		
		
		albumItem.moveBy(210,recty); 
		albumItems.push(albumItem);
	    }
	    

	    
	    recty = recty + 100;  
	    
	    totalSizeY += 100;
	    this.scrollAreaData.sceneRect = new QRectF(0,0,800, totalSizeY);
	    
	}
    
    }
    
   
 
 
   
}















