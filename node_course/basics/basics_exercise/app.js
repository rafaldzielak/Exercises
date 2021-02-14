import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write(
      '<body><h1> <form action="/create-user" method="POST"> <input name="name" type="text"> </input> <button type="submit">SUBMIT</button> </form> </h1></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user") {
    const body = [];
    // It's like event listener, the callbacks will not be executed immediately
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  if (url === "/users") {
    res.write("<html>");
    res.write(
      `<ul>
        <li>User 1 </li>
        <li>User 2 </li>
        <li>User 3 </li>
      </ul>`
    );
    res.write("</html>");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<body><h1> WELCOME </h1></body>");
  res.end();
});

server.listen(3000);
