/**
 *  Class TODO
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 *  @param QRect
 */
function TagFilterContainer(rect) {
    var container = new QGraphicsScene(rect);
    var tagFilterItems = new Array();
    var count = 0;

    /**
     *  Add one item to list.
     *
     *  @param Item
     */
    this.addItem = function(item) {
        count++;
        tagFilterItems.push(item);
        container.sceneRect = new QRectF(0, 0, 240, count * 40);
        item.widget.setGeometry(1, (count-1) * 40, 240, 40);
        container.addWidget(item.widget);
    }

    /**
     *  Remove all itens
     */
    this.removeAll = function() {
        container.clear();
        tagFilterItems.clear();
        count = 0;
    }

    /**
     *  Get all itens.
     *
     *  @return Array
     */
    this.getItems = function() {
        return tagFilterItems;
    }

    /**
     *  Get item by index.
     *  
     *  @param Number
     *
     *  @return Item
     */
    this.getItem = function(index) {
        return tagFilterItems[index];
    }

    /**
     *  Get number of itens on TagFilterContainer.
     *
     *  @return Number
     */
    this.count = function() {
        return count;
    }

    /**
     * Get scene.
     *
     *  return QGraphicsScene
     */
    this.getScene = function() {
        return container;
    }
}