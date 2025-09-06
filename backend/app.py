from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load data.json
with open("data.json") as f:
    data = json.load(f)

@app.route("/process", methods=["POST"])
def process():
    # Try both form data and JSON body
    name = request.form.get("name") or request.json.get("name") if request.is_json else None

    if not name:
        return jsonify({"status": "error", "message": "Name is required"}), 400

    # Search for the name in data.json
    user = next((u for u in data["users"] if u["name"].lower() == name.lower()), None)

    if user:
        return jsonify({"status": "found", "user": user})
    else:
        return jsonify({"status": "not found", "message": f"No user named {name}"})


# ✅ Get all users API
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(data["users"])


if __name__ == "__main__":
    app.run(port=5000, debug=True)
