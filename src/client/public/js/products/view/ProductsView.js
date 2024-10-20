import Observer from '../types/Observer.js';
export default class ProductsView extends Observer {
    selector;
    selectorName = 'product-card';
    idField;
    titleField;
    priceField;
    amountField;
    discountperField;
    discountuniField;
    productImage;
    description;
    discountSelect;
    modal;
    closeButton;
    xButton;
    constructor(subject) {
        super(subject);
        this.selector = document.createElement('div');
        this.idField = document.createElement('input');
        this.titleField = document.createElement('input');
        this.priceField = document.createElement('input');
        this.amountField = document.createElement('input');
        this.discountperField = document.createElement('input');
        this.discountuniField = document.createElement('input');
        this.productImage = document.createElement('img');
        this.description = document.createElement('textarea');
        this.discountSelect = document.createElement('select');
        this.modal = document.createElement('div');
        this.closeButton = document.createElement('button');
        this.xButton = document.createElement('button');
    }
    init() {
        this.selector = document.querySelector(`.${this.selectorName}`);
        this.idField = this.selector.querySelector(`#id`);
        this.titleField = this.selector.querySelector(`#title`);
        this.priceField = this.selector.querySelector(`#price`);
        this.amountField = this.selector.querySelector(`#amount`);
        this.discountperField = this.selector.querySelector(`#discountper`);
        this.discountuniField = this.selector.querySelector(`#discountuni`);
        this.productImage = this.selector.querySelector(`#proImg`);
        this.description = this.selector.querySelector(`#description`);
        this.discountSelect = this.selector.querySelector(`#discount`);
        this.modal = document.querySelector(`#modal`);
        this.closeButton = document.querySelector(`#close-button`);
        this.xButton = document.querySelector(`#x-button`);
        this.listeners();
    }
    update() {
        this.render();
    }
    async render() {
        this.renderProducts(this.products());
    }
    productsModel() {
        return this.subject;
    }
    products() {
        return this.productsModel().getProducts();
    }
    renderProducts = (products) => {
        this.idField.value = products[0]?.id.toString() ?? "";
        this.idField.readOnly = true;
        this.titleField.value = products[0]?.title.toString() ?? "";
        this.amountField.value = products[0]?.amount.toString() ?? "";
        this.priceField.value = products[0]?.price.toString() ?? "";
        this.priceField.type = 'number';
        this.discountperField.value = products[0]?.discountPer.toString() ?? "";
        this.discountperField.readOnly = !this.productsModel().getDiscount();
        this.discountperField.type = 'number';
        this.discountuniField.value = products[0]?.discountUni.toString() ?? "";
        this.discountuniField.readOnly = !this.productsModel().getDiscount();
        this.productImage.src = products[0]?.image?.toString() ?? "";
        this.description.value = products[0]?.description.toString() ?? "";
        this.discountSelect.value = products[0]?.discount.toString() ?? "";
    };
    listeners = () => {
        const next = this.selector.querySelector(`#next`);
        next.addEventListener(`click`, () => {
            this.idField.disabled = false;
            save.classList.add('visually-hidden');
            this.productsModel().nextPage(this.displayModal);
        });
        const prev = this.selector.querySelector(`#prev`);
        prev.addEventListener(`click`, () => {
            this.idField.disabled = false;
            save.classList.add('visually-hidden');
            this.productsModel().previousPage(this.displayModal);
        });
        const del = this.selector.querySelector(`#del`);
        del.addEventListener(`click`, () => {
            this.productsModel().deleteProduct();
        });
        const save = this.selector.querySelector(`#save`);
        save.addEventListener(`click`, () => {
            const product = this.getProductFromForm();
            this.idField.disabled = false;
            save.classList.add('visually-hidden');
            this.productsModel().newProduct(product);
        });
        const create = this.selector.querySelector(`#create`);
        create.addEventListener(`click`, () => {
            save.classList.remove('visually-hidden');
            this.productImage.src = "";
            this.idField.disabled = true;
            this.discountperField.readOnly = true;
            this.discountuniField.readOnly = true;
        });
        const update = this.selector.querySelector(`#update`);
        update.addEventListener(`click`, () => {
            this.productsModel().updateProduct(this.getProductFromForm());
        });
        this.discountSelect.addEventListener(`change`, () => {
            this.discountChange();
        });
        this.closeButton.addEventListener(`click`, () => {
            this.hideModal();
        });
        this.xButton.addEventListener(`click`, () => {
            this.hideModal();
        });
    };
    discountChange = () => {
        this.discountperField.readOnly = !this.discountperField.readOnly;
        this.discountuniField.readOnly = !this.discountuniField.readOnly;
        if (this.discountuniField.readOnly) {
            this.discountperField.value = "0";
            this.discountuniField.value = "";
        }
    };
    getProductFromForm = () => {
        return {
            id: parseInt(this.idField.value),
            title: this.titleField.value,
            price: parseFloat(this.priceField.value),
            amount: this.amountField.value,
            discountPer: parseInt(this.discountperField.value),
            discountUni: this.discountuniField.value,
            image: this.productImage.src ?? "",
            description: this.description.value,
            favorite: false,
            discount: this.discountSelect.value === "true",
        };
    };
    displayModal = () => {
        this.modal.classList.add('show');
        this.modal.style.display = 'block';
    };
    hideModal = () => {
        this.modal.classList.remove('show');
        this.modal.style.display = 'none';
    };
}
