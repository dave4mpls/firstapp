import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'core-js/es6/map';   // Required polyfill for <=IE11, from npm core-js package.
import 'core-js/es6/set';
import 'raf/polyfill';    // Required 

function Square(props) {
    return (
      <button 
            className="square" 
            onClick={props.onClick}
            onTouchStart={props.onTouchMove}
            onTouchMove={props.onTouchMove}
            squarenumber={props.squareNumber}
            >       
        {props.value}
      </button>
    );
    //--- pass a Square Number so we can find out who we are touching
  }

  class Board extends React.Component {

    static defaultProps = { width: 3, height: 3 };

    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            squares: Array(this.props.height * this.props.width).fill(null),
            xIsNext: true,
        };
        // the line below tells the addRow function that it refers to this object.
        // otherwise it will be confused!
        this.addRow = this.addRow.bind(this);
        this.addCol = this.addCol.bind(this);
    }

    width() { return this.state.width; }
    height() { return this.state.height; }

    handleClick(i, evt) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    }

    handleTouchMove(i, evt) {
        // learning how to handle touch and drag, by creating a touch move event
        // it turns out, you have to put some kind of id attribute (here, squarenumber)
        // in your rendered output in order to find it again later.
        evt.preventDefault();
        let touchedElement = document.elementFromPoint(evt.touches[0].clientX, evt.touches[0].clientY);
        if (touchedElement.hasAttribute("squarenumber")) {
            let touchedSquare = touchedElement.getAttribute("squarenumber");
            this.handleClick(touchedSquare, evt);
        }
    }

    addRow() {
        this.setState(function(prevState)
            {
                const squares = prevState.squares.slice();
                for (let i = 0; i < this.state.width; i++) squares.push("A");
                return ({ squares: squares, height: prevState.height + 1});
            });
    }

    addCol() {
        this.setState(function(prevState)
            {
                const squares = prevState.squares.slice();
                const newWidth = prevState.width + 1;
                for (let i = 0; i < this.state.height; i++)
                    squares.splice(newWidth*i,0,"B");
                return ({ squares: squares, width: newWidth});
            });
    }
  
    renderSquare(i) {
      return (<Square 
        key= {i}
        squareNumber = {i}
        value={ this.state.squares[i] }
        onClick={(evt) => this.handleClick(i, evt)}
        />
        );
    }

    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      let thisCell = 0; let boardBuffer = [ ];
      for (let i = 0; i < this.height(); i++) {
          let rowBuffer = [];
          for (let j = 0; j < this.width(); j++, thisCell++) {
            rowBuffer.push(this.renderSquare(thisCell));
          }
          boardBuffer.push(<div key={i} className="board-row">{rowBuffer}</div>);
      }
      return (
        <div>
            <div className="status">{status}</div>
            <div>
                <button onClick={this.addRow}>Add Row</button>
                <button onClick={this.addCol}>Add Column</button>
            </div>
            {boardBuffer}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board width={8} height={8} />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  