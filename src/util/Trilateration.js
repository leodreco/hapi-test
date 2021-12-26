/**
 * Código refactorizado de
 * @see https://www.npmjs.com/package/trilateration
 * 
 * @see https://www.npmjs.com/~philpl
 */
class Trilateration {
    constructor(){
        this.beacons = [];
    }

    addBeacon(index, position, distance = undefined){
        this.beacons[index] = position;
        if(distance !== undefined){
            this.beacons[index].distance = distance;
        }
    }

    addDistance(index, distance){
        if(this.beacons[index] === undefined){
            throw new Error(`The beacon on index ${index} doesnt exists!`);
        }
        this.beacons[index].dis = distance;
    }

    calculatePosition(){
        let j, k, x, y;
        if(this.beacons.length < 3){
            throw new Error('Error! Please add at least three beacons!');
        }
        k = this.getK();
        j = this.getJ();
        x = this.getX(k, j);
        y = this.getY(x);
        return {
            x,
            y,
        };
    }

    getK(){
        const square = number => Math.pow(number, 2);
        let [beacon1, beacon2, beacon3] = this.beacons;
        let a, b, c, d;
        a = square(beacon1.x) + square(beacon1.y) - square(beacon2.x) - square(beacon2.x) - square(beacon1.distance) + square(beacon2.distance);
        b = (2 * (beacon1.y - beacon2.y))
        c = square(beacon1.x) + square(beacon1.y) - square(beacon3.x) - square(beacon3.y) - square(beacon1.distance) + square(beacon3.distance);
        d = (2 * (beacon1.y - beacon3.y));
        return (a / b - c / d);
    }

    getJ(){
        let [beacon1, beacon2, beacon3] = this.beacons;
        return (beacon3.x - beacon1.x) / (beacon1.y - beacon3.y) - (beacon2.x - beacon1.x) / (beacon1.y - beacon2.y);
    }

    getX(k, j){
        return k / j;
    }

    getY(x){
        const square = number => Math.pow(number, 2);
        let [beacon1, beacon2] = this.beacons;
        let a, b, c;
        a = ((beacon2.x - beacon1.x) / (beacon1.y - beacon2.y)) * x;
        b = (square(beacon1.x) + square(beacon1.y) - square(beacon2.x) - square(beacon2.y) - square(beacon1.distance) + square(beacon2.distance));
        c = (2 * (beacon1.y - beacon2.y));
        return a + b / c;
    }
}

module.exports = Trilateration;
