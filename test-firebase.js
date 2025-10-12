// Quick Firebase connection test
const https = require('https');

const firebaseConfig = {
  apiKey: "AIzaSyChM0Tmrj_K_SJd4IqQBlOfzDC61xMFguU",
  authDomain: "naturenet-testing.firebaseapp.com",
  databaseURL: "https://naturenet-testing.firebaseio.com",
  projectId: "naturenet-testing"
};

// Test 1: Check if API key is valid by testing Firebase Auth REST API
const testAuthEndpoint = () => {
  return new Promise((resolve, reject) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
    
    const postData = JSON.stringify({
      email: 'test@example.com',
      password: 'testpassword123',
      returnSecureToken: true
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 400) {
          const response = JSON.parse(data);
          if (response.error && response.error.message === 'INVALID_API_KEY') {
            resolve({ valid: false, message: 'API Key is INVALID or has been revoked' });
          } else {
            // Any other error means the API key is valid (e.g., EMAIL_EXISTS, WEAK_PASSWORD, etc.)
            resolve({ valid: true, message: 'API Key is VALID and functional', details: response });
          }
        } else if (res.statusCode === 200) {
          resolve({ valid: true, message: 'API Key is VALID (signup succeeded)', details: JSON.parse(data) });
        } else {
          resolve({ valid: true, message: `API Key appears valid (HTTP ${res.statusCode})`, details: data });
        }
      });
    });
    
    req.on('error', (error) => reject(error));
    req.write(postData);
    req.end();
  });
};

// Test 2: Check Firebase Database access
const testDatabaseEndpoint = () => {
  return new Promise((resolve, reject) => {
    const url = `${firebaseConfig.databaseURL}/.json`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 401) {
          resolve({ accessible: false, message: 'Database requires authentication (this is GOOD - security rules are active)' });
        } else if (res.statusCode === 200) {
          resolve({ accessible: true, message: 'Database is accessible', hasData: data !== 'null' });
        } else {
          resolve({ accessible: false, message: `Database returned HTTP ${res.statusCode}` });
        }
      });
    }).on('error', (error) => reject(error));
  });
};

// Run tests
console.log('🔥 Testing Firebase Configuration...\n');
console.log('Project:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('Database URL:', firebaseConfig.databaseURL);
console.log('\n' + '='.repeat(60) + '\n');

Promise.all([testAuthEndpoint(), testDatabaseEndpoint()])
  .then(([authResult, dbResult]) => {
    console.log('📝 TEST RESULTS:\n');
    
    console.log('1️⃣  Firebase Auth API:');
    console.log('   Status:', authResult.valid ? '✅ WORKING' : '❌ FAILED');
    console.log('   Message:', authResult.message);
    if (authResult.details) {
      console.log('   Details:', JSON.stringify(authResult.details).substring(0, 100) + '...');
    }
    
    console.log('\n2️⃣  Firebase Database:');
    console.log('   Status:', dbResult.accessible ? '⚠️  OPEN ACCESS' : '✅ PROTECTED');
    console.log('   Message:', dbResult.message);
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    if (authResult.valid) {
      console.log('✅ CONCLUSION: Your Firebase API key is ACTIVE and FUNCTIONAL');
      console.log('\n⚠️  SECURITY RECOMMENDATION:');
      console.log('   Since this key was exposed in your source code, you should:');
      console.log('   1. Go to Firebase Console > Project Settings > General');
      console.log('   2. Regenerate your Web API Key');
      console.log('   3. Update src/environments/environment.ts with the new key');
      console.log('   4. Configure Firebase Security Rules to restrict access');
    } else {
      console.log('❌ CONCLUSION: Your Firebase API key is INVALID or REVOKED');
      console.log('   You need to get a new API key from Firebase Console');
    }
    
    console.log('\n');
  })
  .catch(error => {
    console.error('❌ Error testing Firebase:', error.message);
  });

