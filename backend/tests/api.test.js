const supertest = require('supertest')
const app = require('../index.js')

const api = supertest(app)

// eslint-disable-next-line no-undef
test('notes are returned as json from goodfoods', async () => {
    await api
        .get('/api/goodfoods')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
// eslint-disable-next-line no-undef
test('notes are returned as json from badfoods', async () => {
    await api
        .get('/api/badfoods')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
// eslint-disable-next-line no-undef
test('six foods are returned from goodfoods', async () => {
    const response = await api.get('/api/goodfoods')
    // eslint-disable-next-line no-undef
    expect(response.body).toHaveLength(6)}
)
// eslint-disable-next-line no-undef
test('six foods are returned from badfoods', async () => {
    const response = await api.get('/api/badfoods')
    // eslint-disable-next-line no-undef
    expect(response.body).toHaveLength(6)}
)
// eslint-disable-next-line no-undef
test('food can be found by id', async () => {
    const response = await api.get('/api/goodfoods/300')
    // eslint-disable-next-line no-undef
    expect(response.body.name).toContain('CARROT')}
)
