import { CarroArmato } from './carro-armato';
import { Square } from './square';

export class Bottone extends Square {
  private text = 'BOTTONE';
  constructor(
    public ctx: CanvasRenderingContext2D,
    color: string,
    cs: CarroArmato
  ) {
    super(ctx, color);
  
  }
  draw() {
    this.ctx.fillStyle = this.getColor();
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(
      this.getZ() * this.getX(),
      this.getZ() * this.getY(),
      this.getZ(),
      this.getZ()
    );
    this.ctx.strokeRect(
      this.getZ() * this.getX(),
      this.getZ() * this.getY(),
      this.getZ(),
      this.getZ()
    );
    this.ctx.font = '50px IMPACT';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(
      this.text,
      this.getX() * this.getZ(),
      this.getY() * this.getZ() + this.getZ(),
      this.getZ()
    );
  }
  getText(): string {
    return this.text;
  }
  setText(text: string) {
    this.text = text;
  }
}
