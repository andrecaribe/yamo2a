/**
 *  Canvas item class
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 *  @param Number
 *  @param Number
 *  @param Number
 *  @param Number
 *  @param QColor
 *  @param String
 *  @param QGraphicsScene
 *  @param QGraphicsView
 */
function CanvasItem(X,Y,W,H,color,track,scene,view) {
    CanvasItem.superclass.call(this, X,Y,W,H);

    this.itemColor = color;
    var defaultColor = color;
    var pen = new QPen(new QColor(61,61,61,180));
    var pen2 = new QPen(new QColor(150,200,240));
    pen2.setWidth(5);
    var self = this;
    var menu = null;
    var selectionCircle;
    var isSelected = false;
    var brush = new QBrush(this.itemColor);
    var scaleFactor = 0.9;

    this.clickedMe = false;

    pen.setWidth(1);
    this.setPen(pen);
    this.setBrush(brush);
    this.track = track;
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;

    var scene = scene;
    var view = view;

    this.setAcceptHoverEvents(true);
    this.infoRect = null;

    /**
     *  Get track on CanvasItem.
     *  @return String
     */
    this.getTrack = function() {
        return this.track;
    }

    /**
     *  Set position x and y.
     *  @param x:Number
     *  @param y:Number
     */
    this.setPosition = function(x,y) {
        this.setPos(x,y);
        this.X = x;
        this.Y = y;
    }

    /**
     *  Set flag.
     *  @param flag:Boolean
     */
    this.setClickedMe = function(flag) {
        this.clickedMe = flag;
    }

    /**
     *  Get width
     *  @return Number
     */
    this.getW = function() {
        return this.W;
    }

    /**
     *  Get height.
     *  @return Number
     */
    this.getH = function() {
        return this.H;
    }

    /**
     *  Get position x.
     *  @return Number
     */
    this.getX = function() {
        return this.X;
    }

    /**
     *  Get position y.
     *  @return Number
     */
    this.getY = function() {
        return this.Y;
    }

    /**
     *  Get scene.
     *  @return QGraphicScene
     */
    this.getScene = function() {
        return scene;
    }

    /**
     *  Get view
     *  @return QGraphicView
     */
    this.getView = function() {
        return view;
    }

    /**
     *  Mouse over event.
     *  @param Event
     */
    this.hoverEnterEvent = function(event) {
        if (!this.infoRect) {
            this.infoRect = new InfoRect(parseInt(this.X+W),parseInt(this.Y-W),300,120,this);
        }
        this.infoRect.draw();
        this.setColor(new QColor(150,200,240));
        //msg(this.ItemIsSelectable);
    }

    /**
     *  Mouse click event.
     *  @param Event
     */
    this.mousePressEvent = function(event) {
        this.clickedMe = true;
    }

    /**
     *  Mouse out event.
     *  @param Event
     */
    this.hoverLeaveEvent = function(event) {
        if (!this.clickedMe) {
            this.infoRect.remove();
        }
        this.setColor(defaultColor);
    }

    /**
     *  Set color.
     *  @param QColor
     */
    this.setColor = function(color) {
        this.itemColor = color;
        brush.setColor(this.itemColor);
        this.setBrush(brush);
    }

    /**
     *  Set selection
     *  @param Boolean
     */
    this.setSelected = function(flag) {
        if (flag) {
            this.isSelected = true;
            selectionCircle = new QGraphicsEllipseItem(this.X-1,this.Y-1,this.W+1,this.H+1);
            selectionCircle.setPen(pen2);
            selectionCircle.setZValue(2);
            scene.addItem(selectionCircle);
        } else {
            this.isSelected = false;
            if (selectionCircle) {
                scene.removeItem(selectionCircle);
                selectionCircle = null;
            }
        }
    }
}
extend(CanvasItem, QGraphicsEllipseItem);