This project is a docker application of a simple CRUD node app with express and the following containers: mongodb redis and nginx. 
Mongodb provides storage of user data.

Redis provides session caching with stickiness using session cookies. A middleware is implemented to ensure only logged-in users can access the CRUD API

Nginx provides loadbalancing (reverse proxy) for client requests to multiple instances of the node app after a scaling event

Docker Swarm is used to orchestrate multiple services in this project. Specifically, it provided service replication and update policy for managing the containers