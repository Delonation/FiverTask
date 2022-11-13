import os
import json

os.chdir('./')

for fp in os.listdir('.'):
    if fp.endswith('.json'):
        with open(fp) as f:
            for line in f:
                data.append(json.loads(line))
                print(line)

        # content = f.read()
        # print(content)
        # f.seek(0)
        # f.truncate()
        # f.write('[' + content + ']')
        f.close()