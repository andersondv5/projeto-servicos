import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ManImage from "../../../assets/images/man.svg";



function MainSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="py-8 lg:py-12 bg-[#F9F4EA]">
      <div className="max-w-5xl mx-auto px-4">  
        <div className="flex flex-col lg:flex-row items-center gap-6">          
          <div className="flex-1 justify-center lg:justify-end">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 ">
              Qual serviço você precisa hoje?
            </h1>
          </div>          
          <div className="flex-1">
            <img
              src={ManImage}
              alt="Serviços"
              className="w-3/4 h-auto mx-auto"
            />
          </div>
        </div>       
        <div className="max-w-5xl mx-auto"> 
          <div className="relative mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: Encanador, Diarista"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white rounded-lg shadow-sm w-full px-4 py-3 lg:py-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSearch;