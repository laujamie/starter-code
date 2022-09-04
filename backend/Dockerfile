FROM golang:1.19 AS build
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o /out/server .

FROM build AS dev
RUN curl -fLo install.sh https://raw.githubusercontent.com/cosmtrek/air/master/install.sh \   
&& chmod +x install.sh && sh install.sh && cp ./bin/air /bin/air

CMD "air"
