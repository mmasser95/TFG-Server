const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const { app } = require('../app');
const request = require('supertest')(app);

beforeEach(async () => {
  await mongoose.connect(DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('Tests de inici de sessió, registre...', () => {
  describe('Tests de POST /login', () => {
    it("Ha de retornar el token, el tipus d'usuari i la ID", (done) => {
      request
        .post('/api/v1/login')
        .send({
          correu: 'mmasser95@uoc.edu',
          contrasenya: '12345678',
        }).expect(200,(res)=>{
            console.log('res.body :>> ', res.body);
            return done()
        })

    });
  });
  describe('Hello world', () => {
    it('Ha de retornar hello world', (done) => {
      request.get('/').expect(200,done);
    });
  });
});
