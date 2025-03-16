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
      return <div className="loading">Loading car data...</div>;
    }
    
    // The main component layout
    return (
      <div className="container">
        <div className="header">
          <h1>NHTSA Car Browser</h1>
        </div>
        
        {/* Statistics section */}
        <div className="stats">
          <h2>Dataset Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalCars}</div>
              <div className="stat-label">Total Cars</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">${stats.avgPrice.toLocaleString()}</div>
              <div className="stat-label">Average Price</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{stats.avgMileage.toLocaleString()} mi</div>
              <div className="stat-label">Average Mileage</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{stats.avgYear}</div>
              <div className="stat-label">Average Year</div>
            </div>
          </div>
        </div>
        
        {/* Filters section */}
        <div className="filters">
          <h2>Find Your Car</h2>
          
          <div className="filter-grid">
            <div className="filter-group">
              <label htmlFor="make">Make</label>
              <select 
                id="make" 
                name="make" 
                value={filters.make} 
                onChange={handleFilterChange}
              >
                <option value="">All Makes</option>
                {uniqueMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="model">Model</label>
              <select 
                id="model" 
                name="model" 
                value={filters.model} 
                onChange={handleFilterChange}
                disabled={!filters.make}
              >
                <option value="">All Models</option>
                {uniqueModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="yearRange">Year Range</label>
              <div className="year-range">
                <input 
                  type="number" 
                  id="yearMin" 
                  name="yearMin" 
                  value={filters.yearMin} 
                  onChange={handleFilterChange}
                  placeholder="Min Year"
                />
                <input 
                  type="number" 
                  id="yearMax" 
                  name="yearMax" 
                  value={filters.yearMax} 
                  onChange={handleFilterChange}
                  placeholder="Max Year"
                />
              </div>
            </div>
            
            <div className="filter-group">
              <label htmlFor="priceRange">Price Range</label>
              <div className="price-range">
                <input 
                  type="number" 
                  id="priceMin" 
                  name="priceMin" 
                  value={filters.priceMin} 
                  onChange={handleFilterChange}
                  placeholder="Min Price"
                />
                <input 
                  type="number" 
                  id="priceMax" 
                  name="priceMax" 
                  value={filters.priceMax} 
                  onChange={handleFilterChange}
                  placeholder="Max Price"
                />
              </div>
            </div>
          </div>
          
          <div className="filter-buttons">
            <button 
              className="secondary-button" 
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Car list section */}
        {currentCars.length === 0 ? (
          <div className="no-results">No cars match your search criteria</div>
        ) : (
          <div className="car-list">
            <div className="car-list-header">
              <div>Make/Model</div>
              <div>Year</div>
              <div>Price</div>
              <div>Mileage</div>
              <div>Location</div>
              <div>Details</div>
            </div>
            
            {currentCars.map(car => (
              <React.Fragment key={car.id}>
                <div className="car-item">
                  <div><strong>{car.make} {car.model}</strong></div>
                  <div>{car.year}</div>
                  <div>${car.price.toLocaleString()}</div>
                  <div>{car.mileage.toLocaleString()} mi</div>
                  <div>{car.location}</div>
                  <div>
                    <button 
                      className="primary-button" 
                      onClick={() => handleCarSelect(car)}
                    >
                      {selectedCar && selectedCar.id === car.id ? 'Hide' : 'View'}
                    </button>
                  </div>
                </div>
                
                {/* Details section (only shows when a car is selected) */}
                {selectedCar && selectedCar.id === car.id && (
                  <div className="car-details">
                    <div className="details-grid">
                      <div>
                        <div className="details-item">
                          <span className="details-label">VIN:</span>
                          <span>{car.vin}</span>
                        </div>
                        <div className="details-item">
                          <span className="details-label">Fuel Type:</span>
                          <span>{car.fuel_type}</span>
                        </div>
                        <div className="details-item">
                          <span className="details-label">Transmission:</span>
                          <span>{car.transmission}</span>
                        </div>
                        <div className="details-item">
                          <span className="details-label">Color:</span>
                          <span>{car.color}</span>
                        </div>
                        <div className="details-item">
                          <span className="details-label">Condition:</span>
                          <span>{car.condition}</span>
                        </div>
                      </div>
                      <div>
                        <div className="details-item">
                          <span className="details-label">Features:</span>
                          <div className="feature-tags">
                            {car.features.map((feature, index) => (
                              <span key={index} className="feature-tag">{feature}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        
        {/* Pagination section */}
        <div className="pagination">
          <button 
            className="secondary-button"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          
          <button 
            className="secondary-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-info">
            Page {currentPage} of {Math.ceil(filteredCars.length / carsPerPage)}
          </div>
          
          <button 
            className="secondary-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredCars.length / carsPerPage)}
          >
            Next
          </button>
          
          <button 
            className="secondary-button"
            onClick={() => paginate(Math.ceil(filteredCars.length / carsPerPage))}
            disabled={currentPage === Math.ceil(filteredCars.length / carsPerPage)}
          >
            Last
          </button>
        </div>
      </div>
    );
  };