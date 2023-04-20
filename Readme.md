## This is the movie recommender system.

## Instructions to run the project: 
 Use the following commands to run the project, once it has been cloned.
 Note: To run the below commands in windows, don't write 'sudo' at the beginning of the command. 
```
sudo docker build -t debian .
```
```
sudo docker run -p 3000:3000 -p 8000:8000 debian
```

Once the following commands have successfully executed, you will visit the following url for accessing the movie recommender.
```
http://localhost:3000/
```
The page will ask for login credentials. Use the following login credentials: 
```
Email: mihir@gmail.com
Password: mihir@1234
```

The workflow of our recommender system works as follows: 

![Flow Digram](https://github.com/MihirSharmaOfficial/JTP_Mihir/blob/master/assets/WorkflowDiagram.png?raw=true)