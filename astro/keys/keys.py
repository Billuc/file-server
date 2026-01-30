import os
import csv
from typing import Dict

fieldnames = ["nom", "genre", "categorie"]
result_filename = "keys.csv"

def distinct(input_list, by):
    """Remove duplicates from a list while preserving order."""
    seen = set()
    result = []

    for item in input_list:
        key = by(item)
        if key not in seen:
            seen.add(key)
            result.append(item)

    return result
    
def write_csv(file_path, data):
    """Write a list of dictionaries to a CSV file."""
    if os.path.exists(file_path):
        os.remove(file_path)
        
    with open(file_path, mode='w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

def read_all_csvs(folder_path):
    """Read all CSV files in a given folder and return their combined contents."""
    combined_data = []

    for filename in os.listdir(folder_path):
        if filename.endswith('.csv'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, mode='r', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile, fieldnames=fieldnames)
                combined_data.extend([row for row in reader])

    return combined_data

def filter_keys(data: list[Dict[str, str]]) -> list[Dict[str, str]]:
    """Filter out invalid keys from the data."""
    valid_data = []
    for row in data:
        if row['nom'] == "nom":
            continue
        if " " in row['nom'] or "-" in row['nom']:
            continue
        if len(row['nom']) < 2:
            continue
        if len(row['nom']) > 10:
            continue
        if row['categorie'] == "autres noms animés":
            row['categorie'] = "autres"
        row['nom'] = row["nom"].replace("é", "e").replace("è", "e").replace("ê", "e").replace("à", "a").replace("ç", "c").replace("î", "i").replace("ô", "o").replace("ï", "i").replace("â", "a")
        valid_data.append(row)
    return valid_data

if __name__ == "__main__":
    folder = os.path.dirname(__file__)
    data = read_all_csvs(folder)
    valid_data = filter_keys(data)
    unique_data = distinct(valid_data, by=lambda x: x['nom'])
    write_csv(os.path.join(folder, result_filename), unique_data)