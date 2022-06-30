<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AnasZineddine/url-shortner">
  </a>

<h3 align="center">Url-shortner</h3>

  <p align="center">
    Hi, This is my implementation for the full-stack challenge.
    <br />
    <br />
    <a href="https://github.com/AnasZineddine/url-shortner/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnasZineddine/url-shortner/pulls">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technical-choices-and-architecture">Technical choices and architecture</a></li>
    <li><a href="#trade-offs">Trade-offs</a></li>
    <li><a href="#trade-offs">Skipped features</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Full-stack URL shortner MVP dockerized and ready to scale.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Chakra](https://chakra-ui.com/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/)
* [SWR](https://swr.vercel.app/)
* [MongoDB](https://www.mongodb.com/)
* [Prisma](https://www.prisma.io/)
* [Docker](https://www.docker.com/)
* [Nginx](https://www.nginx.com/)
* [Redis](https://redis.io/)
* [Zookeeper](https://zookeeper.apache.org/)
* [Jest](https://jestjs.io/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You only need docker installed on your machine, follow the official guidelines to install it on your machine : [Docker installation guidelines](https://docs.docker.com/get-docker/).
### Installation

After you get Docker running on your machine, to get a local copy up and running follow these simple steps:


* Clone this repository :
  ```sh
  git clone https://github.com/AnasZineddine/url-shortner
  ```

* Inside the cloned folder run :
  ```sh
  docker-compose up --build --scale api=3
  ```
Wait for all docker services to start than go to http://localhost:3000 to access the client of the app.

Don't hesitate to contact me to report any problem.
  


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* API :
	* You can access the API using the load balanced server at http://localhost:5100/
		* POST:
			* /url route: 
			with body "url" : "http://www.example.com".
		* GET: 
			* /url route:
			  with query parameter hash="shortned link" example:
			  http://localhost:5100/url?hash=29c4M
		 	* /urls route: get all shortned links with pagination:
			example : http://localhost:5100/urls?page=1&limit=20


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Technical choices and architecture -->
## Technical choices and architecture.

* Nginx 
	* Load balancer using the default **round-robin** method, you can access it at http://localhost:5100, it will distribute the requests to all servers. 
* Server :
	* Node.js Express server : for this demo we are using 3 instances of the server each server can be accessed at:
		* server 1 : http://localhost:5000
		* server 2 : http://localhost:5001
		* server 3 : http://localhost:5002
	 * Each server is rate limited for each IP of a user to 100 requests per 15 minutes.
	 * The api is paginated.
	 * [Joi](https://joi.dev/) as a data validator for all requests to the api.
* Redis:
	* Used to cache shortned and original links for performance and to decrease read/writes on the database.
* Zookeeper:
	* Centralized service used to manage the counter for each server, this counter is used to generate a unique short hash using base 62 encoding so we can avoid collision + one random character is added at the end for obfuscation.
* MongoDB:
	* I used a NoSQL database as it's highly available and easy to scale and satisfies the needs of the project.
	* I avoided using an easy hosted database on the cloud and used a local database that can be scaled to multiple replicas for demo purposes.
	* Prisma ORM for better reliability, and safety when working with the database.
* Client:
	* Nextjs : I did this choice because it is a react framework optimized for production and have my great features, you can access the client at http://localhost:3000.
		* The app is responsive.
		* Infinite scroll as pagination for fetching shortned urls.
		* internationalization ( just as bonus for the form of shortening the url, please forgive any translation errors.).
	* ChakraUI as a component library.  


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- TRADE-OFFS-->
## Trade-offs

The only trade-off I did is not enough unit and integration testing.


<!-- Skipped-features-->
## Skipped features.

* Add Graphql API endpoint.
* Kubernetes.
* DevOps.
* Gitflow.
* Follow the OWASP guidelines for REST Security.

<p align="right">(<a href="#top">back to top</a>)</p>
