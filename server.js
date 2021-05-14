const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const express = require('express');
const app = express();
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'VodafoneApiDynamoDb';
const { v4: uuidv4 } = require('uuid');
const port = 3000;


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/app', (req, res) => {

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

});

