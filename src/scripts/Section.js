export class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  /*рендер элементов*/

  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  /*добавить элементы в контейнер*/

  addItem(element) {
    this._container.prepend(element);
  }
}
