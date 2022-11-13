for i in range(1000):
    search_text = "Dragon Hodlers Club - 1st GEN Dragon Hodler"
    replace_text = "Dragon Hodlers Club is a collection of 1000 3D NFTs that is part of Hodlers Club ecosystem"
    fn = str(i+1)+'.json'
    with open(fn) as file:
        data = file.read()
        data = data.replace(search_text, replace_text)

    with open(fn, 'w') as file:
        file.write(data)
