

  // Initializing Firebase
  var config = {
    apiKey: "AIzaSyD66O73YRMYiSSd_dp5Yp-_qcpk0Zya_Ts",
    authDomain: "train-app-986da.firebaseapp.com",
    databaseURL: "https://train-app-986da.firebaseio.com",
    projectId: "train-app-986da",
    storageBucket: "train-app-986da.appspot.com",
    messagingSenderId: "428629838902"
  };
  firebase.initializeApp(config);


var trainData = firebase.database();



// Button for adding trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}

	// Uploads train data to the database
	trainData.ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(firstTrainUnix);
	console.log(newTrain.frequency)


	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	// Determine when the next train arrives.
	return false;
});


// Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Storing everything into a variable.
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;
	
	// Calculating the minutes until arrival
	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	// To calculate the arrival time, add the tMinutes to the currrent time
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	console.log(tMinutes);
	console.log(tArrival);

	console.log(moment().format("hh:mm A"));
	console.log(tArrival);
	console.log(moment().format("X"));

	$("#clearButton").remove("#trainTable");
	
	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
	
});




