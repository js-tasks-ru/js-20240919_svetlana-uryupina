import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from "../../04-oop-basic-intro-to-dom/1-column-chart/index.js";

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChartV1 {
    constructor(props={}) {
        super(props);

        this.url = props.url;
        /*this.update(props.range.from, props.range.to);*/
    }

    async update(dateFrom, dateTo) {
        this.element.className = "column-chart column-chart_loading";

        const data = await this.fetchData(dateFrom, dateTo);
        super.update(Object.values(data));
        
        this.element.className = "column-chart";
        return data;
    }

    async fetchData(dateFrom, dateTo) {
        const url = new URL(this.url, BACKEND_URL);
        url.searchParams.set('from', dateFrom.toISOString());
        url.searchParams.set('to', dateTo.toISOString());

        return await fetchJson(url);
    }
}