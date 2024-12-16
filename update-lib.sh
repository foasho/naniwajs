# cacheをクリア
npm cache clear --force

pnpm install three@latest
pnpm install -D @types/three@latest
pnpm install @react-three/fiber@latest
pnpm install @react-three/drei@latest
pnpm install @react-three/postprocessing@latest
pnpm install three-stdlib@latest

docker-compose build --no-cache
docker-compose up -d
