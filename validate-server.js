const fs = require('fs');
const https = require('https');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

async function fetchSchema(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch schema: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function validate() {
  try {
    // Read server.json
    const serverJson = JSON.parse(fs.readFileSync('server.json', 'utf8'));
    const schemaUrl = serverJson.$schema;
    
    if (!schemaUrl) {
      console.error('❌ Error: No $schema field in server.json');
      process.exit(1);
    }
    
    console.log(`📥 Fetching schema from: ${schemaUrl}`);
    const schema = await fetchSchema(schemaUrl);
    
    console.log('🔍 Validating server.json against schema...');
    const ajv = new Ajv({ 
      allErrors: true, 
      verbose: true,
      strict: false, // Allow additional keywords like "example"
      validateSchema: false // Don't validate the schema itself
    });
    addFormats(ajv);
    
    const validate = ajv.compile(schema);
    const valid = validate(serverJson);
    
    if (!valid) {
      console.error('❌ Validation failed:\n');
      validate.errors.forEach(err => {
        console.error(`  ${err.instancePath || '/'}: ${err.message}`);
        if (err.params) {
          console.error(`    ${JSON.stringify(err.params)}`);
        }
      });
      process.exit(1);
    }
    
    console.log('✅ server.json is valid!');
    console.log(`\n📦 Server: ${serverJson.name}`);
    console.log(`📌 Version: ${serverJson.version}`);
    console.log(`📚 Packages: ${serverJson.packages?.length || 0}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

validate();

