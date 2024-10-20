import { connection } from './db';

// Función para insertar un producto
export async function insertProduct(product: any) {
  const query = `INSERT INTO PRODUCTOS (title, amount, price, description, favorite, discount, discountPer, discountUni)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const [result] = await connection.execute(query, [
    product.title,
    product.amount,
    product.price,
    product.description,
    product.favorite,
    product.discount,
    product.discountPer,
    product.discountUni
  ]);

  return result;  // Puedes retornar el resultado, como el `insertId` si lo necesitas.
}

// Función para actualizar un producto
export async function updateProduct(product: any) {
  const query = `UPDATE PRODUCTOS SET title = ?, amount = ?, price = ?, description = ?, favorite = ?, discount = ?, discountPer = ?, discountUni = ? WHERE id = ?`;

  const [result] = await connection.execute(query, [
    product.title,
    product.amount,
    product.price,
    product.description,
    product.favorite,
    product.discount,
    product.discountPer,
    product.discountUni,
    product.id
  ]);

  return result;  // Retorna el resultado, como el número de filas afectadas.
}

// Función para eliminar un producto
export async function deleteProduct(id: number) {
  const query = `DELETE FROM PRODUCTOS WHERE id = ?`;

  const [result] = await connection.execute(query, [id]);

  return result;  // Retorna el número de filas afectadas.
}

// Función para obtener todos los productos
export async function getAllProducts() {
    const query = `SELECT * FROM PRODUCTOS`;
    
    const [rows] = await connection.execute(query);
    
    return rows;  // Devuelve todos los productos
}

export default { insertProduct, updateProduct, deleteProduct, getAllProducts };