#FROM golang:1.8.5-jessie
FROM golang:latest
# create a working directory

WORKDIR /go/src/app

RUN go get github.com/gorilla/websocket
RUN go get github.com/streadway/amqp

# run main.go
CMD ["go", "run", "main.go"]