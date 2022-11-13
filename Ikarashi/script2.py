import json 

for i in range(3):
    fn = str(i+1)+'.json'
# Opening JSON file 
    f = open(fn) 

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
    with open(fn, "w") as outfile:
        json.dump(data, outfile)

    # Closing file 
    f.close()






    
  

  

  