# с какого image хотим сделать свой
FROM node 

# контекст проекта
WORKDIR /app

COPY package.json /app

# запускаем команду когда собирается образ
RUN npm install 

# копируем из локального проекта
COPY . .

# ENV переменные
# какой порт запускается
# EXPOSE 4000 
ENV PORT 4000

EXPOSE $PORT

VOLUME [ "/app/data" ]


# запускаем команду, когда запускается образ
CMD ["node", "app.js"] 



# wsl --shutdown
# --env-file ./config/.env