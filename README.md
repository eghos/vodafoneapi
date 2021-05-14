## Name

Simple api that creates timestamp in Dynamo DB table.

## Description

The api is written in nodeJS with api methods provided by ExpressJS library. Other requirements are AWS SDK and  UUID module for creating unique IDs. 
The application when deployed runs from auto-scaled EC2 instances in AWS in a public subnet for the sake of this exercise. The api is served on port 80 via NGINX which proxy_passes th request to the application on port 3000. On deployment Forever daemon is used to start the api. 


## Deployment
Before deployment, you may need to change some variables: the aws region you are deploying to and the port number you wish to use.
The application is actually deployed using ansible. The ansible code can be found in the url below:
https://github.com/eghos/vodafoneansible
The code updates the instances, installs epel repository and uninstalls apache server because it interferes with port 80, which is what NGINX is configured to use (note that this could be port 8080 as well). It then installs NGINX and copies over its configuration files. Pulls  down the api code from this repo and then runs npm install which then looks at package.json to install the dependencies - AWS SDK, Express module and UUID. Forever daemon starts the app and the api can then be called at : 

` curl -X POST http://<instance_ip_address>/app `


## Usage

Once the installation is complete, the api post request can then be made. On making api post request, the request triggers a post method with parameters being the api path (/app) and a callback function where  parameters for the database are defined. Those parameters are then used in a put method that injects the values into the database table. The dynamo DB table has two attributes: "id" which is a random string and  hask key; and "created_at", which is a timestamp(a number) and sort key.

## Contribution

Contributions are welcome. 

## License 

Vodafone
