import { Square } from './square';

export class SquaredShape {
  squares: Square[] = [];
  constructor(ctx: CanvasRenderingContext2D) {
    const square: Square = new Square(ctx, 'green');
    square;
    square.setX(10);
    square.setY(10);
    square.setZ(20);
    this.squares.push(square);
  }
}
