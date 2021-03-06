cd ../SchoolSquirrel
npm install
npm run build -- --outputPath=../docker/frontend
cd ../api
npm install
npx @zeit/ncc build src/index.ts -o ../docker/backend
cd ../docker
PACKAGE_VERSION=$(cat ../api/package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker build -t schoolsquirrel/schoolsquirrel:v$PACKAGE_VERSION .
rm -r frontend backend