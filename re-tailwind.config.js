/** ビルド時のみ使用するTailwind CSS設定（本番はre-tailwind.cssとして静的出力） */
module.exports = {
    content: ["./re-index.html", "./re-content.jsx", "./re-content.js"],
    theme: {
        extend: {},
    },
    plugins: [],
};
