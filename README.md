# Yakusoku

## ビルド方法
### PC向け完成版
```
# for mac
npm run build:mac
# for win
npm run build:win
```

### PC向け体験版
```
# trial オプションを true にする
vim src/js/config.js

# for mac
npm run build:trial:mac
# for win
npm run build:trial:win
```

### Web向け体験版
TODO:

## 開発方法
```
gulp watch
gulp build
```

デバッグモードON
```
# debug オプションを true にする
vim src/js/config.js
# デバッグ用DOMをコメントアウトから戻す
vim public/index.html
```
