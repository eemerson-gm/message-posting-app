
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
var _database

module.exports = {
    connectToDatabase: function(callback) {
        client.connect(function(err, db) {
            if(db)
            {
                _database = db.db("msg-post-app")
                console.log("Successfully connected to MongoDB database.")
            }
            return callback(err)
        })
    },
    getDatabase: function() {
        return _database
    },
}