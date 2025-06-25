FROM node:18

WORKDIR /app

# Dependências em camada própria
COPY package*.json ./
RUN npm ci

# Copia o restante e gera build estático
COPY . .
RUN npx expo export --platform web

# Instala um servidor estático super-leve
RUN npm install -g serve

EXPOSE 8026
CMD ["npm", "start", "--", "--port", "8026", "--tunnel"]
