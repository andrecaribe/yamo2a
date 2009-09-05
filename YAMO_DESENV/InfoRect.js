/**
 * @author rafael
 */




function InfoRect(x,y,w,h,info,parent){
	
	var X = x;
	var Y = y;
	
	var canvasWidth = parent.width();
	var canvasHeight = parent.height();
	
	var textTitle = info.tracktitle;
	var textArtist = info.trackartist;
	
	var textAlbum = info.trackalbum;
	
	
	if(textTitle.length > 22){
		
		textTitle = cropString(textTitle,22);
		
	}
	
	if(textArtist.length > 30){
		
		textArtist = cropString(textArtist,23);
		
	}
	
	if(textAlbum.length > 30){
		
		textAlbum = cropString(textAlbum,23);
		
	}
	
	
	if(x + w > canvasWidth){
		
		X = x -((x+w) - canvasWidth);
		
	}
	else if(x < 0){

		X = 0 ;

	}
	
	if(y + h > canvasHeight){
		
		Y = y -((y+h) - canvasHeight);
		
	}
	else if(y < 0){
		
		Y = 0 ;

	}
	
	
	var rect = new QGraphicsRectItem(new QRectF(X,Y,w,h));

	var fontBrush = new QBrush(new QColor(200,200,200,200));
	var brush = new QBrush(new QColor(81,81,81,150));
	var pen = new QPen(new QColor(81,81,81,200));
	
	var font = new QFont("Verdana",14,QFont.Bold);
	var font2 = new QFont("Verdana",12,QFont.Bold);
	
	rect.setBrush(brush);
	rect.setPen(pen);
	rect.setZValue(1);
	rect.setAcceptHoverEvents(true);
	
	
	var image = new QGraphicsPixmapItem(new QPixmap(info.imagepath).scaled(100,100));
	
	var	trackTitle  = new QGraphicsSimpleTextItem(textTitle);
	
	
	var trackArtist = new QGraphicsSimpleTextItem(textArtist);
	
	var trackAlbum  = new QGraphicsSimpleTextItem(textAlbum);
	
	
	image.setPos(X+10,Y+10);
	image.setZValue(2);
	
	trackTitle.setFont(font);
	trackTitle.setBrush(fontBrush);
	trackTitle.setPos(X+120,Y+40);
	trackTitle.setZValue(2);

	trackArtist.setFont(font2);
	trackArtist.setBrush(fontBrush);
	trackArtist.setPos(X+120,Y+60);
	trackArtist.setZValue(2);
	
	trackAlbum.setFont(font2);
	trackAlbum.setBrush(fontBrush);
	trackAlbum.setPos(X+120,Y+80);
	trackAlbum.setZValue(2);
	
	
	
	
	trackTitle.mousePressEvent = function(){
		
		addTrack(info.trackid);
		stMsg("Música " +info.tracktitle+" foi adicionada à Playlist");
	}
	
	
	image.mousePressEvent = function(){
		
		addAlbum(info.albumid);
		stMsg("Album "+info.trackalbum+" foi adicionado à Playlist");
		
	}
	
	trackArtist.mousePressEvent = function(){
		
		addArtist(info.artistid);
	
	}
	
	rect.hoverLeaveEvent = function(event){
		
		remove();
		
	}
	
	
	this.draw = function(){
		
		parent.addItem(rect);
		parent.addItem(image);
		parent.addItem(trackTitle)
		parent.addItem(trackArtist);
		parent.addItem(trackAlbum);
		
	}
	
	function remove(){
		
		parent.removeItem(rect);
		parent.removeItem(image);
		parent.removeItem(trackTitle);
		parent.removeItem(trackArtist);
		parent.removeItem(trackAlbum);
	}
	
	
	
	
	
	
	
	
}



