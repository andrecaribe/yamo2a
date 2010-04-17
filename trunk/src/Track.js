/**
 *  Class TODO
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 *  @param Number
 *  @param String
 *  @param String
 *  @param Number
 *  @param String
 *  @param Number
 *  @param String
 *  @param String
 *  @param String
 *  @param String
 */
function Track(id, url, title, artistid, artist, albumid, albumname, genrename, year, image) {
    this.ID = id;
    this.URL = url;
    this.Title = title;
    this.ArtistID = artistid;
    this.Artist = artist;
    this.AlbumID = albumid;
    this.AlbumName = albumname;
    this.GenreName = genrename;
    this.Year = year;
    this.AlbumImagePath = image;
    this.visualData = null;

    /**
     *  Create visual data.
     */
    this.newVisualData = function() {
        this.visualData = new VisualData();
    }

    /**
     *  Get visual data.
     *
     *  @return VisualData
     */
    this.getVisualData = function() {
        return this.visualData;
    }

    /**
     *  Get track id.
     *
     *  @return Number
     */
    this.getID = function() {
        return this.ID;
    }

    /**
     *  Get track URL.
     *
     *  @return String
     */
    this.getURL = function() {
        return this.URL;
    }

    /**
     *  Get track title.
     *
     *  @return String
     */
    this.getTitle = function() {
        return this.Title;
    }

    /**
     *  Get track artist ID.
     *
     *  @return Number
     */
    this.getArtistID = function() {
        return this.ArtistID;
    }

    /**
     *  Get track artist name.
     *
     *  @return String
     */
    this.getArtist = function() {
        return this.Artist;
    }

    /**
     *  Get track album ID.
     *
     *  @return Number
     */
    this.getAlbumID = function() {
        return this.AlbumID;
    }

    /**
     *  Get track album name.
     *
     *  @return String
     */
    this.getAlbumName = function() {
        return this.AlbumName;
    }

    /**
     *  Get track genre name.
     *
     *  @return String
     */
    this.getGenreName = function() {
        return this.GenreName;
    }

    /**
     *  Get track year.
     *
     *  @return String
     */
    this.getYear = function() {
        return this.Year;
    }

    /**
     *  Get track image.
     *
     *  @return Number
     */
    this.getAlbumImagePath = function() {
        return this.AlbumImagePath;
    }
}

/**
 *  Class TODO
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 */
function VisualData() {
    this.albumImageItem = null;
    this.titleTextItem = null;
    this.artistTextItem = null;
    this.albumTextItem = null;

    /**
     *  Set track album image.
     *
     *  @param String
     *  @param Number
     */
    this.setAlbumImageItem = function(imgPath,size) {
        this.albumImageItem = new QGraphicsPixmapItem(new QPixmap(imgPath).scaled(size,size));
    }

    /**
     *  Get track album image.
     *
     *  @return QGraphicsPixmapItem
     */
    this.getAlbumImageItem = function() {
        return this.albumImageItem;
    }

    /**
     *  Set track title.
     *
     *  @param String
     */
    this.setTitleTextItem = function(text) {
        this.titleTextItem = new QGraphicsSimpleTextItem(text);
    }

    /**
     *  Get track album title.
     *
     *  @return String
     */
    this.getTitleTextItem = function() {
        return this.titleTextItem;
    }

    /**
     *  Set track artist.
     *
     *  @param String
     */
    this.setArtistTextItem = function(text) {
        this.artistTextItem = new QGraphicsSimpleTextItem(text);
    }

    /**
     *  Get track artist.
     *
     *  @return String
     */
    this.getArtistTextItem = function() {
        return this.artistTextItem;
    }

    /**
     *  Set track album.
     *
     *  @param String
     */
    this.setAlbumTextItem = function(text) {
        this.albumTextItem = new QGraphicsSimpleTextItem(text);
    }

    /**
     *  Get track album.
     *
     *  @return String
     */
    this.getAlbumTextItem = function() {
        return this.albumTextItem;
    }
}