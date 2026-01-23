const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://basha:king@basha.vrlvzbl.mongodb.net/HostelManagement';

console.log("Attempting to connect to MongoDB...");

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connection SUCCESSFUL!');
        console.log('Your IP address is whitelisted and the database is accessible.');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection FAILED.');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);

        if (err.message.includes('bad auth')) {
            console.error('\nPOSSIBLE CAUSE: Incorrect Username or Password.');
        } else if (err.cause && err.cause.code === 'ENOTFOUND') {
            console.error('\nPOSSIBLE CAUSE: No Internet connection or DNS issue.');
        } else {
            console.error('\nPOSSIBLE CAUSE: API WHITELIST ISSUE.');
            console.error('Your current public IP might not be allowed in MongoDB Atlas.');
            console.error('Please go to MongoDB Atlas -> Network Access -> Add IP Address -> Add Current IP Address.');
        }
        process.exit(1);
    });
