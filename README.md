# ADRES TECHNICAL TEST

## FRONT-END

The front-end was created using React with vite and tailwind. To run the project, use the following commands:

```bash
    cd adres_test_web_ui
    npm install
    npm run dev
```

the project runs on port 5173

## BACK-END

The back-end was created using python with django. To run the project, use the following commands:

```bash
    python manage.py runserver
```

The project runs on port 8000.

You can access the API documentation at the following link: http://localhost:8000/docs/

Its necessary run migrations to create the db columns in SQLLite, use the following commands:

```bash
    python manage.py makemigrations
    python manage.py migrate
```
