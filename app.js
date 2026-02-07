
const express = require('express')
const mongodb = require('mongodb')
const cors = require('cors')

const port = process.env.PORT
const user = "projectleafadmin000"
const pass = "t42Rz3zKWpX9G4M9WxPhK98mKnFz5hnS"
const dbUri = `mongodb+srv://${user}:${pass}@project-leaf-db.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`
const dbName = "locations"
const collectionName = "coordinates"

const app = express()

app.use(cors())

app.get('/get-locations', async function (req, res) {
    console.log('/get-locations')
    console.log(dbUri)
    const client = new mongodb.MongoClient(dbUri)
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    const locations = await collection.find({}).toArray();
    res.send(locations)
})

app.get('/test', async function (req, res) {
    console.log('/test')
    res.send('Test endpoint is working!')
})

app.get('/reset-db', async function (req, res) {
    console.log('/reset-db')
    console.log(dbUri)
    const client = new mongodb.MongoClient(dbUri)
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    await collection.deleteMany({})

    const entries = [
        { id: '2223afc4-3e49-4367-9a43-751546cabade', title: 'Timisoara', latitude: 45.755, longitude: 21.225 },
        { id: 'd811511b-7894-4619-8342-cc2e0d348a77', title: 'Alba Iulia', latitude: 46.067, longitude: 23.580 },
        { id: '550e8400-e29b-41d4-a716-446655440002', title: 'Bucuresti', latitude: 44.426, longitude: 26.102 }
    ]

    await collection.insertMany(entries)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`project-leaf-backend listening on port ${port}`)
})