import React, { useState } from 'react';
import axios from 'axios';

const WorkoutForm = () => {
  const [workoutType, setWorkoutType] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleTemplateSelect = (template) => {
    // Set workoutType to the selected template name
    setWorkoutType(template.name);

    setDistance(template.distance || '');
    setDuration(template.duration || '');
    setDescription(template.description || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const workoutData = { workoutType, distance, duration, description };
      const response = await axios.post('http://localhost:8080/workout', workoutData);
      console.log('Workout submitted:', response.data);

      // Reset form fields after successful submission
      setWorkoutType('');
      setDistance('');
      setDuration('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting workout:', error);
    }
  };

  const workoutTemplates = [
    {
      id: 1,
      name: '5K Run',
      workoutType: 'Running',
      distance: '3.1', // miles or km
      duration: '30', // minutes
      description: 'Completed a 5K run in the neighborhood.'
    },
    {
      id: 2,
      name: 'Full Body Workout',
      workoutType: 'Weightlifting',
      description: 'Performed a full body workout at the gym.'
    },
    {
      id: 3,
      name: 'Yoga Session',
      workoutType: 'Yoga',
      duration: '45', // minutes
      description: 'Relaxing yoga session at home.'
    }
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Workout Input Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="workoutTemplate" className="form-label">Select Template:</label>
          <select
            className="form-select"
            id="workoutTemplate"
            value={workoutType}
            onChange={(e) => handleTemplateSelect(JSON.parse(e.target.value))}
            required
          >
            <option value="" disabled>Select a template...</option>
            {workoutTemplates.map((template) => (
              <option key={template.id} value={JSON.stringify(template)}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="distance" className="form-label">Distance (miles/km):</label>
          <input type="number" className="form-control" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration (minutes):</label>
          <input type="number" className="form-control" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required />
        </div>

        <button type="submit" className="btn btn-primary">Submit Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
