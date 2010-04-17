/**
 *  !WARNING
 */
Array.prototype.clear = function() {
    this.length = 0;
    //this = new Array();
}

/**
 *  Method that implements inheritance.
 *  <p>The first param is a subclass and the
 *  second is a superclass.</p>
 *
 *  @param Class
 *  @param Class
 */
function extend(subclass, superclass) {
    function Dummy() {}
    Dummy.prototype = superclass.prototype;
    subclass.prototype = new Dummy();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass;
    subclass.superproto = superclass.prototype;
}

/**
 *  Crop string and add three points.
 *
 *  @param String
 *  @param Number
 *
 *  @return String
 */
function cropString(str,limite) {
    var resul = str.substring(0,limite);
    resul +="...";
    return resul;
}

/**
 *  Executes an query on the Amarok database.
 *
 *  @param String
 *
 *  @return String
 */
function sql(query) {
    var result = Amarok.Collection.query(query);
    return result;
}

/** !WARNING
 *
 *  Crop string and add three points.
 *
 *  @param QList
 *  @param Item
 *  @param QFont
 *  @param Icon
 */
function addListItem(list,item,font,icon) {
    list.addItem(item);
}

/**
 *  Reads file UI file and creates a window.
 *  @param file:String
 *  @return Window
 */
function loadWindow(file) {
    var loader = new QUiLoader(Amarok.Window);
    var ui_file = new QFile(Amarok.Info.scriptPath() + "/"+file, loader);
    ui_file.open( QIODevice.ReadOnly );
    var window = loader.load(ui_file, Amarok.Window);
    ui_file.close();

    return window;
}

/**
 *  Reads file UI file and creates a window.
 *
 *  @param file:String
 *  @param parent:Window
 *
 *  @return Widget
 */
function loadWidget(file,parent) {
    var loader = new QUiLoader();
    var ui_file = new QFile(Amarok.Info.scriptPath()+ "/"+file, loader);
    ui_file.open(QIODevice.ReadOnly);
    var widget = loader.load(ui_file,parent);
    ui_file.close();

    return widget;
}

/**
 *  ...
 *  
 *  @param String
 *  @param Number
 */
function createArrayOfTracks(queryResult,ncols) {
    var resultArray = new Array();
    for (var i = 0; i < queryResult.length; i++) {
        if (i == 0 || i%ncols == 0) {
            var id = queryResult[i];
            var URL = queryResult[i+1];
            var title = queryResult[i+2];
            var artistid = queryResult[i+3];
            var artist = queryResult[i+4];
            var albumid = queryResult[i+5];
            var albumname = queryResult[i+6];
            var genrename = queryResult[i+7];
            var year = queryResult[i+8];
            var image = queryResult[i+9];
            if (image == "") {
                image = Amarok.Info.scriptPath() + "/nocover.png";
            }
            resultArray.push(
                new Track(id,URL,title,artistid,artist,albumid,albumname,genrename,year,image)
            );
        }
    }
    return resultArray;
}


/// MATH

/**
 *  Convert degree to radian
 *
 *  @param Number
 *
 *  @return Number
 */
function degreeToRadian(degree) {
    return degree * (Math.PI/180);
}

/**
 *  Convert radian to degree
 *
 *  @param Number
 *
 *  @return Number
 */
function radianToDegree(radian) {
    return radian * (180/Math.PI);
}

/// QUICK SORT
var pivot = new Object();

/**
 *  Sorts an array of objects.
 *  
 *  @param Array
 *  @param Number
 *  @param Number
 */
function q_sort1(array, left, right) {
    var l_hold = left;
    var r_hold = right;
    pivot.value = array[left].value;
    pivot.name = array[left].name;
    pivot.id = array[left].id;
    while (left < right) {
        while ((array[right].value>=pivot.value) && (left<right)) {
            right--;
        }
        if (left != right) {
            array[left].value = array[right].value;
            array[left].name = array[right].name;
            array[left].id = array[right].id;
            left++;
        }
        while ((array[left].value<=pivot.value) && (left<right)) {
            left++;
        }
        if (left != right) {
            array[right].value = array[left].value;
            array[right].name = array[left].name;
            array[right].id = array[left].id;
            right--;
        }
    }

    array[left].value = pivot.value;
    array[left].name = pivot.name;
    array[left].id = pivot.id;
    pivot.value = left;
    left = l_hold;
    right = r_hold;
    if (left < pivot.value) q_sort1(array, left, pivot.value-1);
    if (right > pivot.value) q_sort1(array, pivot.value+1, right);
}