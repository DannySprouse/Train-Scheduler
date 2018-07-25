# Train_Scheduler
TRAIN SCHEDULER

Tools: HTML5, CSS3, Bootstrap4, JavaScript, jQuery, Firebase, Moment.js, Wickedpicker.js

Summary: This is a train scheduler that provides up-to-date train time and minutes away arrival data. A user can input their own train with the first train time and frequency, and the scheduler will tell the user what time the next train will arrive at their station, and how many minutes away that train is currently.

Problem: Create a train schedule application that incorporates Firebase to host arrival and departure data. The application must rely on Moment.js to retrieve and manipulate the data being stored in Firebase. The application must provide up-to-date information about all listed trains, specifically displaying the train name, destination, how often (frequency) the train runs, next scheduled arrival time and how many minutes away from the station. The first train time had to be displayed in military time only. Anyone viewing the schedule should see the same information, and users must be able to add their own trains by including the train name, destination, the time (in military time) that the first train arrives at that station and how often (frequency) that train runs. A few added features including providing the option for any user to remove a train from the list, and a real-time clock was added to the schedule reflecting the day, date and time up to the second.

Solution: Create an application that utilized Moment.js to calculate times of arrival and minutes away, and use wickedpicker.js to ensure the times were set to military only, and that the user could only select a real military time using the wickedpicker dropdown time selector.

My Technical Approach: I did a significant mockup of the HTML as I wanted a solid framework for this project as I knew the coding (and especially using Moment.js) was going to take a significant amount of time and I wanted a good foundation to work from.

I set up wickedpicker in the train.js file to force a 24-hour clock using a drop-down time picker. I then initialized Firebase and set up the initial values for the input form and begin the database structure. The logic for storing and retrieving the data was set up using .val().trim(), and then cleared all the form input after submission. I then pushed the entered data back to the Firebase database for storage. From there I had to pull the data back into the scheduler. The greatest challenge then came when trying to begin calculating time. I had to reset the train time by 1 year to avoid having a train arriving past the current time, used Moment to set variable to the current time and from there began the calculations for time differences between first arrival, current time and frequency of train service. Using model, I found the remainder of time and then had to add the remainder back to find out when the next train would arrive. I finally coded in some jQuery to enable users to delete trains from the list if they wish.

Finally, I finished off all the styling with CSS. I wanted to create a more classic, retro feel so used images that had washed out colors or B&W, utilized a chalkboard backdrop for the train schedule and applied several fonts I created using @font-face to give the text a chalk look, resembling the old train station chalkboard schedules. The two primary fonts used on this page were Railway and Eraser.

Licenses, Credits & Attributions: Images used on this page were either provided free by https://www.pexels.com (steam locomotive) or a license was purchased from Fotolia (male conductor). The Eraser and Railway fonts were obtained from www.1001fonts.com.

Link to Deployed Game: https://dannysprouse.github.io/Train-Scheduler/

Copyright ©2018 Danny S. Sprouse All Rights Reserved