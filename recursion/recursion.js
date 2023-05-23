function deepCopyIt(innerObject){
    let outterObject,value,key;

    if(typeof innerObject !== "object" || innerObject === null) {
        return innerObject;
    }
    outterObject = Array.isArray(innerObject)?[]:{};
    for (key in innerObject) {
        value = innerObject[key];
        outterObject[key] = deepCopyIt(value); 
    }

  
    return outterObject;
}






let originalArray = {name:'test',age:25,etc:{ UK: 'uk',countries: ['test1','test2','test3',{key:'alaki'}]} }
console.log('original arrry \n', originalArray);
console.log('copied array \n',  deepCopyIt(originalArray))