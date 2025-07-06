const mongoose = require('mongoose');
const Category = require('./src/models/Category');

// Replace with your MongoDB URI
const MONGO_URI = process.env.DATABASE_URL

const predefinedCategories = [
  { type: 'Travelling', isCustom: false },
  { type: 'Healthcare', isCustom: false },
  { type: 'Utilities', isCustom: false },
  { type: 'Shopping', isCustom: false },
  { type: 'Education', isCustom: false },
  { type: 'Food', isCustom: false },
];

async function seedCategories() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    const existing = await Category.find({ type: { $in: predefinedCategories.map(c => c.type) } });
    if (existing.length > 0) {
      console.log('Some or all categories already exist. Skipping...');
    } else {
      await Category.insertMany(predefinedCategories);
      console.log('Categories seeded successfully');
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding failed:', err);
    mongoose.disconnect();
  }
}

seedCategories();
