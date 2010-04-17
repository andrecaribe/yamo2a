/**
 *  Class TODO
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 *  @param 
 *  @param 
 *  @param 
 *  @param 
 */
function tagValueProgressBar(tagID,value,trackID,parent) {
    tagValueProgressBar.superclass.call(this);

    this.tagID = tagID;
    this.value = value;
    this.trackID = trackID;

    var self = this;
    var opMenu = new QMenu();
    var actionMod =  opMenu.addAction("Modify Value");
    var actionDel = opMenu.addAction("Delete");

    /**
     *  TODO
     */
    actionMod.triggered.connect(function() {
        var dialogModify = new DialogModifyValue(self.trackID,self.tagID,self);
    });

    /**
     *  TODO
     */
    actionDel.triggered.connect(function() {
        unTagMusic(trackID,tagID);
        parent.showMusicTagRatings(trackID);
    });

    /**
     *  TODO
     */
    opMenu.leaveEvent = function() {
        this.hide();
    }

    /**
     *  Get tag.
     *
     *  @return String
     */
    this.getTag = function() {
        return tag;
    }

    /**
     *  TODO
     */
    this.notifyModifiedValue = function() {
        parent.showMusicTagRatings(trackID);
    }

    /**
     *  Add one item to list.
     *
     *  @param Event
     */
    this.mousePressEvent = function(event) {
        if (event.button() == Qt.RightButton) {
            opMenu.exec(QCursor.pos());
        }
    }
}

extend(tagValueProgressBar,QProgressBar);