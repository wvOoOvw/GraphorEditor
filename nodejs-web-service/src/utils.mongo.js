const { MongoClient, ObjectId } = require('mongodb')

function Mongo(url) {
  this.url = url
  this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
  this.connect(url)
}

Mongo.prototype.connect = async function () {
  this.client.connect()
    .then(err => {
      console.log(`mongo connected - ${this.url}`)
    })
}

Mongo.prototype.close = function () {
  this.client.close()
}

const url = ""

const MongoINS = new Mongo(url)

const parseFind = (find) => {
  if (typeof find === 'object' && find._id) find._id = new ObjectId(find._id)

  return find
}

module.exports = MongoINS

module.exports.parseFind = parseFind