class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;

    this.element = null;
  }

  initialize () {
    this.createEventListeners();
  }

  handleMouseOverEvent = (event) => {
    if (event.target.dataset.tooltip) {
      this.render(event.target.dataset.tooltip);
    }
  }

  handleMouseOutEvent = (event) => {
    if (this.element) {
      this.remove();
    }
  }

  handleMouseMoveEvent = (event) => {
    if (this.element) {
      this.element.style.left = event.clientX + 5 + 'px';
      this.element.style.top = event.clientY + 5 + 'px';
    }
  }

  createEventListeners() {
    document.addEventListener('pointerover', this.handleMouseOverEvent);
    document.addEventListener('pointerout', this.handleMouseOutEvent);    
    document.addEventListener('pointermove', this.handleMouseMoveEvent);
  }

  removeEventListeners() {
    document.removeEventListener('pointerover', this.handleMouseOverEvent);
    document.removeEventListener('pointerout', this.handleMouseOutEvent);
    document.removeEventListener('pointermove', this.handleMouseMoveEvent);
  }

  render(text) {
    const tooltipElement = document.createElement('div');
    tooltipElement.innerHTML = `<div class="tooltip">${text}</div>`;
    this.element = tooltipElement.firstElementChild;
    document.body.append(this.element);
  }

  remove() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  destroy() {
    this.remove();
    this.removeEventListeners();
  }
}

export default Tooltip;