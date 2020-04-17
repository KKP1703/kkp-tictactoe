import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  canvas: any;

  theme = 'light';
  winner = '';
  draw = false;
  state = '';
  tileSize: number;
  tiles = [['', '', ''], ['', '', ''], ['', '', '']];

  constructor() { }

  ngOnInit(): void {
    this.theme = localStorage.getItem("theme") || 'light';
    this.tileSize = (localStorage.getItem("tilesize") || 'large') === 'large' ? 120 : 80;

  }
  tileChanged(x: number, y: number) {
    if (this.tiles[x][y] > '') {  // disable clicks when the tile is already taken
      return;
    }
    if (this.winner || this.draw) { // disable clicks when game is over
      return;
    }
    this.tiles[x][y] = 'x';
    this.winner = this.checkGame();
    if (!this.winner) {
      this.checkForDraw();
      if (!this.draw) {
        this.computerMove();
        this.winner = this.checkGame();
      }
    }
  }
  checkGame() {
    const winner = this.checkHorizontal() || this.checkVertical() || this.checkDiagonal();
    return winner;
  }
  checkHorizontal() {
    let result = null;
    for (var i = 0; i < 3; i++) {
      if (this.tiles[i][0] > ' ' && this.tiles[i][0] === this.tiles[i][1] && this.tiles[i][0] === this.tiles[i][2]) {
        result = this.tiles[i][0];
      }
    }
    return result;
  }
  checkVertical() {
    let result = null;
    for (var i = 0; i < 3; i++) {
      if (this.tiles[0][i] > ' ' && this.tiles[0][i] === this.tiles[1][i] && this.tiles[0][i] === this.tiles[2][i]) {
        result = this.tiles[0][i];
      }
    }
    return result;
  }
  checkDiagonal() {
    let result = null;
    if ((this.tiles[0][0] > ' ' && this.tiles[0][0] === this.tiles[1][1] && this.tiles[1][1] === this.tiles[2][2]) ||
      (this.tiles[0][2] > ' ' && this.tiles[0][2] === this.tiles[1][1] && this.tiles[1][1] === this.tiles[2][0])) {
      result = this.tiles[1][1];
    }
    return result;
  }
  checkForDraw() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.tiles[j][i] == '') {
          this.draw = false;
          return;
        }
      }
      this.draw = true;
    }
  }
  computerMove() {
    let done = false;
    if (this.tiles[1][1] == '') {
      this.tiles[1][1] = 'o';
      done = true;
    }

    while (!done) {
      const x = Math.floor(Math.random() * 3);
      const y = Math.floor(Math.random() * 3);
      if (this.tiles[x][y] == '') {
        this.tiles[x][y] = 'o';
        done = true;
      }
    }
  }
  playAgain() {
    this.winner = '';
    this.draw = false;
    this.tiles = [['', '', ''], ['', '', ''], ['', '', '']];
  }

  dumpTiles() {
    console.log(JSON.stringify(this.tiles));
  }
}