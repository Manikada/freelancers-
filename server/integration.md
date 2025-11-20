Week 8: Jenkins Automation

Hands-on practice on manual creation of Jenkins pipeline using Maven projects from Github 

Create the job and build the pipeline for maven-java and maven-web project.

Questions on Jenkins

Upload the Screenshots.



Steps for MavenJava Automation:

Maven Java Automation Steps:

&nbsp;Step 1: Open Jenkins (localhost:8080)

&nbsp;  	 ├── Click on "New Item" (left side menu

Step 2: Create Freestyle Project (e.g., MavenJava\_Build)

&nbsp;       	├── Enter project name (e.g., MavenJava\_Build)

&nbsp;       	├── Click "OK"

└── Configure the project:

&nbsp;           		├── Description: "Java Build demo"

&nbsp;           		├── Source Code Management:

&nbsp;           			└── Git repository URL: \[GitMavenJava repo URL]

&nbsp;           		├── Branches to build: \*/Main   or  \*/master

&nbsp; 		└── Build Steps:

&nbsp;              	     ├── Add Build Step -> "Invoke top-level Maven targets"

&nbsp;                 		└── Maven version: MAVEN\_HOME

&nbsp;                		└── Goals: clean

&nbsp;               	├── Add Build Step -> "Invoke top-level Maven targets"

&nbsp;               		└── Maven version: MAVEN\_HOME

&nbsp;               		└── Goals: install

&nbsp;               	└── Post-build Actions:

&nbsp;                   	       ├── Add Post Build Action -> "Archive the artifacts"

&nbsp;                   			└── Files to archive: \*\*/\*

&nbsp;                   	     ├── Add Post Build Action -> "Build other projects"

&nbsp;                   			└── Projects to build: MavenJava\_Test

&nbsp;                   			└── Trigger: Only if build is stable

&nbsp;                   	     └── Apply and Save





&nbsp;   └── Step 3: Create Freestyle Project (e.g., MavenJava\_Test)

&nbsp;       	├── Enter project name (e.g., MavenJava\_Test)

&nbsp;       	├── Click "OK"

&nbsp;             └── Configure the project:

&nbsp;            ├── Description: "Test demo"

&nbsp;            ├── Build Environment:

&nbsp;           		└── Check: "Delete the workspace before build starts"

&nbsp;           ├── Add Build Step -> "Copy artifacts from another project"

&nbsp;           		└── Project name: MavenJava\_Build

&nbsp;           		└── Build: Stable build only  // tick at this

&nbsp;           		└── Artifacts to copy: \*\*/\*

&nbsp;           ├── Add Build Step -> "Invoke top-level Maven targets"

&nbsp;           		└── Maven version: MAVEN\_HOME

&nbsp;           		└── Goals: test

&nbsp;           		└── Post-build Actions:

&nbsp;               ├── Add Post Build Action -> "Archive the artifacts"

&nbsp;               	└── Files to archive: \*\*/\*

&nbsp;               	└── Apply and Save



&nbsp;   └── Step 4: Create Pipeline View for Maven Java project

&nbsp;       ├── Click "+" beside "All" on the dashboard

&nbsp;       ├── Enter name: MavenJava\_Pipeline

&nbsp;       ├── Select "Build pipeline view"         // tick here

&nbsp;        |--- create

&nbsp;       └── Pipeline Flow:

&nbsp;           ├── Layout: Based on upstream/downstream relationship

&nbsp;           ├── Initial job: MavenJava\_Build

&nbsp;           └── Apply and Save OK



&nbsp;   └── Step 5: Run the Pipeline and Check Output

&nbsp;       ├── Click on the trigger to run the pipeline

&nbsp;       ├── click on the small black box to open the console to check if the build is success

&nbsp;           Note : 

If build is success and the test project is also automatically triggered with name       

&nbsp;                     “MavenJava\_Test”

The pipeline is successful if it is in green color as shown ->check the console of the test project

The test project is successful and all the artifacts are archived successfully

II. Maven Web Automation Steps:

└── Step 1: Open Jenkins (localhost:8080)

&nbsp;   ├── Click on "New Item" (left side menu)

&nbsp;   

&nbsp;   └── Step 2: Create Freestyle Project (e.g., MavenWeb\_Build)

&nbsp;       ├── Enter project name (e.g., MavenWeb\_Build)

&nbsp;       ├── Click "OK"

&nbsp;       └── Configure the project:

&nbsp;           ├── Description: "Web Build demo"

&nbsp;           ├── Source Code Management:

&nbsp;           		└── Git repository URL: \[GitMavenWeb repo URL]

&nbsp;           ├── Branches to build: \*/Main or master

&nbsp;           └── Build Steps:

&nbsp;               ├── Add Build Step -> "Invoke top-level Maven targets"

&nbsp;               	└── Maven version: MAVEN\_HOME

&nbsp;               	 └── Goals: clean

&nbsp;               ├── Add Build Step -> "Invoke top-level Maven targets"

&nbsp;               	└── Maven version: MAVEN\_HOME

&nbsp;               	└── Goals: install

&nbsp;               └── Post-build Actions:

&nbsp;                   ├── Add Post Build Action -> "Archive the artifacts"

&nbsp;                  	 └── Files to archive: \*\*/\*

&nbsp;                   ├── Add Post Build Action -> "Build other projects"

&nbsp;                   	└── Projects to build: MavenWeb\_Test

&nbsp;                   	└── Trigger: Only if build is stable

&nbsp;                   └── Apply and Save



&nbsp;   └── Step 3: Create Freestyle Project (e.g., MavenWeb\_Test)

&nbsp;       ├── Enter project name (e.g., MavenWeb\_Test)

&nbsp;       ├── Click "OK"

&nbsp;       └── Configure the project:

&nbsp;           ├── Description: "Test demo"

&nbsp;           ├── Build Environment:

&nbsp;           		└── Check: "Delete the workspace before build starts"

&nbsp;           ├── Add Build Step -> "Copy artifacts from another project"

&nbsp;           		└── Project name: MavenWeb\_Build

&nbsp;           		└── Build: Stable build only

&nbsp;           		└── Artifacts to copy: \*\*/\*

&nbsp;           ├── Add Build Step -> "Invoke top-level Maven targets"

&nbsp;          		└── Maven version: MAVEN\_HOME

&nbsp;           		└── Goals: test

&nbsp;           └── Post-build Actions:

&nbsp;               ├── Add Post Build Action -> "Archive the artifacts"

&nbsp;               	└── Files to archive: \*\*/\*

&nbsp;               ├── Add Post Build Action -> "Build other projects"

&nbsp;               	└── Projects to build: MavenWeb\_Deploy

&nbsp;               └── Apply and Save



&nbsp;   └── Step 4: Create Freestyle Project (e.g., MavenWeb\_Deploy)

&nbsp;       ├── Enter project name (e.g., MavenWeb\_Deploy)

&nbsp;       ├── Click "OK"

&nbsp;       └── Configure the project:

&nbsp;           ├── Description: "Web Code Deployment"

&nbsp;           ├── Build Environment:

&nbsp;           		└── Check: "Delete the workspace before build starts"

&nbsp;           ├── Add Build Step -> "Copy artifacts from another project"

&nbsp;           		└── Project name: MavenWeb\_Test

&nbsp;           		└── Build: Stable build only

&nbsp;              	└── Artifacts to copy: \*\*/\*

&nbsp;           └── Post-build Actions:

&nbsp;               ├── Add Post Build Action -> "Deploy WAR/EAR to a container"

&nbsp;  └── WAR/EAR File: \*\*/\*.war

&nbsp;  └── Context path: Webpath

&nbsp;└── Add container -> Tomcat 9.x remote

└── Credentials: Username: admin, Password: 1234

── Tomcat URL: https://localhost:8085/

&nbsp;               └── Apply and Save



&nbsp;   └── Step 5: Create Pipeline View for MavenWeb

&nbsp;       ├── Click "+" beside "All" on the dashboard

&nbsp;       ├── Enter name: MavenWeb\_Pipeline

&nbsp;       ├── Select "Build pipeline view"

&nbsp;       └── Pipeline Flow:

&nbsp;           ├── Layout: Based on upstream/downstream relationship

&nbsp;           ├── Initial job: MavenWeb\_Build

&nbsp;           └── Apply and Save



&nbsp;   └── Step 6: Run the Pipeline and Check Output

&nbsp;       ├── Click on the trigger “RUN” to run the pipeline

&nbsp;           Note: 

After Click on Run -> click on the small black box to open the console to check if the build is success

Now we see all the build has  success if it appears in green color

&nbsp;       ├── Open Tomcat homepage in another tab

&nbsp;       ├── Click on the "/webpath" option under the manager app

&nbsp;              Note:

&nbsp;It ask for user credentials for login ,provide the credentials of tomcat.

It provide the page with out project name which is highlighted.

After clicking on our project we can see output.











###### **Week9:**













**Week 9: Pipeline Creation using script** 

**Evaluation of Jenkins pipeline.**

**WORKING ON BUILD TRIGGERS FOR LAST JENKINS PIPILINE**

**Hands-on practice on creation of scripted Jenkins pipeline.**

**Take  the screenshots for above task** 





**Procedure**

**General :**

 	**Description :-  provide the description of the project**

	**Build triggers:  here we can provide with build triggers of you choice**

**Advance project option:**

	**Definition:** 

		**Choose pipeline script**

 

**Here code for pipeline -script**

	

**Copy the code there**

**-------------------------------------------------------------------------------------------------------------------------**

**pipeline {**

**agent any  // Agent: Defines the machine (or slave) that runs the tasks** 

   **tools{**

        **maven 'MAVEN-HOME'**

    **}**

    **stages {         //The script is divided into stages, each representing a specific step, like building,**

        **stage('git repo \& clean') {**

            **steps {**

                **//bat "rmdir  /s /q mavenjava"**

                **bat "git clone provide your github link"**

                **bat "mvn clean -f mavenjava"**

            **}**

        **}**

        **stage('install') {**

            **steps {**

                **bat "mvn install -f mavenjava" #project name#**

            **}**

        **}**

        **stage('test') {**

            **steps {**

                **bat "mvn test -f mavenjava"**

            **}**

        **}**

        **stage('package') {**

            **steps {**

                **bat "mvn package -f mavenjava"**

            **}**

        **}**

    **}**

**}**





WEEK10:
---









Step 2: Download Minikube

Open a PowerShell or Command Prompt with administrator privileges.

Download the latest Minikube executable using this command:

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-installer.exe

Install Minikube by running the installer:

.\\minikube-installer.exe



Step 3: Add Minikube to PATH

If Minikube is not automatically added to your PATH during installation:

Open System Properties → Environment Variables.

Add the directory where Minikube is installed (e.g., C:\\Program Files\\Minikube) to your PATH variable.







Step 4: Start Minikube

Open a terminal (PowerShell or CMD). Do the following commands

Start Minikube with a specified driver (e.g., Hyper-V, Docker, or VirtualBox). For example:

Hyper-V: 

minikube start --driver=hyperv

Docker: 

minikube start --driver=docker

Verify Minikube is running:

minikube status



Step 5: Interact with Minikube



kubectl is a command-line tool used in Kubernetes to interact with and manage Kubernetes clusters.

Once Minikube is running:

Use kubectl to interact with the cluster.

Install kubectl if not already installed: 

minikube kubectl -- get pods -A

Or download it separately from the official Kubernetes site.

Open the Minikube dashboard (optional):

minikube dashboard



Optional: Check Your Installation

Run the following to verify the installation:

Minikube version

&nbsp;	kubectl version --client



Troubleshooting

If Minikube fails to start:

Ensure your hypervisor (Hyper-V/Docker/VirtualBox) is installed and running.

Check the Minikube logs: 

minikube logs

Updating Minikube:

minikube update-check

minikube update

Minikube Automation Steps

Step 1: Start Minikube Cluster

Open your terminal and run the command:

minikube start

Step 2: Create and Manage Deployment

Create  an application in Kubernetes:





Command:

kubectl create deployment mynginx --image=nginx



if already created then 



kubectl set image deployment/myngnix nginx=nginx:latest





Verify the deployment using: Kubernetes responds by showing you a list that includes the names of your deployment groups

kubectl get deployments

Ensure mynginx appears in the output.

Check the following commands:

kubectl get pods

kubectl describe pods

Expose Deployment as a Service:

Command:

kubectl expose deployment mynginx --type=NodePort --port=80 --target-port=80

Step 3: Scale the Deployment

Command:Scales the Nginx deployment to 4 replicas (pods).

kubectl scale deployment mynginx --replicas=4

kubectl get service myngnix

Step 4: Access the Nginx App

Using Port Forwarding:

Command:

kubectl port-forward svc/mynginx 8081:80



Access the app via http://localhost:8081.

If Error, use this option, Using Minikube Tunnel:

Start the tunnel:

minikube tunnel

Retrieve the service URL:

minikube service mynginx --url

Open the provided URL in your browser.

Open the kubernets dashboard

Open the minikube dashboard	

Minikube dashboard

Step 5: Stop and Clean Up

Stop Nginx Deployment:

Commands:

kubectl delete deployment mynginx

kubectl delete service mynginx

Stop Minikube (Optional):

Command:

minikube stop

Delete Minikube Cluster (Optional):

Command:minikube delete

Nagios Automation Steps

Step 1: Pull the Nagios Docker Image

Open a terminal and run:

docker pull jasonrivers/nagios:latest

Step 2: Run Nagios

Command:

docker run --name nagiosdemo -p 8888:80 jasonrivers/nagios:latest

Step 3: Access Nagios Dashboard

Open your browser and navigate to:

http://localhost:8888

Login Credentials:

Username: nagiosadmin

Password: nagios

Once logged in, explore:

Hosts: View systems being monitored.

Services: Check tasks being monitored (e.g., CPU usage).

Alerts: Access recent notifications.

Step 4: Monitoring Host Details

Navigate to the Host Information Page:

Select a host from the Hosts menu.

Key Details:

Host Status: Indicates if the system is UP or DOWN.

Metrics: View CPU usage, memory status, and network activity.

Actions: Reschedule checks, disable notifications, or schedule downtime.

Step 5: Stop and Remove Nagios

Stop the Container:

Command:

docker stop nagiosdemo

Delete the Container:

Command:

docker rm nagiosdemo

Remove the Image (Optional):

List images:

docker images

Delete the Nagios image:

docker rmijasonrivers/nagios:latest



&nbsp;Observe the docker containers in DockerHub, we can see the latest Nagios Installed running on port:8888






week11:
---









WEEK 11

Working on windows 11

Exercise 1: Jenkins CI/CD  using Git Webhook

Step-1: To install ngroks Go->settings->privacy and security -> windows security -> off antivirus ->





Step-2:Go -> https://ngrok.com and signup by giving your name ,email and password of atleast 10 charcaters









Step-3: After sign in up ,it will show below screen with your name in the top left  .now click on download for windows (64Bit) to download ngork







Step4:After downloading ,Extract the file and click on ngrok.exe







Ngrok command prompt appears as below





Step-5:Connect Your ngrok Account (optional but useful)

Go to ngrok gives you an auth token.

Then go to your Authtoken click here 

&nbsp;  				Copy  your Authtoken 









CREATE AUTHENTICATOR \[https://dashboard.ngrok.com/get-started/your-authtoken]

Run this command in ngrok command prompt:(replace <your\_token> with yours):



ngrok config add-authtoken <your\_token>  // syntax: 

Example command 

ngrok config add-authtoken 34ejJvRYKqtjvBUEYEnxudIbpb7\_33i6pYx8BJ2cZ1TpwasWq









Step-6

Start a Tunnel for Jenkins

Check on which port  is your Jenkins running . for this give in browers or url localhost:8081

For me Jenkins is running on 8081

Go to ngrok command prompt and type below command 

ngork http 8081    //Always use this  command to start a tunnel for jenkins . 



Type in ngrok command prompt:



Next it shows this public jenkins URL generated by ngrok that can be pasted into github repo for Webhooks.









Copy this URL only highlighted part







Step-7: Configure Webhook in GitHub

Go to your GitHub repository.

Navigate to Settings → Webhooks.

Click “Add webhook”.

In the Payload URL field:

Enter the Jenkins webhook URL in the format:

http://<jenkins-server-url>/github-webhook/

Ex:  https://unhired-stormily-alaine.ngrok-free.dev/github-webhook/



Note: If Jenkins is running on localhost, GitHub cannot access it directly



























Step-8: 

Add url https://unhired-stormily-alaine.ngrok-free.dev/github-webhook/

Set content Type to application/json

Under “Which events would you like to trigger this webhook?”, select:

Just the push event.

Click “Add webhook” to save.



















&nbsp;Step 10: Configure Jenkins to Accept GitHub Webhooks

Open Jenkins Dashboard.



















Select the job (freestyle or pipeline) you’ve already created.





Click Configure.

Scroll down to the Build Triggers section.

Check the box: ✅GitHub hook trigger for GITScm polling



Click Save.



&nbsp;Step 11: Test the Setup

Make any code update in your local repo and push it to GitHub.

Once pushed, GitHub will trigger the webhook.

Jenkins will automatically detect the change and start the build pipeline.

&nbsp; 



outcome

You’ve successfully connected GitHub and Jenkins using webhooks.

Every time you push code to GitHub, Jenkins will automatically start building your project without manual intervention.



EXCERCISE-2



Setting Up   Jenkins Email Notification Setup (Using Gmail with App Password)

Creation of app password

1\. Gmail: Enable App Password (for 2-Step Verification)

i. Go to: https://myaccount.google.com

ii. Enable 2-Step Verification

Navigate to:

Security → 2-Step Verification

Turn it ON

Complete the OTP verification process (via phone/email)

iii. Generate App Password for Jenkins

Go to:

Security → App passwords

Select:

App: Other (Custom name)

Name: Jenkins-Demo

Click Generate

Copy the 16-digit app password

Save it in a secure location (e.g., Notepad)

&nbsp;                2.  Jenkins Plugin Installation

i. Open Jenkins Dashboard

ii. Navigate to:

Manage Jenkins → Manage Plugins

iii. Install Plugin:

Search for and install:

Email Extension Plugin



3\. Configure Jenkins Global Email Settings

i. Go to:

Manage Jenkins → Configure System



A. E-mail Notification Section

Field

Value

SMTP Server

smtp.gmail.com

Use SMTP Auth

✅ Enabled

User Name

Your Gmail ID (e.g., archanareddykmit@gmail.com)

Password

Paste the 16-digit App Password # my password#  rpxp pbjb svjc qked



Use SSL

✅ Enabled

SMTP Port

465

Reply-To Address

Your Gmail ID (same as above)



➤ Test Configuration

Click: Test configuration by sending test e-mail

Provide a valid email address to receive a test mail

✅ Should receive email from Jenkins



B. Extended E-mail Notification Section

Field

Value

SMTP Server

smtp.gmail.com

SMTP Port

465

Use SSL

✅ Enabled

Credentials

Add Gmail ID and App Password as Jenkins credentials

Default Content Type

text/html or leave default

Default Recipients

Leave empty or provide default emails

Triggers

Select as per needs (e.g., Failure)





4\.  Configure Email Notifications for a Jenkins Job

i. Go to:

Jenkins → Select a Job → Configure



ii. In the Post-build Actions section:

Click: Add post-build action → Editable Email Notification

A. Fill in the fields:

Field

Value

Project Recipient List

Add recipient email addresses (comma-separated)

Content Type

Default (text/plain) or text/html

Triggers

Select events (e.g., Failure, Success, etc.)

Attachments

(Optional) Add logs, reports, etc.





iii. Click Save



&nbsp;Now your Jenkins job is set up to send email notifications based on the build status!



Takeaway :

Students learned how to integrate Jenkins with GitHub using webhooks to automate build triggers and configure email notifications to monitor build success or failure effectively.





**WEEk12:**









	**WEEK-12**



**1** DEPLOYMENT OF INDEX.HTML USING EC2 INSTANCE in AWS

Step 1: Login to AWS /canvas account	

Go to course invitation mail and click on start

Opens the aws academy, select the student login and enter the email and password details 

Click on Modules

Scroll down and select Lunch AWS Academy Lab-

Click on start Lab and wait AWS      becomes from red to green AWS









Click on AWS





Step 2: Click on EC2 to create instance





Click on Launch Instance





Stage 1  --Name (Giving name to the machine) ubuntu 

&nbsp;      Stage 2  -- Select AMI  ( Note: Select free tier eligible ) ubuntu server

Give name and select ubuntu under application



Select this free tier option of Ubuntu from here



Stage 3   --  Architecture as 64-bit	

Make sure AMI and Architecture are there as shown



Stage 4  --  Instance type ----  t2.micro(default 1 CPU,1 GB RAM)



Stage 5  --  Create a new keypair---a keypair will downloaded  with extension .pem

&nbsp;                             Store key in folder AWS

First Click on create-new key pair





Give KeyPair name and click on create key pair





Save the .pem file in folder AWS on desktop

Stage 6  -- Network Setting ----Create Security group  --  ( It deals with ports )

(Note for understanding We have 0 to 65535 ports. Every port is dedicated to special purpose)		

HERE select https and http (which allow to load your web pages while execution)

In network setting check all the checkboxes 





Stage 7 -- Storage - 8GB ( Observation - we have root - it is same as C Drive) it default 8 GB



Stage 8 --- click on launch instance



Now click on the instances





Wait for the Success message to apper in green color



You can see MyExampleWebServer is Running and wait for it to initialize





You have to get 2 tests passes. 

Important:---- Now check the box and click on connect.

Do this step:---once it is created select that instance 

(Tick in checkbox) and click on connect





Thus your EC2 instance is running on server. 



Step 4: Now you can connect local system to server (EC2 instance) using secure shell SSH.





For this, Here copy the ssh – i command from SSH client connect tab and paste later

Next We can use powershell /gitbash /webconsole in administrative mode, to connect to ubuntu machine.

Step a: Copy the path of .pem file that you saved earlier in folder AWS eg.  as here D:\\SUNNY\\SELABWEB\\AWS

&nbsp;



Step b: Open Powershell in administrative mode and navigate to that path. 

Type:   cd < path> 

eg. cd D:\\SUNNY\\SELABWEB\\AWS here specify your .pem path







Step c: Go to SSh and copy the command ssh which is present at the below





Note: To connect to above terminals we need to go into the path of the keypair.and 

paste  the   ssh -i command from the aws console

Step d: Run the pasted ssh -i command in the terminal







Step 5: Run the following commands to install s/w

Update all softwares in Ubuntu by command

sudo apt update







Install docker by command

sudo apt-get install docker.io





Install git by command

sudo apt install git







Install nano( text editor) by command

Sudo apt install nano







Step 6: Now we want to create an application, push it into git, create docker image of it and run it



Step a: Create basic index.html file in folder Example and save it







Step b: Open git Bash in folder Example by right clicking with mouse







Step c: In git bash run the following commands

git init

git add .

Git commit –m “first commit”





Step d: Create git repository (here with name AWS)





Step e: Copy command one by one from above repository and run as below

git branch –M main

git remote add origin <https url>

git push –u origin main









Step f:  refresh repository and You can now see index.html in github





Step g:  Copy http path





Step h:  Clone the repository with copied http path by command in command prompt         git clone <copied http url>

Step i:  Navigate to the cloned folder. Type cd AWS as below, next ls to 



Step j:  create Dockerfile in above command prompt in ububtu ie in power shell

&nbsp;       Nano Dockerfile





Step k:  Write the following data in Dockerfile and click ctrl+o  Enter and then ctrl-x
               FROM nginx:alpine
			   COPY . /usr/share/nginx/html





Step L:  Build docker image by executing the following command

&nbsp;               sudo docker build –t mywebapp .





Thus image is created

Step m:  run the image and map it to port 80 

&nbsp; sudo docker run –d –p 80:80 mywebapp







Step n:  Go to instances and click on instance here







Step o:  Copy public ipv4 address







Step p:  Paste it in the browser to get below output

Note : if https :\_\_ won’t work then type just http:\_\_\_





Important   do it without fail.    Step Q:  stop container 



Run the following command to stop the container

sudo docker ps

sudo docker stop <container-id>





Go back to instances and click on option instance. Once load as below, then Click on Instance state and select terminate instances



Click on Terminated (deleted)





Now click on End lab





End of exercise 1 (DEPLOYMENT of index.html using EC2 instance in AWS) consisting of:

creating EC2 instance to install Ubuntu, docker, git , and nano. 

creating web application (index.html) using Visual studio

Pushing index.html to github and cloning the it

Creating Dockerfile to build image for running index.html on nginx server  

Run it as container using docker command and get the output on browser

Terminate the instance 

&nbsp;End lab



2 MAVEN WEB PROJECT DEPLOYMENT IN AWS



Click on start lab





Click on AWS





Click on EC2



Click on launch instance



Give name





Create new key





Check all the boxes under network and click  on launch instance





Click on instances





Wait until you get 2 tests passes





Click on connect after checking the box





Copy ssh command





Open the terminal, Navigate to the path 





Run the ssh command



Run the following commands











Open MAVEN WEB PROJECT REPO in github and copy http link





Clone the repository





If your repository is in main run following





If not goto your github repo 

Click on settings

Under default branch section click on the icon shown and you’re your master branch as default and execute above commands






nano Dockerfile

FROM tomcat:9-jdk11
COPY target/*.war /usr/local/tomcat/webapps






Build docker image





Run the container







Copy public ipv4





Enter this url in browser and click enter





If your app is not running goto security  and Click on security groups





&nbsp;         





&nbsp;     Click on edit inbound rules







Click on add rule give port as 9090 and 0.0.0.0/0 click on save





And refresh the page to check whether the web page has loaded or not





If it is loaded you have successfully deployed you maven web project In your ec2 instance





Run the following commands to stop the container



Terminate your instance





End your lab








