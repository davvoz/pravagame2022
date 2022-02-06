import { Square } from './square';

export class CarroArmato extends Square {
  private cannone = 10;
  private fuel = 0;
  private life = 3;
  constructor(public ctx: CanvasRenderingContext2D, color: string) {
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
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 10;
    switch (this.getDirection()) {
      case 'TOP':
        this.setCannoneUp();
        this.orientaRuoteSuGiu();
        break;
      case 'RIGHT':
        this.setCannoneDx();
        this.orientaRuoteDxSx();
        break;
      case 'LEFT':
        this.setCannoneSx();
        this.orientaRuoteDxSx();
        break;
      case 'BOTTOM':
        this.setCannoneBasso();
        this.orientaRuoteSuGiu();
        break;
      default:
        this.setCannoneBasso();
        this.orientaRuoteSuGiu();
    }
  }
   public getLife(){
    return this.life;
  }
  public setLife(life: number) {
    this.life = life;
  }
  public getFuel(){
    return this.fuel;
  }
  public setFuel(fuel: number) {
    this.fuel = fuel;
  }
  private setCannoneBasso() {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.getZ() * this.getX() + this.getZ() / 2,
      this.getZ() * this.getY() + this.getZ()
    );
    this.ctx.lineTo(
      this.getZ() * this.getX() + this.getZ() / 2,
      this.getZ() * this.getY() + this.getZ() + this.cannone
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
  private setCannoneUp() {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.getX() * this.getZ() + this.getZ() / 2,
      this.getZ() * this.getY() - this.cannone
    );
    this.ctx.lineTo(
      this.getX() * this.getZ() + this.getZ() / 2,
      this.getZ() * this.getY()
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
  private setCannoneDx() {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.getX() * this.getZ() + this.getZ(),
      this.getY() * this.getZ() + this.getZ() / 2
    );
    this.ctx.lineTo(
      this.getX() * this.getZ() + this.cannone + this.getZ(),
      this.getY() * this.getZ() + this.getZ() / 2
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private setCannoneSx() {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.getX() * this.getZ(),
      this.getY() * this.getZ() + this.getZ() / 2
    );
    this.ctx.lineTo(
      this.getX() * this.getZ() - this.cannone,
      this.getY() * this.getZ() + this.getZ() / 2
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
  private orientaRuoteSuGiu() {
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      this.getZ() * this.getX() - this.getZ() / 3,
      this.getZ() * this.getY(),
      this.getZ() / 3,
      this.getZ() / 3
    );
    this.ctx.fillRect(
      this.getZ() * this.getX() - this.getZ() / 3,
      this.getZ() * this.getY() + this.getZ() - this.getZ() / 3,
      this.getZ() / 3,
      this.getZ() / 3
    );
    this.ctx.fillRect(
      this.getZ() * this.getX() + this.getZ(),
      this.getZ() * this.getY() + this.getZ() - this.getZ() / 3,
      this.getZ() / 3,
      this.getZ() / 3
    );
    this.ctx.fillRect(
      this.getZ() * this.getX() + this.getZ(),
      this.getZ() * this.getY(),
      this.getZ() / 3,
      this.getZ() / 3
    );
  }
  private orientaRuoteDxSx() {
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      this.getZ() * this.getX(),
      this.getZ() * this.getY() - this.getZ() / 3,
      this.getZ() / 3,
      this.getZ() / 3
    );
    this.ctx.fillRect(
      this.getZ() * this.getX(),
      this.getZ() * this.getY() + this.getZ(),
      this.getZ() / 3,
      this.getZ() / 3
    );
    this.ctx.fillRect(
      this.getZ() * this.getX() + this.getZ() - this.getZ() / 3,
      this.getZ() * this.getY() + this.getZ(),
      this.getZ() / 3,
      this.getZ() / 3
    );
    this.ctx.fillRect(
      this.getZ() * this.getX() + this.getZ() - this.getZ() / 3,
      this.getZ() * this.getY() - this.getZ() / 3,
      this.getZ() / 3,
      this.getZ() / 3
    );
  }
}
