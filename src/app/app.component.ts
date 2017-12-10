import {Component, OnInit} from '@angular/core';
import {XO} from './cell/cell.const';
import {Pos} from './cell/position.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public grid: XO[][];
  public turn: XO;
  public message: string;
  public won: boolean;
  public dim = 3;
  public clicks: number;

  ngOnInit() {
    this.init();
  }

  init() {
    this.won = false;
    this.message = '';
    this.grid = Array(+this.dim).fill([]).map(() => Array(+this.dim).fill(XO.Empty));
    this.turn = XO.X;
    this.clicks = 0;
  }

  public callback = (pos: Pos) => {
    this.clicks++;
    this.grid[pos.row][pos.col] = this.turn;
    if (this.isUserWon(pos)) {
      this.won = true;
      this.message = `User ${this.turn} Won!`;
      return;
    }
    if (this.isGridFull()) {
      this.message = 'No one won.... :(';
      return;
    }
    this.turn = this.turn === XO.X ? XO.O : XO.X;
  }

  isGridFull() {
    return this.clicks === this.dim * this.dim;
  }

  isUserWon(pos: Pos) {
    return this.checkRow(pos) || this.checkColumn(pos) || this.checkDiagonal();
  }

  checkRow(pos: Pos) {
    return this.isArrEqual(this.grid[pos.row]);
  }

  checkColumn(pos: Pos) {
    const col = this.grid.map((row, index) => this.grid[index][pos.col]);
    return this.isArrEqual(col);
  }

  checkDiagonal() {
    const diagonal1 = this.grid.map((row, index) => this.grid[index][index] );
    const diagonal2 = this.grid.map((row, index) => this.grid[index][this.grid.length - 1 - index]);
    return ((this.isArrEqual(diagonal1) && (this.grid[0][0] !== XO.Empty)) ||
            (this.isArrEqual(diagonal2) && (this.grid[0][this.grid.length - 1] !== XO.Empty)));
    // TODO:  extract functions to tiny fubctions mainDiagonal secondDiagonal
  }

  isArrEqual(array) {
    return !!array.reduce(function(a, b){ return (a === b) ? a : NaN; });
  }

  x(index, cellValue) {
  }
}
