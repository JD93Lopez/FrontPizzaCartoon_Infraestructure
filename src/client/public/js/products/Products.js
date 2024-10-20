import ProductsController from './controller/ProductsController.js';
import ProductsModel from './model/ProductsModel.js';
import ProductsView from './view/ProductsView.js';
export default class Products {
    static create() {
        const model = new ProductsModel();
        const view = new ProductsView(model);
        const controller = new ProductsController(model, view);
        return controller;
    }
}
