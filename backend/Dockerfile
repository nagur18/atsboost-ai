FROM python:3.11-slim

WORKDIR /app

# Install system deps needed by some Python packages (pdf processing, docx)
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libffi-dev libxml2 libxml2-dev libxslt1-dev libz-dev libjpeg-dev zlib1g-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY backend /app

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
