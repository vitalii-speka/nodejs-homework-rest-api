## GoIT Node.js Course Template Homework

API with 

АРІ створено на node.js, база даних mongodb, використані технології: cors, express, helmet, jimp, joi, , ,
* реєстрація користувачів з відправкою підтвердження на пошту sendgrid/mail, mailgen
* робота з фото/аватар:  multer, gravatar

Безпека: 
* створення токену jsonwebtoken,  
* перевірка користувача за допомогою пакета passport-jwt
* шифрування паролю за допомогою bcrypt
* ДОС атаки ?  express-query-boolean, express-rate-limit

    "gravatar": "^1.8.1",
    "helmet": "^4.5.0",
    "lowdb": "^1.0.0",
    "mongodb": "^3.7.4",
    "mongoose": "^5.12.5",
    "mongoose-paginate-v2": "^1.3.17",

1. Title and Introduction
Project Name: Phonebook app.
Project Goal: web app with registretion user and creat phone members.
Core Features: .
2. Technology Stack
Node.js: Used for server-side scripting and handling asynchronous operations.
Express.js: Framework for building RESTful APIs.
MongoDB + Mongoose: Database for storing and managing data.
NPM Packages:
jsonwebtoken for authentication and authorization.
bcryptjs for password hashing.
multer for file uploads.
@sendgrid/mail for sending emails.
helmet for security enhancements.
passport and passport-jwt for token-based authentication.
3. Project Architecture
Backend: Built on Express.js, with MongoDB for data storage and CRUD operations.
Authentication System: Uses JSON Web Tokens (JWT) for secure resource access and session management.
Data Handling: Data processing and validation with Joi and bcryptjs.
Security: Helmet for protection against common web vulnerabilities, CORS for cross-origin access configuration, and Express Rate Limit to prevent brute-force attacks.
Middleware: Morgan for request logging, Multer for file handling, and others.
4. Core Functionality
User Registration and Login: Utilizes JWT tokens and password encryption.
User Management: Creating, editing, and deleting users.
File Upload and Processing: Image uploads with Jimp for image manipulation.
Email Sending: Automated email sending using SendGrid and Mailgen.
Pagination and Filtering: Enabled with mongoose-paginate-v2 and express-query-boolean.
5. Additional Features
Environment Configuration: Managed with dotenv and cross-env.
Gravatars: Automatic avatar generation using Gravatar.
Rate Limiting: Protects API from abuse.


###
1. Опис проекту: 

2. Технологічний стек
Node.js: використання Node.js для сервера та обробки асинхронних операцій.
Express.js: як фреймворк для створення REST API.
MongoDB + Mongoose: база даних для зберігання та управління даними.
NPM пакети:
jsonwebtoken для автентифікації та авторизації.
bcryptjs для шифрування паролів.
multer для завантаження файлів.
@sendgrid/mail для надсилання електронних листів.
helmet для безпеки.
passport і passport-jwt для автентифікації за допомогою токенів.

3. Архітектура проекту
Серверна частина: побудована на базі Express.js, використовується MongoDB для зберігання даних та реалізації CRUD операцій.
Система автентифікації: JSON Web Tokens (JWT) для захисту ресурсів та управління сесіями.
Обробка даних: обробка та валідація даних за допомогою Joi та bcryptjs.
Безпека: використання Helmet для захисту від основних веб-загроз, CORS для налаштування доступу, а також Express Rate Limit для захисту від атак типу "brute-force".
Мідлвари: використання Morgan для логування запитів, multer для роботи з файлами, та інші.

4. Основна функціональність
Реєстрація та логін користувачів: з використанням токенів JWT та шифруванням паролів.
Керування користувачами: створення, редагування, видалення користувачів.
Завантаження та обробка файлів: завантаження зображень користувачів із використанням Jimp для їх редагування.
Надсилання електронних листів: автоматизація надсилання листів за допомогою SendGrid та Mailgen.
Пагінація та фільтрація: завдяки mongoose-paginate-v2 та express-query-boolean.

5. Додаткові можливості
Налаштування середовища: використання dotenv та cross-env для керування конфігураціями.
Аватари: автоматична генерація аватарів за допомогою Gravatar.
Обмеження швидкості: захист API від зловживань.



########################################

