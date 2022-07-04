class Quad {
    constructor(x, y, w, h, depth) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.depth = depth;
        
        this.color_number = 0;
        this.closest_points = [];

        this.q1 = null;
        this.q2 = null;
        this.q3 = null;
        this.q4 = null;

        this.start();
    }

    start() {
        this.set_closest_points();
        this.check_closest_points();
    }

    set_closest_points() {
        let c1 = createVector(this.x,  this.y);
        let c2 = createVector(this.x+this.w, this.y);
        let c3 = createVector(this.x+this.w, this.y+this.h);
        let c4 = createVector(this.x, this.y+this.h);

        let corners = [c1, c2, c3, c4];
        for (let i = 0; i < 4; i++) {
            this.closest_points[i] = this.get_closest_point(corners[i].x, corners[i].y);
        }
    }
    
    get_closest_point(x, y) {
        let closest_point;
        let current_distance;
        let min_distance = Math.sqrt(Math.pow(W, 2)+Math.pow(H, 2));
        for (let i = 0; i < v_points.length; i++) {
            current_distance = dist(x, y, v_points[i][0], v_points[i][1]);
            if (current_distance < min_distance) {
                min_distance = current_distance;
                closest_point = v_points[i];
            }
        }    
        return closest_point;
    }

    check_closest_points() {
        let other_point;
        let all_points_equal = true;
        let check_point = this.closest_points[0];
        
        for (let i = 1; i < 4; i++) {
            other_point = this.closest_points[i];
            if (check_point[0] != other_point[0] || check_point[1] != other_point[1]) {
                all_points_equal = false;
            }
        }

        if (all_points_equal) {
            this.color_number = v_points.indexOf(check_point);
            regions[this.color_number].push([this.x, this.y, this.w, this.h, this.depth]);
        } else {
            if (this.depth < MAX_DEPTH) {
                this.split();
            } else {
                let majority_point = this.get_majority()
                this.color_number = v_points.indexOf(majority_point)
            }
        }
    }

    get_majority() {
        let majority;
        let max_count = 0;
        let current_count = 1;
        for (let i = 0; i < 4; i++) {
            let p = this.closest_points[i];
            for (let j = i; j < 4; j++) {
                let q = this.closest_points[j];
                if (p[0] == q[0] && p[1] == q[1]) {
                    current_count += 1;
                    if (max_count < current_count) {
                        max_count = current_count;
                        majority = p;
                    }
                }
            }
        }
        return majority;
    }
    
    split() {
        this.q1 = new Quad(this.x+this.w/2, this.y, this.w/2, this.h/2, this.depth+1);
        this.q2 = new Quad(this.x, this.y, this.w/2, this.h/2, this.depth+1);
        this.q3 = new Quad(this.x, this.y+this.h/2, this.w/2, this.h/2, this.depth+1);
        this.q4 = new Quad(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/2, this.depth+1);
    }

    show() {
        if (this.q1) {
            this.q1.show();
            this.q2.show();
            this.q3.show();
            this.q4.show();
        } else {
            colorMode(HSB, v_points.length, 1, 1);
            stroke(0);
            strokeWeight(0.25);
            fill(this.color_number, 1, 1);
            rect(this.x, this.y, this.w, this.h);
        }
    }
}
