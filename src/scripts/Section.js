export class Section {
  constructor({ items, renderer }, container) {
    this._addedData = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._addedData.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
