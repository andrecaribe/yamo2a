
Importer.loadQtBinding( "qt.core" );
Importer.loadQtBinding( "qt.gui" );
Importer.loadQtBinding( "qt.uitools" );
Importer.include("Utils.js");


function CanvasItem(_image,track) { //representa uma musica no canvas
    
    
    
    CanvasItem.superclass.call(this, _image); //chama construtor da superclasse 
   				    
    this.track = track;
  
	        
    this.setAcceptHoverEvents(true);
    this.setTransformationMode(Qt.SmoothTransformation);
    
    
    
    this.getTrack = function(){
    
	return this.track;
    }
	
	
	
    
    // podera ser colocado aqui tambem qualquer informacao como nome da musica , album etc...
    
   
    
    this.mousePressEvent = function(){ 
					
	
	msg("Image: "+this.track.getAlbumImage());
	

    }
    
    this.hoverEnterEvent = function(){
    
	
	
	
	
    }
    
}


//chama funcao extend que extende (extend(subclasse,superclasse))...

extend(CanvasItem, QGraphicsPixmapItem); //yamaAlbumItem extende de QGraphicsPixmapItem