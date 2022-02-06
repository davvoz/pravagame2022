import { Charter } from './charter';
import { Classe } from './costants.enum';

export class Guerriero extends Charter {
  salute = 10000;
  agilita = 20;
  forza = 50;
  intelligenza = 30;
  mana = 10;
  resistenzaFisica = 10;
  resistenzaMagica = 2;
  counterAnimation = 0;
  name = 'Guerriero';
  classe:Classe = 'GUERRIERO';
  
  constructor(public ctx: CanvasRenderingContext2D, color: string) {
    super(ctx, color);
    this.forza += Math.floor(Math.random() * 10);
    this.resistenzaFisica += Math.floor(Math.random() * 10);
    this.intelligenza += Math.floor(Math.random() * 10);
    this.resistenzaMagica += Math.floor(Math.random() * 10);
    
  }

 

  drawCharter(){
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
      //testa
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

      //testa
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.getX() * this.getZ() + this.getZ() / 2 - 2,
        this.getZ() * this.getY() - this.getZ() / 2 //lunghezza collo
      );
      this.ctx.lineTo(
        this.getX() * this.getZ() + this.getZ() / 2,
        this.getZ() * this.getY()
      );
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.strokeRect(
        this.getX() * this.getZ() + this.getZ() / 3 - 2,
        this.getZ() * this.getY() - this.getZ(),
        this.getZ() / 1.5,
        this.getZ() / 2
      );
      this.ctx.fillRect(
        this.getX() * this.getZ() + this.getZ() / 3 - 2,
        this.getZ() * this.getY() - this.getZ(),
        this.getZ() / 1.5,
        this.getZ() / 2
      );
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
    //scudo
    this.ctx.beginPath();
    this.ctx.arc(
      this.getX() * this.getZ() + this.getZ() + this.getZ() / 2,
      this.getY() * this.getZ() + this.getZ() / 2,
      this.getZ(),
      0,
      6.283185307179586,
      false
    );
    this.ctx.stroke();
    this.ctx.fillStyle = 'brown';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
