/**
 * @author rafael
 */




function getTags(){

		query = "SELECT * FROM yamo_tags";
				
				var tags = new Array();
				var res = sql(query);
				
				if(res.length > 0 ){
					
					for(var i = 0; i < res.length; i++){
						
						if(i%2 == 0){
							tags.push(res[i+1]);
						}
					}
					
				}
				return tags;
		
		
}

function getTagsAndTracks(){
	
	var query = "SELECT c.title,b.tag, a.value from yamo_tracktag a join yamo_tags b ON (a.tag = b.id) JOIN tracks c ON (a.track = c.id)"
	
	var result = sql(query);
	
	return result;
	
}


function getSumMusic(id){
	
	var query = "SELECT sum(value) from yamo_tracktag where track = "+id;
	var result = sql(query);
	
	if (result > 0) {
		return result;
	}
	else return 0;
}


function tagMusic(musicTitle, tag, value){


	var queryTrackID = "SELECT id from tracks where title like '%"+musicTitle+"%'";
			
	var resultTrackID = sql(queryTrackID);
	
	
	var totalValues = getSumMusic(resultTrackID)
	
	if (parseInt(totalValues) + value <= 100) {
	
		var queryTagID = "SELECT id from yamo_tags where tag like'%" + tag + "%'";
		
		var resultTagID = sql(queryTagID);
		
		if (resultTrackID.length == 1 && resultTagID.length == 1) {
		
			var query = "INSERT into yamo_tracktag(track,tag,value) VALUES(\"" + resultTrackID + "\", \"" + resultTagID + "\", \"" + value + "\")";
			
			var resultQuery = sql(query);
			
			
			
		}
	}else Amarok.alert("Valor escolhido ultraprassa limite de 100% para essa musica");
	
	

}


function insertTag(tag){
	
	
	var query = "INSERT INTO yamo_tags (tag) VALUES (\"" + tag+"\")";
			
	var res = sql(query);
	
}

function deleteTag(tag){
	
		var query = "DELETE from yamo_tags where tag like '%"+tag+"%'";
		var res = sql(query);
		
	
	}


function tableExists(tablename){
	
	var table_exists = false;
	
	var existing_tables = sql("SHOW TABLES");
	
	for (var i = 0; i < existing_tables.length; i++) {
		if (existing_tables[i] == tablename) {
			table_exists = true;
			
			
		}
		
		
	}
	
	return table_exists;
	
}


function setYamoDB(){
	
	var dbName1 = "yamo_tags";
	var dbName2 = "yamo_tracktag"
	
   
	var included = 0;
	
	if(!tableExists(dbName1)){
		
		
		sql('CREATE TABLE ' + dbName1 + ' (id int(10) not null auto_increment,tag VARCHAR(80) not null, primary key(id))');
		included += 1;	
		
	
	}
	
	
	
	if(!tableExists(dbName2)){
		
		
		sql( 'CREATE TABLE ' + dbName2 + ' (track int(10) not null,tag int(10) not null, value int(10) not null, primary key(track,tag))') ;	
		included += 1;
		
	
	}

    
    if( included == 2 ){ 
       
	
		Amarok.alert("Tabelas 'yamo_tags' e 'yamo_tracktag' criadas com sucesso")
	
	
    }
	else if(included == 0){
		Amarok.alert("Banco do amarok já foi criado!");
	}
	
}




function deleteYamoDb(){
	
	sql("DROP TABLE yamo_tags");
	sql("DROP TABLE yamo_tracktag");
	Amarok.alert("Tabelas exluidas com sucesso");
}



function getAllTracksInfoFromCollection(){
	
	
	var _query = "SELECT track.id,url.rpath, track.title,artist.id, artist.name, album.id, album.name, genre.name, year.name,image.path";
	    _query += "    FROM tracks track JOIN albums album ON ( track.album = album.id )";
		_query += "    JOIN urls url ON (track.url = url.id)";
	    _query += "    JOIN artists artist ON ( album.artist = artist.id )";
	    _query += "    JOIN genres genre ON ( track.genre = genre.id )";
	    _query += "    JOIN years year ON ( track.year = year.id )";
		_query += "    JOIN images image ON (album.image = image.id)"; 
		
		
	var result = sql(_query);
	
	return result;
}


	
	
	

