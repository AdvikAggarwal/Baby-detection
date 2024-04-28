img = "";

status1 = "";
objects = [];
function preload()
{
    alarm = loadSound("alarm.mp3");
}
function setup()
{
    canvas = createCanvas(500, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 380);
    video.hide();

}
function draw()
{
    image(video, 0, 0, 500, 380);
    if (status1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetecter.detect(video, gotResults);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            stroke(r, g, b);
            noFill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person")
            {
                document.getElementById("babyfound").innerHTML = "Baby Detection: found";
                alarm.stop();
            }
            else 
            {
                document.getElementById("babyfound").innerHTML = "Baby Detection: Not found";
                alarm.play();
            }
        }
    }
}
function modelLoaded()
{
    console.log("The model has been loaded");
    status1 = true;
}
function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function start()
{
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}