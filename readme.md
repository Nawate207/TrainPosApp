# 列車走行位置ビューア（モダンUI版）README

`index.html` / `content.js` をベースに、React + Tailwind CSS でモダン化した版です（旧版は `!old/` に移しました）。

## 使い方

1. `index.html` をブラウザで直接開くだけで動作します（サーバー起動やビルドは不要）。
   - 必要なライブラリ（React / ReactDOM / Tailwind CSS）はすべて事前ビルド済みでローカルに同梱しているため、
     **インターネット接続なし・`file://` で開いても表示されます。**
2. 左側のアコーディオンから路線を選択すると、右側に運行情報が表示されます（通信自体は元と同じ外部API [Azure Logic Apps] を利用するため、この部分の表示にはインターネット接続が必要です）。

## なぜ以前は「何も表示されない」問題が起きていたか

初回作成時は下記をすべて CDN（インターネット経由）から読み込んでいました。

- Tailwind CSS（`cdn.tailwindcss.com`）
- React / ReactDOM（`unpkg.com`）
- Babel standalone（ブラウザ内で JSX をその場でコンパイルするため）

このうち **Babel standalone が `<script type="text/babel" src="./re-content.js">` のように外部ファイルを読み込む処理は、内部で `fetch`/XHR を使って対象ファイルを取得します。**
ブラウザ（Chrome/Edge等）はセキュリティ上の理由で `file://` ページからの `fetch`/XHR によるファイル読み込みをブロックするため、`index.html` をダブルクリックして直接開いた場合はスクリプトの読み込みに失敗し、画面に何も表示されませんでした（サーバー経由(http://)で開いた場合は動作します）。

## 対応内容（CDN → ローカル同梱）

ご質問の「Tailwind CSS と React をインターネット読み込みではなくソースファイルに含められないか」について、以下の方針で対応しました。

| 項目 | 変更前 | 変更後 |
|---|---|---|
| React / ReactDOM | unpkg.com からCDN読み込み | `vendor/react.production.min.js` / `vendor/react-dom.production.min.js` としてローカル同梱 |
| JSXコンパイル | Babel standaloneでブラウザ実行時に変換 | ビルド時に事前コンパイル。`re-content.jsx`（JSXソース）→ `re-content.js`（実行用プレーンJS）を生成し、`re-content.js` を通常の `<script>` で読み込み |
| Tailwind CSS | Play CDN（`cdn.tailwindcss.com`、実行時にブラウザ内でCSS生成） | Tailwind CLIで事前ビルドした静的CSS `re-tailwind.css` をローカル同梱し `<link>` で読み込み |

この方式により、`index.html` を開くのに必要なファイルはすべてローカルにあり、オフラインかつ `file://` でも動作します（Chromium 系ブラウザで確認。CSP（`script-src 'self'`）を設定しているため、他のブラウザで `file://` から開く場合は表示を確認してください）。

### 補足：Tailwind CSSの他の選択肢
- **今回採用**：Tailwind CLIで使用クラスのみを含む最小限の静的CSSを事前生成（本番運用として公式に推奨される方式）。
- **代替案**：Play CDN スクリプト自体をファイルごとローカル保存して読み込む方法もありますが、実行時にブラウザ内でCSSを都度生成するため動作がやや重く、Tailwind公式も本番利用は非推奨としています。今回は採用していません。

## ファイル構成

```
index.html               エントリーポイント（これを開く）
re-content.jsx           UIロジックのソース（React + JSX）。修正はこのファイルに対して行う
re-content.js             ↑をビルドして生成した実行用プレーンJS（直接編集しない）
stationList.js            駅マスタ（JRW／JRC／都営地下鉄の駅名辞書 ToeiStationName を含む）
re-style.css              列車種別・行先などドメイン固有の配色スタイル
re-tailwind.css            ↓をビルドして生成した静的Tailwind CSS（直接編集しない）
re-tailwind.config.js     Tailwindのビルド設定
re-tailwind.input.css     Tailwindのビルド元CSS（@tailwind ディレクティブ）
vendor/                   React / ReactDOM のUMDビルド（ローカル同梱）。npm の公式ファイルと同一（npm run build:vendor で再生成）
functions/                中継API（Azure Functions）のソース・手順書。Logic Apps の署名付きURLを隠すための構成案（README あり）
!old/                     旧版（レガシー）。サイト公開・デプロイの対象外
_config.yml               GitHub Pages（Jekyll）の設定。公開しないファイル・フォルダ（!old、functions、開発用ファイル）を exclude で除外
.nvmrc / .npmrc           Node のバージョン（22）と、engines を満たさない環境でのエラー設定
package.json              ビルドスクリプト定義
```

## 動作環境・更新

- ビルドに必要な Node.js は **20 以上（22 LTS を使用）** です。`package.json` の `engines` と `.npmrc`（`engine-strict`）で、古い Node では `npm install` がエラーになります。
- `tailwindcss` は **3.4 系**（3.4.19）です。Tailwind 4 への移行は、設定方式とクラスの一部が変わるため、別途の作業になります。
- `npm audit` は 0 件です。依存の更新は `npm update` → `npm audit` → `npm run build` の順に行います。
- Windows の PowerShell で `npm` が「スクリプトの実行が無効」と表示される場合は、`npm.cmd` を使うか、`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` を実行してください。

## 公開（デプロイ）対象

GitHub Pages・Azure のどちらも、公開するのは次の 7 ファイルだけです。

`index.html`、`stationList.js`、`re-content.js`、`re-style.css`、`re-tailwind.css`、`vendor/react.production.min.js`、`vendor/react-dom.production.min.js`

- **GitHub Pages**（ブランチからの公開）：`_config.yml` の `exclude` で、`!old/`、`functions/`、開発用ファイル（`package.json`、`re-content.jsx` など）を除外しています。**`.nojekyll` を置くと除外が効かなくなる**ので、置かないでください。
- **Azure Web App**：`.github/workflows` が、上記のファイルだけを集めて（許可リスト方式）デプロイします。
- 公開するファイルを増やすときは、`_config.yml` と、ワークフローの「Stage only the files the site needs」の両方を確認してください。

## セキュリティ上の注意

- 列車情報の取得先（Logic Apps の署名付きURL）は、ブラウザから見えてしまいます。**悪用を防ぐには、`functions/` の中継APIの利用と、Logic Apps のキー再生成が必要です**（手順は `functions/README.md`）。
- API 応答は、HTML に組み立てる前に必ず `escapeHtml()` を通します。新しい路線・表示項目を追加するときも同様にしてください。
- 画面は CSP（`index.html` の meta）で、スクリプトと通信先を制限しています。通信先を変えるときは、`connect-src` も更新してください。
- GitHub Pages / Azure へ公開するのは、上の「公開（デプロイ）対象」の 7 ファイルだけです（Azure はワークフローが、GitHub Pages は `_config.yml` が、この範囲に絞ります）。

## UIロジックを修正したいとき（再ビルド手順）

`re-content.jsx` や Tailwind のクラス名（`index.html` / `re-content.jsx` 内）を変更した場合は、以下を実行して成果物を再生成してください（Node.js 20 以上が必要です）。

```powershell
npm ci        # 初回のみ（package-lock.json のとおりにインストール）
npm run build # re-content.js / re-tailwind.css / vendor/ を再生成
```

- `npm run build:jsx` … `re-content.jsx` → `re-content.js`
- `npm run build:css` … Tailwindの静的CSSを再生成
- `npm run build:vendor` … React/ReactDOMのUMDファイルを `vendor/` にコピー
