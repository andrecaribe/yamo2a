/**
 * @author rafael
 */

 


//classe da janela de debug

function TagMusicWindow() 

{
	
	var _dialog = loadWindow("TagMusicWindow.ui");
	mostraTagsExistentes();
	mostraTagsMusicas();
	
	
	
	var itemSelected;
	var ok = true;
	
	var playListIndexesSelected = Amarok.Playlist.selectedIndexes();
	var trackSelected;
	
	
	
	if (playListIndexesSelected.length == 1) {
		
		
			trackSelected = Amarok.Playlist.trackAt(playListIndexesSelected[0]);
			_dialog.lblTxtMusica.setText(trackSelected.title+" - "+trackSelected.artist);
		
	}
	else ok = false;
	

	_dialog.btnCancel.clicked.connect(function(){
		
		_dialog.close();
		
	});
	
	
	_dialog.frmTagList.lstTags.itemClicked.connect(function(item){
		
	
		_dialog.frmValue.txtValue.enabled = true;
		_dialog.frmValue.btnOK.enabled = true;
		 itemSelected = item.text();
	});
	
	
	_dialog.frmValue.btnOK.clicked.connect(function(){
		
		var value = _dialog.frmValue.txtValue.text;
		if(value != ""){
		
			tagMusic(trackSelected.title,itemSelected,value);
			mostraTagsMusicas();
			
		}
		else Amarok.alert("Digite um valor!");
		
		
	});
	
		
	
	function mostraTagsMusicas(){

		
		var tblRowCount = _dialog.groupBox.tblTrackTag.rowCount;
		
		
		for(var i = tblRowCount-1; i >=0 ;i--){
			
			
			_dialog.groupBox.tblTrackTag.removeRow(i);
		}
		
		
		
		var result = getTagsAndTracks();
		
		var bdRowCount = result.length/3;
		
		
		for(var i = 0; i < bdRowCount; i++){

			_dialog.groupBox.tblTrackTag.insertRow(i);
			
		}

	
		if(result.length > 0){
			
			for(var i = 0; i < result.length; i++){
	
					_dialog.groupBox.tblTrackTag.setItem(Math.floor(i/3),i%3, new QTableWidgetItem((result[i]).toString()));
					
			}
		}
	
	}	
		
	
	
	
	function mostraTagsExistentes(){
		
		_dialog.frmTagList.lstTags.clear();
		
		var tags = getTags();
		for(var i = 0; i < tags.length; i ++){
		
			_dialog.frmTagList.lstTags.addItem(tags[i]);
		}
		
	}
	
	if (ok) {
	
		_dialog.show();
	}
	else {
		if(playListIndexesSelected.length > 1)
			Amarok.alert("Voçê só pode selecionar uma música por vez!");
		else Amarok.alert("Selecione uma musica na playlist!");
	}
}

