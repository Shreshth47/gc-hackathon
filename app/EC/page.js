'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, collection, doc, setDoc ,updateDoc , increment , writeBatch,getDoc} from '../firebaseConfig'; // Adjust the path to where you save firebase.js
import axios from 'axios';
import { storage} from '../firebaseConfig'; // Assuming you have your Firebase config set up
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions

const EditEvent = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState(null); // 'details' or 'score'
  const [prtcteams, setPrtcTeams] = useState([]);
  const [eventTitle, setEventTitle] = useState('');  // For storing the event title input
const [titleError, setTitleError] = useState('');  // For storing any title-related error messages

  const fetchEventDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulating API call
      setPrtcTeams( [
          { id: 1, name: 'Team Alpha', hall: 'Hall A', score: 10 },
          { id: 2, name: 'Team Beta', hall: 'Hall B', score: 15 },
        ],);
      const event = {
        title: '',
        description: '',
        rulebook: 'Enter G Drive Link',
        venue: '',
      };

      setEventData(event);
    } catch (err) {
      setError('Failed to load event details.');
      setEventData({
        title: null,
        description: null,
        rulebook: null,
        date: null,
        time: null,
        venue: null,
        leg: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamsForEvent = async (title) => {
    setLoading(true);
    setError(null);
    setPrtcTeams([]); // Clear teams before fetching
  
    try {
      const eventRef = doc(db, 'Events', title); // Using title as document ID
      const eventDoc = await getDoc(eventRef);
  
      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        const teams = eventData.teams; // Assume 'teams' is an object containing team names and hall names
        const teamsArray = Object.entries(teams).map(([teamName, hallName]) => ({
          name: teamName,
          hall: hallName,
        }));
        setPrtcTeams(teamsArray); // Set prtcTeams with team details
        setError(null); // Clear error if teams are fetched successfully
      } else {
        setTitleError('Event not found!');
        setPrtcTeams([]);
      }
    } catch (err) {
      setError('Failed to fetch event teams.');
      setPrtcTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setEventData((prevData) => ({ ...prevData, [name]: value }));
    console.log(name, value);
  };

  const handleScoreChange = (teamname, score) => {
    setPrtcTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.name === teamname ? { ...team, score: parseInt(score, 10) || 0 } : team
      )
    );
  };
  

  
  const saveEventDetails = async () => {
    setLoading(true);
    try {
      // Find the document by title
      const eventRef = doc(db, 'Events', eventData.title); // Using the title as the document ID
      
      // Fetch the existing document to preserve the unchanged fields
      const eventDoc = await getDoc(eventRef);
      
      if (eventDoc.exists()) {
        // Prepare the updated data by only including changed fields
        const updatedData = {};
        Object.keys(eventData).forEach((key) => {
          if (eventData[key] !== null && eventData[key] !== undefined) {
            updatedData[key] = eventData[key];
          }
        });
  
        // Update the document with the new data
        await updateDoc(eventRef, updatedData);
        console.log(eventData);
        alert('Event details updated successfully!');
      } else {
        alert('Event not found!');
      }
    } catch (err) {
      console.log(err);
      alert('Failed to update event details.');
    } finally {
      setLoading(false);
    }
  };
  


  const saveEventScores = async () => {
    setLoading(true);
    try {
      // For each team, update the respective hall scores in Firebase
      const scoresRef = collection(db, 'Scores'); // Assuming there's a collection for hall scores
      const batch = writeBatch(db); // Using batch to update multiple documents
  
      prtcteams.forEach((team) => {
        const teamScoreRef = doc(scoresRef, team.hall); // Assuming the hall name is used as the document ID
  
        // Increment the score field by the team’s score
        batch.update(teamScoreRef, { score: increment(team.score) });
      });
  
      await batch.commit();
      alert('Event scores updated successfully!');
    } catch (err) {
      console.log(err);
      alert('Failed to update event scores.');
    } finally {
      setLoading(false);
    }
  };
  



  const renderEventDetails = () => (
    <div style={{ marginLeft:"auto",marginRight:"auto",width: '50%' ,alignItems:"center"}}>
      <h1 style={{ textAlign: 'center' }}>Edit Event Details</h1>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={eventData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0',color:"black" }}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={eventData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0',color:"black" }}
        />
      </label>
      

      
      <label>
        Rulebook:
        <textarea
          name="rulebook"
          value={eventData.rulebook || ''}
          onChange={(e) => handleInputChange('rulebook', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0',color:"black" }}
        />
      </label>

      <label>
        Venue:
        <input
          type="text"
          name="venue"
          value={eventData.venue || ''}
          onChange={(e) => handleInputChange('venue', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0',color:"black" }}
        />
      </label>
      <label>
  Date:
  <input
    type="date"
    name="date"
    value={eventData.date || ''} // Use eventData.date to show selected date
    onChange={(e) => handleInputChange('date', e.target.value)}
    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0',color:"black" }}
  />
</label>

<label>
  Time:
  <input
    type="time"
    name="time"
    value={eventData.time || ''} // Use eventData.time to show selected time
    onChange={(e) => handleInputChange('time', e.target.value)}
    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' ,color:"black"}}
  />
</label>


      <label>
  Leg:
  <select
    name="leg"
    value={eventData.leg || ''}
    onChange={(e) => handleInputChange('leg', e.target.value)}
    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', color: "black" }}
  >
    <option value="Cultural Leg">Cultural Leg</option>
    <option value="Technical Leg">Technical Leg</option>
    <option value="Sports Leg">Sports Leg</option>
  </select>
</label>

      <button
  onClick={saveEventDetails}
  style={{
    padding: '1rem 2rem',
    marginTop: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff', // Primary blue color
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')} // Darker blue for hover
  onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
  onMouseDown={(e) => {
    e.target.style.transform = 'scale(0.95)';
    e.target.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.2)';
  }}
  onMouseUp={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
  }}
>
  Save Changes
</button>

    </div>
  );

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
    setTitleError(''); // Reset error when the user starts typing
  };

  const renderScoreTable = () => (
    <div
      style={{
        width: '100%',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '1.8rem',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        Edit Event Score
      </h1>
      {/* Prompt user to enter the event title */}
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter Event Title"
          value={eventTitle}
          onChange={handleTitleChange}
          style={{
            padding: '0.5rem',
            margin: '1rem',
            width: '80%',
            fontSize: '1.2rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            color: 'black',
          }}
        />
        <button
          onClick={() => fetchTeamsForEvent(eventTitle)}
          style={{
            padding: '1rem 2rem',
            margin: '1rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#0070f3',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}
        >
          Fetch Teams
        </button>

        {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '1rem 0',
          fontSize: '1rem',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th
              style={{
                padding: '0.75rem',
                textAlign: 'left',
                border: '1px solid #ddd',
              }}
            >
              Team Name
            </th>
            <th
              style={{
                padding: '0.75rem',
                textAlign: 'left',
                border: '1px solid #ddd',
              }}
            >
              Hall
            </th>
            <th
              style={{
                padding: '0.75rem',
                textAlign: 'left',
                border: '1px solid #ddd',
              }}
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {console.log(prtcteams)}
          {prtcteams.map((team, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fff',
              }}
            >
              <td
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  color: '#333',
                }}
              >
                {team.name}
              </td>
              <td
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  color: '#333',
                }}
              >
                {team.hall}
              </td>
              <td
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                }}
              >
                <input
                  type="number"
                  value={team.score || ''}
                  onChange={(e) => handleScoreChange(team.name, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    color: '#000',
                    boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={saveEventScores}
        style={{
          padding: '1rem 2rem',
          marginTop: '1.5rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#28a745', // Success green color
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')} // Darker green for hover
        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)';
          e.target.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.2)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
        }}
      >
        Save Changes
      </button>
    </div>
  );
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {!eventData ? (
        <button
        onClick={fetchEventDetails}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#0070f3',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#005bb5')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#0070f3')}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)';
          e.target.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.2)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
        }}
      >
        Edit Event
      </button>
      
      ) : (
        <div>
          {!viewMode && (
            <div>
              <button
  onClick={() => setViewMode('details')}
  style={{
    padding: '1rem 2rem',
    margin: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#6c63ff', // Primary color
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = '#554ce6')} // Darker shade for hover
  onMouseOut={(e) => (e.target.style.backgroundColor = '#6c63ff')}
  onMouseDown={(e) => {
    e.target.style.transform = 'scale(0.95)';
    e.target.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.2)';
  }}
  onMouseUp={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
  }}
>
  Edit Event Details
</button>

<button
  onClick={() => setViewMode('score')}
  style={{
    padding: '1rem 2rem',
    margin: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#28a745', // Green color for score editing
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')} // Darker green for hover
  onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
  onMouseDown={(e) => {
    e.target.style.transform = 'scale(0.95)';
    e.target.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.2)';
  }}
  onMouseUp={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
  }}
>
  Edit Event Score
</button>

            </div>
          )}
          {viewMode === 'details' && renderEventDetails()}
          {viewMode === 'score' && renderScoreTable()}
        </div>
      )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default EditEvent;

