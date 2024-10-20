import { Router } from 'express'
import ProductsController from '../controller/ProductsController'

export default class ProductsView {
  router: Router

  constructor(private readonly productsController: ProductsController) {
    this.router = Router()
    this.routes()
  }

  public routes = (): void => {
    this.router.get(
      '/products',
      this.productsController.getProducts.bind(this.productsController)
    )
    this.router.get(
      '/products/product/image/:id',
      this.productsController.getProductImage.bind(this.productsController)
    )
    this.router.post(
      '/products/product/new',
      this.productsController.newProduct.bind(this.productsController)
    )
    this.router.post(
      '/products/product/update',
      this.productsController.updateProduct.bind(this.productsController)
    )
    this.router.delete(
      '/products/product/delete',
      this.productsController.deleteProduct.bind(this.productsController)
    )
  }
}
