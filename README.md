# Users API

## Table of contents
* [General info](#general-info)
* [API Documentation](#api-documentation)
* [Features](#features)
* [Technologies](#technologies)
* [Environment Variables](#environment-variables)

## General info
This is a simple user API that allows you to perform CRUD (Create, Read, Update, Delete) operations on users using Node.js, Express.js, and a relational database. The API also supports department interfaces with the ability to create and delete departments.

## API Documentation
For more information about the API endpoints and how to use them, please refer to the API documentation.<br/>
[Link to prod swagger](https://users-api-iexe.onrender.com/api)

## Features
* Full CRUD API support for users
* The Get Users API supports filters param
* An API that returns the department list with user counters
* Seeded the database with at least 10 users and 3 departments
* Proper error messages are returned
* Written in TypeScript for better readability and maintainability
* Unit tests to ensure adequate coverage

## Technologies
NodeJS, Zod, Typescript, pg , Turborepo

## Environment Variables
Before running the application, you need to set up the following environment variables:
* `PORT`: server port
* `POSTGRES_HOST`: database host defaults - "localhost"
* `POSTGRES_PORT`: database port defaults - 5432
* `POSTGRES_USER`: database username defaults - "root"
* `POSTGRES_PASSWORD`: database password defaults - "example"
* `POSTGRES_DB` database db defaults - "users-api"
* `POSTGRES_SECURE`  database db defaults - "false"
