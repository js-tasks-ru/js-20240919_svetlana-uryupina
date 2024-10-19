import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {

    super(headersConfig, data);

    const sortFieldId = sorted.id || this.headerConfig.find(item => item.sortable).id;
    const sortOrder = sorted.order || 'asc';                    
    this.sort(sortFieldId, sortOrder);
    this.createListeners();
  }

  handleHeaderClick = (e) => {
    const cellElement = e.target.closest("div[class=sortable-table__cell");

    if (!cellElement) {
      return;
    }

    if (cellElement.dataset.sortable == false) {
      return;
    }

    const fieldId = cellElement.dataset.id;
    const sortOrder = (cellElement.dataset.order == 'desc') ? 'asc' : 'desc';

    this.sort(fieldId, sortOrder);
  }
  
  createListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderClick);
  }

  destroyListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.handleHeaderClick);
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}

