FROM python:3.11 as os-base

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
RUN apt-get update
RUN apt-get install -y curl

FROM os-base as poetry-base

RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python3 -
ENV PATH "/root/.local/bin:$PATH"
RUN poetry config virtualenvs.create false
RUN apt-get remove -y curl

FROM poetry-base as app-base

ARG APPDIR=/app
WORKDIR $APPDIR/
COPY app ./app
COPY main.py .
COPY pyproject.toml ./pyproject.toml
RUN poetry install --no-dev

FROM app-base as main
WORKDIR /app/
CMD ["python", "main.py"]
