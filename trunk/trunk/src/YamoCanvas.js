/**
 * @author rafael
 */

 
 
function _yamoCanvas(view){
			
	_yamoCanvas.superclass.call(this, view.sceneRect);
	
	
	this.view = view;			
	
	this.methodSelected = 0;
	
	this.items = new Array();
	
	this._addItem = function(item,addToArray){
	
	    if(addToArray)
		this.items.push(item);
	    
	    this.addItem(item);
	    
	
	}
	
	this._clear = function(){
	    
	    this.items.clear();
	    this.clear();
	
	
	}
	
	this.count = function(){
	    
	    return this.items.length;
	
	}
	
	
	this.wheelEvent = function(wheel){
				
		 if(this.methodSelected == 0){
		
		    if (wheel.delta() > 0) {
			    view.scale(1.1, 1.1);
		    }
		    else {
		    
			    view.scale(0.9, 0.9);
		    }
		}
		else if(this.methodSelected == 1){
		    
		    if(wheel.delta() > 0){
		    
			    for(var i = 0; i < this.items.length; i++){
				var item = this.items[i];
				item.setTransform((new QTransform()).translate(item.X + item.W/2, item.Y+item.H/2).scale(1.1, 1.1).translate(-(item.X + item.W/2), -(item.Y+item.H/2)),true);
			    }
		    
		    }
		    else{
			    
			    for(var i = 0; i < this.items.length; i++){
				var item = this.items[i];
				item.setTransform((new QTransform()).translate(item.X + item.W/2, item.Y+item.H/2).scale(0.9, 0.9).translate(-(item.X + item.W/2), -(item.Y+item.H/2)),true);
			    }
		    }
			    
		}
				    
	}
			
	
	this.mousePressEvent = function(event){
		
		if(event.modifiers() & Qt.ControlModifier ){
			
			view.dragMode = QGraphicsView.ScrollHandDrag;
		}
		else{
				
			view.dragMode = QGraphicsView.RubberBandDrag;
		}
		
	
	
		
		
		
		
	}
	
	this.mouseReleaseEvent = function(event){
			
		if(event.modifiers() & Qt.ControlModifier ||event.modifiers() & Qt.ShiftModifier )
			view.dragMode = QGraphicsView.NoDrag;
			
		
		var selectedItems = this.getSelectedItems();
		
		
		if(selectedItems.length > 0){
		    for(var i = 0; i < selectedItems.length; i++){
			msg("ID: "+selectedItems[i].track.getID().toString());
		    
		    }
		
		}
		
					
	}
	
	this.getSelectedItems = function(){
	    
	    var selectedItems = new Array();
	    
	    if(this.selectionArea().elementCount() == 0) {
		msg("empty");
		msg(this.selectionArea().toString());
		return;
	    }
	    
	   
	    
	    var items = this.items;
    
	    for(var i = 0; i < items.length; i++){
		
		if(this.selectionArea().contains(items[i].boundingRect())){
		    
		    selectedItems.push(items[i]);
		    msg("achou");
		
		}
	    
	    } 
	    
	    return selectedItems;
	    
	
	}
	
			

}
extend(_yamoCanvas, QGraphicsScene);