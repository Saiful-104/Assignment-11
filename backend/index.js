require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const admin = require("firebase-admin");
const port = process.env.PORT || 3000;
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf-8"
);
const serviceAccount = JSON.parse(decoded);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
// middleware
app.use(
  cors({
      origin: [
         process.env.CLIENT_DOMAIN
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());

// jwt middlewares
const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).send({ message: "Unauthorized Access!" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.tokenEmail = decoded.email;
    console.log(decoded);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Unauthorized Access!", err });
  }
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const db = client.db("scholarshipDB");
    const scholarshipsCollection = db.collection("scholarships");
    const reviewsCollection = db.collection("reviews");
  
     // get all scholarships
//       app.get('/scholarships', async (req, res) => {
//   try {
//     const scholarships = await scholarshipsCollection.find({}).sort({ scholarshipPostDate: -1 }).toArray();
//     console.log(scholarships);
//     res.send({ success: true, data: scholarships });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ success: false, message: 'Error fetching scholarships' });
//   }
// });


//       // GET Top 6 Scholarships (Smart Sorting)
// app.get('/top/scholarships', async (req, res) => {
//   try {
//     const sortBy = req.query.sortBy || 'applicationFees';
//     let sortCriteria = {};
//     if (sortBy === 'applicationFees') {
//       sortCriteria = { applicationFees: 1, scholarshipPostDate: -1 };

//     } else if (sortBy === 'recent') {
//       sortCriteria = { scholarshipPostDate: -1, applicationFees: 1 };
//     }
//     const topScholarships = await scholarshipsCollection
//       .find({})
//       .sort(sortCriteria)
//       .limit(6)
//       .toArray();
//     res.send({ success: true, data: topScholarships });
//    // console.log(topScholarships);
//   } catch (err) {
//    // console.error(err);
//     res.status(500).send({ success: false, message: 'Error fetching top scholarships' });
//   }
// });
       // এটা server.js ফাইলের নিচের দিকে যেকোনো জায়গায় যোগ করুন:

// রুট ১: সব স্কলারশিপ পাবার জন্য (search & filter সহ)
app.get('/scholarships', async (req, res) => {
  try {
    const { search, category, subject, country, degree } = req.query;
    
    console.log('Query received:', { search, category, subject, country, degree });
    
    let query = {};
    
    // সার্চ ফাংশনালিটি
    if (search && search.trim() !== '') {
      query.$or = [
        { scholarshipName: { $regex: search, $options: 'i' } },
        { universityName: { $regex: search, $options: 'i' } },
        { degree: { $regex: search, $options: 'i' } }
      ];
    }
    
    // ফিল্টার বাই Scholarship Category
    if (category && category !== 'all') {
      query.scholarshipCategory = category;
    }
    
    // ফিল্টার বাই Subject Category
    if (subject && subject !== 'all') {
      query.subjectCategory = subject;
    }
    
    // ফিল্টার বাই Location (Country)
    if (country && country !== 'all') {
      query.universityCountry = country;
    }
    
    // ফিল্টার বাই Degree
    if (degree && degree !== 'all') {
      query.degree = degree;
    }
    
    const scholarships = await scholarshipsCollection
      .find(query)
      .sort({ applicationFees: 1, scholarshipPostDate: -1 })
      .toArray();
    
    res.send({ 
      success: true, 
      data: scholarships 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ 
      success: false, 
      message: 'Error fetching scholarships' 
    });
  }
});

// রুট ২: ফিল্টার অপশন পাবার জন্য
app.get('/api/scholarships/filters', async (req, res) => {
  try {
    const categories = await scholarshipsCollection.distinct('scholarshipCategory');
    const subjects = await scholarshipsCollection.distinct('subjectCategory');
    const countries = await scholarshipsCollection.distinct('universityCountry');
    const degrees = await scholarshipsCollection.distinct('degree');
    
    const filters = {
      categories: categories.filter(c => c && c.trim() !== '').sort(),
      subjects: subjects.filter(s => s && s.trim() !== '').sort(),
      countries: countries.filter(c => c && c.trim() !== '').sort(),
      degrees: degrees.filter(d => d && d.trim() !== '').sort()
    };
    
    res.send({ 
      success: true, 
      data: filters 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ 
      success: false, 
      message: 'Error fetching filter options' 
    });
  }
});

// রুট ৩: Top Scholarships পাবার জন্য (আগে থেকেই আছে, চেক করুন)
app.get('/top/scholarships', async (req, res) => {
  try {
    const topScholarships = await scholarshipsCollection
      .find({})
      .sort({ applicationFees: 1, scholarshipPostDate: -1 })
      .limit(6)
      .toArray();
    
    res.send({ 
      success: true, 
      data: topScholarships 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ 
      success: false, 
      message: 'Error fetching top scholarships' 
    });
  }
});

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Server..");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
