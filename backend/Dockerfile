FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 🔥 Install netcat (used to check DB)
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

EXPOSE 8000

# 🔥 WAIT FOR DB BEFORE STARTING DJANGO
CMD sh -c "until nc -z db 3306; do echo 'Waiting for MySQL...'; sleep 2; done && python project/manage.py runserver 0.0.0.0:8000"
