class Section {
  constructor({ items, renderer }, containerSelector) {
    this._addedData = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _getTemplate() {
    this._addedData.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}
