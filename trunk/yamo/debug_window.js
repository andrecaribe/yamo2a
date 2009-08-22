Importer.loadQtBinding( "qt.core" );
Importer.loadQtBinding( "qt.gui" );
Importer.loadQtBinding( "qt.uitools" );

//classe da janela de debug

function debugWindow() 

{

	

    QDialog.call(this, null);
    this.windowTitle = "Debug Window";
    
    this.minimumWidth = 400;
    this.minimumHeight = 300;
    this.maximumWidth = 400;
    this.maximumHeight = 300;
    
    
    this.caixaTexto = new QListWidget(this); 
    
    with(this.caixaTexto){
	
	resize(390,250);
	move(5,10);    
    }
    
    this.printMsg = function(msg){

	this.caixaTexto.addItem(msg);

    }
    


}











