/**
 * @author rafael
 */




function getTags(){

		query = "SELECT id,tag, color FROM yamo_tags";
				
				var res = sql(query);
				
				
				
				var resArray = new Array();
				
				for(i = 0 ; i < res.length; i++ ){
					
					if (i % 3 == 0) {
						var resObject = new Object();
						
						resObject.id = res[i];
						resObject.tagName = res[i+1];
						resObject.color = res[i+2];
						
						
						resArray.push(resObject);
					}
				}
				
				
				return resArray;
		
}



function getValueFromTrackAndThisTag(trackID,tag){
	
	var tagID = getTagID(tag);
	
	var query = "SELECT value from yamo_tracktag where tag = "+tagID+" and track="+trackID;
	
	var res = sql(query);
	
	if(res.length == 0) return 0;
	
	return res;
	
}

function getTrackID(trackTitle,trackAlbum){
	
	
	var query = "SELECT a.id from tracks a JOIN albums b ON(a.album = b.id) WHERE a.title LIKE '%"+trackTitle+"%'";
	
	query += "  AND b.name LIKE '%"+trackAlbum+"%'";
	
	var result = sql(query);
	
	if(result.length > 0) return result;
	
	else return -1;
}

function getTagID(tag){
	
	var query = "SELECT id from yamo_tags where tag like '%"+tag+"%'";
	
	return sql(query);
}



function getTagsFromTrack(trackID){
	
	var query = "SELECT b.tag, a.value, b.color FROM yamo_tracktag a JOIN yamo_tags b ON (a.tag = b.id) JOIN tracks c ON (a.track = c.id)"
	
	query += "  WHERE c.id="+trackID;
	
	var res = sql(query);
	
	
	var resArray = new Array();
				
	for(i = 0 ; i < res.length; i++ ){
		
		if (i % 3 == 0) {
			var resObject = new Object();
			
			resObject.tagName = res[i];
			resObject.value = res[i+1];
			resObject.color = res[i+2];
			
			
			resArray.push(resObject);
		}
	}
	
	
	
	return resArray;
}



function getSumMusic(trackID){
	
	var query = "SELECT sum(value) from yamo_tracktag where track = "+trackID;
	
	var result = sql(query);
	
	if (result > 0) {
	
		return result;
	}
	
	else return 0;
}


function tagMusic(trackID, tag, value){

		var tagID = getTagID(tag);
		
		var countTag = sql("SELECT count(*) from yamo_tracktag where track = "+trackID + " and tag = "+tagID);
		
		if (countTag > 0) {
		
			Amarok.alert("You've already tagged this music with this tag!");
		}
		else {
		
			var query = "INSERT into yamo_tracktag(track,tag,value) VALUES(\"" + trackID + "\", \"" + tagID + "\", \"" + value + "\")";
			
			var resultQuery = sql(query);
		}
}


function unTagMusic(trackID, tagID){
	
	
	sql("DELETE FROM yamo_tracktag where track = "+trackID+" AND tag = "+tagID);
}


function insertTag(tag,color){
	
	
	var query = "INSERT INTO yamo_tags (tag,color) VALUES (\"" + tag+"\", \""+color+"\")";
			
	var res = sql(query);
	
}



function modifyTag(tagID, name, color){
	
	
	msg("entrou em modify tag, tag id = "+tagID+",name = "+name);
	if (color) {
		
		msg("nova cor");
		sql("UPDATE yamo_tags SET tag = '"+name+"', color = '"+color+"' WHERE id = "+tagID);
	}
	else {
		
		msg("nao mudou cor");
		sql("UPDATE yamo_tags SET tag = '"+name+"' WHERE id = "+tagID);
		
		msg("novo nome = "+sql("select tag from yamo_tags where id = "+tagID));
		
	}
}


function deleteTag(tag){
		
		var tagid = getTagID(tag);
		
		var query = "DELETE from yamo_tags where id = "+tagid;
	
		sql(query);
		
		var query2 = "DELETE from yamo_tracktag where tag="+tagid;
		
		sql(query2);
}


function modifyValue(trackID, tagID, newValue){
	
	sql("UPDATE yamo_tracktag set value = "+parseInt(newValue)+"  WHERE track = "+trackID+" AND tag = "+tagID);
	
	
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
		
		
		sql('CREATE TABLE ' + dbName1 + ' (id int(10) not null auto_increment,tag VARCHAR(80) not null,color VARCHAR(7) not null, primary key(id))');
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


function getAllArtists(){
	

	var query = "SELECT artist.name, artist.id FROM artists artist";

	var result = sql(query);

	return result;
	
}

function getAllAlbumsFromArtist(artistID){
	
	var query = "SELECT album.name, album.id FROM albums album WHERE album.artist="+artistID;
	
	var result = sql(query);
	
	return result;
}

function getAllTracksFromAlbum(albumID){
	
	var query = "SELECT track.title, track.id FROM tracks track WHERE track.album="+albumID;
	
	var result = sql(query);
	
	return result;
}


function getAllTracksInfoFromCollection(){
	
	

	var _query = "SELECT track.id,url.rpath, track.title,artist.id, artist.name, album.id, album.name, genre.name, year.name,image.path";

	    _query += "    FROM tracks track JOIN albums album ON ( track.album = album.id )";

		_query += "    JOIN urls url ON (track.url = url.id)";

	    _query += "    JOIN artists artist ON ( album.artist = artist.id )";

	    _query += "    LEFT JOIN genres genre ON ( track.genre = genre.id )";

	    _query += "    LEFT JOIN years year ON ( track.year = year.id )";

		_query += "    LEFT JOIN images image ON (album.image = image.id)"; 
		
		
	var result = sql(_query);
	
	return result;
}


	
	
	

