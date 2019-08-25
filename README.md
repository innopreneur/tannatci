<h1 align="center">Taṉṉāṭci</h1>

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

For development, the `tannatci-be/`, `tannatci-fe/` and `tannatci-gannache/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3050` and it proxies internally to the server using the linked name as `server:5000`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### Notes
