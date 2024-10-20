export default class SortableTableV1 {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
      this.headerConfig = headerConfig;
      this.data = data;
      this.element = this.createElement();
      this.selectSubElements();
      this.arrowElement = this.createArrowElement();
  }

  createHeaderTemplate() {
    return this.headerConfig.map(item => `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
          <span>${item.title}</span>
      </div>
    `).join('');
  }

  createBodyTemplate() {
    return this.data.map(dataItem =>`
      <a href="/${dataItem.id}" class="sortable-table__row">
        ${this.headerConfig.map(headerItem => {
          if (headerItem.template) {
            return headerItem.template(dataItem[headerItem.id]);
          }
          else {
            return `<div class="sortable-table__cell">${dataItem[headerItem.id]}</div>`;
          }
        }).join('')}
      </a>`
    ).join('');
  }

  createTemplate() {
    return `
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.createHeaderTemplate()}
        </div>
        <div data-element="body" class="sortable-table__body">
          ${this.createBodyTemplate()}
        </div>
      </div>
    `;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  createArrowElement() {
    const arrowElement = document.createElement('div');
    arrowElement.innerHTML = 
      `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`
    return arrowElement.firstElementChild;
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  sort(field, sortOrder='asc') {

    const fieldConfig = this.headerConfig.find((element) => element.id == field);
    const headerCellElement = this.subElements.header.querySelector(`[data-id=${field}]`);

    if (fieldConfig.sortable == false) {
      return;
    }
    
    if (fieldConfig.sortType == 'string') {
      if (sortOrder == 'asc') {
        this.data.sort((a, b) => a[field].localeCompare(b[field],'ru-en',{caseFirst:'upper'}));
      }
      else {
        this.data.sort((a, b) => b[field].localeCompare(a[field],'ru-en',{caseFirst:'upper'}));
      }
    }
    else {
      if (sortOrder == 'asc') {
        this.data.sort((a, b) => a[field]-b[field]);
      }
      else {
        this.data.sort((a, b) => b[field]-a[field]);
      }
    }

    headerCellElement.append(this.arrowElement);
    headerCellElement.dataset.order = sortOrder;

    this.subElements.body.innerHTML = this.createBodyTemplate();
  }

  destroy(){
    this.element.remove();
    this.arrowElement.remove();
  }
}

