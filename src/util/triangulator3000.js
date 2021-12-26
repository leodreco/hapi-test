const Trilateration = require('@util/Trilateration');

function triangulate(points){
    let index = 0;
    let trilateration = new Trilateration();
    for (const point of points) {
        trilateration.addBeacon(index, point, point.distance);
        index++;
    }

    let pos = trilateration.calculatePosition();
    return pos;
}

module.exports = triangulate;
