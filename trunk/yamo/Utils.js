function extend(subclass, superclass) {    //metodo que implementa herança 
	    function Dummy(){} 
	    
	    Dummy.prototype = superclass.prototype; 
	    subclass.prototype = new Dummy();
	    subclass.prototype.constructor = subclass;
	    subclass.superclass = superclass;
	    subclass.superproto = superclass.prototype;
	    
	
}


function sql(query){
	
	var result = Amarok.Collection.query(query);
	return result;
}


function loadWindow(file){ //le arquivo .UI criado no QT creator e cria uma janela usando o arquivo
	
	var loader = new QUiLoader(Amarok.Window);
	var ui_file = new QFile(Amarok.Info.scriptPath() + "/"+file, loader);
 	ui_file.open( QIODevice.ReadOnly );
	var window = loader.load(ui_file, Amarok.Window);
	
    ui_file.close();
	
	return window;
	
}


function createArrayOfTracks(queryResult,ncols){
	
	
	var resultArray = new Array();
	
	for(var i = 0; i < queryResult.length; i++){
		
		
		if(i == 0 || i%ncols == 0){
			
		
			var id = queryResult[i];
			var URL = queryResult[i+1];
			var title = queryResult[i+2];
			var artist = queryResult[i+3];
			var albumid = queryResult[i+4];
			var albumname = queryResult[i+5];
			var genrename = queryResult[i+6];
			var year = queryResult[i+7];
			var image = queryResult[i+8];
			
		
			resultArray.push(
				new Track(id,URL,title,artist,albumid,albumname,genrename,year,image)
			
			);
		
			
			
		}
		
	}
	
	return resultArray;
	
}

function Track(id,url,title,artist,albumid,albumname,genrename,year,image){
	
	this.ID = id;
	this.URL = url;
	this.Title = title;
	this.Artist = artist;
	this.AlbumId = albumid;
	this.AlbumName = albumname;
	this.GenreName = genrename;
	this.Year = year;
	this.AlbumImage = image;
	
	
	this.getID = function(){
		
		return this.ID;
	}
	
	this.getTitle = function(){
		
		return this.Title;
	}
	
	this.getArtist = function(){
		
		return this.Artist;
	}
	
	this.getAlbumId = function(){
		
		return this.AlbumId;
	}
	
	this.getAlbumName = function(){
		
		return this.AlbumName;
	}
	
	this.getGenreName = function(){
		
		return this.GenreName;
	}
	
	this.getYear = function(){
		
		return this.Year;
	}
	
	this.getAlbumImage = function(){
		
		return this.AlbumImage;
	}
	
}
