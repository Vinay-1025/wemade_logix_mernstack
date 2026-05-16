const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Seed Superadmin
    const superAdminEmail = 'vinaysriramgavara9@gmail.com';
    const superAdminExists = await User.findOne({ email: superAdminEmail });

    if (!superAdminExists) {
      await User.create({
        name: 'Vinay Sriram',
        email: superAdminEmail,
        password: 'VinaySriram_gav',
        role: 'superadmin',
      });
      console.log('Superadmin created: vinaysriramgavara9@gmail.com');
    }

    // 2. Seed Admin
    const adminEmail = 'admin@wemadelogix.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      await User.create({
        name: 'Wemade Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created');
    }

    // 3. Seed Student
    const studentEmail = 'student@wemadelogix.com';
    const studentExists = await User.findOne({ email: studentEmail });

    if (!studentExists) {
      await User.create({
        name: 'Wemade Student',
        email: studentEmail,
        password: 'student123',
        role: 'student',
      });
      console.log('Student user created');
    }

    console.log('Seeding completed successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
