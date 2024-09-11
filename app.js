const url_search = location.search.slice(1); // "?"を除いたクエリー文字列を取得
const $viewer = document.getElementById('viewer');
const hide_classes = ['hideR', 'hideG'];
let spans_hide = {};
let if_spans_show = {};
let view_html, notes_data, note_data;

async function load_file(url, type) { // ファイルを読み込む
    try {
        const responce = await fetch(url); // ファイルを読み込むリクエストを作成
        if (responce.ok) { // ステータスコードが200の場合、成功
            if (type == 'text') {
                var res = await responce.text(); // レスポンスデータをテキストとして取得
            } else if (type == 'json') {
                var res = await responce.json(); // レスポンスデータをjsonとして取得
            }
            return res;
        }
    } catch (error) {
        console.error('error:' ,error) // エラー
    }
}

function handle_click_spans(e) {
    var elm = e.target; // 押された要素
    var elm_col, elm_num;

    // 押されたspanの要素はspans_hideのどこに入っているかを検索
    hide_classes.forEach(col => {
        var arr_spans = Array.from(spans_hide[col])
        if (arr_spans.includes(elm)) {
            elm_col = col; // 色
            elm_num = arr_spans.indexOf(elm); // 番号
        }
    })
    if_spans_show[elm_col][elm_num] = !if_spans_show[elm_col][elm_num]; // 表示するかどうかの真偽値を反転させる
}

window.onload = async () => {
    view_html = 'loading...'

    view_html = await load_file(`./notes/${url_search}.html`, 'text'); // クエリー文字列からテキストファイルを取得
    // view_html = view_html.replaceAll('  ', '<br>') // 空白を2つ繋げたら改行
    $viewer.innerHTML = view_html; // div#viewer にhtmlを反映させる

    notes_data = await load_file('data.json', 'json'); // notesのデータをjsonで取得
    var path = url_search.split('/')
    var foo = {notes: notes_data};
    for (let i = 0; i < path.length-1; i++) {
        foo = foo.notes.find((elm) => elm.folder_name == path[i]);
    }
	 // note_data探し
	 var directory = url_search.split("/");
	 var parent = notes_data;
	 // サブディレクトリ取得
	 for (let i=0; i<directory.length-1; i++) {
	     parent = parent.find((folder) => folder.folder_name == directory[i]).notes;
	 }
	 note_data = parent.find((note) => note.path == directory.pop());

    document.getElementById('url').innerText = `${note_data.title} (path:${url_search})`; // noteのurlを表示
    document.getElementsByTagName('title')[0].innerText = `${note_data.title} | Notes Viewer`;

    hide_classes.forEach(className => {
        spans_hide[className] = document.getElementsByClassName(className); // 隠すspanのHTML要素を色別に取得
        if_spans_show[className] = Array(spans_hide[className].length).fill(false); // 全部隠すと設定
    })

    // spanがclickされたときの処理を設定
    hide_classes.forEach(col => {
        for (let i = 0; i < spans_hide[col].length; i++) {
            spans_hide[col][i].addEventListener('click', handle_click_spans);
        }
    })

    // setting_btnのaddEventListener
    document.getElementById('hide_all').addEventListener('click', () => { // すべて非表示
        hide_classes.forEach(col => {for (i=0; i<spans_hide[col].length; i++) if_spans_show[col][i] = false})
    });
    document.getElementById('show_all').addEventListener('click', () => { // すべて表示
        hide_classes.forEach(col => {for (i=0; i<spans_hide[col].length; i++) if_spans_show[col][i] = true})
    });
    document.getElementById('hide_hideR').addEventListener('click', () => { // 赤を非表示
        for (i=0; i<spans_hide.hideR.length; i++) if_spans_show.hideR[i] = false;
    });
    document.getElementById('show_hideR').addEventListener('click', () => { // 赤を表示
        for (i=0; i<spans_hide.hideR.length; i++) if_spans_show.hideR[i] = true;
    });
    document.getElementById('hide_hideG').addEventListener('click', () => { // 緑を非表示
        for (i=0; i<spans_hide.hideG.length; i++) if_spans_show.hideG[i] = false;
    });
    document.getElementById('show_hideG').addEventListener('click', () => { // 緑を表示
        for (i=0; i<spans_hide.hideG.length; i++) if_spans_show.hideG[i] = true;
    });

    setInterval(control_spans, 16)
}

// spanを隠したり表示したりするようにclassを設定する
function control_spans() {
    hide_classes.forEach(col => {
        for (let i = 0; i < if_spans_show[col].length; i++) {
            elm_clsLi = spans_hide[col][i].classList;

            if (if_spans_show[col][i]) { // 表示する設定
                elm_clsLi.add('show');
            } else { // 隠す設定
                elm_clsLi.remove('show');
            }
        }
    })
}