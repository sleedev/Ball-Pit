const {Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse} = Matter;
//getting access to these objects from the Matter library
//to move the object in the canvas, we set up a mouseconstraint property

const width = 800;
const height = 600;
//we want to make a variable that we can multiply by thte wdth and height

const engine = Engine.create();
//engine to essentially transition from a current state of
//all the shapes we have into some new states.
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false, //try to render solid shapes, random colours.
        width, //using width variable directly//800units wide
        height //600 elements tall
    }//this is a canvas element, we see that in DOM
});
//render is going to be used to draw this stuff onto the screen.

Render.run(render);
Runner.run(Runner.create(), engine);
//runner is going to coordinate updates between the engine and the world.

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));
//creating the Mouse object within the mouseconstraint
//then we had to add the Mouse object in the Matters library
//in order to render it

//WALLS
const walls = [
    Bodies.rectangle(400, 0, 800, 40, {isStatic:true}),
    //to make the 4 rectangles we need
    //1. find xy coordinate of centre of canvas
    //400 units over, zero units down, eight hundred units wide, 40 units tall
    Bodies.rectangle(400,600,800,40, {isStatic:true}),
    Bodies.rectangle(0,300,40,600, {isStatic:true}),
    Bodies.rectangle(800,300,40,600, {isStatic:true})

];
World.add(world,walls);

//RANDOME SHAPES
for (let i = 0; i < 50; i++){
    if (Math.random() > 0.5) {
        World.add(
            world, 
            Bodies.rectangle(Math.random()* width, Math.random() * height, 50,50));
    //added a single rectangle
    } else {
        World.add(
            world,
            Bodies.circle(Math.random() * width, Math.random() * height, 35, {
                // render: {
                //     fillStyle: 'purple'
                // }
                ////this is where we can customize the design of the circle
            })
        ); //radius is 35. the diameter would be 75
    }
}
//if random is less than 0.5, we make a square. otherwise we make a circle