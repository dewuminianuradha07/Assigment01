

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, MenuItem, Button, FormControl, InputLabel, Select, FormControlLabel, RadioGroup, Radio,Box } from '@mui/material';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        occupation: '',
        sleep_duration: '',
        bmi_category: '',
        heart_rate: '',
        daily_steps: '',
        systolic_bp: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [level, setLevel] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:3001/predict', formData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setPrediction(response.data.prediction);
          if (response.data.prediction > 6) {
            setLevel('Your Stress level is High.');
          } else {
            setLevel('Your Stress level is Normal.');
          }
        } catch (error) {
          console.error('Error making prediction:', error);
        }
      };

    return (
        <Container className="dashboard-container" maxWidth="sm">
            <div className="dashboard">
                <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 8 }}>
    Stress Detection Dashboard
</Typography>
                    
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="" disabled>Select Gender</MenuItem>
                            <MenuItem value="0">Male</MenuItem>
                            <MenuItem value="1">Female</MenuItem>
      
                        </Select>
                    </FormControl>
                    
                    <TextField
                        name="age"
                        label="Age"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.age}
                        required
                        sx={{
                            
                            '& .MuiInputBase-root': {
                                padding: '4px 8px', 
                                fontSize: '14px',   
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',   
                                lineHeight: '1.5',   
                            },
                        }}
                    />
                    
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Occupation</InputLabel>
                        <Select
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="" disabled>Select Occupation</MenuItem>
                            <MenuItem value="0">Scientist</MenuItem>
                            <MenuItem value="1">Doctor</MenuItem>
                            <MenuItem value="2">Accountant</MenuItem>
                            <MenuItem value="3">Teacher</MenuItem>
                            <MenuItem value="4">Manager</MenuItem>
                            <MenuItem value="5">Engineer</MenuItem>
                            <MenuItem value="6">Sales Representative</MenuItem>
                            <MenuItem value="7">Salesperson</MenuItem>
                            <MenuItem value="8">Lawyer</MenuItem>
                            <MenuItem value="9">Software Engineer</MenuItem>
                            <MenuItem value="10">Nurse</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField
                        name="sleep_duration"
                        label="Sleep Duration"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.sleep_duration}
                        required

                        sx={{
                            
                            '& .MuiInputBase-root': {
                                padding: '4px 8px', 
                                fontSize: '14px',   
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',   
                                lineHeight: '1.5',   
                            },
                        }}
                    />
                    
                    <FormControl fullWidth margin="normal">
                        <InputLabel>BMI Category</InputLabel>
                        <Select
                            name="bmi_category"
                            value={formData.bmi_category}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="" disabled>Select BMI Category</MenuItem>
                            <MenuItem value="0">Underweight</MenuItem>
                            <MenuItem value="1">Normal</MenuItem>
                            <MenuItem value="2">Overweight</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField
                        name="heart_rate"
                        label="Heart Rate"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.heart_rate}
                        required
                        sx={{
                            
                            '& .MuiInputBase-root': {
                                padding: '4px 8px', 
                                fontSize: '14px',   
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',   
                                lineHeight: '1.5',   
                            },
                        }}
                    />
                    
                    <TextField
                        name="daily_steps"
                        label="Daily Steps"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.daily_steps}
                        required
                        sx={{
                            
                            '& .MuiInputBase-root': {
                                padding: '4px 8px', 
                                fontSize: '14px',   
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',   
                                lineHeight: '1.5',   
                            },
                        }}
                    />
                    
                    <TextField
                        name="systolic_bp"
                        label="Blood Presher"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.systolic_bp}
                        required
                         sx={{
                            
                            '& .MuiInputBase-root': {
                                padding: '4px 8px', 
                                fontSize: '14px',   
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',   
                                lineHeight: '1.5',   
                            },
                        }}
                    />
                    
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 4,
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 2,
                                padding: '8px 45px',
                                fontSize: '14px',
                                maxWidth: '200px',
                            }}
                        >
                            Predict
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            href="http://localhost:3000/"
                            sx={{
                                mt: 2,
                                padding: '8px 45px',
                                fontSize: '14px',
                                maxWidth: '200px',
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
   

                    
                    {/* {level && <Typography variant="h6" color="error" sx={{ mt: 2 }}>{level}</Typography>} */}
                    
                    {level && (
    <Box
        sx={{
            mt: 2,              // margin-top
            padding: '16px',    // padding inside the box
            borderRadius: '4px',// rounded corners
            backgroundColor: '#f8d7da', // light red background
            color: '#721c24',   // dark red text
            border: '1px solid #f5c6cb', // border color matching the background
        }}
    >
        <Typography variant="h6">
            {level}
        </Typography>
    </Box>
)}

                </form>
            </div>
        </Container>
    );
};

export default Dashboard;
