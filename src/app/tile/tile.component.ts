import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements AfterViewInit {

  @Output()
  onTileChanged: EventEmitter<void> = new EventEmitter();
  canvasReady = false;

  frontColor: string;
  backColor: string;

  $state = '';
  @Input('state') 
  set state(val: string) { // react when state changes
    this.$state = val;
    if (this.canvasReady) { // if state is set at instantiation time the canvas context is not available
      this.drawTile();
    }
  }
  @Input() tileSize = 70;   // default tile size if not set from the board
  @ViewChild('canvas') canvas: ElementRef; // reference to the template canvas element
  public context: CanvasRenderingContext2D;

  constructor() {
    const theme = localStorage.getItem('theme') || 'light'; // load the theme or use 'light' as default

    if (theme === 'dark') {
      this.frontColor = 'white';
      this.backColor = 'black';
    } else {
      this.frontColor = 'black';
      this.backColor = 'white';
    }
  }

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.drawTile();
    this.canvasReady = true; // enable redrawing the tile on changes
  }

  drawTile() {
    this.drawSurroundingRectangle(this.context); 

    switch (this.$state) {
      case 'x': {
        this.drawCross(this.context);
        break;
      }
      case 'o': {
        this.drawCircle(this.context);
        break;
      }
      default: { }
    }
  }

  drawSurroundingRectangle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.frontColor;
    ctx.rect(0, 0, this.tileSize, this.tileSize);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = this.backColor;
    ctx.rect(1, 1, this.tileSize - 2, this.tileSize - 2);
    ctx.fill();
  }

  drawCross(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.frontColor;
    ctx.moveTo(10, 10);
    ctx.lineTo(this.tileSize - 10, this.tileSize - 10);
    ctx.moveTo(10, this.tileSize - 10);
    ctx.lineTo(this.tileSize - 10, 10);
    ctx.stroke();
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.frontColor;
    ctx.arc(this.tileSize / 2, this.tileSize / 2, (this.tileSize / 2) - 10, 0, 360);
    ctx.stroke();
  }
}
