import mongoose from "mongoose";
import "dotenv/config";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

// Test database connection and question creation
async function testDatabase() {
  try {
    console.log("🔌 Testing database connection...");
    await mongoose.connect(CONNECTION_STRING);
    console.log("✅ Connected to MongoDB");
    
    // Test if we can access the questions collection
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("📚 Available collections:", collections.map(c => c.name));
    
    // Test if questions collection exists and has data
    if (collections.find(c => c.name === 'questions')) {
      const questionsCount = await db.collection('questions').countDocuments();
      console.log(`📝 Questions collection has ${questionsCount} documents`);
      
      if (questionsCount > 0) {
        const sampleQuestion = await db.collection('questions').findOne();
        console.log("📋 Sample question:", sampleQuestion);
      }
    } else {
      console.log("⚠️ Questions collection not found");
    }
    
    // Test if quizzes collection exists and has data
    if (collections.find(c => c.name === 'quizzes')) {
      const quizzesCount = await db.collection('quizzes').countDocuments();
      console.log(`📝 Quizzes collection has ${quizzesCount} documents`);
      
      if (quizzesCount > 0) {
        const sampleQuiz = await db.collection('quizzes').findOne();
        console.log("📋 Sample quiz:", sampleQuiz);
      }
    } else {
      console.log("⚠️ Quizzes collection not found");
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

testDatabase();
