import { Charter } from './charter';
import { Classe } from './costants.enum';

export class Mago extends Charter {
  salute = 8500;
  agilita = 20;
  forza = 25;
  intelligenza = 90;
  mana = 10;
  resistenzaFisica = 2;
  resistenzaMagica = 2;
  counterAnimation = 0;
  classe: Classe = 'MAGO';
  name = 'Mago default name';
  constructor(public ctx: CanvasRenderingContext2D, color: string) {
    super(ctx, color);
    this.forza += Math.floor(Math.random() * 10);
    this.resistenzaFisica += Math.floor(Math.random() * 10);
    this.intelligenza += Math.floor(Math.random() * 10);
    this.resistenzaMagica += Math.floor(Math.random() * 10);
  }
  drawCharter() {
    this.ctx.fillStyle = this.getColor();
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(
      this.getZ() * this.getX(),
      this.getZ() * this.getY(),
      this.getZ(),
      this.getZ()
    );

    this.ctx.font = '18px Arial';
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.getColor();
    this.ctx.strokeRect(
      this.getZ() * this.getX(),
      this.getZ() * this.getY(),
      this.getZ(),
      this.getZ()
    );
    this.ctx.closePath();

    this.setArti();
  }

  private setArti() {
    this.ctx.strokeStyle = 'black';
    if (this.counterAnimation === 0) {
      //gamba sx
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.getZ() * this.getX(),
        this.getZ() * this.getY() + this.getZ()
      );
      this.ctx.lineTo(
        this.getZ() * this.getX(),
        this.getZ() * this.getY() + this.getZ() + this.getZ()
      );
      this.ctx.stroke();
      this.ctx.closePath();
      //gamba dx
      this.ctx.moveTo(
        this.getZ() * this.getX() + this.getZ(),
        this.getZ() * this.getY() + this.getZ()
      );
      this.ctx.lineTo(
        this.getZ() * this.getX() + this.getZ(),
        this.getZ() * this.getY() + this.getZ() + this.getZ()
      );
      this.ctx.stroke();
      this.ctx.closePath();

      //braccio sx giu
      this.ctx.beginPath();
      this.ctx.moveTo(this.getX() * this.getZ(), this.getY() * this.getZ());
      this.ctx.lineTo(
        this.getX() * this.getZ() - this.getZ(),
        this.getY() * this.getZ() + this.getZ() / 2
      );
      this.ctx.stroke();
      this.ctx.closePath();
    } else {
      //gamba sx
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.getZ() * this.getX(),
        this.getZ() * this.getY() + this.getZ()
      );
      this.ctx.lineTo(
        this.getZ() * this.getX(),
        this.getZ() * this.getY() + this.getZ() + this.getZ()
      );

      //gamba dx
      this.ctx.moveTo(
        this.getZ() * this.getX(),
        this.getZ() * this.getY() + this.getZ() + this.getZ()
      );
      this.ctx.lineTo(
        this.getZ() * this.getX() + this.getZ(),
        this.getZ() * this.getY() + this.getZ()
      );
      this.ctx.stroke();
      this.ctx.closePath();

      // braccio sx su
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.getX() * this.getZ() - 10,
        this.getZ() * this.getY() - this.getZ()
      );
      this.ctx.lineTo(this.getX() * this.getZ(), this.getZ() * this.getY());
      this.ctx.stroke();
      this.ctx.closePath();
    }

    //braccio dx
    this.ctx.moveTo(
      this.getX() * this.getZ() + this.getZ(),
      this.getY() * this.getZ() + this.getZ() / 2
    );
    this.ctx.lineTo(
      this.getX() * this.getZ() + this.getZ() + this.getZ(),
      this.getY() * this.getZ() + this.getZ() / 2
    );
    this.ctx.stroke();
    this.ctx.closePath();
    //bastone dx
    this.ctx.moveTo(
      this.getZ() * this.getX() + this.getZ() + this.getZ(),
      this.getZ() * this.getY() + this.getZ() - this.getZ() - this.getZ()
    );
    this.ctx.lineTo(
      this.getZ() * this.getX() + this.getZ() + this.getZ(),
      this.getZ() * this.getY() + this.getZ() + this.getZ()
    );
    this.ctx.stroke();
    this.ctx.closePath();
    //tewsta
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.getX() * this.getZ() + this.getZ() / 2,
      this.getZ() * this.getY() - this.getZ() / 2 //lunghezza collo
    );
    this.ctx.lineTo(
      this.getX() * this.getZ() + this.getZ() / 2,
      this.getZ() * this.getY()
    );
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.strokeRect(
      this.getX() * this.getZ() + this.getZ() / 3,
      this.getZ() * this.getY() - this.getZ(),
      this.getZ() / 1.5,
      this.getZ() / 2
    );
    this.ctx.fillRect(
      this.getX() * this.getZ() + this.getZ() / 3,
      this.getZ() * this.getY() - this.getZ(),
      this.getZ() / 1.5,
      this.getZ() / 2
    );
    let a = this.getZ(),
      b = this.getZ(),
      c = this.getZ();

    let angleC = 30;

    let triangle = {
      //the first vertex is in the center of the canvas
      //you can change this.
      x1: this.getX() * this.getZ(),
      y1: this.getY() * this.getZ() - this.getZ(),
      // the second vertex
      x2: this.getX() * this.getZ() + a,
      y2: this.getY() * this.getZ() - this.getZ(),
      // the 3-rd vertex
      x3: this.getX() * this.getZ() + b * Math.cos(angleC),
      y3: this.getY() * this.getZ() - this.getZ() + b * Math.sin(angleC),
    };
    this.ctx.beginPath();
    this.ctx.moveTo(triangle.x1, triangle.y1);
    this.ctx.lineTo(triangle.x2, triangle.y2);
    this.ctx.lineTo(triangle.x3, triangle.y3);
    this.ctx.lineTo(triangle.x1, triangle.y1);
    this.ctx.closePath();
    this.ctx.stroke();
    //cappello
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.getX() * this.getZ()+this.getZ() / 3, this.getZ() * this.getY() -this.getZ() / 2-this.getZ()/2);
    //   this.ctx.lineTo(this.getX() * this.getZ()+this.getZ() / 3, this.getY()/this.getZ());
    //   this.ctx.lineTo(this.getX() * this.getZ()+this.getZ(), this.getZ() * this.getY() -this.getZ() / 2-this.getZ()/2 );
    //   this.ctx.closePath();

    // the fill color
    this.ctx.fillStyle = '#FFCC00';
    this.ctx.fill();
  }
}
