package main

import  (
    "log"
    "fmt"
    "github.com/streadway/amqp"
    //"github.com/gorilla/websocket"
    "encoding/json"
    "math/rand"
)

type Message struct {
    Version string `json:"version"`
    AnswerRoute string `json:"answer_route"`
}


func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func main() {
	conn, err := amqp.Dial("amqp://rabbitmq:rabbitmq@hakaton.local:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
      "test", // name
      true,   // durable
      false,   // delete when unused
      false,   // exclusive
      false,   // no-wait
      nil,     // arguments
    )
    failOnError(err, "Failed to declare a queue")

    AnswerRoute := string(rand.Intn(100))

    message := &Message{
        Version: "1",
        AnswerRoute: AnswerRoute}

    message_encoded, status := json.Marshal(message)

    fmt.Print(message, status, string(message_encoded));

    body := string(message_encoded)
    err = ch.Publish(
      "",     // exchange
      q.Name, // routing key
      false,  // mandatory
      false,  // immediate
      amqp.Publishing {
        ContentType: "text/plain",
        Body:        []byte(body),
      })
    failOnError(err, "Failed to publish a message")

    // Created queue
    q_t, err := ch.QueueDeclare(
      "testgo", // name
      true,   // durable
      false,   // delete when unused
      false,   // exclusive
      false,   // no-wait
      nil,     // arguments
    )
    failOnError(err, "Failed to declare a queue")


	msgs, err := ch.Consume(
		q_t.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register ago consumer")

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
