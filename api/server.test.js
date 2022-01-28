// Write your tests here

const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('sanity', () => {
  expect(true).toBe(true)
})

test('is the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('no username', async () =>{
    const res = await request(server).post('/api/auth/register').send({ username: '', password: 'secretpass' })
    expect(res.body).toMatchObject({ message: 'username and password required'})
  })

  test('no password', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'sammidoesthings', password: '' })
    expect(res.body).toMatchObject({ message: 'username and password required'})
  })
})

describe('[POST] /login', () => {
  test('no username', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: '', password: 'secretpass' })
    expect(res.body).toMatchObject({ message: 'username and password required'})
  })

  test('no password', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'sammidoesthings', password: '' })
    expect(res.body).toMatchObject({ message: 'username and password required' })
  })
})