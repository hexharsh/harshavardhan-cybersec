FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Runs only during market hours — triggered by EventBridge cron at 9:10 AM IST
CMD ["python", "main.py"]
