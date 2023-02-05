song="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
righttwristy=0;
scoreLeftWrist=0;
scoreRightWrist=0;
songstatus="";

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600,550);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftx = "+leftwristx+"lefty = "+leftwristy);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightx = "+rightwristx+"righty = "+rightwristy);
    }
}

function modelLoaded()
{
    console.log('PoseNet is intialized');
}

function draw()
{
    image(video,0,0,600,550);

    fill('#FF0000');
    stroke('#FF0000');

    songstatus = song.isPlaying();

    if(scoreLeftWrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        song2.stop();
    }

    if(songstatus == "false")
    {
        play();
        document.getElementById("song_name").innerHTML = "Song 1 is playing"
    }
}

function play()
{
    song.play();
}

function play2()
{
    song2.play();
}