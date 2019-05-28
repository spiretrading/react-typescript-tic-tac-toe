import React from 'react';
import './App.css';

enum Mode {
  PLAY,
  GAME_OVER,
  DRAW
}

export enum Piece {
  NONE,
  X,
  O
}

const boardMap = [
  [[1, 2], [3, 6], [4, 8]],
  [[0, 2], [4, 7]],
  [[0, 1], [5, 8], [4, 6]],
  [[0, 6], [4, 5]],
  [[0, 8], [1, 7], [2, 6], [3, 5]],
  [[2, 8], [4, 3]],
  [[0, 3], [7, 8], [2, 4]],
  [[6, 8], [1, 4]],
  [[7, 6], [5, 2], [4, 0]]
];

interface CellProps {
  display?: string
  piece: Piece
  onClick?: () => void
}

class Cell extends React.Component<CellProps> {
  public static readonly defaultProps = {
    display: '',
    onClick: () => {}
  }

  public render(): JSX.Element {
    const content = (() => {
      if(this.props.piece === Piece.NONE) {
        return ''
      } else if(this.props.piece === Piece.X) {
        return 'X'
      } else {
        return 'O'
      }
    })();
    return (
      <div style={Cell.DIV_STYLE}
          onClick={this.props.onClick}>
        <p>{content}</p>
      </div>
    );
  }

  private static readonly DIV_STYLE = {
    width: '300px',
    height: '300px',
    padding: '10px',
    border: '5px solid rgba(0,0,0,0.5)',
    backgroundColor: 'blue',
    margin: '0',
    textAlign: 'center' as 'center',
    lineHeight: '150px',
    color: 'white',
    fontWeight: 'bold' as 'bold',
    fontSize: '5em'
  }
}

interface BoardState {
  cellContents: Piece[];
  lastPiece: Piece;
  mode: Mode;
}

class Board extends React.Component<{}, BoardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cellContents: [Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE,
        Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE],
      lastPiece: Piece.NONE,
      mode: Mode.PLAY
    };
    this.onClick = this.onClick.bind(this);
    this.isOver = this.isOver.bind(this);
    this.reStart = this.reStart.bind(this);
    this.isFull = this.isFull.bind(this);
  }

  private isFull(contentList: Piece[]) {
    for(var i = 0; i < contentList.length; i++) {
      if(contentList[i] === Piece.NONE) {
        return false;
      }
    }
    return true;
  }

  private isOver(index: number, lastPiece: Piece) {
    const piece = lastPiece;
    var pathList = boardMap[index];
    var result: boolean;
    for(let i = 0; i < pathList.length; i++) {
      result = true;
      for(let j = 0; j < pathList[i].length; j++) {
        result = (this.state.cellContents[pathList[i][j]] === piece) && result;
      }
      if(result) {
        return true;
      }
    }
    return false;
  }

  private onClick(index: number) {
    if(this.state.cellContents[index] === Piece.NONE) {
      const newCell = (() => {
        if(this.state.lastPiece === Piece.NONE) {
          return Piece.X
        } else if(this.state.lastPiece === Piece.X) {
          return Piece.O
        } else {
          return Piece.X
        }
      })();
      var newContents: Piece[] = [];
      for(var i = 0; i < this.state.cellContents.length; i++) {
        if(i === index) {
          newContents[i] = newCell;
        } else {
          newContents[i] = this.state.cellContents[i];
        }
      }
      this.setState({
        lastPiece: newCell,
        cellContents: newContents
      });
      if(this.isOver(index, newCell)) {
        this.setState({ mode: Mode.GAME_OVER });
      } else if(this.isFull(newContents)) {
        this.setState({ mode: Mode.DRAW });
      }
    }
  }

  private reStart() {
    this.setState({
      lastPiece: Piece.NONE,
      cellContents: [Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE,
        Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE],
      mode: Mode.PLAY
    });
  }

  public render(): JSX.Element {
    if(this.state.mode === Mode.PLAY) {
      return (
        <div>
          <div style={Board.FLEX_ROW_OUTER_CONTAINER_STYLE}>
            <h1>Two Player Tic Tac Toe</h1>
          </div>
          <div style={Board.FLEX_ROW_OUTER_CONTAINER_STYLE}>
            <div style={Board.FLEX_COLUMN_CONTAINER_STYLE}>
              <Cell piece={this.state.cellContents[0]} onClick={
                () => this.onClick(0)}/>
              <Cell piece={this.state.cellContents[1]} onClick={
                () => this.onClick(1)}/>
              <Cell piece={this.state.cellContents[2]} onClick={
                () => this.onClick(2)}/>
            </div>
            <div style={Board.FLEX_COLUMN_CONTAINER_STYLE}>
              <Cell piece={this.state.cellContents[3]} onClick={
                () => this.onClick(3)}/>
              <Cell piece={this.state.cellContents[4]} onClick={
                () => this.onClick(4)}/>
              <Cell piece={this.state.cellContents[5]} onClick={
                () => this.onClick(5)}/>
            </div>
            <div style={Board.FLEX_COLUMN_CONTAINER_STYLE}>
              <Cell piece={this.state.cellContents[6]} onClick={
                () => this.onClick(6)}/>
              <Cell piece={this.state.cellContents[7]} onClick={
                () => this.onClick(7)}/>
              <Cell piece={this.state.cellContents[8]} onClick={
                () => this.onClick(8)}/>
            </div>
          </div>
        </div>);
    } else if(this.state.mode === Mode.GAME_OVER) {
      const text = (() => {
        if(this.state.lastPiece === Piece.O) {
          return 'O';
        } else {
          return 'X';
        }
      })();
      return (
        <div style={Board.FLEX_COLUMN_OVER_STYLE} onClick={
            () => this.reStart()}>
          <div style={Board.FLEX_ROW_STYLE}>
            <p style={Board.FONT_STYLE}>{text}</p>
          </div>
          <div style={Board.FLEX_ROW_STYLE}>
            <p style={Board.FONT_STYLE}>WINNER!</p>
          </div>
        </div>);
    } else {
      return (
        <div style={Board.FLEX_COLUMN_OVER_STYLE} onClick={
            () => this.reStart()}>
          <div style={Board.FLEX_ROW_STYLE}>
            <p style={Board.FONT_STYLE}>X O</p>
          </div>
          <div style={Board.FLEX_ROW_STYLE}>
            <p style={Board.FONT_STYLE}>DRAW!</p>
          </div>
        </div>);
    }
  }

  private static readonly FLEX_ROW_OUTER_CONTAINER_STYLE = {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    width: '100%',
    height: '100%'
  }

  private static readonly FLEX_COLUMN_CONTAINER_STYLE = {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    height: '100%'
  }

  private static readonly FLEX_COLUMN_OVER_STYLE = {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    height: '100%',
    width: '100%',
    marginTop: '90px'
  }

  private static readonly FLEX_ROW_STYLE = {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    width: '100%'
  }

  private static readonly FONT_STYLE = {
    width: '450px',
    height: '150px',
    backgroundColor: 'blue',
    margin: '0',
    textAlign: 'center' as 'center',
    lineHeight: '150px',
    color: 'white',
    fontWeight: 'bold' as 'bold',
    fontSize: '5em'
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
