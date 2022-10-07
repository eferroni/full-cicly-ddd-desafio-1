import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  validate() {
    if (this._id.length == 0) {
      throw new Error("Id is required");
    }
    if (this._name.length == 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address): void {
    this._address = address;
    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  activate(): void {
    if (this._address == undefined) {
      throw new Error("Address is required");
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address;
  }

  get Address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  addRewardPoints(points: number): void {
    if (points < 0) {
      throw new Error("Points must be greater or equal to 0");
    }
    this._rewardPoints += points;
  }
}
