FROM ubuntu:24.04

RUN apt-get update

RUN apt-get install apache2 -y

COPY ./mi-web /var/www/html

CMD ["apachectl", "-D", "FOREGROUND"]
# apachectl -D FOREGROUND