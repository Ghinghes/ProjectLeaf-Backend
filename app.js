
const express = require('express')
const mongodb = require('mongodb')

const port = 3000
const user = "projectleafadmin000"
const pass = "t42Rz3zKWpX9G4M9WxPhK98mKnFz5hnS"
const dbUri = `mongodb+srv://${user}:${pass}@project-leaf-db.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`
const dbName = "locations"
const collectionName = "coordinates"

const app = express()

app.get('/', async function (req, res) {
    console.log('/')
    console.log(dbUri)
    const client = new mongodb.MongoClient(dbUri)
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    const locations = await collection.find({}).toArray();
    res.send(locations)
})

app.get('/init-db', async function (req, res) {
    console.log('/init-db')
    console.log(dbUri)
    const client = new mongodb.MongoClient(dbUri)
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    await collection.deleteMany({})

    const entries = [
        { name: 'Point A', latitude: 45.755, longitude: 21.225 },
        { name: 'Point B', latitude: 46.067, longitude: 23.580 },
        { name: 'Point C', latitude: 44.426, longitude: 26.102 }
    ]

    await collection.insertMany(entries)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})