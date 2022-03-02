const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  test('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] Auth Endpoints', () => {
  test('[1] post /api/auth/register - Registered new user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'coco', password: '1234' })
    expect(res.status).toBe(201)
    expect(res.body.message).toMatch(/coco has been successfully registered!/i);
  })

  test('[2] Returns error message when username already exists', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'kim', password: '1234' })
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/Username is taken, please choose another one./i);  
  }) 

  test('[3] post /api/auth/login - Login successful', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'kim', password: '1234' })
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/welcome kim/i);
  })

  test('[4] Return error message when credentials are invalid', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'cat', password: '12345678' })
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/invalid login credentials/i)
  })
})

describe('[GET] /api/auth/users - Users endpoint', () => {
  beforeAll(async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'coco', password: '1234'})
  })
  let res;
  beforeAll(async () => {
   res = await request(server)
    .post('/api/auth/login')
    .send({ username: 'coco', password: '1234' })
  });
  test('[5] Get users successful', async () => {  
    let result = await request(server)
      .get('/api/auth/users')
      .set({ authorization: res.body.token })
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).toHaveLength(4);
  });
})

describe('[GET] /api/recipes - Recipes endpoint', () => {
  beforeAll(async () => {
    await request(server)
    .post('/api/auth/register')
    .send({ username: 'coco', password: '1234'})
  })
  let res;
  beforeAll(async () => {
  res = await request(server)
    .post('/api/auth/login')
    .send({ username: 'coco', password: '1234' })
  });
  test('[6] Get recipes successful', async () => {
    let result = await request(server)
      .get('/api/recipes')
      .set({ authorization: res.body.token })
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).toHaveLength(2);
  })
})