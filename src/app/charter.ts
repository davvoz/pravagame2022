import { CarroArmato } from './carro-armato';
import { Classe } from './costants.enum';
import { Square } from './square';

export abstract class Charter extends Square {
  salute = 0; //salute totale
  mana = 0; //mana totale
  forza = 0; // quanta hp togli in un attacco
  agilita = 0; //quanti attacchi al secondo
  intelligenza = 0; //quanta hp togli  in un attacco
  resistenzaMagica = 0;
  resistenzaFisica = 0;
  posizioneInfoLabelX = 0;
  posizioneInfoLabelY = 0;
  numeriFortunati: number[] = []; //se il generatore random fa uno di questi numeri schivi
  isMorto = false;
  isWinner = false;
  classe: Classe = 'ABSTRACT';
  name = 'Abstract cant instantiate';
  danniMagiciRicevuti = 0;
  danniFisiciRicevuti = 0;
  dannoCritico = 0;
  counterForCritico = 10;//il decimo attacco è danno critico (danno normale * 10)
  counterForCriticoTreshold = 100;
  danniCriticiInflitti = 0;
  danniCriticiRicevuti = 0;
  constructor(public ctx: CanvasRenderingContext2D, color: string) {
    super(ctx, color);
  }

  lanciaAbilita() {}
  draw() {
    if (!this.isMorto) {
      this.drawCharter();
      if(!this.isWinner){
        this.drawBarraEnergia();

      }
    }
    this.drawLabel();
  }
  drawCharter() {}
  drawLabel() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.getColor();
    this.ctx.strokeText(
      this.name + ' : ' + this.salute.toFixed(0),
      this.posizioneInfoLabelX,
      this.posizioneInfoLabelY,
      300
    );
    this.ctx.strokeText(
      'Forza : ' + this.forza,
      this.posizioneInfoLabelX,
      this.posizioneInfoLabelY - this.getZ(),
      300
    );
    this.ctx.strokeText(
      'Resistenza : ' + this.resistenzaFisica,
      this.posizioneInfoLabelX,
      this.posizioneInfoLabelY - this.getZ() - this.getZ(),
      300
    );
    this.ctx.strokeText(
      'intelligenza : ' + this.intelligenza,
      this.posizioneInfoLabelX,
      this.posizioneInfoLabelY - this.getZ() - this.getZ() - this.getZ(),
      300
    );
    this.ctx.closePath();
    this.ctx.strokeText(
      'Resistenza magica : ' + this.resistenzaMagica,
      this.posizioneInfoLabelX,
      this.posizioneInfoLabelY -
        this.getZ() -
        this.getZ() -
        this.getZ() -
        this.getZ(),
      300
    );
    this.ctx.strokeText(
      'Ruolo: ' + this.classe,
      this.posizioneInfoLabelX,
      this.posizioneInfoLabelY -
        this.getZ() -
        this.getZ() -
        this.getZ() -
        this.getZ() -
        this.getZ(),
      300
    );
    if (this.isMorto || this.isWinner) {
      this.ctx.strokeText(
        this.isWinner ? 'WINNER :)' : 'LOOSER :(',
        this.posizioneInfoLabelX,
        this.posizioneInfoLabelY -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ(),
        300
      );
      this.ctx.strokeText(
        'Danni magici ricevuti ' + this.danniMagiciRicevuti,
        this.posizioneInfoLabelX,
        this.posizioneInfoLabelY -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ(),
        300
      );
      this.ctx.strokeText(
        'Danni fisici ricevuti ' + this.danniFisiciRicevuti,
        this.posizioneInfoLabelX,
        this.posizioneInfoLabelY -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ(),
        300
      );
      this.ctx.strokeText(
        'Danni critici ricevuti ' + this.danniCriticiRicevuti,
        this.posizioneInfoLabelX,
        this.posizioneInfoLabelY -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ(),
        300
      );
      this.ctx.strokeText(
        'Danni critici inflitti ' + this.danniCriticiInflitti,
        this.posizioneInfoLabelX,
        this.posizioneInfoLabelY -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ() -
          this.getZ(),
        300
      );
    }
  }
  drawBarraEnergia(){
this.ctx.fillRect(
  this.posizioneInfoLabelX,
  this.posizioneInfoLabelY -
    this.getZ() -
    this.getZ() -
    this.getZ() -
    this.getZ() -
    this.getZ() -
    this.getZ() -
    this.getZ(),
    this.salute /100,this.getZ()
)
  }
  attaccare(charter: Charter) {
    let critico =0;
    let isCritico = false;
    if( this.counterForCritico === this.counterForCriticoTreshold){
      critico = this.forza * 10;
      this.danniCriticiInflitti += critico;
      isCritico = true;
    }
    charter.difendere(this.intelligenza, this.forza + critico,isCritico);
    this.counterForCritico === this.counterForCriticoTreshold ? this.counterForCritico = 0 : this.counterForCritico++;
  }

  difendere(dannoMagico: number, dannoFisico: number,isCritico:boolean) {
    const schiva = Math.floor(Math.random() * 10);
    let schivata = false;
    for (let a of this.numeriFortunati) {
      if (schiva == a) {
        schivata = true;
        break;
      }
    }//il critico non si schiva
    if (!schivata || isCritico) {
     isCritico? this.danniCriticiRicevuti += dannoFisico :null;
      let dannoFisicoEffettivo = 0;
      let dannoMagicoEffettivo = 0;
      if (this.resistenzaMagica < dannoMagico) {
        dannoMagicoEffettivo = dannoMagico - this.resistenzaMagica;
      }
      if (this.resistenzaFisica < dannoFisico) {
        dannoFisicoEffettivo = dannoFisico - this.resistenzaFisica;
      }
      this.salute -= dannoFisicoEffettivo + dannoMagicoEffettivo;
      this.danniFisiciRicevuti += dannoFisicoEffettivo;
      this.danniMagiciRicevuti += dannoMagicoEffettivo;
    }
  }
}
//quando attacca ogni charter fa danno magico e danno fisico in base alla sua forza  e alla sua intelligenza .
