export default class Cpf {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  validate(): boolean {

    if (!this.value) return false;
    this.value = this.clean();
    if (this.isInvalidLength()) return false;
    if (this.allDigitsAreTheSame()) return false;
    return this.extractCheckDigit();
  }

  clean() {
    return this.value = this.value.replace(/\D/g, "");
  }

  isInvalidLength() {
    return this.value.length !== 11;
  }

  allDigitsAreTheSame() {
    return this.value.split("").every(c => c === this.value[0]);
  }

  extractCheckDigit() {
    const dg1 = this.calculateDigit(10);
    const dg2 = this.calculateDigit(11);
    return this.value.slice(9) === `${dg1}${dg2}`;
  }

  calculateDigit(factor: number) {
    let total = 0;
    for (const digit of this.value) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }
}
