import { MongoClient } from 'mongodb';

export const url = process.env.MONGODB_URL;

const handler = async (req, res) => {
  console.log(url);

  if (req.method === 'POST') {
    const data = req.body;

    try {
      const client = await MongoClient.connect(url);
      const db = client.db();
      const meetupsCollection = db.collection('meetups');
      const result = await meetupsCollection.insertOne(data);

      client.close();

      res.status(201).json({ message: 'Meetup inserted!' });
    } catch (error) {
      console.error('DB insert error:', error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
