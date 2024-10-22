// import products_json from '../../database/products.json'
// import Environment from '../shared/Environment'
import EnvironmentBack from '../shared/envBackend/EnvironmentBack'
import Product from '../types/Product'
import path from 'path'
import { promises as fspr } from 'fs'
import axios from 'axios'

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
        "image": `https://bucket-pizzacartoon.s3.amazonaws.com/${product.id
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
    return !!res;
  };

  public deleteProduct = async (productId: number): Promise<boolean> => {
    const res = await this.productChanges(await EnvironmentBack.getEndpointDeleteProduct(), { productId }, 'DELETE');
    return !!res;
  };

  public updateProduct = async (product: Product): Promise<boolean> => {
    const res = await this.productChanges(await EnvironmentBack.getEndpointUpdateProduct(), product, 'POST');
    return !!res;
  };

  public async productsJson(): Promise<Product[]> {
    try {
      const response = await axios.get(await EnvironmentBack.getEndpointProducts());
      if (response.status !== 200) {
        return [];
      }
      return response.data as Product[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  productChanges = async (link: string, body: any, method: string) => {
    try {
      const response = await axios({
        url: link,
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        data: body
      });
      return response.data;
    }
    catch (error) {
      console.error('Error en productChanges:', error);
      return false;
    }
  };
}
