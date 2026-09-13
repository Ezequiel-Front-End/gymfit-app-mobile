const https = require('https');

https.get('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const exercises = JSON.parse(data);
    console.log(JSON.stringify(exercises.slice(0, 3), null, 2));
  });
});
