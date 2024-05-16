

// Calibration is complete
GazeCloudAPI.OnCalibrationComplete = function(){
    console.log('gaze Calibration Complete')
}  

// If camera access is denied
GazeCloudAPI.OnCamDenied = function(){ 
    console.log('camera access denied')  
}  


// Error messages
GazeCloudAPI.OnError = function (msg) {
    console.log('err: ' + msg)
}

// Users can click to recalibrate in real time
GazeCloudAPI.UseClickRecalibration = true;

// Starts eye tracking
GazeCloudAPI.StartEyeTracking();

GazeCloudAPI.OnResult = function (GazeData) {

    // // Important variables
    // GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze data uncalibrated

    // GazeData.docX // gaze x in document coordinates
    // GazeData.docY // gaze y in document coordinates

    // GazeData.GazeX // gaze x in screen coordinates
    // GazeData.GazeY // gaze y in screen coodinates

    // GazeData.time // timestamp
    
    var myPdf = document.getElementById('iframe');

    // if (GazeData.GazeY > 700) {
    //     myPdf.contentWindow.scrollBy(0, 50); 
    // } else if (GazeData.GazeY < 300) {
    //     myPdf.contentWindow.scrollBy(0,-50);
    // }

    
}

function mouseMove(event) {
    var y = event.clientY;

    var myPdf = document.getElementById('iframe');

    if (y > 700) {
        myPdf.contentWindow.scrollBy(0, 50);
    } else if (y < 300) {
        myPdf.scrollBy(0, -50);
    }

}