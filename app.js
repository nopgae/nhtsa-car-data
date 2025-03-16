// This is our main car browser component
const CarBrowser = () => {
    // Set up our data state variables
    const [cars, setCars] = React.useState([]);
    const [filteredCars, setFilteredCars] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedCar, setSelectedCar] = React.useState(null);
    
    // Set up our filter state
    const [filters, setFilters] = React.useState({
      make: '',
      model: '',
      yearMin: '',
      yearMax: '',
      priceMin: '',
      priceMax: ''
    });
    
    // How many cars to show per page
    const carsPerPage = 5;
    
    // Load the car data when the page first loads
    React.useEffect(() => {
      setCars(carData);
      setFilteredCars(carData);
      setIsLoading(false);
    }, []);
    
    // Apply the filters whenever they change
    React.useEffect(() => {
      applyFilters();
    }, [filters]);
    
    // This function filters the cars based on user selections
    const applyFilters = () => {
      let filtered = [...cars];
      
      // Filter by make
      if (filters.make) {
        filtered = filtered.filter(car => car.make === filters.make);
      }
      
      // Filter by model
      if (filters.model) {
        filtered = filtered.filter(car => car.model === filters.model);
      }
      
      // Filter by minimum year
      if (filters.yearMin) {
        filtered = filtered.filter(car => car.year >= parseInt(filters.yearMin));
      }
      
      // Filter by maximum year
      if (filters.yearMax) {
        filtered = filtered.filter(car => car.year <= parseInt(filters.yearMax));
      }
      
      // Filter by minimum price
      if (filters.priceMin) {
        filtered = filtered.filter(car => car.price >= parseInt(filters.priceMin));
      }
      
      // Filter by maximum price
      if (filters.priceMax) {
        filtered = filtered.filter(car => car.price <= parseInt(filters.priceMax));
      }
      
      // Update the filtered cars and reset to first page
      setFilteredCars(filtered);
      setCurrentPage(1);
      setSelectedCar(null);
    };
    
    // Reset all filters to their default values
    const resetFilters = () => {
      setFilters({
        make: '',
        model: '',
        yearMin: '',
        yearMax: '',
        priceMin: '',
        priceMax: ''
      });
    };
    
    // Handle changes to the filter inputs
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({
        ...filters,
        [name]: value
      });
    };
    
    // Toggle showing details for a car
    const handleCarSelect = (car) => {
      if (selectedCar && selectedCar.id === car.id) {
        setSelectedCar(null); // Hide details if already showing
      } else {
        setSelectedCar(car); // Show details for this car
      }
    };
    
    // Get the cars for the current page
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    
    // Change to a different page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Get list of unique makes for the filter dropdown
    const uniqueMakes = _.uniq(cars.map(car => car.make)).sort();
    
    // Get list of unique models for the selected make
    const uniqueModels = _.uniq(
      cars
        .filter(car => !filters.make || car.make === filters.make)
        .map(car => car.model)
    ).sort();
    
    // Calculate statistics about the cars
    const stats = {
      totalCars: filteredCars.length,
      avgPrice: filteredCars.length 
        ? Math.round(filteredCars.reduce((sum, car) => sum + car.price, 0) / filteredCars.length) 
        : 0,
      avgMileage: filteredCars.length 
        ? Math.round(filteredCars.reduce((sum, car) => sum + car.mileage, 0) / filteredCars.length) 
        : 0,
      avgYear: filteredCars.length 
        ? Math.round(filteredCars.reduce((sum, car) => sum + car.year, 0) / filteredCars.length) 
        : 0
    };
    
    // Show loading message while data is loading
    if (isLoading) {
      return Loading car data...;
    }
    
    // The main component layout
    return (
      
        
          Used Car Browser
        
        
        {/* Statistics section */}
        
          Dataset Overview
          
            
              {stats.totalCars}
              Total Cars
            
            
            
              ${stats.avgPrice.toLocaleString()}
              Average Price
            
            
            
              {stats.avgMileage.toLocaleString()} mi
              Average Mileage
            
            
            
              {stats.avgYear}
              Average Year
            
          
        
        
        {/* Filters section */}
        
          Find Your Car
          
          
            
              Make
              
                All Makes
                {uniqueMakes.map(make => (
                  {make}
                ))}
              
            
            
            
              Model
              
                All Models
                {uniqueModels.map(model => (
                  {model}
                ))}
              
            
            
            
              Year Range
              
                
                
              
            
            
            
              Price Range
              
                
                
              
            
          
          
          
            
              Reset Filters
            
          
        
        
        {/* Car list section */}
        {currentCars.length === 0 ? (
          No cars match your search criteria
        ) : (
          
            
              Make/Model
              Year
              Price
              Mileage
              Location
              Details
            
            
            {currentCars.map(car => (
              
                
                  {car.make} {car.model}
                  {car.year}
                  ${car.price.toLocaleString()}
                  {car.mileage.toLocaleString()} mi
                  {car.location}
                  
                    <button 
                      className="primary-button" 
                      onClick={() => handleCarSelect(car)}
                    >
                      {selectedCar && selectedCar.id === car.id ? 'Hide' : 'View'}
                    
                  
                
                
                {/* Details section (only shows when a car is selected) */}
                {selectedCar && selectedCar.id === car.id && (
                  
                    
                      
                        
                          VIN:
                          {car.vin}
                        
                        
                          Fuel Type:
                          {car.fuel_type}
                        
                        
                          Transmission:
                          {car.transmission}
                        
                        
                          Color:
                          {car.color}
                        
                        
                          Condition:
                          {car.condition}
                        
                      
                      
                        
                          Features:
                          
                            {car.features.map((feature, index) => (
                              {feature}
                            ))}
                          
                        
                      
                    
                  
                )}
              
            ))}
          
        )}
        
        {/* Pagination section */}
        
          <button 
            className="secondary-button"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            First
          
          
          <button 
            className="secondary-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          
          
          
            Page {currentPage} of {Math.ceil(filteredCars.length / carsPerPage)}
          
          
          <button 
            className="secondary-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredCars.length / carsPerPage)}
          >
            Next
          
          
          <button 
            className="secondary-button"
            onClick={() => paginate(Math.ceil(filteredCars.length / carsPerPage))}
            disabled={currentPage === Math.ceil(filteredCars.length / carsPerPage)}
          >
            Last
          
        
      
    );
  };