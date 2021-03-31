function character(name) {
  const character = { name };
  return {
    ...character,
    getCharacter() {
      return this.name;
    },
  };
}
const char = new character("Rafa");
console.log(char.getCharacter.bind({ name: "AAA" })()); //will get undefined
// console.log(giveMeTheCharacterNOW());
console.log(char);
// giveMeTheCharacterNOW = character.getCharacter.bind(character); //will get Simon
// console.log(giveMeTheCharacterNOW());
// giveMeTheCharacterNOW = () => character.getCharacter(); //will get Simon
// console.log(giveMeTheCharacterNOW());
