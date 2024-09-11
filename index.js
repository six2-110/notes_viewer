let notes_data;

// ファイルを読み込む
async function load_file(url, type) {
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
        console.error('error:', error) // エラー
    }
}

function put_link(data) {
    function put_file_link(data, parent, directory) { // ファイルへつながるリンクを設置する関数
        // a.file ファイルへつながるリンク
        var new_elm = document.createElement('a');
		  if (directory.length == 0) var url = data.path;
		  else var url = `${directory.join("/")}/${data.path}`;
        new_elm.href = `app.html?${url}`;
        new_elm.innerText = data.title;
        new_elm.className = 'file';
        parent.appendChild(new_elm);
    }
    function put_folder_title(elm, parent, directory) { // フォルダを設置する関数
	     var foo = [...directory]; foo.push(elm.folder_name);
	     var id = foo.join("-");
        // div.folder_div フォルダー
        var new_folder = document.createElement('div');
        new_folder.className = 'folder_div';
        new_folder.id = `folder_div_${id}`;
        parent.appendChild(new_folder);
        var folder_div = document.getElementById(`folder_div_${id}`);
		  // console.log(directory, id, elm, folder_div)

        // ul.folder_ul
        var new_folder_ul = document.createElement('ul');
        new_folder_ul.className = 'folder_ul';
        new_folder_ul.id = `folder_ul_${id}`;
        folder_div.appendChild(new_folder_ul);
        var folder_ul = document.getElementById(`folder_ul_${id}`);

        // li.folder_li
        var new_folder_li = document.createElement('li');
        new_folder_li.className = 'folder_li';
        new_folder_li.id = `folder_li_${id}`;
        folder_ul.appendChild(new_folder_li);
        var folder_li = document.getElementById(`folder_li_${id}`);

        // button.folder_title フォルダーのタイトル 押したら中のファイルが見えたり見えなかったりする
        var new_folder_title = document.createElement('button');
        new_folder_title.innerText = elm.title;
        new_folder_title.id = `folder_title_${id}`;
        new_folder_title.classList = 'folder_title';
		  new_folder_title.classList.add("close"); // デフォルトで閉じておく
        folder_li.appendChild(new_folder_title);

        // div.folder_inside フォルダーの中身
        var new_folder_inside = document.createElement('div');
        new_folder_inside.className = 'folder_inside';
		  new_folder_inside.classList.add("close"); // デフォルトで閉じておく
        new_folder_inside.id = `folder_inside_${id}`;
        folder_li.appendChild(new_folder_inside);
    }

    // 再帰
    function recursion(data, parent, directory) {
        data.forEach(elm => {
            if (elm.type == 'note') { // ノートのデータなら
                put_file_link(elm, parent, directory) // リンクを作る
            } else if (elm.type == 'folder') { // フォルダのデータなら
				    console.log(elm, parent, directory)
                put_folder_title(elm, parent, directory); // フォルダを設置
					 var foo = [...directory]; foo.push(elm.folder_name); // ディレクトリを1つ深くするよ
                var hoge = document.getElementById(`folder_inside_${foo.join("-")}`); // 親要素の設定
					 // console.log(elm.notes, parent, foo.join("-"));
                recursion(elm.notes, hoge, foo); // フォルダの中のファイルを設置していく
            }
        });
    }
    var parent = document.getElementById('notes_tree'); // 親要素の初期設定
	 console.log(data, parent, [])
    recursion(data, parent, []);
}

// フォルダーのタイトルが押されたときの処理
function folder_title_click(e) {
    var e_id = e.target.id;
    var folder_name = e_id.replace('folder_title_', '');
    var folder_title = document.getElementById(e_id);
    var folder_inside = document.getElementById(`folder_inside_${folder_name}`);
    folder_title.classList.toggle('close');
    folder_inside.classList.toggle('close');
}

window.onload = async () => {
    notes_data = await load_file('data.json', 'json')
    put_link(notes_data);

    // フォルダーのタイトルが押されたときのEventListener
    var folder_titles = document.getElementsByClassName('folder_title');
    Array.from(folder_titles).forEach(btn => {
        btn.addEventListener('click', folder_title_click);
    });
}
