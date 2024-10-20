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
        console.log(this.data);
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
    nextPage = () => {
        if (this.productNumber < this.data.length - 1 / this.limit) {
            this.productNumber++;
            this.setProduct(this.productNumber);
        }
        else {
            alert("No hay más registros");
            this.setProduct(0);
            this.productNumber = 0;
        }
    };
    previousPage = () => {
        if (this.productNumber > 0) {
            this.productNumber--;
            this.setProduct(this.productNumber);
        }
        else {
            alert("No hay más registros");
            this.setProduct(this.data.length - 1);
            this.productNumber = this.data.length - 1;
        }
    };
}
