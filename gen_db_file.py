#!/usr/bin/python3

import csv
import json
from datetime import datetime, timezone

dt = datetime.now(timezone.utc)


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)


def gen_database(json_file):
    with open(json_file) as f:
        curation = json.load(f)

        print('Number of curations: ', len(curation))
        db_items = []
        for idx, item in enumerate(curation):
            db_items.append({
                "id": idx + 1,
                "paper_id": int(item.get('pmid')),
                "author_id": 1,
                "status": 'Submitted',
                "liked_num": 0,
                "tags": item.get('keywords'),
                "content": item.get('knowledge_points'),
                "title": item.get('title'),
                "language": 'English',
                "created_at": dt,
                "updated_at": dt,
            })

        print('Number of items: ', len(db_items))
        return db_items


if __name__ == '__main__':
    json_file = './public/static/gliomarker.json'
    db_file = './public/static/gliomarker-db-v7.json'
    csv_file = './public/static/gliomarker-db-v7.csv'
    data = gen_database(json_file)

    with open(db_file, 'w') as f:
        json.dump(data, f, cls=ComplexEncoder)

    with open(csv_file, 'w') as f:
        w = csv.DictWriter(f, data[0].keys())
        w.writeheader()
        for item in data:
            w.writerow(item)
