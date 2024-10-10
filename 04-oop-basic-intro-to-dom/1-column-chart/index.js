export default class ColumnChart {
    element;
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
     }

     createLinkTemplate() {
        if (this.link) {
            return `<a href="${this.link}" class="column-chart__link">View all</a>`;
        }
        return '';
     }
      
     createChartTemplate() {
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
        <div class="column-chart" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                ${this.label}
                ${this.createLinkTemplate()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.createChartTemplate()}
                </div>
            </div>
        </div>`;
     }

     createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.createTemplate();
        if (this.data.length == 0) {
            element.firstElementChild.classList.add('column-chart_loading');
        }
        return element.firstElementChild;
     }

     update(data) {
        this.data = data;
        this.element.innerHTML = this.createTemplate();
     }

     remove() {
        this.element.remove();
     }

     destroy() {
        this.remove();
     }
}
