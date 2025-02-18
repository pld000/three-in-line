import { CELL_SIZE, FONT_SIZE } from './constants';

export class Cell {
  public element!: HTMLElement;
  constructor(public index: number, public row: number, public value: string) {
  }

  createCell(onClick: (cell: Cell) => void): HTMLElement {
    this.element = document.createElement('div');
    this.element.style.height = `${CELL_SIZE}px`;
    this.element.style.border = '1px solid black';
    this.element.style.display = 'flex';
    this.element.style.alignItems = 'center';
    this.element.style.justifyContent = 'center';
    this.element.style.fontSize = `${FONT_SIZE}px`;
    this.element.style.fontWeight = 'bold';
    this.element.style.cursor = 'pointer';
    // this.element.innerHTML = this.value;
    this.element.setAttribute('cell-value', this.value);

    this.element.addEventListener('click', () => onClick(this));

    return this.element;
  }
}
