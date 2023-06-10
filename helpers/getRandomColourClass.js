export default  function getRandomColourClass(classesArray) {

  const randomIndex = Math.floor(Math.random() * classesArray.length);
    return classesArray[randomIndex];
  }