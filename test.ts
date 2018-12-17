class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
      this._x = x;
      this._y = y;
  }

  @configurable(false)
  get x() { return this._x; }

  @configurable(false)
  get y() { return this._y; }
}

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

const p = new Point(10,10)


console.log(p.x)