const db = require('../utils/databseUtil');

module.exports = class Home {
  constructor(HouseName, Price, Location, Rating, PhotoUrl,Description,id) {
    this.HouseName = HouseName;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.PhotoUrl = PhotoUrl;
    this.Description = Description;
    this.id = id; 
  }

  save() {
  if(this.id){
   return db.execute(`
    UPDATE  HOMES  SET HouseName=?, Price=?, Location=?, Rating=?, PhotoUrl=?, Description=? 
    WHERE id =? ` , [this.HouseName, this.Price, this.Location, this.Rating, this.PhotoUrl, this.Description,this.id])
  }
  else{
    return db.execute(`
    INSERT INTO HOMES (HouseName, Price, Location, Rating, PhotoUrl, Description) VALUES (?, ?, ?, ?, ?, ?)
    ` , [this.HouseName, this.Price, this.Location, this.Rating, this.PhotoUrl, this.Description])
  }
   
  }

  static fetchAll() {
    return db.execute(`
      SELECT *
      FROM HOMES
      `)
  }

  static findById(homeId) {
   return db.execute(`
    SELECT *
    FROM HOMES
    WHERE id = ?
    `, [homeId])
  }

  static deleteById(homeId) {
    return db.execute(`
      DELETE FROM HOMES
      WHERE id = ?
    `, [homeId])
  }
};
