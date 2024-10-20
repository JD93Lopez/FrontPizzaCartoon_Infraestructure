import Environment from '../../shared/Environment.js';
import Subject from '../types/Subject.js';
export default class ProductsModel extends Subject {
    products;
    data;
    search;
    productNumber;
    limit;
    constructor() {
        super();
        this.products = [];
        this.data = [];
        this.search = [];
        this.productNumber = 0;
        this.limit = 1;
    }
    init = async () => {
        this.data = await this.getMoviesFromFile();
        this.setProduct(this.productNumber);
    };
    getData = () => {
        return this.data;
    };
    getProducts = () => {
        return this.products;
    };
    getPage = () => {
        return this.productNumber;
    };
    getTotalPages = () => {
        return this.search.length > 0
            ? Math.floor(this.search.length / this.limit)
            : Math.floor(this.data.length / this.limit);
    };
    getMoviesFromFile = async () => {
        const response = await fetch(await Environment.getEndpointProducts());
        if (response.status !== 200) {
            return [];
        }
        //console.log(await response.json())
        return await response.json();
    };
    searchMovies = (search) => {
        if (search === '') {
            this.search = [];
        }
        else {
        }
        this.productNumber = 1;
        this.setProduct(this.productNumber);
    };
    setProduct = (id) => {
        this.products = this.data.slice(id, id + 1);
        this.notifyAllObservers();
    };
    setLimit = (limit) => {
        this.limit = limit;
        this.setProduct(this.productNumber);
    };
    nextPage = (alert) => {
        if (this.productNumber < this.data.length - 1 / this.limit) {
            this.productNumber++;
            this.setProduct(this.productNumber);
        }
        else {
            alert();
            this.setProduct(0);
            this.productNumber = 0;
        }
    };
    previousPage = (alert) => {
        if (this.productNumber > 0) {
            this.productNumber--;
            this.setProduct(this.productNumber);
        }
        else {
            alert();
            this.setProduct(this.data.length - 1);
            this.productNumber = this.data.length - 1;
        }
    };
    newProduct = async (product) => {
        const res = await this.productChanges(await Environment.getEndpointNewProduct(), product, 'POST');
        if (!res) {
            return;
        }
        const last = this.data[this.data.length - 1];
        if (last) {
            product.id = last.id + 1;
        }
        else {
            product.id = 1;
        }
        this.data.push(product);
        this.productNumber = this.data.length - 1;
        this.setProduct(this.productNumber);
    };
    deleteProduct = async () => {
        const productId = this.products[0]?.id;
        let res = false;
        if (productId) {
            res = await this.productChanges(await Environment.getEndpointDeleteProduct(), { productId }, 'DELETE');
        }
        if (!res) {
            return;
        }
        this.data.splice(this.productNumber, 1);
        if (this.productNumber === this.data.length) {
            this.productNumber = this.data.length - 1;
        }
        this.setProduct(this.productNumber);
    };
    updateProduct = async (product) => {
        const res = await this.productChanges(await Environment.getEndpointUpdateProduct(), product, 'POST');
        if (!res) {
            return;
        }
        const index = this.data.findIndex((p) => p.id === product.id);
        if (index === -1) {
            return;
        }
        this.data[index] = product;
        this.setProduct(this.productNumber);
    };
    getDiscount() {
        return this.products[0]?.discount ?? false;
    }
    productChanges = async (link, body, method) => {
        try {
            const response = await fetch(link, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return response.json();
        }
        catch (error) {
            return false;
        }
    };
}
