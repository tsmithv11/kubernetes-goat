FROM golang:1.21.4-alpine3.18
LABEL MAINTAINER="Madhu Akula" INFO="Kubernetes Goat"

WORKDIR /

COPY metadata /metadata
COPY go.mod /go.mod
COPY main.go /main.go


RUN apk add --no-cache curl ca-certificates
RUN go build -o /

EXPOSE 80

CMD ["/metadata-db"]
