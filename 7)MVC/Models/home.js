//fake DB
const registeredHomes = [];

module.exports= class Home {
  constructor(houseName,price,location){
    this.houseName=houseName;
    this.price=price;
    this.location=location;
  }

  save(){
    registeredHomes.push(this);
}

static fetchAll(){
  return registeredHomes;
}

}

