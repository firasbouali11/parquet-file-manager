FROM openjdk:8-jre
RUN apt-get update && apt-get upgrade -y
COPY parq_file_manager-0.1.tar.gz /srv/
WORKDIR /srv/
RUN tar xzvf parq_file_manager-0.1.tar.gz
WORKDIR  /srv/parq_file_manager-0.1/bin/
EXPOSE 5050
ENV HOSTPORT "5050"
ENV HOSTIP "api"
CMD "./main"