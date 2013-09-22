var canvas = $('#main_canvas');

var geometry = {
    width: 400.,
    length: 600.,
    border: 25.,
    line_width: 2.,
    center_radius: 50.,
    defense_radius: 50.,
    defense_stretch: 35.,
    goal_width: 70.,
    goal_depth: 18.,
    robot_radius: 15,
    ball_radius: 2
};

var colors = {
    dark_green: "#008000",
    yellow: "#FFFF00",
    orange: "#FFBB00",
    blue: "#0000FF",
    white: "#FFFFFF",
    black: "#000000",
};

function drawField()
{
    // Draw green on field
    canvas.drawRect({
            fillStyle: colors.dark_green,
            x: 0, 
            y: 0, 
            width: geometry.length + 2 * geometry.border, 
            height: geometry.width + 2 * geometry.border,
            fromCenter: false,
        }
    ); 
    
    // Draw outside perimeter
    canvas.drawRect({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x: geometry.border, 
            y: geometry.border, 
            width: geometry.length, 
            height: geometry.width,
            fromCenter: false,
        }
    ); 

    // Draw midball
    canvas.drawArc({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x: geometry.border + geometry.length / 2, 
            y: geometry.border + geometry.width / 2, 
            radius: geometry.center_radius
        }
    );
   
    // Draw midline
    canvas.drawLine({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x1: geometry.border + geometry.length / 2, 
            y1: geometry.border, 
            x2: geometry.border + geometry.length / 2, 
            y2: geometry.border + geometry.width, 
        }
    );

    // Draw left defense area
    canvas.drawArc({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x: geometry.border, 
            y: geometry.border + geometry.width / 2 + geometry.defense_stretch / 2, 
            radius: geometry.defense_radius,
            start: 90,
            end: 180,
        }
    );
    canvas.drawArc({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x: geometry.border, 
            y: geometry.border + geometry.width / 2 - geometry.defense_stretch / 2, 
            radius: geometry.defense_radius,
            start: 0,
            end: 90,
        }
    );
    canvas.drawLine({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x1: geometry.border + geometry.defense_radius, 
            y1: geometry.border + geometry.width / 2 - geometry.defense_stretch / 2, 
            x2: geometry.border + geometry.defense_radius, 
            y2: geometry.border + geometry.width / 2 + geometry.defense_stretch / 2, 
        }
    );
    // Draw right defense area
    canvas.drawArc({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x: geometry.length + geometry.border, 
            y: geometry.border + geometry.width / 2 + geometry.defense_stretch / 2, 
            radius: geometry.defense_radius,
            start: 180,
            end: 270,
        }
    );
    canvas.drawArc({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x: geometry.length + geometry.border, 
            y: geometry.border + geometry.width / 2 - geometry.defense_stretch / 2, 
            radius: geometry.defense_radius,
            start: 270,
            end: 0,
        }
    );
    canvas.drawLine({
            strokeStyle: colors.white,
            strokeWidth: geometry.line_width,
            x1: geometry.length + geometry.border - geometry.defense_radius, 
            y1: geometry.border + geometry.width / 2 - geometry.defense_stretch / 2, 
            x2: geometry.length + geometry.border - geometry.defense_radius, 
            y2: geometry.border + geometry.width / 2 + geometry.defense_stretch / 2, 
        }
    );
    //draw left goal
    canvas.drawLine({
            // Todo: change this
            strokeStyle: colors.yellow,
            strokeWidth: geometry.line_width,
            x1: geometry.border, 
            y1: geometry.border + geometry.width / 2 - geometry.goal_width / 2, 
            x2: geometry.border - geometry.goal_depth, 
            y2: geometry.border + geometry.width / 2 - geometry.goal_width / 2,
            x3: geometry.border - geometry.goal_depth, 
            y3: geometry.border + geometry.width / 2 + geometry.goal_width / 2,
            x4: geometry.border, 
            y4: geometry.border + geometry.width / 2 + geometry.goal_width / 2, 
        }
    );
    //draw right goal
    canvas.drawLine({
            // Todo: change this
            strokeStyle: colors.blue,
            strokeWidth: geometry.line_width,
            x1: geometry.length + geometry.border, 
            y1: geometry.border + geometry.width / 2 - geometry.goal_width / 2, 
            x2: geometry.length + geometry.border + geometry.goal_depth, 
            y2: geometry.border + geometry.width / 2 - geometry.goal_width / 2,
            x3: geometry.length + geometry.border + geometry.goal_depth, 
            y3: geometry.border + geometry.width / 2 + geometry.goal_width / 2,
            x4: geometry.length + geometry.border, 
            y4: geometry.border + geometry.width / 2 + geometry.goal_width / 2, 
        }
    );

}

function drawRobots(robots)
{
    robots.forEach(
        function(robot) {
            canvas.drawArc({
                    // Todo: change this
                    fillStyle: robot.color,
                    x: robot.x, 
                    y: robot.y,
                    radius: geometry.robot_radius,
                }
            );
        }
    );
}

function drawBalls(balls)
{
    balls.forEach(
        function(ball) {
            canvas.drawArc({
                    // Todo: change this
                    fillStyle: colors.orange,
                    x: ball.x, 
                    y: ball.y,
                    radius: geometry.ball_radius,
                }
            );
        }
    );
}
// Run once DOM is ready. Setup socket events and fire away.
$(function () {
    var socket = io.connect();
    canvas = $('#main_canvas');
    drawField();

    socket.on(
        'ssl_packet',
        function(data) {
            drawField();
            drawRobots(data.robots);
            drawBalls(data.balls);
        }
    );

    //socket.emit('ssl_packet', {robots:[ {x: 10, y: 20, color: colors.blue}],
    //                           balls: [ {x: 50, y: 60 },{x: 250, y: 90 } ]});
});
