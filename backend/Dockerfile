FROM golang:1.19-alpine AS build
WORKDIR /build
COPY . .
RUN apk add build-base
RUN go mod download
RUN go build -o server .

FROM alpine:3.16.2
WORKDIR /app
COPY --from=build /build/server .
EXPOSE 5001
ENTRYPOINT ["./server"]