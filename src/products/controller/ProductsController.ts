import { Request, Response } from 'express'
import ProductsModel from '../model/ProductsModel'

export default class ProductsController {
  constructor(private readonly productsModel: ProductsModel) {}

  public getProducts = async (_req: Request, res: Response) => {
    const movies = await this.productsModel.fetchMovies()
    res.status(200).json(movies)
  }

  public getProductImage = async (req: Request, res: Response) => {
    const id = req.params['id']
    
    res.status(200).sendFile(
      await this.productsModel.getMovieImage(id ?? '')
    )
  }

  public newProduct = async (req: Request, res: Response) => {
    const product = req.body
    res.status(200).json(
      await this.productsModel.newProduct(product)
    )
  }

  public deleteProduct = async (req: Request, res: Response) => {
    const productid = req.body
    res.status(200).json(
      await this.productsModel.deleteProduct(productid.productId)
    )
  }  
  
  public updateProduct = async (req: Request, res: Response) => {
    const product = req.body
    res.status(200).json(
      await this.productsModel.updateProduct(product)
    )
  }
}
