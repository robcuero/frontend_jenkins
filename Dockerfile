# Etapa 1: Construcción de la aplicación
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración (package.json y package-lock.json si está presente)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Ejecutar el build de la aplicación Astro
RUN npm run build

# Etapa 2: Servir la aplicación estática
FROM nginx:alpine AS production

# Copiar los archivos estáticos generados en la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
