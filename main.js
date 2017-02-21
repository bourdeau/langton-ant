
class Ant {

    constructor(size, x, y) {
        this.size = size;
        this.grid = [];
        this.position = {
            'direction': 'north',
            'cell': {
                'x': x,
                'y': y
            }
        };
    }

    gridStyle() {
        var width = this.size * 10;
        var grid = document.getElementById("grid-container");
        grid.style.width = width+"px";
        grid.style.height = width+"px";
        grid.style.border = "1px solid pink";
    }

    createSquare(x, y, color) {
        var div = document.createElement("div");
        div.id = 'cell_'+x+'_'+y;
        div.className = color;

        document.getElementById("grid-container").appendChild(div);
    }

    createGrid(type = "white") {
        var grid = [];
        this.gridStyle();

        for (var x = 0; x < this.size; x++) {
            var el = [];
            for (var y = 0; y < this.size; y++) {
            if (type === "random") {
                if (Math.random() > 0.5) {
                    this.createSquare(x, y, 'white');
                } else {
                    this.createSquare(x, y, 'black');
                }
            } else {
                this.createSquare(x, y, type);
            }

            }
            grid[x] = el;
        }

        this.grid = grid;
    }

    setAntInitPosition() {
        var ant = document.createElement("div");
        ant.id = "ant";
        ant.className = "north";
        document.getElementById("cell_"+this.position.cell.y+"_"+this.position.cell.x).appendChild(ant);
    }

    setAnt() {
        var oldAnt = document.getElementById("ant");
        oldAnt.parentNode.removeChild(oldAnt);

        var ant = document.createElement("div");
        ant.id = "ant";
        ant.className = this.position.direction;
        document.getElementById("cell_"+this.position.cell.y+"_"+this.position.cell.x).appendChild(ant);
    }

    move() {
        var antActualCell = document.getElementById("cell_"+this.position.cell.y+"_"+this.position.cell.x);
        var count = document.getElementById("count");
        var currentNb = parseInt(count.innerHTML);
        count.innerHTML = currentNb + 1;

        if (antActualCell.className === 'white') {
            if (this.position.direction === 'north') {
                this.position.cell.x += 1;
                this.position.direction = 'east';
                this.setAnt();
                antActualCell.className = 'black';
                return;
            }
            if (this.position.direction === 'east') {
                this.position.cell.y += 1;
                this.position.direction = 'south';
                this.setAnt();
                antActualCell.className = 'black';
                return;
            }
            if (this.position.direction === 'south') {
                this.position.cell.x -= 1;
                this.position.direction = 'west';
                this.setAnt();
                antActualCell.className = 'black';
                return;
            }
            if (this.position.direction === 'west') {
                this.position.cell.y -= 1;
                this.position.direction = 'north';
                antActualCell.className = 'black';
                this.setAnt();
                return;
            }
        }
        if (antActualCell.className === 'black') {
            if (this.position.direction === 'north') {
                this.position.cell.x -= 1;
                this.position.direction = 'west';
                this.setAnt();
                antActualCell.className = 'white';
                return;
            }
            if (this.position.direction === 'west') {
                this.position.cell.y += 1;
                this.position.direction = 'south';
                this.setAnt();
                antActualCell.className = 'white';
                return;
            }
            if (this.position.direction === 'south') {
                this.position.cell.x += 1;
                this.position.direction = 'east';
                this.setAnt();
                antActualCell.className = 'white';
                return;
            }
            if (this.position.direction === 'east') {
                this.position.cell.y -= 1;
                this.position.direction = 'north';
                this.setAnt();
                antActualCell.className = 'white';
                return;
            }
        }
    }
    run(speed = 100) {
        setTimeout(() => {
            requestAnimationFrame(this.run.bind(this));
            this.move();
        }, 1000 / speed);
    }
}


function start() {
    document.getElementById("grid-container").innerHTML = "";
    if (ant !== 'undefined') {
        ant = null;
    }
    var ant = new Ant(120, 60, 60);
    var gridType = document.getElementById("grid-type");
    var gridColor = gridType.options[gridType.selectedIndex].value;

    ant.createGrid(gridColor);
    ant.setAntInitPosition();
    ant.run(2000);
}
