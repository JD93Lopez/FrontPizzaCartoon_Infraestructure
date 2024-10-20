import Observer from '../types/Observer.js';
export default class ProductsView extends Observer {
    selector;
    selectorName = 'product-card';
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
    }
    init() {
        this.selector = document.querySelector(`.${this.selectorName}`);
        this.listeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.renderProducts(this.products());
    }
    moviesModel() {
        return this.subject;
    }
    products() {
        return this.moviesModel().getProducts();
    }
    renderProducts = (products) => {
        const idField = this.selector.querySelector(`#id`);
        idField.value = products[0]?.id.toString() ?? "";
        const titleField = this.selector.querySelector(`#title`);
        titleField.value = products[0]?.title.toString() ?? "";
        const priceField = this.selector.querySelector(`#price`);
        priceField.value = products[0]?.price.toString() ?? "";
        const amountField = this.selector.querySelector(`#amount`);
        amountField.value = products[0]?.amount.toString() ?? "";
        const discountperField = this.selector.querySelector(`#discountper`);
        discountperField.value = products[0]?.discountPer.toString() ?? "";
        const discountuniField = this.selector.querySelector(`#discountuni`);
        discountuniField.value = products[0]?.discountUni.toString() ?? "";
        const productImage = this.selector.querySelector(`#proImg`);
        productImage.src = products[0]?.image?.toString() ?? "";
        const description = this.selector.querySelector(`#description`);
        description.value = products[0]?.description.toString() ?? "";
    };
    listeners = () => {
        const next = this.selector.querySelector(`#next`);
        next.addEventListener(`click`, () => {
            this.moviesModel().nextPage();
        });
        const prev = this.selector.querySelector(`#prev`);
        prev.addEventListener(`click`, () => {
            this.moviesModel().previousPage();
        });
    };
}
