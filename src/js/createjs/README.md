1. public/image/createjs/NNN に画像ディレクトリを作成して、画像素材を置く

2. htmlファイルを開き、manifest の画像情報をconfig に転記する(idが他のcreatejsと被らないことに注意)

3. 転記した画像ファイルのパスを修正する。(image -> image/createjs/NNN )

4. js ファイルを src/js/createjs に置く

5. 下記を行頭／行末に追加する
```
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
```

```
module.exports = lib;
```

6. js から playSound を削除する(BGMはゲーム側で制御してください)
