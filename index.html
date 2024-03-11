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
    function put_file_link(data, parent) { // ファイルへつながるリンクを設置する関数
        // a.file ファイルへつながるリンク
        var new_elm = document.createElement('a');
        new_elm.href = `app.html?${data.path}`;
        new_elm.innerText = data.title;
        new_elm.className = 'file';
        parent.appendChild(new_elm);
    }
    function put_folder_title(elm, parent) { // フォルダを設置する関数
        // div.folder_div フォルダー
        var new_folder = document.createElement('div');
        new_folder.className = 'folder_div';
        new_folder.id = `folder_div_${elm.id}`;
        parent.appendChild(new_folder);
        var folder_div = document.getElementById(`folder_div_${elm.id}`);

        // ul.folder_ul
        var new_folder_ul = document.createElement('ul');
        new_folder_ul.className = 'folder_ul';
        new_folder_ul.id = `folder_ul_${elm.id}`;
        folder_div.appendChild(new_folder_ul);
        var folder_ul = document.getElementById(`folder_ul_${elm.id}`);

        // li.folder_li
        var new_folder_li = document.createElement('li');
        new_folder_li.className = 'folder_li';
        new_folder_li.id = `folder_li_${elm.id}`;
        folder_ul.appendChild(new_folder_li);
        var folder_li = document.getElementById(`folder_li_${elm.id}`);

        // button.folder_title フォルダーのタイトル 押したら中のファイルが見えたり見えなかったりする
        var new_folder_title = document.createElement('button');
        new_folder_title.innerText = elm.title;
        new_folder_title.id = `folder_title_${elm.id}`;
        new_folder_title.className = 'folder_title';
        folder_li.appendChild(new_folder_title)

        // div.folder_inside フォルダーの中身
        var new_folder_inside = document.createElement('div');
        new_folder_inside.className = 'folder_inside';
        new_folder_inside.id = `folder_inside_${elm.id}`;
        folder_li.appendChild(new_folder_inside);
    }

    function recursion(data, parent) {
        data.forEach(elm => {
            if (elm.type == 'note') {
                put_file_link(elm, parent)
            } else if (elm.type == 'folder') {
                put_folder_title(elm, parent);
                parent = document.getElementById(`folder_inside_${elm.id}`);
                recursion(elm.notes, parent);
            }
        });
    }
    var parent = document.getElementById('notes_tree'); // 親要素の初期設定
    recursion(data, parent);
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
