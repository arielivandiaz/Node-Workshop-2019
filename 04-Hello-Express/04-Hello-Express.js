const express = require('express');
const app = express();

app.get('/', (request, respose) => {

    respose.send('Hello World!');

});

app.listen(3000, () => {

    setTimeout(() => {    console.log('\n Node Workshop'); }, 1000);

    console.log('\nExample app listening on  http://localhost:3000/ !');
          
});




