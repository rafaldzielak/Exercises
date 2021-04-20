import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
  const todo = res.data as Todo;
  logTodo(todo);
});

const logTodo = (todo: Todo) => {
  console.log(todo.id, todo.title, todo.completed);
};

const throwError = (message: string): never => {
  throw new Error("This function will never reach it's end");
};

// Destructurizing with annotations
const forecast = { date: new Date(), weather: "sunny" };
const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

logWeather(forecast);
// ES2015
const logWeather2 = ({ date, weather }: { date: Date; weather: string }) => {
  console.log(date);
  console.log(weather);
};
logWeather2(forecast);

class Vehicle {
  constructor(public color: string) {}
}
class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
  }
}
const car = new Car(5, "red");
