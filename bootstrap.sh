#!/usr/bin/env bash

set -e # Exit script immediately on first error.
set -x # Print commands and their arguments as they are executed.

###################################################################################################################
# install add-apt-repository cmd as described at: http://askubuntu.com/questions/38021/how-to-add-a-ppa-on-a-server
###################################################################################################################
sudo apt-get -y install python-software-properties
sudo apt-get -y install software-properties-common

############################################################################################################
# install Oracle JDK as described at: http://stackoverflow.com/questions/16263556/installing-java7-on-ubuntu
############################################################################################################
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
# turn off license promts as described at: http://askubuntu.com/questions/190582/installing-java-automatically-with-silent-option
echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
sudo apt-get -y install oracle-java7-installer
sudo apt-get -y install oracle-java7-set-default

# install nodejs and npm.  NOTE: because of a naming conflict, you run node with 'nodejs' not 'node'
apt-get update -y
sudo apt-get -y install nodejs
sudo apt-get -y install npm

# install neo4j as described @ http://www.neo4j.org/download/linux
sudo -s
wget -O - http://debian.neo4j.org/neotechnology.gpg.key | apt-key add -
echo 'deb http://debian.neo4j.org/repo stable/' > /etc/apt/sources.list.d/neo4j.list
apt-get update -y
apt-get install neo4j -y

# adjust neo4j configuration to allow connections from remote machines (ie. from the mac)
sudo service neo4j-service stop
sudo sed 's/^\#org.neo4j.server.webserver.address/org.neo4j.server.webserver.address/' </etc/neo4j/neo4j-server.properties >$HOME/neo4j_config
sudo rm -f /etc/neo4j/neo4j-server.properties
sudo mv $HOME/neo4j_config /etc/neo4j/neo4j-server.properties
sudo service neo4j-service start

####################################################
# install npm packages; restify and the neo4j driver
####################################################
cd /vagrant
npm install restify
# https://github.com/thingdom/node-neo4j
npm install neo4j
