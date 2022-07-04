class Cell {
    constructor(quads, id) {
        this.id = id;
        this.quads = quads;

        this.centroid;
        this.get_centroid()
    }
    get_centroid() {
        let x_sum = 0;
        let y_sum = 0;
        for (let i = 0; i < this.quads.length; i++) {
            x_sum += this.quads[i][0];
            y_sum += this.quads[i][1];
        }
        this.centroid = [x_sum/this.quads.length, y_sum/this.quads.length];
    }
    show() {
        colorMode(HSB, v_cells.length, 1, 1)
        strokeWeight(0.1);
        stroke(this.id, 0, 1);
        fill(this.id, 1, 1)

        let quad;
        for (let i = 0; i < this.quads.length; i++) {
            quad = this.quads[i];
            rect(quad[0], quad[1], quad[2], quad[3]);
        }

        fill(v_cells.length-this.id, 1, this.id/v_cells.length)
        ellipse(this.centroid[0], this.centroid[1], 10)
    }
}