const request = require('supertest')
const app = require('./app')

describe('GET /', () => {
  it('responds with JSON', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
