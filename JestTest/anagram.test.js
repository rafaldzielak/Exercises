const anagram = require("./anagram");

test("isAnagram function exists", () => {
  expect(typeof anagram).toEqual("function");
});

test("cinema is an anagram of iceman'", () => {
  expect(anagram("cinema", "iceman")).toBeTruthy();
});

test("dormitory is an anagram of dirty room###'", () => {
  expect(anagram("dormitory", "dirty room###")).toBeTruthy();
});

test("hello is not an anagram of aloha'", () => {
  expect(anagram("hello", "aloha")).toBeFalsy();
});
