import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { Charter } from './charter';
import { Guerriero } from './guerriero';
import { Mago } from './mago';
import { Square } from './square';

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvasGui', { static: false })
  canvasGui: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  guerrieroUno: Guerriero;
  magoUno: Mago;
  counterRoutine = 0;
  counterAnimation = 0;
  isCharterColliding = false;
  bonus: Square[] = [];
  constructor(private ngZone: NgZone) {}
  ngOnInit(): void {}

  reset() {}

  charterMovmentRandomRoutine(charter: Square) {
    if (this.counterRoutine % 10 == 0) {
      this.direzionaRandomicamenteCharter(charter);
    }
    switch (charter.getDirection()) {
      case 'TOP':
        charter.moveTop();
        break;
      case 'BOTTOM':
        charter.moveBottom();
        break;
      case 'LEFT':
        charter.moveLeft();
        break;
      case 'RIGHT':
        charter.moveRight();
        break;
      default:
        charter.stand();
    }
  }
  animate(): void {
    this.ctx.clearRect(0, 0, 1000, 500);
    if (!this.isCharterColliding) {
      if (!this.guerrieroUno.isMorto) {
        this.charterMovmentRandomRoutine(this.guerrieroUno);
      } else {
        this.guerrieroUno.moveBottom();
      }
      if (!this.magoUno.isMorto) {
        this.charterMovmentRandomRoutine(this.magoUno);
      } else {
        this.magoUno.moveBottom();
      }
      if (
        !this.magoUno.isMorto &&
        !this.guerrieroUno.isMorto &&
        this.rectsColliding(this.guerrieroUno, this.magoUno)
      ) {
        this.isCharterColliding = true;
      }
      for (let i = 0; i < this.bonus.length; i++) {
        if (this.rectsColliding(this.guerrieroUno, this.bonus[i])) {
          this.guerrieroUno.salute += 1000;
          this.bonus.pop();
        }
      }
      for (let i = 0; i < this.bonus.length; i++) {
        if (this.rectsColliding(this.magoUno, this.bonus[i])) {
          this.magoUno.salute += 1000;
          this.bonus.pop();
        }
      }
    } else {
      this.guerrieroUno.attaccare(this.magoUno);
      this.magoUno.attaccare(this.guerrieroUno);
      this.guerrieroUno.stand();
      this.magoUno.stand();
      if (this.guerrieroUno.salute <= 0) {
        this.guerrieroUno.isMorto = true;
        this.magoUno.isWinner = true;
        this.isCharterColliding = false;
      }
      if (this.magoUno.salute <= 0) {
        this.magoUno.isMorto = true;
        this.guerrieroUno.isWinner = true;
        this.isCharterColliding = false;
      }
    }
    if (!(this.magoUno.salute <= 0 || this.guerrieroUno.salute <= 0)) {
      for (let i = 0; i < this.bonus.length; i++) {
        this.charterMovmentRandomRoutine(this.bonus[i]);
      }
    } else {
      for (let i = 0; i < this.bonus.length; i++) {
        this.bonus[i].setX(9999);
        this.bonus[i].setY(9999);
      }
    }
    this.guerrieroUno.counterAnimation = this.counterAnimation;
    this.magoUno.counterAnimation = this.counterAnimation;

    requestAnimationFrame(this.animate.bind(this));
    this.counterRoutine === 400
      ? (this.counterRoutine = 0)
      : this.counterRoutine++;
    //velocità animazione ogni 10 frame
    if (this.counterRoutine % 10 == 0) {
      //step animazione , 2 in questo caso
      this.counterAnimation === 1
        ? (this.counterAnimation = 0)
        : this.counterAnimation++;
    }
  }
  direzionaRandomicamenteCharter(charter: Square) {
    const a = Math.floor(Math.random() * 4);
    switch (a) {
      case 0:
        charter.moveBottom();
        break;
      case 1:
        charter.moveTop();
        break;
      case 2:
        charter.moveLeft();
        break;
      case 3:
        charter.moveRight();
        break;
      default:
        charter.stand();
    }
  }
  rectsColliding(r1: Square, r2: Square) {
    return !(
      r1.getX() > r2.getX() + 1 ||
      r1.getX() + 1 < r2.getX() ||
      r1.getY() > r2.getY() + 1 ||
      r1.getY() + 1 < r2.getY()
    );
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasGui.nativeElement.getContext('2d');
    this.guerrieroUno = new Guerriero(this.ctx, 'green');
    this.guerrieroUno.setX(50);
    this.guerrieroUno.setY(20);
    this.guerrieroUno.setZ(20);
    this.guerrieroUno.setVelocita(0.6);
    this.guerrieroUno.setSpazioInPiu(20);
    this.guerrieroUno.name = 'Manduca';
    this.guerrieroUno.posizioneInfoLabelX = 270;
    this.guerrieroUno.posizioneInfoLabelY = 480;
    this.guerrieroUno.numeriFortunati = [8, 9, 2, 3, 4, 5, 6, 7];
    this.guerrieroUno.dannoCritico = 100;
    this.guerrieroUno.counterForCriticoTreshold = 10;
    this.guerrieroUno.stand();

    this.magoUno = new Mago(this.ctx, 'blue');
    this.magoUno.setX(1);
    this.magoUno.setY(1);
    this.magoUno.setZ(20);
    this.magoUno.setVelocita(0.6);
    this.magoUno.setSpazioInPiu(20);
    this.magoUno.name = 'Tetramarco';
    this.magoUno.posizioneInfoLabelX = 30;
    this.magoUno.posizioneInfoLabelY = 480;
    this.magoUno.numeriFortunati = [0, 1, 2, 3, 4, 5, 6, 7];
    this.guerrieroUno.dannoCritico = 5;
    this.guerrieroUno.counterForCriticoTreshold = 100;
    this.magoUno.stand();

    for (let i = 0; i < 10; i++) {
      let bonusEnergia: Square;
      bonusEnergia = new Square(this.ctx, 'red');
      bonusEnergia.setX(Math.floor(Math.random() * 50));
      bonusEnergia.setY(Math.floor(Math.random() * 20));
      bonusEnergia.setZ(20);
      bonusEnergia.setVelocita(0.8);
      this.bonus.push(bonusEnergia);
    }
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private getMousePos(canvas: HTMLCanvasElement, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private isInside(pos, rect) {
    return (
      pos.x > rect.x &&
      pos.x < rect.x + rect.width &&
      pos.y < rect.y + rect.height &&
      pos.y > rect.y
    );
  }
}
