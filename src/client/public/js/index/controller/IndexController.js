import Products from '../../products/Products.js';
export default class IndexController {
    indexModel;
    indexView;
    products;
    constructor(indexModel, indexView) {
        this.indexModel = indexModel;
        this.indexView = indexView;
        this.products = Products.create();
    }
    init = async () => {
        this.indexModel.init();
        this.loadMain(this.indexView.getPageFromMeta());
        this.indexView.init(this.searchMovies);
    };
    searchMovies = (search) => {
        this.products.searchMovies(search);
    };
    loadMain = async (component) => {
        this.indexView.renderMain(component ?? 'error');
        switch (component) {
            case 'products':
                this.loadProducts();
                break;
            case 'contact':
                break;
            default:
        }
    };
    loadProducts = async () => {
        this.products.init();
    };
}
