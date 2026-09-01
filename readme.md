# 列車走行位置ビューア（モダンUI版）README

`index.html` / `content.js` をベースに、React + Tailwind CSS でモダン化した版です。
**既存ファイル（index.html, content.js, stationList.js, style.css など）は一切変更していません。**

## 使い方

1. `re-index.html` をブラウザで直接開くだけで動作します（サーバー起動やビルドは不要）。
   - 必要なライブラリ（React / ReactDOM / Tailwind CSS）はすべて事前ビルド済みでローカルに同梱しているため、
     **インターネット接続なし・`file://` で開いても表示されます。**
2. 左側のアコーディオンから路線を選択すると、右側に運行情報が表示されます（通信自体は元と同じ外部API [Azure Logic Apps] を利用するため、この部分の表示にはインターネット接続が必要です）。

## なぜ以前は「何も表示されない」問題が起きていたか

初回作成時は下記をすべて CDN（インターネット経由）から読み込んでいました。

- Tailwind CSS（`cdn.tailwindcss.com`）
- React / ReactDOM（`unpkg.com`）
- Babel standalone（ブラウザ内で JSX をその場でコンパイルするため）

このうち **Babel standalone が `<script type="text/babel" src="./re-content.js">` のように外部ファイルを読み込む処理は、内部で `fetch`/XHR を使って対象ファイルを取得します。**
ブラウザ（Chrome/Edge等）はセキュリティ上の理由で `file://` ページからの `fetch`/XHR によるファイル読み込みをブロックするため、`re-index.html` をダブルクリックして直接開いた場合はスクリプトの読み込みに失敗し、画面に何も表示されませんでした（サーバー経由(http://)で開いた場合は動作します）。

## 対応内容（CDN → ローカル同梱）

ご質問の「Tailwind CSS と React をインターネット読み込みではなくソースファイルに含められないか」について、以下の方針で対応しました。

| 項目 | 変更前 | 変更後 |
|---|---|---|
| React / ReactDOM | unpkg.com からCDN読み込み | `vendor/react.production.min.js` / `vendor/react-dom.production.min.js` としてローカル同梱 |
| JSXコンパイル | Babel standaloneでブラウザ実行時に変換 | ビルド時に事前コンパイル。`re-content.jsx`（JSXソース）→ `re-content.js`（実行用プレーンJS）を生成し、`re-content.js` を通常の `<script>` で読み込み |
| Tailwind CSS | Play CDN（`cdn.tailwindcss.com`、実行時にブラウザ内でCSS生成） | Tailwind CLIで事前ビルドした静的CSS `re-tailwind.css` をローカル同梱し `<link>` で読み込み |

この方式により、`re-index.html` を開くのに必要なファイルはすべてローカルにあり、オフラインかつ `file://` でも動作します。

### 補足：Tailwind CSSの他の選択肢
- **今回採用**：Tailwind CLIで使用クラスのみを含む最小限の静的CSSを事前生成（本番運用として公式に推奨される方式）。
- **代替案**：Play CDN スクリプト自体をファイルごとローカル保存して読み込む方法もありますが、実行時にブラウザ内でCSSを都度生成するため動作がやや重く、Tailwind公式も本番利用は非推奨としています。今回は採用していません。

## ファイル構成

```
re-index.html            モダンUI版のエントリーポイント（これを開く）
re-content.jsx           UIロジックのソース（React + JSX）。修正はこのファイルに対して行う
re-content.js             ↑をビルドして生成した実行用プレーンJS（直接編集しない）
re-style.css              列車種別・行先などドメイン固有の配色スタイル
re-tailwind.css            ↓をビルドして生成した静的Tailwind CSS（直接編集しない）
re-tailwind.config.js     Tailwindのビルド設定
re-tailwind.input.css     Tailwindのビルド元CSS（@tailwind ディレクティブ）
vendor/                   React / ReactDOM のUMDビルド（ローカル同梱）
package.json              ビルドスクリプト定義
```

## UIロジックを修正したいとき（再ビルド手順）

`re-content.jsx` や Tailwind のクラス名（`re-index.html` / `re-content.jsx` 内）を変更した場合は、以下を実行して成果物を再生成してください（Node.js が必要です）。

```powershell
npm install   # 初回のみ
npm run build # re-content.js / re-tailwind.css / vendor/ を再生成
```

- `npm run build:jsx` … `re-content.jsx` → `re-content.js`
- `npm run build:css` … Tailwindの静的CSSを再生成
- `npm run build:vendor` … React/ReactDOMのUMDファイルを `vendor/` にコピー
