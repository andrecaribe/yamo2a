/**
 * @author rafael
 */



function CanvasItem(X,Y,W,H,color,track,parent) { //representa uma musica no canvas
    
    CanvasItem.superclass.call(this, X,Y,W,H); //chama construtor da superclasse 
    
	this.itemColor = color;
	
	var pen = new QPen(new QColor(61,61,61,180));
	
	var self = this;
	
	var menu = null;
	
	var brush = new QBrush(this.itemColor);
	
	this.clickedMe = false;
	
	pen.setWidth(1);
	
	this.setPen(pen);
	
	this.setBrush(brush);
	
	this.track = track;
	
	this.X = X;
	
	this.Y = Y;
	
	this.W = W;
	
	this.H = H;
	
	var parent = parent;
	        
    this.setAcceptHoverEvents(true);
	
	this.infoRect = null;
	
	
    this.getTrack = function(){
    
		return this.track;
    }
	
	
	this.setPosition = function(x,y){
		
		
		this.setPos(x,y);
		this.X = x;
		this.Y = y;
	}
	
	this.setClickedMe = function(flag){
		
		this.clickedMe = flag;
	}
	
	
	
	this.getW = function(){
		
		return this.W;
	}
	
	this.getH = function(){
		
		return this.H;
	}
	
	this.getX = function(){
		
		return this.X;
	}
	
	this.getY = function(){
		
		return this.Y;
	}
	
	
	this.getParent = function(){
		
		return parent;
		
	}
	
		
    this.hoverEnterEvent = function(event){
    	
		if(!this.infoRect){
			
			this.infoRect = new InfoRect(parseInt(this.X+W*2),parseInt(this.Y-W*2),400,120,this);
		}
		
		this.infoRect.draw();
		
    }
	
	this.mousePressEvent = function(event){
		
		this.clickedMe = true;
		
	}
	
	this.hoverLeaveEvent = function(event){
		
			if (!this.clickedMe) {
				this.infoRect.remove();
			}
			
		
	}
	
	
	
	this.setColor = function(color){
		
		this.itemColor = color;
		
		brush.setColor(this.itemColor);
		
		this.setBrush(brush);
	}
	
	
	
	
}



//chama funcao extend que extende (extend(subclasse,superclasse))...

extend(CanvasItem, QGraphicsEllipseItem); 