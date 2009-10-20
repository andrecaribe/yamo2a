/**
 * @author rafael
 */

function InfoRect(x,y,w,h,parent){
	
	var self = this;
	
	var X = x;
	
	var Y = y;
	
	var bolaW = parent.getW();
	
	var bolaH = parent.getH();
	
	var track = parent.getTrack();
	
	var canvasRef = parent.getParent();
	
	var canvasWidth = canvasRef.width();

	var canvasHeight = canvasRef.height();
	
	var textTitle = track.getTitle();
	
	var textArtist = track.getArtist();
	
	var textAlbum = track.getAlbumName();
	
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
		
		X = x - (bolaW*2.5 + w);
	}
	else if(x < 0){

		X = bolaW ;

	}
	
	if(y + h > canvasHeight){
		
		
		Y = y -((y+h) - canvasHeight);
		
	}
	else if(y < 0){
		
		Y = bolaH ;

	}
	
	
	var rect = new QGraphicsRectItem(new QRectF(X,Y,w,h));
	
	var fontBrush = new QBrush(new QColor(200,200,200,200));
	
	var brush = new QBrush(new QColor(56,56,56,150));
	
	var pen = new QPen(new QColor(87,87,87,200));
	pen.setWidth(2);
	
	var font = new QFont("Verdana",14,QFont.Bold);
	
	var font2 = new QFont("Verdana",12,QFont.Bold);
	
	rect.setBrush(brush);
	
	rect.setPen(pen);
	
	rect.setZValue(7);
	
	rect.setAcceptHoverEvents(true);
	
	if (!track.getVisualData()) {
		
		track.newVisualData();
		
		var image = track.getVisualData().setAlbumImageItem(track.getAlbumImagePath(),100);
		
		var trackTitle = track.getVisualData().setTitleTextItem(textTitle);
		
		var trackArtist = track.getVisualData().setArtistTextItem(textArtist);
		
		var trackAlbum = track.getVisualData().setAlbumTextItem(textAlbum);
		
		
	}
	var image = track.getVisualData().getAlbumImageItem();

	var trackTitle = track.getVisualData().getTitleTextItem();

	var trackArtist = track.getVisualData().getArtistTextItem();

	var trackAlbum = track.getVisualData().getAlbumTextItem();
	
	
	image.setPos(X+10,Y+10);

	image.setZValue(8);

	trackTitle.setFont(font);

	trackTitle.setBrush(fontBrush);

	trackTitle.setPos(X+120,Y+40);

	trackTitle.setZValue(8);

	trackArtist.setFont(font2);

	trackArtist.setBrush(fontBrush);

	trackArtist.setPos(X+120,Y+60);

	trackArtist.setZValue(8);

	trackAlbum.setFont(font2);

	trackAlbum.setBrush(fontBrush);

	trackAlbum.setPos(X+120,Y+80);

	trackAlbum.setZValue(8);

	
	
	trackTitle.mousePressEvent = function(){
		
		addTrack(track.getID());

		stMsg("Música " +track.getTitle()+" foi adicionada à Playlist");
	}
	
	
	image.mousePressEvent = function(){
		
		addAlbum(track.getAlbumID());

		stMsg("Album "+track.getAlbumName()+" foi adicionado à Playlist");
		
	}
	
	trackArtist.mousePressEvent = function(){
		
		addArtist(track.getArtistID());
	
	}
	
	rect.hoverLeaveEvent = function(event){
		
		self.remove();
		parent.setClickedMe(false);	
	}
	

	
	
	this.draw = function(){
		
		
		canvasRef.addItem(rect);

		canvasRef.addItem(image);

		canvasRef.addItem(trackTitle)

		canvasRef.addItem(trackArtist);

		canvasRef.addItem(trackAlbum);
		
	}
	
	this.remove = function(){
		
		canvasRef.removeItem(rect);

		canvasRef.removeItem(image);

		canvasRef.removeItem(trackTitle);

		canvasRef.removeItem(trackArtist);

		canvasRef.removeItem(trackAlbum);

	}
	
}
