# MapGallery

It's a web page where you can store your images. After uploading picture program saves it in the database, finds where it was made and shows on map. You can also find points of interest near using different filters. If the image you're uploading doesn't have geolocation data you can show it by yourself.

## Get started

### Clone the repo

```shell
git clone https://github.com/SonaGharibyan/Game-page
cd Game-page
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm install -g @angular/cli
ng serve
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `4200`.

Shut it down manually with `Ctrl-C`.

#### npm scripts

These are the most useful commands defined in `package.json`:

* `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
* `npm run build` - runs the TypeScript compiler and asset copier once.
* `npm run build:watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into `dist/`.
* `npm run lint` - runs `tslint` on the project files.
* `npm run serve` - runs `lite-server`.

These are the test-related scripts:

* `npm test` - builds the application and runs Intern tests (both unit and functional) one time.
* `npm run ci` - cleans, lints, and builds the application and runs Intern tests (both unit and functional) one time.
