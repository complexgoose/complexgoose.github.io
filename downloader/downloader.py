from genericpath import isdir
from json import load
from os import makedirs
import requests

with open("../static/p5ids.json") as f:
    p5Ids = load(f)

downloaded = []
for p5Id in p5Ids:
    sketch_dir = f"../static/sketches/{p5Id}"
    if isdir(sketch_dir):
        continue
    r = requests.get(
        f"https://editor.p5js.org/editor/jstro.io/projects/{p5Id}")

    data = r.json()

    makedirs(sketch_dir, exist_ok=True)

    for file in data["files"]:
        # Assume for now we do not have folders
        if not file["fileType"] == "file":
            continue

        if "url" in file:
            url_r = requests.get(file["url"])
            with open(f"../static/sketches/{p5Id}/{file['name']}", "wb") as f:
                f.write(url_r.content)
        else:
            with open(f"../static/sketches/{p5Id}/{file['name']}", "w") as f:
                f.write(file["content"])

    downloaded.append(p5Id)

if len(downloaded) > 0:
    print(f"Successfully downloaded {','.join(downloaded)}")
else:
    print("Up to date")