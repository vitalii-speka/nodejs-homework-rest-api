const request = require('supertest')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const app = require('../app')
const { User, contacts, newContact } = require('../model/__mocks__/data')

// const { HttpCode } = require('../helper/constants')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User.id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')

describe('Testing the route api/contacts', () => {
  let idNewContact = null
  describe('Testing GET request', () => {
    test('should return 200 status for GET: /contacts', async done => {
      const res = await request(app).get('/api/contacts').set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contacts).toBeInstanceOf(Object)
      done()
    })
    test('should return 200 status for GET: /contacts/:id', async done => {
      const contact = contacts[0]
      const res = await request(app).get(`/api/contacts/${contact._id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact._id).toBe(contact._id)
      done()
    })
    test('should return 404 status for GET: /contacts/:id', async done => {
      const res = await request(app)
        .get(`/api/contacts/608fcbb04c57cd00ec4857A4`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
    test('should return 401 status for GET: /contacts/:id', async done => {
      const contact = contacts[0]
      const res = await request(app).get(`/api/contacts/${contact._id}`).set('Authorization', `Bearer ${123}`)
      expect(res.status).toEqual(401)
      done()
    })
  })

  describe('Testing POST request', () => {
    test('should return 201 status for POST: /contacts', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(newContact)

      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
      idNewContact = res.body.data._id
      done()
    })

    test('should return 400 status for POST: /contacts wrong field', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })

    test('should return 400 status for POST: /contacts without field', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ age: 1 })
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    test(' should return 401 status for POST: /contacts Unauthorized error', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${123}`)
        .send(newContact)
        .set('Accept', 'application/json')

      expect(res.status).toEqual(401)
      expect(res.body).toBeDefined()
      done()
    })
  })

  describe('should handle PUT request', () => {
    test('should return 200 status for PUT: /contacts/:id', async done => {
      const res = await request(app)
        .put(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Barsik' })

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact.name).toBe('Barsik')
      done()
    })
    test('should return 400 status for PUT: /contacts/:id wrong field', async done => {
      const res = await request(app)
        .put('/api/contacts/1234')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ test: 1 })
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    test('should return 404 status for PUT: /contacts/:id ', async done => {
      const res = await request(app)
        .put('/api/contacts/5f837f85br83a4f1829da5b')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Marta' })
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
  })

  describe('should handle PATCH request', () => {
    test('should return 200 status for PATCH: /contacts/:id/favorite', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}/favorite`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ favorite: true })
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact.favorite).toBe(true)

      done()
    })
    test('should return 400 status for PUT: /contacts/:id wrong field', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}/favorite`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ test: 1 })
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    test('should return 404 status for PUT: /contacts/:id ', async done => {
      const res = await request(app)
        .patch('/api/contacts/5f837f855ba83a4f1829da5b/favorite')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ favorite: true })
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
  })

  describe('should handle DELETE request', () => {
    const contact = contacts[1]
    test('should return 200 status DELETE: /contacts/:id', async done => {
      const res = await request(app).delete(`/api/contacts/${contact._id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact).toStrictEqual(contact)
      done()
    })
    test('should return 404 status for DELETE: /contacts/:id ', async done => {
      const res = await request(app)
        .delete('/api/contacts/5f837f855ba83a4f1829da5b')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
    test('should return 401 status for DELETE: /contacts/:id ', async done => {
      const res = await request(app).delete(`/api/contacts/${idNewContact}`).set('Authorization', `Bearer ${123}`)

      expect(res.status).toEqual(401)
      expect(res.body).toBeDefined()
      done()
    })
  })
})
