# ProjectOne

**Ven-You**
=======================

**Ven-You** is a general-purpose event planning web-based solution. It implements some forms for authenitcaion and event creation. Addtionally, this app is responsive to the user input. All the forms will provide feed back to the user based on the input. Each form will also display a friendly error message when required.

Our goal is to reduce indecisiveness amongst friends and loved ones when trying to answer the million dollar question: "What should we do tonight?"

The Application is built with:
--------------------------------
- Javascript 
- HTML
- CSS
- jQuery
- Bootstrap
- Firebase

The Application Programming Interfaces used are:
---------------------------------------------------
- Eventbrite
- Google Maps

The Libraries used are:
-------------------------
- OuiCal 
- FontAwesome.

**How it works:**
-------------------------
The user will first be given the option to either create a group or join an existing group. When the user creates a group, the information is stored into the Firebase Realtime Database to be called later on by the Eventbrite & Google Maps API. 

When the user opts to create a group, the he/she must input a group name, event start date, event end date, city & state of the event.

When the user opts to join a group, the user must input the group name that is already stored in Firebase. From there the generated group name will lead you to the main page containing the parameters stored from the created group.

Each generated event from the Eventbrite API has a specific key that is associated with a "vote" button. If the vote button is pressed, then the associated event will store the vote in Realtime database to indicate interest to the rest of the group.