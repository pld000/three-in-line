export class Cell {
  neighbors: number[] = [];
  position: number[] = [];

  constructor(public id: number, public value: string) {
  }

  createCell(): HTMLElement {
    const cellElement = document.createElement('div');
    cellElement.style.height = '30px';
    cellElement.style.border = '1px solid black';
    cellElement.style.display = 'flex';
    cellElement.style.alignItems = 'center';
    cellElement.style.justifyContent = 'center';
    cellElement.style.fontSize = '20px';
    cellElement.style.fontWeight = 'bold';

    return cellElement;
  }


}
