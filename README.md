# ProjectOne

**Ven-You**
===================================================

**Ven-You** is a general-purpose event planning web-based solution. It implements some forms for authentication and event creation. Addtionally, this app is responsive to the user input. All the forms will provide feed back to the user based on the input. Each form will also display a friendly error message when required.

Our goal is to reduce indecisiveness amongst friends and loved ones when trying to answer the million dollar question: "What should we do tonight?"

https://bgorson.github.io/Ven-You/

The Application is built with:
---------------------------------------------------
- Javascript 
- HTML
- CSS
- Firebase

The Application Programming Interfaces used are:
---------------------------------------------------
- Eventbrite
- Google Maps

The Libraries used are:
---------------------------------------------------
- OuiCal 
- FontAwesome
- jQuery
- Bootstrap

**How it works:**
---------------------------------------------------
The user will first be given the option to either create a group or join an existing group. When the user creates a group, the information is stored into the Firebase Realtime Database to be called later on by the Eventbrite & Google Maps API. 

When the user opts to create a group, he or she must complete the following fields: group name, event start date, event end date, city & state of the event. This data is then stored in Firebase to be called later by the Eventbrite API as well as the Google Maps API. From there the user generates a group in the Firebase RealTime Database with the necessary paramaeter to be pulled from both API's to lead you to the main page with a list of events pulled containing the stored parameters.

When the user opts to join a group, the user must input the group name that is already stored in Firebase. From there the generated group name will lead you to the main page containing the parameters stored from the previously created group.

Each generated event is pulled with the Eventbrite API along with Google Maps API and stored in a seperate row. All of the events that are pulled contain a specific key which is associated with a "vote" button. If the user finds an event they like, he/she can press the "vote" button to store the vote in the Realtime database. All votes can be seen by all members in the group indicating interest from the members.

The event with the most votes will be the choosen event that the group can do! 

This web app brings groups together to to have fun without realising they are making memories. 
