// //Basic structure

// (function () { //function expression - runs right away
//   // Declare private vars and functions

//   return {
//     // Declare public vars and functions
//   }
// })();


// STANDARD MODULE PATTERN
const UIController = (function () {
  let text = 'Hello World';

  const changeText = function () {
    const element = document.querySelector('h1');
    element.textContent = text;
  }
  return {
    callChangeText: function () {
      changeText();
      console.log(text);
    }
  }
})();

UIController.callChangeText();
// UIController.changeText(); //WILL NOT WORK, because it's private

// REVEALING MODULE PATTERN - directly reveals what's inside the module
const ItemController = (function () {
  let data = [];

  function add(item) {
    data.push(item);
    console.log('Item added');
  }

  function get(id) {
    console.log("IN GET");
    return data.find(item => item.id === id);
  }


  return {
    add: add,
    get: get
  }
})();

ItemController.add({id: 1, name: 'Rafa'});
ItemController.add({id: 2, name: 'Pawa'});
console.log(ItemController.get(1));
