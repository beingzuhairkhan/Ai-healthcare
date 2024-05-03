import  { useState, useEffect } from 'react';
import { BASE_URL } from '../../config.js';

function SymptomChecker() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [symptomNotFound, setSymptomNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSymptomNotFound(false);
    
      const response = await fetch(`${BASE_URL}/symptom-checker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptom }),
      });
      const data = await response.json();
      
      if (data.result === 'Symptom not found') {
        setSymptomNotFound(true);
      } else {
        setResult(data.result);
        setRemedies(data.remedies);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [symptom]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#fff9ea]">
      <h1 className="text-3xl font-bold mb-4">Symptom Checker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="Enter symptom..."
          className="border border-gray-300 p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading || symptom.trim() === ''}
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
      {symptomNotFound && <div className="text-red-600">Symptom not found.</div>}
      {result && !symptomNotFound && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Symptom: {result}</h2>
          {remedies.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Home Remedies:</h2>
              <ul className="list-disc pl-5">
                {remedies.map((remedy, index) => (
                  <li key={index} className="mb-2">
                    {remedy}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SymptomChecker;
