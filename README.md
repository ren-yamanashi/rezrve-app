This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
## Login
- [管理者ログイン]
- Email prisma@test.com
- Password prismatest
- [スタッフログイン]
- Email test3@gmail.com
- Password testtest3
### 参考サイト

- [ChakraUI 公式](https://chakra-ui.com/)
- [ChakraUI テンプレート](https://chakra-templates.dev/page-sections/hero)
- [予約アプリEDISONE](https://edisone.jp/) 

## クローン
```git clone https://github.com/ren-yamanashi/rezrve-app.git```
## .env
- [docker] ポート番号と合わせる
- ```DATABASE_URL="postgresql://postgres:password@localhost:5438/postgres?schema=public"```

## .env.local
- [firebase]
```NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBNK11FbH_2NflDfIVgtnSmV-bfUs7FykQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=reserve-app-2c00c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=reserve-app-2c00c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=reserve-app-2c00c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1017848761848
NEXT_PUBLIC_FIREBASE_APP_ID=1:1017848761848:web:ebd4b5caa9d14c9dc01a0d
NEXT_PUBLIC_REACT_APP_MAIL_URL=http://localhost:3000/
```


## docker立ち上げ
```docker compose up -d```

## prisma 
- [Prismaセットアップ、PostgreSQL接続]　```npm install prisma $npx prisma init```
- [PrismaStudio立ち上げ] ```npx prisma studio```
- [prisma更新]　```npx prisma generate```
- [データベーススキマー調節] ```npx prisma db push```

## build
```yarn build```
