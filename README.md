# Paragraph Service

The goal is to implement a simple REST service for managing paragraphs and sentences. A paragraph consists of a pre-defined number of sentences. Sentences can be added later to the paragraph, based on their index. Both, paragraph and sentences, can also be deleted again.


## Running the tests

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

## Tech

* Node.js
* Express.js
* Typescript
* MongoDB Atlas 
* Mocha
