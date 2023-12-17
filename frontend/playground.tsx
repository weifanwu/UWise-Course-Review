class State{
    public content: string;
    public cursor: number;
    public selectedSub: string;


    constructor(content?: string, cursor?: number, selected?: string) {
        this.content = content || '';
        this.cursor = cursor || 0;
        this.selectedSub = selected || '';
    }
}


class textEditor {

  public state: State;    
  private undoStack: any[];
  private clipBoard: any[];
  private redoStack: any[];
  private endIndex: number;
  private startIndex: number;

  constructor() {
    this.state = new State();
    this.undoStack = [];
    this.redoStack = [];
    this.endIndex = 0;
    this.startIndex = 0;
    this.clipBoard = [];
  }
  //helpers -------------------------------------------------------
  public toString(): string {
    return this.state.content;
  }

  private clearSelected() {
    this.state.selectedSub = ''
    this.endIndex = 0;
    this.startIndex = 0;
  }

  private saveState() {
    this.undoStack.push(new State(this.state.content, this.state.cursor, this.state.selectedSub))
  }


  //level 1 -------------------------------------------------------
  public append(str: string) {
    this.saveState()
    let start = this.state.cursor - this.state.selectedSub.length
    //let end = start + this.state.selectedSub.length
    this.state.content = String.prototype.concat(this.state.content.slice(0, start)
        ,  str
        , this.state.content.slice(this.state.cursor))
    this.state.cursor = start + str.length
    this.clearSelected()
  }
//hey there!
  public move(position: string) {
    let pos = parseInt(position);
    this.clearSelected()
    if(pos <= 0){
        this.state.cursor = 0
    }

    if(pos > this.state.content.length) {
        this.state.cursor = this.state.content.length
    } else{
        this.state.cursor = pos
    }
  }

  public backspace() {
    this.saveState()
    let start = this.state.cursor - this.state.selectedSub.length
    if(start == this.state.cursor) {
        this.state.content = String.prototype.concat(this.state.content.slice(0, start-1)
        , this.state.content.slice(this.state.cursor))
        this.state.cursor = start - 1
    } else {
        this.state.content = String.prototype.concat(this.state.content.slice(0, start)
        , this.state.content.slice(this.state.cursor+1))
        this.state.cursor = start
    }

    this.clearSelected()
  }


  //level 2 -------------------------------------------------------

  public select(from: string, to: string) {
    this.startIndex = parseInt(from) >= 0 ? parseInt(from) : 0;
    this.endIndex =
      parseInt(to) < this.state.content.length ? parseInt(to) : this.state.content.length;
    //set cursor
    this.state.cursor = this.endIndex
    this.state.selectedSub = this.state.content.substring(this.startIndex, this.endIndex);
    if(!this.state.selectedSub.length) {
        this.move(from)
    }
  }

  public copy() {
    this.clipBoard.unshift(this.state.selectedSub);
  }

  public paste() {
    if(this.clipBoard.length) {
        this.clearSelected();
        this.append(this.clipBoard[0])
    }
  }

  //level 3 -------------------------------------------------------
  public undo() {
    this.redoStack.push(new State(this.state.content, this.state.cursor, this.state.selectedSub))
    if(this.undoStack.length) {
        this.state = this.undoStack.pop()
    }    
  }

  public redo() {
      if(this.redoStack.length) {
          this.saveState();
          this.state = this.redoStack.pop()
      }
  }

  //level 4 -------------------------------------------------------
}


var readline = require('readline')
var rl = readline.createInterface(process.stdin, process.stdout)

rl.on('line', (input) => {
    console.log(`Age received by the user: ${input}`);
    rl.close();
});

let te = new textEditor();

// te.append('hey')
// te.append(' there')
// te.append('!')

// te.append('hey you')
// te.backspace()
// te.backspace()

// te.append('Hello cruel World!')
// te.select('5', '11')
// te.append(',')

// te.append('Hello')
// te.select('2', '5')
// te.backspace()

// te.append('hello, world!')
// te.select('7', '12')
// te.backspace()
// te.undo()
// te.append('you')



te.append('text generated by AI that will conquer the world!!!');

te.select('0', '17')
te.backspace()
te.undo()
te.append('hello,')



console.log(te);