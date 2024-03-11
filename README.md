# Drawy studio

Welcome to Drawy Studio, your go-to application for [Excalidraw](https://excalidraw.com/) whiteboards management featuring a convenient dashboard! This application is built using the [T3 stack](https://create.t3.gg/) with prisma.

## How to Use

Clone this repository.
Set up your virtual environment (optional but recommended).
Copy the contents of `.env.example` into a new file named `.env` and configure the required variables.
```text
DATABASE_PORT=""
DATABASE_URL=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# Next Auth Github Provider
GH_CLIENT_ID=""
GH_CLIENT_SECRET=""

CLOUDINARY_URL=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

Install dependencies.
```shell_script
bun install
```

If you need to build the databases locally, you can use the `docker-compose.yaml` file.
```shell_script
docker compose -D
```
> An instance of postgresql will be created

Setup the database.
```shell_script
bun db:push
```

Run the application in dev mode
```shell_script
bun dev
```
Open your browser and visit [http://localhost:3000](http://localhost:3000) to begin.

## Key Features
- **Cloud based:** Save your whiteboards remotely to the cloud.
- **Intuitive Dashboard:** Save, organize, and manage your whiteboards efficiently..
- **Workspaces:** Group your whiteboards into workspaces.


We hope you enjoy using Drawy studio! If you have any questions or issues, feel free to open an [issue](https://github.com/velascoandres/drawy-studio/issues)