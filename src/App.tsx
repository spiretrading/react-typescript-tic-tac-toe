import React from 'react';
import './App.css';

enum Display {
  MOBILE,
  LAPTOP,
  DESKTOP
}

enum Mode {
  PLAY,
  GAME_OVER
}

export enum Piece {
  NONE,
  X,
  O
}

enum Role {
  X_PLAYER,
  Y_PLAYER
}

/** Indicates a player. */
class Player {

  /** Constructs a specific player.
   * @param name - The name of the player.
   */
  public constructor(name: string) {
    this._name = name;
  }

  private _name: string;
}

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

  constructor(props: CellProps){
    super(props);
  }

  public render(): JSX.Element {
    const content = (() => {
      if(this.props.piece == Piece.NONE) {
        return ''
      } else if(this.props.piece == Piece.X) {
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
  lastPiece: Piece;
  cellContents: Piece[];
}

class Board extends React.Component<{}, BoardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      lastPiece: Piece.NONE,
      cellContents: [Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE,
        Piece.NONE, Piece.NONE, Piece.NONE, Piece.NONE]
    };
    this.onClick = this.onClick.bind(this);
  }

  private onClick(index: number) {
    if(this.state.cellContents[index] === Piece.NONE) {
      this.state.cellContents[index] = (() => {
        if(this.state.lastPiece === Piece.NONE) {
          return Piece.X
        } else if(this.state.lastPiece == Piece.X) {
          return Piece.O
        } else {
          return Piece.X
        }
      })();
      this.setState({
        lastPiece: this.state.cellContents[index],
        cellContents: this.state.cellContents
      });
    }
  }

  public render(): JSX.Element {
    return (
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
    );
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
}

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Two Player Tic Tac Toe</h1>
      <Board/>
    </div>
  );
}

export default App;
