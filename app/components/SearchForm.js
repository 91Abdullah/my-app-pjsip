
import { useState } from "react";

const SearchForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        source: "",
        destination: "",
        page: 1,
        page_size: "10" // Default page size
    });

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
            <div className="flex flex-col">
                <label htmlFor="start_date" className="text-sm font-medium">
                    Start Date
                </label>
                <input onChange={handleChange} value={formData.start_date} type="date" id="start_date" name="start_date" className="border border-gray-300 rounded px-3 py-2 mt-1" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="end_date" className="text-sm font-medium">
                    End Date
                </label>
                <input onChange={handleChange} value={formData.end_date} type="date" id="end_date" name="end_date" className="border border-gray-300 rounded px-3 py-2 mt-1" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="source" className="text-sm font-medium">
                    Source
                </label>
                <input onChange={handleChange} value={formData.source} type="text" id="source" name="source" className="border border-gray-300 rounded px-3 py-2 mt-1" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="destination" className="text-sm font-medium">
                    Destination
                </label>
                <input onChange={handleChange} value={formData.destination} type="text" id="destination" name="destination" className="border border-gray-300 rounded px-3 py-2 mt-1" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="page_size" className="text-sm font-medium">
                    Page Size
                </label>
                <select onChange={handleChange} value={formData.page_size} id="page_size" name="page_size" className="border border-gray-300 rounded px-3 py-2 mt-1">
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="page" className="text-sm font-medium">
                    Page
                </label>
                <input onChange={handleChange} value={formData.page} type="number" id="page" name="page" className="border border-gray-300 rounded px-3 py-2 mt-1" />
            </div>

            <button type="submit" className="bg-blue-500 text-white rounded px-2 py-2 mt-4 block">Search</button>
        </form>
    );
};

export default SearchForm;