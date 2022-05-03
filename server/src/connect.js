const { MongoClient } = require('mongodb');
const Db = "mongodb+srv://admin:Fk6BHzMwoajEmTRC@cluster0.d8ivu.mongodb.net/msg-post-app?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _database;

module.exports = {
    connectToDatabase: function(callback) {
        client.connect(function(err, db) {
            if(db)
            {
                _database = db.db("msg-post-app");
                console.log("Successfully connected to MongoDB database.");
            }
            return callback(err);
        });
    },
    getDatabase: function() {
        return _database;
    },
};