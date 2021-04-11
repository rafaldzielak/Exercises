const functions = require("./functions");

test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

test("Adds 2 + 2 to not equal 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// toBeNull, toBeUndefined, toBeDefined, toBeTruthy, toBeFalsy

test("Should be null", () => {
  expect(functions.isNull(2, 2)).toBeNull();
});

test("Should be falsy", () => {
  expect(functions.checkValue(null)).toBeFalsy();
  expect(functions.checkValue(0)).toBeFalsy();
});

test("User should be Rafa Dyrek object", () => {
  // expect(functions.createUser()).toBe({ firstName: "Rafa", lastName: "Dyrek" }); //fail
  expect(functions.createUser()).toEqual({ firstName: "Rafa", lastName: "Dyrek" }); //pass
});

test("should be under 1600", () => {
  const load1 = 800;
  const load2 = 800;
  // expect(load1 + load2).toBeLessThan(1600); //fail
  expect(load1 + load2).toBeLessThanOrEqual(1600);
});

// Regex
test("There is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test("Admin should be in usernames", () => {
  usernames = ["rafa", "john", "admin"];
  expect(usernames).toContain("admin");
});

test("User fetched name should be Leanne Graham: Promise", () => {
  expect.assertions(1); //verify that cerain number of assertions is done
  return functions.fetchUser().then((data) => {
    expect(data.name).toEqual("Leanne Graham");
  });
});

test("User fetched name should be Leanne Graham: async/await", async () => {
  expect.assertions(1); //verify that cerain number of assertions is done
  const data = await functions.fetchUser();
  expect(data.name).toEqual("Leanne Graham");
});
