/**
 * @author rafael
 */

 
 function ItemSelectFilter(){
 	
	ItemSelectFilter.superclass.call(this);
	
	this.tagName;
	this.color;
	
	this.value;
	
	this.widget = loadWidget("ItemSelectFilter.ui",this);
	
	this.setLabel = function(label){
		
		this.widget.chkBox.text = label;
		this.tagName = label;
	}
	
	this.setColor = function(color){
		
		this.color = color;
	}
	
	this.setValue = function(value){
		
		this.value = value;
	}
	
	
	
	
 }
 
 
 extend(ItemSelectFilter,QWidget);
