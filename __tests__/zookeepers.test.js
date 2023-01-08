const fs = require("fs");
const {
   filterByQuery, 
   findById, 
   createNewZookeeper, 
   validateZookeeper, 
} = require("../lib/zookeepers.js"); 
const { zookeepers } = require("../data/zookeepers"); 
jest.mock('fs'); 

// 1 
test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
      { name: "Beth", id: "jki55" },
      zookeepers
    );
  
    expect(zookeeper.name).toBe("Beth");
    expect(zookeeper.id).toBe("jki55");
  });
  // 2 
  test("filters by query", () => {
    const startingZookeepers = [
      {
        id: "3",
        name: "Erica",
        age: "34", 
        favoriteAnimal: "seal",  
      },
      {
        id: "4",
        name: "Noel",
        age: "21", 
        favoriteAnimal: "dog",
      },
    ];
  
    const updatedZookeeper = filterByQuery({ favoriteAnimal: "dog" }, startingZookeepers);
  
    expect(updatedZookeeper.length).toEqual(1);
  });
  // 3 
  test("finds by id", () => {
    const startingZookeepers = [
      {
        id: "3",
        name: "Erica",
        age: "34", 
        favoriteAnimal: "seal", 
      },
      {
        id: "4",
        name: "Noel",
        age: "21", 
        favoriteAnimal: "dog",
      },
    ];
  
    const result = findById("3", startingZookeepers);
  
    expect(result.name).toBe("Erica");
  });
  // 4 
  test("validates age", () => {
    const zookeeper = {
        id: "3",
        name: "Erica",
        age: "34", 
        favoriteAnimal: "seal", 
    };
  
    const invalidZookeeper = {
        id: "3",
        name: "Erica",
        age: 25, 
        favoriteAnimal: "dog", 
    
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(false);
    expect(result2).toBe(true);
  });