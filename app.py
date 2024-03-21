import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="menuorder"
)

@app.route('/', methods=['POST'])
def handle_selected_item():
    try:
        # Get the item name from the request data
        data = request.get_json()
        item_name = data.get('itemName')

        # Insert the item name into the database
        cursor = db.cursor()
        cursor.execute("INSERT INTO names (name) VALUES (%s)", (item_name,))
        db.commit()

        # Return a response (optional)
        response = {
            'message': 'Received item name successfully and added to the database',
            'itemName': item_name
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        # Handle any exceptions or errors
        error_message = f'Error processing item name: {str(e)}'
        return jsonify({'error': error_message}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
