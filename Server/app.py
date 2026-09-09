from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

with open('Model_RF.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)

        required_fields = [
            'gender', 'age', 'occupation', 'sleep_duration',
            'bmi_category', 'heart_rate', 'daily_steps', 'systolic_bp'
        ]
        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing field: {field}")

        try:
            features = [
                float(data['gender']),
                float(data['age']),
                float(data['occupation']),
                float(data['sleep_duration']),
                float(data['bmi_category']),
                float(data['heart_rate']),
                float(data['daily_steps']),
                float(data['systolic_bp']),
            ]
        except (TypeError, ValueError):
            return jsonify({'error': 'Invalid input values, fields must be numeric'}), 400

        if any(v < 0 for v in features):
            return jsonify({'error': 'Invalid input values, fields must be non-negative'}), 400

        print("Features before prediction:", features)
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)
        print("Prediction:", prediction)

        return jsonify({'prediction': prediction.tolist()})

    except ValueError as e:
        print("Error during prediction:", str(e))
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=3001, debug=True)