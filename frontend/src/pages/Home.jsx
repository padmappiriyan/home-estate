import React, { useState } from "react";
import { MapPin, DollarSign, Home, Search, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center w-full overflow-hidden relative"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%), url('/House.png')",
      }}
    >
      <div className="relative z-10 text-center container mx-auto py-4 px-6 lg:px-32 text-white h-full flex flex-col justify-center">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl max-w-4xl mx-auto font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Explore homes that
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              fit your dreams
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover your perfect home from thousands of verified properties
            with advanced search filters
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>

            <div className="relative z-10 grid grid-cols-4 gap-4">
              <div className="relative group col-span-1">
                <div className="relative bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white">
                  <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="w-full text-gray-800 placeholder-gray-500 focus:outline-none bg-transparent font-medium"
                  />
                </div>
              </div>

              <div className="relative group col-span-1">
                <div className="relative bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white">
                  <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5 group-hover:rotate-180 transition-transform duration-200" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full text-gray-800 focus:outline-none appearance-none bg-transparent font-medium pl-10 pr-10"
                  >
                    <option value="">Select Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>
              </div>

              <div className="relative group col-span-1">
                <div className="relative bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white">
                  <DollarSign className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="Price Range"
                    className="w-full text-gray-800 placeholder-gray-500 focus:outline-none bg-transparent font-medium"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <button className="relative w-full group overflow-hidden bg-blue-600  rounded-xl">
                  <div className="relative z-10 flex items-center justify-center text-white p-4 font-semibold text-lg rounded-xl border border-white/20">
                    <Search className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Search</span>
                  </div>

                  
                </button>
              </div>
            </div>

           
            <div className="flex justify-center space-x-8 mt-6 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>10K+ Properties</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>500+ Locations</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

        
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div
                className="w-3 h-3 bg-blue-400/60 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-3 h-3 bg-purple-400/60 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-pink-400/60 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>

     
        <div className="mt-8">
          <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Trusted by 50,000+ families
          </div>
        </div>
      </div>
    </div>
  );
}
