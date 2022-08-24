import request from "supertest";
import { Express } from "express-serve-static-core";

import { createServer } from "../server";

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe("check app status", () => {
  it("should return 200 & valid response", (done) => {
    request(server)
      .get(`/`)
      .set("Content-Type", "Accept: application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ msg: "Hello world!" });
        done();
      });
  });
});
describe("check github api", () => {
  let expectedResult = {
    repositoryName: "tui",
    ownerLogin: "ReLaXxa",
    noRepoMessages: {
      message: "No own repos for user RumenKovachev",
    },
    missingHeader: {
      status: 400,
      Message: 'You need to add "Accept: application/json" header!',
    },
    wrongHeader: {
      status: 406,
      Message:
        'You are using the wrong "Content-Type" header. Please switch to "Accept: application/json"!',
    },
    nonExistingUser: {
      message: "Not Found",
      status: 404,
      additionalInfo: "https://docs.github.com/rest/reference/users#get-a-user",
    },
  };
  it("should return 200 & to have one repo", (done) => {
    request(server)
      .get(`/github_api/relaxxa`)
      .set("Content-Type", "Accept: application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].repositoryName).toBe;
        expect(res.body[0].repositoryName).toEqual(
          expectedResult.repositoryName
        );
        expect(res.body[0].ownerLogin).toEqual(expectedResult.ownerLogin);
        done();
      });
  });
  it("should return 200 & to have no repos", (done) => {
    request(server)
      .get(`/github_api/RumenKovachev`)
      .set("Content-Type", "Accept: application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(expectedResult.noRepoMessages);
        done();
      });
  });
  it("should return 404 when the user can not be find", (done) => {
    request(server)
      .get(`/github_api/RumenKovachev788788`)
      .set("Content-Type", "Accept: application/json")
      .expect(404)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(
          expectedResult.nonExistingUser.message
        );
        done();
      });
  });
  it("should return 400 for missing 'Content-Type' header", (done) => {
    request(server)
      .get(`/github_api/RumenKovachev`)
      .expect(400)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual(expectedResult.missingHeader);
        done();
      });
  });
  it("should return 406 for using wrong 'Content-Type' header", (done) => {
    request(server)
      .get(`/github_api/RumenKovachev`)
      .set("Content-Type", "Accept: application/xml")
      .expect(406)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(406);
        expect(res.body).toStrictEqual(expectedResult.wrongHeader);
        done();
      });
  });
});
