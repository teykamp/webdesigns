// major help from cvega15 @ github

class cubic_bezier {
    constructor(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
        this.p0_x = p0_x;
        this.p0_y = p0_y; 
        this.p1_x = p1_x; 
        this.p1_y = p1_y; 
        this.p2_x = p2_x; 
        this.p2_y = p2_y; 
        this.p3_x = p3_x;
        this.p3_y = p3_y;
    };

    get_coordinates(t){
        console.log('logged')
        return {x: "x", y: "y"};
    };

    get_y(t) {
        return (((1-t)**3) * this.p0_y) + (3 * ((1-t)**2) * t * this.p1_y) + (3 * (1-t) * (t**2) * this.p2_y) + ((t**3) * this.p3_y);
    };

    get_x(t) {
        return (((1-t)**3) * this.p0_x) + (3 * ((1-t)**2) * t * this.p1_x) + (3 * (1-t) * (t**2) * this.p2_x) + ((t**3) * this.p3_x);
    };
};

// bezier_counter - special increment function that outputs a linear interpolation between two numbers over time.
// start_time - timestamp of initial object creation (see bottom: start animation)
// element - element you want to change
// timestamp - timestamp of object creation (does not reset until page reload!)
// duration - time of animation
// start_number - the initial value to count from
// end_number - the final value to reach within the time constraint
// animation_bezier - animation
function bezier_counter(timestamp, start_time, element, duration, start_number, end_number, animation_bezier) {
    var progress = timestamp - start_time;

    // var bezier_y = animation_bezier.get_y(timestamp/duration) * end_number;
    var bezier_y = animation_bezier.get_y(progress / duration) * (end_number - start_number) + start_number;
    element.innerHTML = Math.floor(bezier_y);

    // check to see if function finished execution
    if (progress < duration) {
        requestAnimationFrame(function(timestamp) {
            bezier_counter(timestamp, start_time, element, duration, start_number, end_number, animation_bezier);
        });
    } else {
        // change to the users end_number at the end in case something went wrong
        element.innerHTML = end_number;
    };
};

function bezier_animation(element_id, start_number=0, end_number, animation_duration, p1_x=null, p1_y=null, p2_x=null, p2_y=null) {

    // set default coordinates
    var p1 = {p1_x: .01, p1_y: 1};
    var p2 = {p2_x: .01, p2_y: 1};

    // if the user inputted bezier coordinates then check to make sure they are in range, if so then change the default coordinates to the user coordinates
    if (p1_x && p1_y && p2_x && p2_y) {
        if (p1_x > 1 || p1_x < 0 || p2_x > 1 || p2_x < 0) {
            throw "p1_x and p2_x have to be between 1 and 0";
        } else {
            console.log('using customs')
            p1 = {p1_x: p1_x, p1_y: p1_y};
            p2 = {p2_x: p2_x, p2_y: p2_y};
        };
    };

    // get the element to change by id
    var element = document.getElementById(element_id);

    // create a new bezier object
    const animation_bezier = new cubic_bezier(0, 0, p1.p1_x, p1.p1_y, p2.p2_x, p2.p2_y, 1, 1);

    // start animation
    requestAnimationFrame(function(timestamp) {
        var start_time = timestamp;
        bezier_counter(timestamp, start_time, element_id, animation_duration, start_number, end_number, animation_bezier)
    });
};

// export {bezier_animation};
