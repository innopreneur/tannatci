<h2>Taṉṉāṭci Readme</h2>

:robot: Automated condition-based DEX trading :rocket: 🛸

🖲 🕹 Demo for the tannatci app https://tannatci.com

### This project is developed as part of ETHBerlin Hackathon.

## Development

The app is a single page React app, created with [`create-react-app`](https://github.com/facebook/create-react-app).

To start development, clone this repo, install all dependencies, and start the development server:

```bash
git clone git@github.com:innoprenuer/tannatci.git
cd tannatci/

docker-compose up

npm i
npm start
```

For development, the `tannatci-be/`, `tannatci-fe/` and `tannatci-ganache/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3050`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### Notes

## 🏛 Licenses

Al code and documentation, is under: The MIT License

Copyright 2019 <Tannatci>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
