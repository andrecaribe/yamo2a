/**
 *  Item select filter class.
 *
 *  @author contato [at] andrecaribe [dot] com [dot] br
 *          frlins [at] gmail [dot] com
 *          raf_vasco [at] gmail [dot] com
 *
 *  @since 2009-10-01
 *
 *  @param Number
 */
function ItemSelectFilter(type) {
    var type = type;
    this.tagName;
    this.color;
    this.value;
    this.id;
    this.widget;

    if (type == 1) {
        this.widget = loadWidget("ItemSelectFilter.ui", this);
    } else if (type == 2) {
        this.widget = new QCheckBox();
    }

    /**
     *  Set ID.
     *
     *  @param String
     */
    this.setLabel = function(label) {
        if (type == 1) {
            this.widget.chkBox.text = label;
        } else if (type == 2) {
            this.widget.text = label;
        }
        this.tagName = label;
    }

    /**
     *  Set color.
     *
     *  @param QColor
     */
    this.setColor = function(color) {
        this.color = color;
    }

    /**
     *  Set value.
     *
     *  @param Number
     */
    this.setValue = function(value) {
        this.value = value;
    }

    /**
     *  Set ID.
     *
     *  @param Number
     */
    this.setID = function(id) {
        this.id = id;
    }
}