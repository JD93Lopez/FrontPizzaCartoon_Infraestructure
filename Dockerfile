# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install


ENV NODE_ENV=devp

EXPOSE 80

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que utiliza la aplicación (ajusta esto según sea necesario)
EXPOSE 80

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npx", "ts-node", "src/Server.ts"]