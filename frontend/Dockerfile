FROM node:18

RUN apt-get update || : && apt-get install python3 -y
RUN apt-get install python3-pip -y

WORKDIR /app

COPY package*.json ./
RUN npm install --quiet

COPY . .
EXPOSE 1234

CMD ["npm", "start"]
