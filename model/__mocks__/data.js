const contacts = [
  {
    _id: '608fcbb04c57cd00ec4857c4',
    favorite: false,
    name: 'Abbot14',
    email: 'Abbot14@gmail.com',
    phone: '(666)568-3722',
    owner: '608c5af873254e09909266d5',
  },
  {
    _id: '608fce16bd93792f40e89f94',
    favorite: true,
    name: 'Abbot6',
    email: 'Abbot6@gmail.com',
    phone: '(666)568-3722',
    owner: '608c5af873254e09909266d5',
  },
]

const newContact = {
  name: 'Test Test',
  email: 'test@test.com',
  phone: '(000) 000-0000',
  favorite: false,
}

const User = {
  _id: '608c5af873254e09909266d5',
  id: '608c5af873254e09909266d5',
  name: 'Guest',
  subscription: 'business',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGM1YWY4NzMyNTRlMDk5MDkyNjZkNSIsImlhdCI6MTYyMDc1Nzc2MH0.Nmfj4ENc76nJjBuP9ONFh3wMC2v3NM7sSfBEI3bVzKU',
  email: 'speka222@gmail.com',
  password: '$2a$06$lMXagGHeAfvyt2r/xxkMO.WcpqEE6Ir.1lBTlflPePlMtfybrSW7u',
  avatar: 'avatars/1620571935224-user-vector-avatar.jpg',
}

const users = []
users[0] = User

const newUser = { email: 'test123456@test.com', password: '12345678' }

module.exports = { contacts, newContact, User, users, newUser }
