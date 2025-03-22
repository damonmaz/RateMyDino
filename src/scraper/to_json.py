import json

FILENAME = "professor_map.json"

def to_json(d: dict):
    """
    Writes the dictionary to a JSON file.
    
    Args:
        d (dict): A dictionary mapping professor names to their RateMyProfessors IDs.
        filename (str): The name of the JSON file to write to.
    """
    with open(FILENAME, 'w') as json_file:
        json.dump(d, json_file, indent=4)