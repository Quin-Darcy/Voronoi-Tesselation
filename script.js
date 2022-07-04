let W = window.innerWidth;
let H = window.innerHeight;

let MAX_DEPTH = 10;
let NUM_OF_POINTS = 6;

let root;
let v_points = [];

let regions = [];
let v_cells = [];


function setup() {
    createCanvas(W, H);
    background(0);

    initialize_regions();
    initialize_v_points();
    root = new Quad(0, 0, W, H, 0);
    set_cells();
    show_v_cells();
}

function draw() {
    background(0);
    initialize_regions();
    root = new Quad(0, 0, W, H, 0);
    set_cells()
    show_v_cells();

    for (let j = 0; j < v_cells.length; j++) {
        v_points[j] = v_cells[j].centroid;
    }
}

function initialize_regions() {
    for (let i = 0; i < NUM_OF_POINTS; i++) {
        regions[i] = [];
    }
}

function initialize_v_points() {
    for (let i = 0; i < NUM_OF_POINTS; i++) {
        v_points[i] = [random(0, W), random(0, H)];
    }
}

function set_cells() {
    for (let i = 0; i < regions.length; i++) {
        v_cells[i] = new Cell(regions[i], i);
    }
}

function show_v_cells() {
    for (let i = 0; i < v_cells.length; i++) {
        v_cells[i].show()
    }
}

function mouseDragged() {
    background(0);
    initialize_regions();
    v_points.pop();
    v_points.push([mouseX, mouseY]);
    root = new Quad(0, 0, W, H, 0);
    set_cells();
    show_v_cells();
}

function doubleClicked() {
    noLoop();
}

