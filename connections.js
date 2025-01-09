const express = require('express');
const { MongoClient , ObjectId } = require('mongodb');




const app = express();
const port = 3003;

// MongoDB connection details
const uri = "mongodb://127.0.0.1:27017"; 
const dbName = "linkedin";

// Middleware
app.use(express.json());

let db, connections

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        connections = db.collection("connections");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// Routes

// GET: List all students
app.get('/users', async (req, res) => {
    try {
     
        const allCourses = await users.find( ).toArray();
        res.status(200).json(allCourses);
    } catch (err) {
        res.status(500).send("Error fetching courses: " + err.message);
    }
});

// POST: Add a new student
app.post('/connections', async (req, res) => {
    try {
        // console.log("Request object: ",req)
        // console.log("Request Body:",req.body)
        const newCourses = req.body;
        const result = await connections.insertOne(newCourses);
        res.status(201).send(`Courses added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding student: " + err.message);
    }
});

// PUT: Update a student completely
app.put('/courses/:_id', async (req, res) => {
    try {
        console.log("Request Params: ",req.params)
        console.log("Request Body:",req.body)
        const _id = req.params._id;
        const updatedCourses = req.body;

        const result = await courses.replaceOne({ _id:new ObjectId(_id) }, updatedCourses);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating courses: " + err.message);
    }
});

// PATCH: Partially update a student
// app.patch('/users/:userId', async (req, res) => {
//     try {
//         console.log("Request Params: ",req.params)
//         console.log("Request Body:",req.body)
//         const userId = parseInt(req.params.userId);
//         const updates = req.body;
//         const result = await users.updateOne({ userId :new ObjectId(userId)  }, { $set: updates });
//         res.status(200).send(`${result.modifiedCount} document(s) updated`);
//     } catch (err) {
//         res.status(500).send("Error partially updating student: " + err.message);
//     }
// });



app.patch('/connections/:connectionId', async (req, res) => {
    const { connectionId } = req.params;
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ error: 'Headline is required.' });
    }
  
    try {
      const result = await db.collection('connections').updateOne(
        { connectionIdId: connectionId },
        { $set: { status: status } }
      );
  
      
  
      res.status(200).json({ message: 'User status updated successfully.' });
    } catch (error) {
      console.error('Error updating user headline:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
// DELETE: Remove a student
// DELETE /users/:userId - Delete a user
app.delete('/connections/:connectionId', async (req, res) => {
    const { connectionId } = req.params;
  
    try {
      const result = await db.collection('connections').deleteOne({ connectionId: connectionId });
  
     
  
      res.status(200).json({ message: 'connection deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting user: ' + err.message });
    }
  });



  // GET /users/:userId - Fetch a specific user
app.get('/connections/:connectionId', async (req, res) => {
    const { connectionId } = req.params;
  
    try {
      const connection = await db.collection('connections').findOne({ connectionId: connectionId });
  
     
  
      res.status(200).json(connection);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching user: ' + err.message });
    }
  });
  
  

















