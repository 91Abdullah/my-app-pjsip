// components/CDRTable.js
"use client"
import { useState, useEffect } from 'react';
import SearchForm from "./SearchForm"
import axiosInstance from "../../axiosInstance";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"

const CDRTable = () => {
  const [cdrs, setCdrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    source: "",
    destination: "",
    page: 1,
    page_size: "10" // Default page size
  });
  const [searchText, setSearchText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  // Function to format date and time as "dd-mm-yyyy hh:mm:ss"
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year} ${formattedHours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} ${ampm}`;
  };

  const handleDownload = async (date, recordingFile) => {
    try {
      const response = await axiosInstance.get(`/download_recording/${date}/${recordingFile}`, {
        responseType: 'blob'
      });

      const url = URL.createObjectURL(response.data);
      setAudioUrl(url); // Assuming you have a state variable for the audio URL
      setError('');
    } catch (error) {
      console.error('Error downloading and playing recording:', error);
      setError('Error downloading and playing recording');
      setAudioUrl('');
    }
  };

  const fetchCDRs = async (formData) => {
    let user = sessionStorage.getItem('username')
    //console.log(user)
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/cdrs/`, {
        params: {...formData, user}
      });
      setCdrs(response.data.cdrs);
    } catch (error) {
      console.error('Error fetching CDRs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCDRs(formData);
  }, [formData]);

  const handleSubmit = (formData) => {
    fetchCDRs(formData)
  }

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <h2 className="mb-4 font-bold">Call Detail Records</h2>
      {error && <p className="text-red-500 mt-4 mb-4">{error}</p>}
      <SearchForm onSubmit={handleSubmit} />
      {audioUrl && (
        <div className="mt-4 mb-4">
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Accountcode</th>
            <th className="px-4 py-2">Caller</th>
            <th className="px-4 py-2">Destination</th>
            <th className="px-4 py-2">Context</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Disposition</th>
          </tr>
        </thead>
        <tbody>
          {cdrs.map((cdr, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{cdr.accountcode}</td>
              <td className="border px-4 py-2">{cdr.src}</td>
              <td className="border px-4 py-2">{cdr.dst}</td>
              <td className="border px-4 py-2">{cdr.dcontext}</td>
              <td className="border px-4 py-2">{formatDateTime(cdr.start)}</td>
              <td className="border px-4 py-2">{cdr.duration}</td>
              <td className="border px-4 py-2">{cdr.disposition}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDownload(cdr.start, cdr.recordingfile)}>
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CDRTable;