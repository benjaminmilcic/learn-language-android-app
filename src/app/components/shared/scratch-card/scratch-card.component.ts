import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scratch-card',
  templateUrl: './scratch-card.component.html',
  styleUrls: ['./scratch-card.component.scss'],
})
export class ScratchCardComponent implements AfterViewInit, OnChanges {
  @Input()
  word: string;

  @ViewChild('scratchCanvas')
  scratchCanvas: ElementRef<HTMLCanvasElement>;

  context: CanvasRenderingContext2D;

  isDragging = false;

  @HostListener('touchstart', ['$event']) onMouseDown(event) {
    event.preventDefault();
    this.isDragging = true;
    let rect = this.scratchCanvas.nativeElement.getBoundingClientRect();
    this.scratch(
      event.touches[0].pageX - rect.x,
      event.touches[0].pageY - rect.y
    );
  }

  @HostListener('touchmove', ['$event']) onMouseMove(event) {
    event.preventDefault();
    if (this.isDragging) {
      let rect = this.scratchCanvas.nativeElement.getBoundingClientRect();
      this.scratch(
        event.touches[0].pageX - rect.x,
        event.touches[0].pageY - rect.y
      );
    }
  }

  @HostListener('touchend', ['$event']) onMouseUp(event) {
    event.preventDefault();
    this.isDragging = false;
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.context = this.scratchCanvas.nativeElement.getContext('2d');
    this.fillScratchCard();
  }

  fillScratchCard() {
    this.context.globalCompositeOperation = 'source-over';
    this.context.fillStyle = 'gray';
    this.context.fillRect(0, 0, 250, 50);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.word.firstChange) {
      this.fillScratchCard();
    }
  }

  scratch(x: number, y: number) {
    this.context.globalCompositeOperation = 'destination-out';
    this.context.beginPath();
    this.context.arc(x, y, 10, 0, 2 * Math.PI);
    this.context.fill();
  }
}
