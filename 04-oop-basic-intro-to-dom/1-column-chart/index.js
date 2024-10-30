export default class ColumnChart {
    element;
    subElements = {};
    data;
    chartHeight=50;

     constructor (props={}) {
        const {
            data = [], 
            label = '', 
            value = 0, 
            link = '',
            formatHeading= (value) => value,
        } = props;

        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.formatHeading = formatHeading;

        this.element = this.createElement(); 
        this.selectSubElements();
     }

     createLinkTemplate() {
        if (this.link) {
            return `<a href="${this.link}" class="column-chart__link">View all</a>`;
        }
        return '';
     }
     
     createHeaderTemplate() {
      return this.formatHeading(this.value);
     }

     createBodyTemplate() {
        const maxValue = Math.max(...this.data);
        const scale = this.chartHeight / maxValue;

        return this.data.map(item => {
            const percent = (item / maxValue * 100).toFixed(0) + '%';
            const value = String(Math.floor(item * scale));
            return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
        }).join('');
     }

     createTemplate() {
        return `
        <div class="column-chart ${this.data.length == 0 ? 'column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                ${this.label}
                ${this.createLinkTemplate()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.createHeaderTemplate()}</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.createBodyTemplate()}
                </div>
            </div>
        </div>`;
     }

     createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.createTemplate();
        return element.firstElementChild;
     }

     selectSubElements() {
      this.element.querySelectorAll('[data-element]').forEach(element => {
        this.subElements[element.dataset.element] = element;
      });
     }

     update(data) {
        this.data = data;
        this.value = this.data.reduce((a,b)=>a+b, 0);
        this.subElements.header.innerHTML = this.createHeaderTemplate();
        this.subElements.body.innerHTML = this.createBodyTemplate();
     }

     remove() {
        this.element.remove();
     }

     destroy() {
        this.remove();
     }
}
