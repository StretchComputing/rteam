=====
rTeam
=====
rTeam is a service for IT professionals that is curated by the rTeam Coop.  Key services are:

	Portfolio Now
	-------------
	Build your interactive portfolio and then decide: who views it, when it is viewed, and for how long.

	Connect Me
	----------
	Connect to a fellow rTeam member to initiate meaningful collaboration. Connections are direct, personal and interactive.


	architecture
	------------
	* rTeam in a node.js application with a neo4j graph database.
	* Mobile app is implemented with HTML5, backbone and jQuery mobile.
	* Mobile app interfaces with the rTeam service via a REST API.
	*


==========
developers
==========
1. clone the rTeam github repository:  git clone git@github.com:StretchComputing/rteam.git
2. Install VirtualBox (if not already installed)
3. Install vagrant (see resources below).
4. In the rTeam home directory, provision the rTeam vagrant VM:  vagrant up
   - the vagrant vm is built on top of saucy64 -- a 64 bit server version of Linux (13.x)
   - vagrant supports directory sharing.  The home directory of rTeam on your host machine is mapped to /vagrant on the guest vm
   - the vagrant vm is configured to forware port 5555 on the host to port 8888 on the guest.
   - the vagrant vm is configured with IP address:  192.168.55.55
5. To access the rTeam VM, ssh in:  vagrant ssh  (in the home directory of rTeam project on the host machine)
6. Install/update packages via package.json.  Go to directory /vagrant, run: npm install.
7. To run rTeam, do the following:
   - vagrant ssh
   - neo4j should already be running.  you can verify via:  sudo service neo4j-service status
   - to restart neo4j:  sudo service neo4j-service restart
   - go to the shared directory: cd /vagrant
   - start the server: ./runNode.sh  (node.js is configured to listen to port 8888 and will run until you hit cntrl-C)
     NOTE: to run directly via the command line: nodejs index.js
8. From the host machine, node.js can be accessed in two ways:
   - http://localhost:5555  (via port forwarding)
   - http://192.168.55.55   (via IP address of rTeam vm)
9. rTeam has a hello world API that can test your installation
   - from the host machine, enter URL in browser:  192.168.55.55:8888/hello/world
   - plain text "hello world" should be displayed
10. Access the neo4j web interface at http://192.168.55.55:7474. Allows queries and browsing of graph database
    blog post and help:  http://blog.neo4j.org/2013/10/neo4j-200-m06-introducing-neo4js-browser.html

=========
resources
=========
0. Vagrant Getting Started:  http://docs.vagrantup.com/v2/getting-started/index.html
a. used node-neo4j-template as an initial example:  https://github.com/aseemk/node-neo4j-template
b. discussion on why the node-neo4j driver is best used with Cyber:  https://groups.google.com/forum/#!topic/node-neo4j/pVWT_8HsRVY
c. restify documentation: http://mcavage.me/node-restify/
d. neo4j manual: http://docs.neo4j.org/chunked/stable/index.html
e. site describing various node project structures:  https://gist.github.com/viatropos/1398757

