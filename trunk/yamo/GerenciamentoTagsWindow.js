/**
 * @author rafael
 */


function GerenciamentoTagsWindow(){

	var _dialog = loadWindow("GerenciamentoTagsWindow.ui");
	
	var btnIncluir = _dialog.panIncluirTag.btnIncluir;
	var btnFechar  = _dialog.btnFechar;
	var btnAvaliar = _dialog.panAvaliarMusica.btnAvaliar;
	
	var lblMusica = _dialog.panAvaliarMusica.lblMusica;
	var lblTag    = _dialog.panAvaliarMusica.lblTag;
	var lblValor  = _dialog.panAvaliarMusica.lblValor;
	
	var sldValor  = _dialog.panAvaliarMusica.sldValor;
	lblValor.text = sldValor.value;
	
	var txtTag    = _dialog.panIncluirTag.txtTag;
	txtTag.setFocus();
	
	var tblAvaliacoes = _dialog.panMusicasAvaliadas.tblAvaliacoes;
	var lstTagsCadastradas = _dialog.panTagsCadastradas.lstTagsCadastradas;
	
	var lstPlaylist = _dialog.panPlaylist.lstPlaylist;
	
	
	
	
	
	var playListTracks = new Array();
	var tagSelected = null;
	
	var trackFromPlaylistSelected = null;

	mostraTagsExistentes();
	mostraTagsMusicas();
	mostraPlaylist();
	
	
	btnFechar.clicked.connect(function(){
			_dialog.done(0);
	});
	
	btnIncluir.clicked.connect(function(){
		
		var tagname = txtTag.text;
		
		if(tagname!=""){
			
			insertTag(tagname);

			mostraTagsExistentes();
				
			txtTag.text = "";
				
			
		}
		else Amarok.alert("Campo tag em branco!");
			
	});
	
	lstTagsCadastradas.itemDoubleClicked.connect(function(item){
		
		
		deleteTag(item.text());
		mostraTagsExistentes();
	});
	
	
	lstTagsCadastradas.itemClicked.connect(function(item){
		
		tagSelected = item.text();
		
		if(trackFromPlaylistSelected){
			
			_dialog.panAvaliarMusica.enabled = true;
			btnAvaliar.enabled = true;
			sldValor.enabled = true;
			sldValor.setFocus();
		}
		lblTag.text = tagSelected;
		 
	});
	
	lstPlaylist.itemClicked.connect(function(item){
		
		trackFromPlaylistSelected = playListTracks[lstPlaylist.row(item)];
		lblMusica.text = trackFromPlaylistSelected.title;
		
		if(tagSelected){
			
			_dialog.panAvaliarMusica.enabled = true;
			btnAvaliar.enabled = true;
			sldValor.enabled = true;
			sldValor.setFocus();
			
		}
		
		
	});
	
	
	btnAvaliar.clicked.connect(function(){
		
		var value = sldValor.value;

			tagMusic(trackFromPlaylistSelected.title,tagSelected,value);
			mostraTagsMusicas();
			
	});
	
	sldValor.valueChanged.connect(function(){
		
		lblValor.text = sldValor.value;
		
	});
	


	function mostraPlaylist(){
		
		for(var i = 0; i < Amarok.Playlist.totalTrackCount();i++){
			
			var track = Amarok.Playlist.trackAt(i);
			playListTracks.push(track);
			lstPlaylist.addItem(track.title+" - "+track.artist);
			
		}
		
	}

	
	function mostraTagsMusicas(){

		
		var tblRowCount = tblAvaliacoes.rowCount;
		
		
		for(var i = tblRowCount-1; i >=0 ;i--){
			
			
			tblAvaliacoes.removeRow(i);
		}
		
		
		
		var result = getTagsAndTracks();
		
		var bdRowCount = result.length/3;
		
		
		for(var i = 0; i < bdRowCount; i++){

			tblAvaliacoes.insertRow(i);
			
		}

	
		if(result.length > 0){
			
			for(var i = 0; i < result.length; i++){
	
					tblAvaliacoes.setItem(Math.floor(i/3),i%3, new QTableWidgetItem((result[i]).toString()));
					
			}
		}
	
	}
	
	
	
	function mostraTagsExistentes(){
		
		_dialog.panTagsCadastradas.lstTagsCadastradas.clear();
		
		var tags = getTags();
		for(var i = 0; i < tags.length; i ++){
		
			lstTagsCadastradas.addItem(tags[i]);
		}
		
	}
		

	
	_dialog.show();
}