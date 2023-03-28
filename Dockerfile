FROM python:3.8.10

ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY recommender/requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

WORKDIR /code/recommender

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
