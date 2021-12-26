const trilateration = require('trilateration');

function triangulate(points){
    let index = 0;
    for (const point of points) {
        trilateration.addBeacon(index, trilateration.vector(point.x, point.y));
        trilateration.setDistance(index, point.distance);
        index++;
    }

    let pos = trilateration.calculatePosition();
    return pos;
}

module.exports = triangulate;
