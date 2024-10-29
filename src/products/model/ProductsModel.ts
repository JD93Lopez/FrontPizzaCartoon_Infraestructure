// import products_json from '../../database/products.json'
import Environment from '../shared/Environment'
import EnvironmentBack from '../shared/envBackend/EnvironmentBack'
import Product from '../types/Product'
import path from 'path'
import { promises as fspr } from 'fs'

export default class ProductsModel {
  public fetchMovies = async (): Promise<Product[]> => {
    const products_json = await this.productsJson()
    const movies = (products_json as Product[]).map((product: Product) => {
      return {
        "id": product.id,
        "title": product.title,
        "amount": product.amount,
        "price": product.price,
        "description": product.description,
        "favorite": product.favorite,
        "discount": product.discount,
        "discountPer": product.discountPer,
        "discountUni": product.discountUni,
        "image": `${Environment.getDomain()}/api/v1.0/store/products/product/image/${product.id
          }.jpg`,
      }
    })
    return movies
  }

  public getMovieImage = async (file: string): Promise<string> => {
    const absolutePath = path.join(__dirname, `../../database/assets/`)
    const defaultImage = 'not-icon.png'
    try {
      await fspr.access(absolutePath + file, fspr.constants.F_OK)
      const stats = await fspr.stat(absolutePath + file)
      if (stats.isFile()) {
        return absolutePath + file
      }
      return absolutePath + defaultImage
    } catch (err) {
      return absolutePath + defaultImage
    }
  }

  public newProduct = async (product: Product): Promise<boolean> => {
    const res = await this.productChanges(await EnvironmentBack.getEndpointNewProduct(), product, 'POST');
    if (res) {
      return true
    } else {
      return false
    }
  }

  public deleteProduct = async (productId: number): Promise<boolean> => {
    const res = await this.productChanges(await EnvironmentBack.getEndpointDeleteProduct(), { productId }, 'DELETE');
    if (res) {
      return true
    } else {
      return false
    }
  }

  public updateProduct = async (product: Product): Promise<boolean> => {
    const res = await this.productChanges(await EnvironmentBack.getEndpointUpdateProduct(), product, 'POST');
    if (res) {
      return true
    } else {
      return false
    }
  }

  public async productsJson(): Promise<Product[]> {
    try {
      const response = await fetch(await EnvironmentBack.getEndpointProducts());
      if (response.status !== 200) {
        return [];
      }
      return (await response.json()) as Product[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  productChanges = async (link: string, body: any, method: string) => {
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
