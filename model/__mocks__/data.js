const contacts = [
  {
    _id: '5f837f855ba83a4f1829ca5b',
    name: 'Barsik',
    email: 'Barsik@com.ua',
    phone: '(222) 222-2222',
    favorite: false,
  },
  {
    _id: '5f8382425ba83a4f1829ca5c',
    name: 'Lama',
    email: 'Barsik@com.ua',
    phone: '(444) 444-4444',
    favorite: false,
  },
]

const newContact = {
  name: 'New',
  email: 'New@com.ua',
  phone: '(333) 333-3333',
  favorite: false,
}

const User = {
  name: 'Guest',
  subscription: 'pro',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDc4MGIwYTMzZjU5M2I1ODY2ZDcwZCIsImlhdCI6MTYxNTMzNDc0NCwiZXhwIjoxNjE1MzM4MzQ0fQ.ZOul5xw2qGjRiFVXE4eKyIcJJ3ubRsVcmlXSm-KzNzg',
  idCloudAvatar: null,
  _id: '604780b0a33f593b5866d70d',
  id: '604780b0a33f593b5866d70d',
  email: 'test007@ex.ua',
  password: '$2a$08$ebkI0zFk0IBoStiDDhyzr.9y0BqToGXPtrcTqcMErEuk4JHHF3K8O',
  updatedAt: '2021-03-10T00:05:44.937Z',
  avatar: 'https://s.gravatar.com/avatar/d6ac26ce64657b23fce03f68f65dc6b4?s=250',
}

const users = []
users[0] = User

const newUser = { email: 'test@test.com', password: '123456' }

module.exports = { contacts, newContact, User, users, newUser }
