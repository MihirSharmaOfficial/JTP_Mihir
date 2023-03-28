FROM debian:latest

# Install Python and Node.js dependencies
RUN apt-get update && apt-get install -y python3 python3-pip nodejs npm

# Install additional Python packages
RUN pip3 install requests

ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY recommender/requirements.txt .

RUN pip install -r requirements.txt

COPY . .
WORKDIR /code/JTP_JPN
RUN ["npm", "install"]
WORKDIR /code/recommender
EXPOSE 8000
EXPOSE 3000
CMD ["sh", "-c", "cd ../JTP_JPN && npm start & python3 manage.py runserver 0.0.0.0:8000"]
