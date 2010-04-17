/**
 *  Modify value window class.
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 */

/**
 *  Add track in playlist.
 *
 *  @param Number
 */
function addTrack(ID) {
    var query  = " SELECT concat('file://','/', u.rpath)";
    query += " FROM tracks t, urls u";
    query += " where t.id="+ID;
    query += " and t.url=u.id";
    var result = sql(query);
    Amarok.Playlist.addMedia(new QUrl(result[0]));
}

/**
 *  Add album in playlist.
 *
 *  @param Number
 */
function addAlbum(albumID) {
    var query  = " SELECT concat('file://','/', u.rpath)";
    query += " FROM tracks t, urls u";
    query += " where t.album="+albumID;
    query += " and t.url=u.id";
    query += " order by t.discnumber, t.tracknumber";
    var result = sql(query);
    for (var i=0; i < result.length; i++) {
        Amarok.Playlist.addMedia(new QUrl(result[i]));
    }
}

/**
 *  Add artist in playlist.
 *
 *  @param Number
 */
function addArtist(artistID) {
    var query  = " SELECT distinct t.album";
    query += " FROM tracks t, urls u";
    query += " where t.artist="+artistID;
    query += " and t.url=u.id";
    query += " order by t.year";
    var result = sql(query);
    for (var i=0; i < result.length; i++) {
        this.addAlbum(result[i]);
    }
}
