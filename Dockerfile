# FROM python:3.11-bullseye
FROM tensorflow/tensorflow
# FROM ubuntu


# RUN apt-get update && \
#     apt-get -y upgrade && \
#     apt-get install -y \
#     sudo

# RUN DEBIAN_FRONTEND=noninteractive apt-get -y install python3 pip vim mc wget curl 

# #  to make open-cv work
# RUN apt-get install ffmpeg libsm6 libxext6 -y



EXPOSE 8000
COPY ./DjangoWeb/ /app 
COPY ./models/ /app/models/
WORKDIR /app 
RUN pip install --upgrade pip
RUN pip install -r requirements.txt --no-cache-dir


# RUN rm db.sqlite3
RUN ls -lh


# RUN python3 manage.py makemigrations;\
#     python3 manage.py migrate;


# Make app folder writeable for the sake of db.sqlite3, and make that file also writeable.
# Ideally you host the database somewhere else so that the app folders can remain read only.
# Without these permissions you see the errors "unable to open database file" and
# "attempt to write to a readonly database", respectively, whenever the app attempts to
# write to the database.
RUN chmod g+w /app;                                          
# RUN chmod g+w /app/db.sqlite3;
# upper commands are working !

RUN ls -lh

CMD  python3 manage.py runserver 0.0.0.0:8000