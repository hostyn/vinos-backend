import app from '../src/app'
import request from 'supertest'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { createWineTypesAndWineVarieties } from '../src/libs/initialSetup'
config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI ?? '')
  await createWineTypesAndWineVarieties()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('POST /registry', () => {
  test('should respond with 400 - email-required', async () => {
    const response = await request(app).post('/registry').send()
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('email-required')
  })

  test('should respond with 400 - password-required', async () => {
    const response = await request(app).post('/registry').send({
      email: 'test@test.com',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('password-required')
  })

  test('should respond with 400 - invalid-email', async () => {
    const response = await request(app).post('/registry').send({
      email: 'usuario',
      password: 'password',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('invalid-email')
  })

  test('should respond with 400 - password-too-short', async () => {
    const response = await request(app).post('/registry').send({
      email: 'test@test.com',
      password: 'pass',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('password-too-short')
  })

  test('should respond with 200', async () => {
    const response = await request(app).post('/registry').send({
      email: 'test@test.com',
      password: 'password',
    })
    expect(response.statusCode).toBe(200)
  })

  test('should respond with 400 - user-already-exists', async () => {
    const response = await request(app).post('/registry').send({
      email: 'test@test.com',
      password: 'password',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('user-already-exists')
  })
})

describe('POST /login', () => {
  test('should respond with 400 - email-required', async () => {
    const response = await request(app).post('/login').send()
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('email-required')
  })

  test('should respond with 400 - password-required', async () => {
    const response = await request(app).post('/login').send({
      email: 'test@test.com',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('password-required')
  })

  test('should respond with 404 - user-not-found', async () => {
    const response = await request(app).post('/login').send({
      email: 'notfound@test.com',
      password: 'password',
    })
    expect(response.statusCode).toBe(404)
    expect(response.body.error).toBe('user-not-found')
  })

  test('should respond with 404 - wrong-password', async () => {
    const response = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'wrongpasswrod',
    })
    expect(response.statusCode).toBe(404)
    expect(response.body.error).toBe('wrong-password')
  })

  test('should respond with 200', async () => {
    const response = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /checkauth', () => {
  test('should respond with 401 - invalid-token', async () => {
    const response = await request(app).get('/checkauth').send()
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('invalid-token')
  })

  test('should respond with 200', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })

    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .get('/checkauth')
      .set('Cookie', cookie)
      .send()
    expect(response.statusCode).toBe(200)
  })
})

describe('POST /logout', () => {
  test('should respond with 200', async () => {
    const response = await request(app).post('/logout').send()
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /winetypes', () => {
  test('should respond with 401 - invalid-token', async () => {
    const response = await request(app).get('/winetypes').send()
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('invalid-token')
  })

  test('should respond with 200', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })

    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .get('/winetypes')
      .set('Cookie', cookie)
      .send()
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /winevarieties', () => {
  test('should respond with 401 - invalid-token', async () => {
    const response = await request(app).get('/winevarieties').send()
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('invalid-token')
  })

  test('should respond with 200', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })

    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .get('/winevarieties')
      .set('Cookie', cookie)
      .send()
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /measurements', () => {
  test('should respond with 401 - invalid-token', async () => {
    const response = await request(app).get('/measurements').send()
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('invalid-token')
  })

  test('should respond with 200', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })

    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .get('/measurements')
      .set('Cookie', cookie)
      .send()
    expect(response.statusCode).toBe(200)
  })
})

describe('POST /measurements', () => {
  test('should respond with 401 - invalid-token', async () => {
    const response = await request(app).post('/measurements').send()
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('invalid-token')
  })

  test('should respond with 400 - year-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send()
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('year-required')
  })

  test('should respond with 400 - variety-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('variety-required')
  })

  test('should respond with 400 - type-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('type-required')
  })

  test('should respond with 400 - color-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('color-required')
  })

  test('should respond with 400 - temperature-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('temperature-required')
  })

  test('should respond with 400 - alcohol-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        color: 'tinto',
        type: 'asdf',
        temperature: 23,
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('alcohol-required')
  })

  test('should respond with 400 - ph-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('ph-required')
  })

  test('should respond with 400 - observations-required', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('observations-required')
  })

  test('should respond with 400 - year-must-be-number', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: '2000',
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 'observación',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('year-must-be-number')
  })

  test('should respond with 400 - variety-must-be-string', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 2000,
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 'observación',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('variety-must-be-string')
  })

  test('should respond with 400 - type-must-be-string', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 2000,
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 'observación',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('type-must-be-string')
  })

  test('should respond with 400 - color-must-be-string', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 2000,
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 'observación',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('color-must-be-string')
  })

  test('should respond with 400 - temperature-must-be-number', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: '23',
        alcohol: 2,
        ph: 2,
        observations: 'observación',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('temperature-must-be-number')
  })

  test('should respond with 400 - alcohol-must-be-number', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: '2',
        ph: 2,
        observations: 'observación',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('alcohol-must-be-number')
  })

  test('should respond with 400 - ph-must-be-number', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: '2',
        observations: 'observación',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('ph-must-be-number')
  })

  test('should respond with 400 - observations-must-be-string', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 2,
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('observations-must-be-string')
  })

  test('should respond with 400 - invalid-variety', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: 'asdf',
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 'observation',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('invalid-variety')
  })

  test('should respond with 400 - invalid-type', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const varietiesResponse = await request(app)
      .get('/winevarieties')
      .set('Cookie', cookie)
      .send()

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: varietiesResponse.body.wineVarieties[0]._id,
        type: 'asdf',
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 'observation',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('invalid-type')
  })

  test('should respond with 200', async () => {
    const loginResponse = await request(app).post('/login').send({
      email: 'test@test.com',
      password: 'password',
    })
    const cookie = loginResponse.header['set-cookie'][0].split(';')[0]

    const varietiesResponse = await request(app)
      .get('/winevarieties')
      .set('Cookie', cookie)
      .send()

    const typesResponse = await request(app)
      .get('/winetypes')
      .set('Cookie', cookie)
      .send()

    const response = await request(app)
      .post('/measurements')
      .set('Cookie', cookie)
      .send({
        year: 2000,
        variety: varietiesResponse.body.wineVarieties[0]._id,
        type: typesResponse.body.wineTypes[0]._id,
        color: 'tinto',
        temperature: 23,
        alcohol: 2,
        ph: 2,
        observations: 'observation',
      })
    expect(response.statusCode).toBe(200)
  })
})
