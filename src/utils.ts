// generate a random UUID
export function randomUUID():string {
  return self.crypto.randomUUID();
}

// check if two objects are strictly equal
export function compareObjects (inputDataObject, allQueries) {
  const inputValues= Object.values(inputDataObject);
  console.log(`inputvalues: ${inputValues}`)

  for(let thisQuery of allQueries) {
    const queryValues = Object.values(thisQuery.query)
    if(inputValues.length !== queryValues.length) continue;

    let isMatch = true;
    for(let i = 0; i < inputValues.length; i++) {
      if(inputValues[i] != queryValues[i]) {
        isMatch = false;
        break;
      }
    }
    if(isMatch) {
      console.log(`thisQuery: ${thisQuery.id}`)
    }
  }
  return null
}
