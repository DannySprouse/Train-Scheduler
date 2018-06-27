$( document ).ready(function() {

// Small JQuery Plugin - Wickedpicker - that will force user to only select a real military time when selecting when the first train will arrive

    var options = {
        twentyFour: true,
    };

$('.timepicker').wickedpicker(options);

// Initialize Firebase

    var config = {
        apiKey: "AIzaSyDiBn7Y9Q_s2ycgZiOzmvFwZD2CiLepqro",
        authDomain: "train-wreck-junction.firebaseapp.com",
        databaseURL: "https://train-wreck-junction.firebaseio.com",
        projectId: "train-wreck-junction",
        storageBucket: "train-wreck-junction.appspot.com",
        messagingSenderId: "600186177798"
    };

    firebase.initializeApp(config);
  
    var dataRef = firebase.database();

// Initial values for input form

    var trainName = "";
    var trainDestination = "";
    var firstTrain = "";
    var trainFrequency = "";

// Capture button click

$("#submit-button").on("click", function(event) {
    event.preventDefault();

// Logic for Storing / Retrieving Data

    trainName = $("#trainName").val().trim();
    trainDestination = $("#trainDestination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    trainFrequency = $("#trainFrequency").val().trim();

// Clear input form after new train is added

$("#trainName").val("");
$("#trainDestination").val("");
$("#firstTrain").val("");
$("#trainFrequency").val("");

// Code to push data to the Firebase DB

    dataRef.ref().push({
        
        trainName: trainName,
        trainDestination: trainDestination,
        time: firstTrain,
        trainFrequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

}); // closes submit button function

// Firebase Watcher / Initial Loader

    dataRef.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().trainDestination);
        console.log(childSnapshot.val().time);
        console.log(childSnapshot.val().trainFrequency);

// Declare variables to build from Firebase and begin calculating train frequency and time

    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var time = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().trainFrequency;
    
    var key = childSnapshot.key; // Sets the Firebase key to the snapshot to allow delete

    var remove = "<button class='btn btn-default btn-small glyphicon glyphicon-trash remove' id=" + key + ">Delete Train</button>" // Creates option to delete train from schedule

// Reset train time by 1 year to ensure arrival is prior to current time (using military HH:mm)

    var firstTrainReset = moment(time, "HH:mm").subtract(1, "years");
        console.log(firstTrainReset);

// Use moment.js to set variable equal to current time as starting point

    var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("HH:mm"));

// Load current date, day, time into HTML with real-time updates

    var dateTime = null,
        date = null;

    var update = function () {
        date = moment(new Date())
            dateTime.html(date.format('dddd, MMMM Do YYYY, HH:mm:ss A'));
};

$(document).ready(function(){
    dateTime = $('#dateTime')
        update();
        setInterval(update, 1000);
});

// Use moment.js to calculate the time difference between the first train and the current time

    var timeDifference = moment().diff(moment(firstTrainReset), "minutes");
        console.log("Time Difference: " + timeDifference);

// Calculate using modal (%) to find the remainder between frequency and time difference from the first train

    var timeRemainder = timeDifference % trainFrequency;
        console.log(timeRemainder);

// Calculate when the next train will arrive

    var nextTrainMins = trainFrequency - timeRemainder;
        console.log("Minutes Until Next Train: " + nextTrainMins);

    var nextTrainAdd = moment().add(nextTrainMins, "minutes");
    var nextTrainArrives = moment(nextTrainAdd).format("HH:mm");
        console.log("Next Train Arrival Time: " + nextTrainArrives);

// Declare Variables for Table / Write to HTML - use prepend so that the last train added is listed first

$("#train-schedule-display").prepend("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainArrives + "</td><td>" + nextTrainMins + "</td><td>" + remove + "</td></tr>");

setInterval(timingLoad, 20000);
function timingLoad() {
    $('#away').load('index.html #away')
}

// Handle the errors

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

// Delete trains from the list by anyone

$(document).on("click", ".glyphicon-trash", deleteTrain);

    function deleteTrain() {
        var deleteKey = $(this).attr("id");
        dataRef.ref().child(deleteKey).remove();
        location.reload();
    }



}); // closes doc ready