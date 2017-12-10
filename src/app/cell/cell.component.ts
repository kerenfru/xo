import {Component, Input, OnInit} from '@angular/core';
import {XO} from './cell.const';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() callback: Function;
  @Input() turn: XO;
  @Input() row: number;
  @Input() col: number;
  public xoro: string;
  private disable: boolean;

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.disable = true;
    this.callback({row: this.row, col: this.col});
    this.xoro = this.turn === XO.O ? 'O' : 'X';
  }
}
