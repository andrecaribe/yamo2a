


function CanvasItem(_image,track,parent) { //representa uma musica no canvas
    
    
    
    CanvasItem.superclass.call(this, _image); //chama construtor da superclasse 
   				    
    this.track = track;
	
	this.X = 0;
	this.Y = 0;
	
  	
	var parent = parent;
	        
    this.setAcceptHoverEvents(true);
    this.setTransformationMode(Qt.SmoothTransformation);
    
	this.infoRect = null;
	
	
    
    
    this.getTrack = function(){
    
	return this.track;
    }
	
	this.setPosition = function(x,y){
		
		
		this.setPos(x,y);
		this.X = x;
		this.Y = y;
	}

    /*this.mousePressEvent = function(event){ 
		
			addTrack(this.track.getID());
	
		 
		 if (event.button().toString() == "RightButton"){
			
			this.infoRect.draw();
			
		}
		
			
		
		

    }
    */
    this.hoverEnterEvent = function(event){
    
		
		if(!this.infoRect){
			
			
			var info = {};
			info.imagepath = this.track.getAlbumImage();
			
			info.tracktitle =  this.track.getTitle();
			info.trackartist = this.track.getArtist();
			info.trackalbum = this.track.getAlbumName();
			info.trackid = this.track.getID();
			info.albumid = this.track.getAlbumID();
			info.artistid = this.track.getArtistID();
			
			
			this.infoRect = new InfoRect(parseInt(this.X),parseInt(this.Y),400,120,info,parent);
	
		}
		this.infoRect.draw();

    }
	
}





//chama funcao extend que extende (extend(subclasse,superclasse))...

extend(CanvasItem, QGraphicsPixmapItem); //yamaAlbumItem extende de QGraphicsPixmapItem