 
function hashStringToInt(str, tableSize){
  // Prime Numbers give a nice spread and help prevent collisions
  let hash = 17
  for(let i=0; i< str.length; i++){
    hash = (13 * hash * str.charCodeAt(i)) % tableSize
  }

  return hash
}

class HashTable {
  table = new Array(3333)
  numItems = 0

  resize = () => {
    const newTable = new Array(this.table.length * 2)
    this.table.forEach(item => {
      if(item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length)
          if(newTable[idx]) {
            newTable[idx].push([key, value])
          } else {
            newTable[idx] = [[key, value]]
          }
          newTable[idx] = value
        })
      }
    })
  };

  setItem = (key, value) => {
    this.numItems++
    const loadFactor = this.numItems / this.table.length 
    if(this.loadFactor > 0.8) {
      console.log('resize happening')
      // resize
      this.resize()
    }
    const idx = hashStringToInt(key, this.table.length)
    if(this.table[idx]) {
      this.table[idx].push([key, value])
    } else {
      this.table[idx] = [[key, value]]
    }
  };

  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length)
    if(!this.table[idx]){
      return null
    }

    // O(n)
    return this.table[idx].find(x => x[0] === key)[1]
  };

};

const myTable = new HashTable()

myTable.setItem('firstName', 'bob')
console.log(myTable.table.length)
myTable.setItem('lastName', 'tim')
console.log(myTable.table.length)
myTable.setItem('age', 5)
console.log(myTable.table.length)
myTable.setItem('dob', '1/2/3')
console.log(myTable.table.length)

console.log(myTable.table[0])
console.log(myTable.getItem('firstName'))
console.log(myTable.getItem('lastName'))