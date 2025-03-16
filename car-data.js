// This file contains our car data
const carData = [];

// This function creates some sample car data for our app
function generateCarData() {
  const makes = ["Honda", "Toyota", "Ford", "Chevrolet", "BMW", "Mercedes", "Audi", "Nissan"];
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const conditions = ["Excellent", "Good", "Fair", "Poor"];
  const fuels = ["Gasoline", "Diesel", "Hybrid", "Electric"];
  const transmissions = ["Automatic", "Manual", "CVT"];
  const colors = ["Black", "White", "Silver", "Red", "Blue"];
  const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ"];
  
  // Create 100 random cars
  for (let i = 0; i < 100; i++) {
    const make = makes[Math.floor(Math.random() * makes.length)];
    
    // Pick appropriate models based on make
    let models;
    switch(make) {
      case "Honda": models = ["Accord", "Civic", "CR-V", "Pilot", "Odyssey"]; break;
      case "Toyota": models = ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"]; break;
      case "Ford": models = ["F-150", "Escape", "Explorer", "Mustang", "Focus"]; break;
      case "Chevrolet": models = ["Silverado", "Equinox", "Malibu", "Camaro", "Tahoe"]; break;
      case "BMW": models = ["3 Series", "5 Series", "X3", "X5", "7 Series"]; break;
      case "Mercedes": models = ["C-Class", "E-Class", "GLC", "GLE", "S-Class"]; break;
      case "Audi": models = ["A4", "A6", "Q5", "Q7", "A3"]; break;
      case "Nissan": models = ["Altima", "Rogue", "Sentra", "Pathfinder", "Murano"]; break;
      default: models = ["Unknown"]; break;
    }
    
    const model = models[Math.floor(Math.random() * models.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const mileage = Math.floor(Math.random() * 150000) + 5000;
    const price = Math.floor(Math.random() * 45000) + 5000;
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const fuel = fuels[Math.floor(Math.random() * fuels.length)];
    const transmission = transmissions[Math.floor(Math.random() * transmissions.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Randomly select 2-4 features
    const allFeatures = ["Bluetooth", "Navigation", "Leather Seats", "Sunroof", "Backup Camera"];
    const features = [];
    for (const feature of allFeatures) {
      if (Math.random() > 0.5) {
        features.push(feature);
      }
    }
    
    carData.push({
      id: i + 1,
      make,
      model,
      year,
      mileage,
      price,
      condition,
      fuel_type: fuel,
      transmission,
      color,
      vin: "VIN" + Math.floor(Math.random() * 10000000).toString().padStart(8, '0'),
      location,
      features
    });
  }
}

// Run the function to create our data
generateCarData();