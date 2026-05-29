import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://tester1:tester1@cluster0.fp8w9ld.mongodb.net/?appName=Cluster0")

export async function cocnnectToDatabase() {
    try {
        await client.connect()
        return client.db("Tetris")
    }catch(err){
        console.log(err);
    }
}