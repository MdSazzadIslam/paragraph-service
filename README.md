# Paragraph Service

Welcome to the contentpass test. The goal is to implement a simple REST service for managing paragraphs and sentences. A paragraph consists of a pre-defined number of sentences. Sentences can be added later to the paragraph, based on their index. Both, paragraph and sentences, can also be deleted again.

To simplify project setup, you are provided with a working test suite, located in `./test` and a stub for the service, located in `./api`. Have a look at the test suite to check what is expected from the service. The test suite should be self-explanatory, but if you have troubles with the syntax check https://www.chaijs.com/api/bdd/ for details.

The provided service stub does not implement the desired api, of course, it is just there for an easier start. You don't have to stick with Node.js, but can chose any language or framework you want to implement the api. Just make sure the test suite is passing all tests.

The task is meant to be solvable in less than an hour for people who are experienced with building web services. Even if you do not have experience building such services, do not spend too much time on it. The solution does not have to be perfect, just fulfill the test suite.

## Running the tests

For simplicity, a docker-compose file is provided that starts the api and test suite together. The test suite is waiting for the service to start and then runs all the test cases and prints the results.

Use the following docker-compose command to run the tests (`docker-compose down` is run first to make sure no old instances are running from the previous run).

```
docker-compose down && docker-compose up --build
```

When you successfully implemented the api, you should see output like the following:

```
test_1  |   Paragraph
test_1  |     API
test_1  |       ✓ should be reachable
test_1  |     GET /paragraph/:slug
test_1  |       ✓ should return 404 for unknown paragraph
test_1  |       ✓ should return initial structure
test_1  |     POST /paragraph/:slug/sentence/:idx
test_1  |       ✓ should add sentence to paragraph
test_1  |       ✓ should mark paragraph complete when all sentences added
test_1  |       ✓ should support deleting sentences
test_1  |       ✓ should not add sentence to unknown paragraph
test_1  |       ✓ should reject invalid sentence index
test_1  |     DELETE /paragraph/:slug
test_1  |       ✓ should delete paragraph
test_1  |
test_1  |
test_1  |   9 passing (161ms)
```

## Requirements

* Running the command mentioned above must print a successful result of the test suite.
* The test suite must not be modified.

## Hints

* The service does not have to be persistent. It can store everything in memory.
* See https://docs.docker.com/install/ for details on how to install Docker.
* See https://expressjs.com/en/4x/api.html for documentation about the framework used in the service stub.

## Bonus tasks

* Persistently store the paragraphs and sentences in a database
* Provide an OpenAPI specification for the service
* Provide a Kubernetes Configuration
