
import json 

# Opening JSON file 
f = open('1.json',) 

# returns JSON object as  
# a dictionary 
data = json.load(f) 

# print(data[0][0]['attributes'])
temp = data[0][0]['attributes']
a = []
for x in temp:

    if(x['value'] == "Empty"):
        print(x)
    else:
        a.append(x)

data[0][0]['attributes'] = a
print("ALL")
print(data)
with open("1.json", "w") as outfile:
    json.dump(data, outfile)

# Closing file 
f.close()

