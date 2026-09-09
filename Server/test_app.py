import unittest
import json
from app import app

class PredictTestCase(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_valid_prediction(self):
        valid_data = {
            'gender': 1,
            'age': 30,
            'occupation': 2,
            'sleep_duration': 7,
            'bmi_category': 2,
            'heart_rate': 75,
            'daily_steps': 10000,
            'systolic_bp': 120
        }
        response = self.app.post('/predict', 
                                 data=json.dumps(valid_data),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('prediction', data)

    def test_invalid_value(self):
        invalid_data = {
            'gender': 1,
            'age': -5,  # Invalid age
            'occupation': 2,
            'sleep_duration': 7,
            'bmi_category': 2,
            'heart_rate': 75,
            'daily_steps': 10000,
            'systolic_bp': 120
        }
        response = self.app.post('/predict', 
                                 data=json.dumps(invalid_data),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 400)  # Expect 400 for bad input
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Invalid input values, fields must be non-negative')

if __name__ == '__main__':
    unittest.main()
