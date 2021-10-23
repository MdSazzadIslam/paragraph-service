import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import { describe } from "mocha";
const { expect } = chai;

let should = chai.should();
chai.use(chaiHttp);
/**
 * Integration testing
 */
const paragraph: string = "my-paragraph" + Math.floor(Math.random() * 100);

describe("Paragraph", () => {
  describe("GET /random-url", () => {
    it("it should return 404", done => {
      chai
        .request(app)
        .get("/api/v1/contentpass/reset")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe("API", () => {
    it("should be reachable", done => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);

          done();
        });
    });
  });

  describe("GET /paragraph/:slug", () => {
    it("it should return 404 for unknown paragraph", done => {
      const slug: string = "hello-test";
      chai
        .request(app)
        .get(`/api/v1/contentpass/paragraph/${slug}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it("should return initial structure", done => {
      const realSlug: string = "my-paragraph";
      chai
        .request(app)
        .get(`/api/v1/contentpass/paragraph/${realSlug}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe("POST /paragraph/:slug", () => {
    const numberOfSentence: number = 2;
    const data = {
      paragraph,
      numberOfSentence,
    };
    it("it should post a new paragraph", done => {
      chai
        .request(app)
        .post(`/api/v1/contentpass/paragraph`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("should mark paragraph complete when all sentences added", done => {
      const slug: string = "my-paragraph";
      const idx: number = 0;
      const sentence = "hello-world!!!";
      const data = {
        sentence,
      };
      chai
        .request(app)
        .post(`/api/v1/contentpass/paragraph/${slug}/sentence/${idx}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("should support deleting sentences", done => {
      const slug: string = "my-paragraph";
      const idx: number = 0;
      const sentence = "hello-world!!!";

      chai
        .request(app)
        .delete(`/api/v1/contentpass/paragraph/${slug}/sentence/${idx}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it("should not add sentence to unknown paragraph", done => {
      const newSlug: string = "my-paragraphh";
      const idx: number = 0;
      const sentence = "hello-world!!!";
      const data = {
        sentence,
      };
      chai
        .request(app)
        .post(`/api/v1/contentpass/paragraph/${newSlug}/sentence/${idx}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it("should reject invalid sentence index", done => {
      const newSlug: string = "my-paragraph";
      const idx: number = 2;
      const sentence = "hello-world!!!";
      const data = {
        sentence,
      };
      chai
        .request(app)
        .post(`/api/v1/contentpass/paragraph/${newSlug}/sentence/${idx}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe("DELETE /paragraph/:slug", () => {
    it("it should delete a paragraph", done => {
      chai
        .request(app)
        .delete(`/api/v1/contentpass/paragraph/${paragraph}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
