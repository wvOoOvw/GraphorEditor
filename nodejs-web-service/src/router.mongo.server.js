const router = require('express').Router()

const MongoClient = require('./utils.mongo')
const { parseFind } = require('./utils.mongo')

router.post('/api/mongo/count', async (req, res) => {
  const { db, collection, find = {} } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).count(parseFind(find))
    res.send({ response: true, data })
  } catch { }
})

router.post('/api/mongo/findone', async (req, res) => {
  const { db, collection, find = {}, option = {} } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).findOne(parseFind(find), option)
    res.send({ response: true, data })
  } catch { }
})

router.post('/api/mongo/find', async (req, res) => {
  const { db, collection, skip, limit, sort, find = {}, option = {} } = req.body

  try {
    var base = MongoClient.client.db(db).collection(collection).find(parseFind(find), option)
    if (sort) base = base.sort(sort)
    if (skip) base = base.skip(skip)
    if (limit) base = base.limit(limit)
    const data = await base.toArray()
    res.send({ response: true, data })
  } catch { }
})

router.post('/api/mongo/insertone', async (req, res) => {
  const { db, collection, insert } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).insertOne(insert)
    res.send({ response: true, data: data })
  } catch { }
})

router.post('/api/mongo/insertmany', async (req, res) => {
  const { db, collection, insert } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).insertMany(insert)
    res.send({ response: true, data: data })
  } catch { }
})

router.post('/api/mongo/updateone', async (req, res) => {
  const { db, collection, find, update } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).updateOne(parseFind(find), update)
    res.send({ response: true })
  } catch { }
})

router.post('/api/mongo/updatemany', async (req, res) => {
  const { db, collection, find, update } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).updateMany(parseFind(find), update)
    res.send({ response: true })
  } catch { }
})

router.post('/api/mongo/deleteone', async (req, res) => {
  const { db, collection, find } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).deleteOne(parseFind(find))
    res.send({ response: true })
  } catch { }
})

router.post('/api/mongo/deletemany', async (req, res) => {
  const { db, collection, find } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).deleteMany(parseFind(find))
    res.send({ response: true })
  } catch { }
})

router.post('/api/mongo/:db/:collection/count', async (req, res) => {
  const { db, collection } = req.params
  const { find = {} } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).count(parseFind(find))
    res.send({ response: true, data })
  } catch { }
})

router.post('/api/mongo/:db/:collection/findone', async (req, res) => {
  const { db, collection } = req.params
  const { find = {}, option = {} } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).findOne(parseFind(find), option)
    res.send({ response: true, data })
  } catch { }
})

router.post('/api/mongo/:db/:collection/find', async (req, res) => {
  const { db, collection } = req.params
  const { skip, limit, sort, find = {}, option = {} } = req.body

  try {
    var base = MongoClient.client.db(db).collection(collection).find(parseFind(find), option)
    if (sort) base = base.sort(sort)
    if (skip) base = base.skip(skip)
    if (limit) base = base.limit(limit)
    const data = await base.toArray()
    res.send({ response: true, data })
  } catch { }
})

router.post('/api/mongo/:db/:collection/insertone', async (req, res) => {
  const { db, collection } = req.params
  const { insert } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).insertOne(insert)
    res.send({ response: true, data: data })
  } catch { }
})

router.post('/api/mongo/:db/:collection/insertmany', async (req, res) => {
  const { db, collection } = req.params
  const { insert } = req.body

  try {
    const data = await MongoClient.client.db(db).collection(collection).insertMany(insert)
    res.send({ response: true, data: data })
  } catch { }
})

router.post('/api/mongo/:db/:collection/updateone', async (req, res) => {
  const { db, collection } = req.params
  const { find, update } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).updateOne(parseFind(find), update)
    res.send({ response: true })
  } catch { }
})

router.post('/api/mongo/:db/:collection/updatemany', async (req, res) => {
  const { db, collection } = req.params
  const { find, update } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).updateMany(parseFind(find), update)
    res.send({ response: true })
  } catch { }
})

router.post('/api/mongo/:db/:collection/deleteone', async (req, res) => {
  const { db, collection } = req.params
  const { find } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).deleteOne(parseFind(find))
    res.send({ response: true })
  } catch { }
})

router.post('/api/mongo/:db/:collection/deletemany', async (req, res) => {
  const { db, collection } = req.params
  const { find } = req.body

  try {
    await MongoClient.client.db(db).collection(collection).deleteMany(parseFind(find))
    res.send({ response: true })
  } catch { }
})

module.exports = router