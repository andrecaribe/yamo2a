








function CriaTagWindow() 

{
	
	
	
	

	
	var _dialog = loadWindow("CriaTagWindow.ui");
	
	mostraTagsExistentes(_dialog);
	
	_dialog.btnFechar.released.connect(function(){
			_dialog.done(0);
	});
	
	_dialog.frame.btnIncluir.released.connect(function(){
		
		var tagname = _dialog.frame.txtTag.text;
		
		if(tagname!=""){
			
			insertTag(tagname);

			mostraTagsExistentes(_dialog);
				
			_dialog.frame.txtTag.text = "";
				
			
		}
		else Amarok.alert("Campo tag em branco!");
			
	});
	
	
	_dialog.groupBox.lstTags.itemDoubleClicked.connect(function(item){
		
		
		deleteTag(item.text());
		mostraTagsExistentes();
	});
	
	
	
		
	function mostraTagsExistentes(){
		
		_dialog.groupBox.lstTags.clear();
		
		var tags = getTags();
		for(var i = 0; i < tags.length; i ++){
		
			_dialog.groupBox.lstTags.addItem(tags[i]);
		}
		
	}	
	
	
   

 
	_dialog.show();
	
}






	
	








