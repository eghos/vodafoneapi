const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const express = require('express');
const app = express();
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'vodafoneapi';
const { v4: uuidv4 } = require('uuid');
const port = 3000;
var router = express.Router();
var bodyParser = require('body-parser'); 


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/api', (req, res) => {

    var ts = Date.now()
    var params = {
        TableName: tableName,
        Item: {
            id: uuidv4(),
            created_at: ts/1000
        }
    };

    client.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item.");
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }

       
    });

    res.send[params]; 
});


app.get('/item', (req, res) => {
    var params = {
        TableName: tableName
    };

    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]['created_at']);

            res.contentType = 'application/json';
            res.send(items);
        }
    });
    
});
