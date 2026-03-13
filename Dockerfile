FROM nginx:alpine

# Remove configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos do projeto
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
