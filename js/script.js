var $ = document
var container = $.querySelector('.container')
var more_vert = $.querySelector('.more_vert')
var NE_more_vert = $.querySelector('.NE_more_vert')
var List = $.querySelector('.body').querySelector('ul')
var DEL_List = $.querySelector('.DEL_body').querySelector('ul')
var LK_List = $.querySelector('.LK_body').querySelector('ul')
var WK_List = $.querySelector('.works_body').querySelector('ul')
var listItem = List.querySelector('li')
var like_btn_note = $.querySelector('.like_btn_note')
var window_view = $.querySelector('.window_view')
var row_view = $.querySelector('.row_view')
var cover = $.querySelector('.cover')
var munu_btn = $.querySelector('.munu_btn')
var menu = $.querySelector('.menu')
var pre = $.querySelector('.pre')
var NE_close = $.querySelector('.NE_close');
var search = $.querySelector('.search');
var note_edit = $.querySelector('.note_edit');
var add_new_btn = $.querySelector('.add_new_btn');
var NE_save = $.querySelector('.NE_save');
var NE_topic = $.querySelector('.NE_topic');
var NE_del_node = $.querySelector('.NE_del_node');
var deleted_list = $.querySelector('.deleted_list');
var DEL_close = $.querySelector('.DEL_close');
var open_del_List = $.querySelector('.open_del_List');
var Clear_del_list = $.querySelector('.Clear_del_list');
var recovery_all = $.querySelector('.recovery_all');
var NE_delete = $.querySelector('.NE_delete');
var open_like_list = $.querySelector('.open_like_list');
var NE_recovery = $.querySelector('.NE_recovery');
var LK_close = $.querySelector('.LK_close');
var like_list = $.querySelector('.like_list');
var del_all = $.querySelector('.del_all');
var open_setting_list = $.querySelector('.open_setting_list');
var settong_list = $.querySelector('.settong_list');
var STG_close = $.querySelector('.STG_close');
var checkbox_them = $.querySelector('.checkbox_them');
var font_size = $.querySelector('.font_size');
var font_weight = $.querySelector('.font_weight');
var text_color = $.querySelector('.text_color');
var bg_color = $.querySelector('.bg_color');
var def_setting = $.querySelector('.def_setting');
var NE_cleae_all = $.querySelector('.NE_cleae_all');
var NE_copy_all = $.querySelector('.NE_copy_all');
var open_works_page = $.querySelector('.open_works_page');
var open_notes_page = $.querySelector('.open_notes_page');
var WK_add_btn = $.querySelector('.WK_add_btn');
var WK_add_input = $.querySelector('.WK_add_input');


var LISTNOTE = [];
var CONTENTNOTE = [];
var TOKENS = [];
var DEL_LiSTNOTE = [];
var DEL_CONTENTNOTE = [];
var DEL_TOKENS = [];
var WORKS = [];
var STYLE = [{}];
var onPage = 'note'
var index, selectEL, indexDel, selectEL_DEl;

WK_add_btn.addEventListener('click',()=>{
    if(WK_add_input){
        WORKS[WORKS.length] = {
            work:WK_add_input.value,
            checked:'false'
        }
        createNewWorkEl(WK_add_input.value,'false')
        WK_add_input.value = ''
    }
})
function createNewWorkEl(text,checked){
    let el = document.createElement('li');
    let span = document.createElement('span');
    let del = document.createElement('div');
    del.setAttribute('class','work_del');
    if(checked==='false'){
        el.setAttribute('class','work_item')
    }else{
        el.setAttribute('class','work_item work_item_del')
    }
    el.setAttribute('data-checked',checked);
    span.innerText = text;
    el.appendChild(span);
    del.innerHTML = '<i class="material-icons">remove_circle_outline</i>';
    el.addEventListener('click',(e)=>{
        let elem = e.currentTarget
        elem.classList.toggle("work_item_del");
        if(elem.getAttribute('data-checked')==='true'){
            elem.setAttribute('data-checked','false')
            WORKS.forEach(i=>{if(i.work === e.currentTarget.querySelector('span').innerText){i.checked = 'false'}})
        }else{
            elem.setAttribute('data-checked','true')
            WORKS.forEach(i=>{if(i.work === e.currentTarget.querySelector('span').innerText){i.checked = 'true'}})
        }
        AddLocalStorage()
    })
    del.addEventListener('click',(e)=>{
        e.stopPropagation()
        let el = e.currentTarget.parentNode
        WORKS.forEach((i,a)=>{
            if(i.work === el.querySelector('span').innerText){WORKS.splice(a,1)}
        })
        WK_List.removeChild(el);
        AddLocalStorage()
    })
    el.appendChild(del);
    WK_List.appendChild(el);
}
open_works_page.addEventListener('click',()=>{
    if(onPage==='note'){
        cover.classList.toggle("works_open")
        onPage = 'work'
    }
})
open_notes_page.addEventListener('click',()=>{
    onPage = 'note'
    cover.classList.remove("works_open")
})
NE_copy_all.addEventListener('click', () => {
    let el = document.createElement('input');
    let text = pre.innerText;
    document.body.appendChild(el);
    el.value = text;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
})
NE_cleae_all.addEventListener('click', () => pre.innerText = '')
def_setting.addEventListener('click', () => {
    localStorage.removeItem('style');
    pre.style.color = '';
    pre.style.backgroundColor = '';
    pre.style.fontWeight = '';
    pre.style.fontSize = '';
    font_size.value = 2;
    font_weight.value = 2;
    bg_color.value = '#000';
    text_color.value = '#000';

});
text_color.addEventListener('change', () => {
    let size = text_color.value;
    console.log(size);
    pre.style.color = size;
    STYLE[0].text_color = size;
    localStorage.setItem('style', JSON.stringify(STYLE));
})
bg_color.addEventListener('change', () => {
    let size = bg_color.value;
    console.log(size);
    pre.style.backgroundColor = size;
    STYLE[0].bg_color = size;
    localStorage.setItem('style', JSON.stringify(STYLE));
})
font_weight.addEventListener('change', () => {
    let size = Number(font_weight.value) * 100;
    pre.style.fontWeight = 200 + size;
    STYLE[0].font_weight = size;
    localStorage.setItem('style', JSON.stringify(STYLE));
})
font_size.addEventListener('change', () => {
    let size = Number(font_size.value);
    pre.style.fontSize = 12 + size + 'px';
    STYLE[0].font_size = size;
    localStorage.setItem('style', JSON.stringify(STYLE));
})
checkbox_them.addEventListener('click', () => {
    if (checkbox_them.checked) { cover.classList.toggle('dark_mode'); localStorage.setItem('them', 'night') }
    else { cover.classList.remove('dark_mode'); localStorage.setItem('them', 'day') }
})
STG_close.addEventListener('click', () => {
    settong_list.classList.remove('settong_list_open');
})

open_setting_list.addEventListener('click', () => {
    settong_list.classList.toggle('settong_list_open');
})
del_all.addEventListener('click', () => {
    TOKENS.forEach(i => { DEL_TOKENS[DEL_TOKENS.length] = i })
    CONTENTNOTE.forEach(i => { DEL_CONTENTNOTE[DEL_CONTENTNOTE.length] = i })
    LISTNOTE.forEach(i => { DEL_LiSTNOTE[DEL_LiSTNOTE.length] = i })
    try {
        localStorage.removeItem('LISTNOTE'); LISTNOTE = undefined;
        localStorage.removeItem('CONTENTNOTE'); CONTENTNOTE = undefined;
        localStorage.removeItem('TOKENS'); TOKENS = undefined;
    } catch (err) { console.log(err.message) }
    List.innerHTML = ''
    AddLocalStorage();
})
open_like_list.addEventListener('click', () => {
    like_list.classList.toggle('like_list_open');
    $.querySelectorAll('.like_btn_note').forEach(e => {
        let data = e.querySelector('i').getAttribute('data-like');
        if (data === 'true') { LK_List.appendChild(e.parentNode.parentNode) }
    })
    List.innerHTML = ''
})
LK_close.addEventListener('click', () => {
    like_list.classList.remove('like_list_open');
    LK_List.innerHTML = '';
    LISTNOTE.forEach(e => { CreateNewEL(e.title, e.date, e.like, e.token) });
})
NE_recovery.addEventListener('click', () => {
    DEL_List.removeChild(selectEL_DEl);
    let elToken = Number(selectEL_DEl.getAttribute('data-token'));
    note_edit.classList.remove('note_edit_open');
    note_edit.classList.remove('del_edit');
    DEL_TOKENS.forEach((e, i) => {
        if (e.token === elToken) {
            TOKENS[TOKENS.length] = e;
            DEL_TOKENS.splice(i, 1)
        }
    });
    DEL_LiSTNOTE.forEach((e, i) => {
        if (e.token === elToken) {
            LISTNOTE[LISTNOTE.length] = e;
            DEL_LiSTNOTE.splice(i, 1)
        }
    });
    DEL_CONTENTNOTE.forEach((e, i) => {
        if (e.token === elToken) {
            CONTENTNOTE[CONTENTNOTE.length] = e;
            DEL_CONTENTNOTE.splice(i, 1)
        }
    });
    AddLocalStorage()
})
!function readLocalStorage() {
    try {
        LISTNOTE = JSON.parse(localStorage.LISTNOTE)
        CONTENTNOTE = JSON.parse(localStorage.CONTENTNOTE)
        TOKENS = JSON.parse(localStorage.TOKENS)
        LISTNOTE.forEach(e => { CreateNewEL(e.title, e.date, e.like, e.token) })
        DEL_LiSTNOTE = JSON.parse(localStorage.DEL_LiSTNOTE)
        DEL_CONTENTNOTE = JSON.parse(localStorage.DEL_CONTENTNOTE)
        DEL_TOKENS = JSON.parse(localStorage.DEL_TOKENS)
    } catch (err) { console.log(err.message) }
    try { if (localStorage.them === 'night') { checkbox_them.click() } } catch (err) { console.log(err.message) }
    try { WORKS = JSON.parse(localStorage.WORKS);
        WORKS.forEach(i=>{
            createNewWorkEl(i.work,i.checked)
        })
    } catch (err) { console.log(err.message) }
    try {
        STYLE = JSON.parse(localStorage.style);
        font_size.value = STYLE[0].font_size;
        font_weight.value = STYLE[0].font_weight;
        bg_color.value = STYLE[0].bg_color;
        text_color.value = STYLE[0].text_color;
        pre.style.fontSize = STYLE[0].font_size;
        pre.style.fontWeight = STYLE[0].font_weight;
        pre.style.backgroundColor = STYLE[0].bg_color;
        pre.style.color = STYLE[0].text_color;

    } catch (err) { console.log(err.message) }
}()
NE_delete.addEventListener('click', () => {
    DEL_List.removeChild(selectEL_DEl);
    let elToken = Number(selectEL_DEl.getAttribute('data-token'));
    DEL_TOKENS.forEach((e, i) => { if (e.token === elToken) { DEL_TOKENS.splice(i, 1) } });
    DEL_LiSTNOTE.forEach((e, i) => { if (e.token === elToken) { DEL_LiSTNOTE.splice(i, 1) } });
    DEL_CONTENTNOTE.forEach((e, i) => { if (e.token === elToken) { DEL_CONTENTNOTE.splice(i, 1) } });
    AddLocalStorage();
    note_edit.classList.remove('note_edit_open');
    note_edit.classList.remove('del_edit');
})
recovery_all.addEventListener('click', () => {
    DEL_TOKENS.forEach(i => { TOKENS[TOKENS.length] = i })
    DEL_CONTENTNOTE.forEach(i => { CONTENTNOTE[CONTENTNOTE.length] = i })
    DEL_LiSTNOTE.forEach(i => { LISTNOTE[LISTNOTE.length] = i })
    DEL_List.innerHTML = ''
    AddLocalStorage();
    Clear_del_list.click();
})
open_del_List.addEventListener('click', () => {
    deleted_list.classList.toggle("deleted_list_open");
    try { NE_save.removeEventListener('click', editNote) } catch (err) { console.log(err.message) }
    List.innerHTML = ''
    DEL_LiSTNOTE.forEach(e => {
        var title = e.title
        var date = e.date
        var token = e.token

        let el = document.createElement('li');
        el.innerHTML = '<div style="padding: 6px 0 3px;"><div class="title_note">' + title + '</div><div class="createTime_note">' + date + '</div></div>'
        el.setAttribute('class', 'list_item')
        el.setAttribute('data-token', token);
        el.addEventListener('click', (e) => {
            selectEL = undefined;
            selectEL_DEl = e.currentTarget;
            note_edit.classList.toggle('note_edit_open');
            note_edit.classList.toggle('del_edit');
            var token = e.currentTarget.getAttribute('data-token');
            token = Number(token)
            for (let i = 0; i < DEL_CONTENTNOTE.length; i++) {
                const elem = DEL_CONTENTNOTE[i];
                if (token === elem.token) {
                    NE_topic.value = elem.title;
                    pre.innerHTML = elem.content;
                    break;
                }
            }
            try {
                NE_save.removeEventListener('click', editNote);
            } catch (err) { console.log(err.message) }
            NE_save.addEventListener('click', editNotedel = () => {
                NE_save.removeEventListener('click', editNotedel);
                DEL_CONTENTNOTE.forEach(item => {
                    if (item.token === token) {
                        item.title = NE_topic.value;
                        item.content = pre.innerHTML;
                    }
                })
                DEL_LiSTNOTE.forEach(item => {
                    if (item.token === token) {
                        let date = getTimeNow() + ' | ' + 'ویرایش شده';
                        item.title = NE_topic.value;
                        item.date = date;
                        selectEL_DEl.querySelectorAll('div')[0].querySelector('.createTime_note').innerHTML = date;
                    }
                })
                selectEL_DEl.querySelectorAll('div')[0].querySelector('.title_note').innerHTML = NE_topic.value;
                note_edit.classList.remove('note_edit_open');
                note_edit.classList.remove('del_edit');
                AddLocalStorage();
            })
        })
        DEL_List.appendChild(el)
    })
})
DEL_close.addEventListener('click', () => {
    deleted_list.classList.remove("deleted_list_open");
    deleted_list.classList.remove("del_edit");
    DEL_List.innerHTML = ''
    LISTNOTE.forEach(e => { CreateNewEL(e.title, e.date, e.like, e.token) })
})

Clear_del_list.addEventListener('click', () => {
    try {
        localStorage.removeItem('DEL_LiSTNOTE');
        localStorage.removeItem('DEL_CONTENTNOTE');
        localStorage.removeItem('DEL_TOKENS');
    } catch (err) { console.log(err.message) }
    DEL_List.innerHTML = ''
})


NE_del_node.addEventListener('click', () => {
    let elToken = Number(selectEL.getAttribute('data-token'));
    TOKENS.forEach((e, i) => {
        if (e.token === elToken) {
            DEL_TOKENS[DEL_TOKENS.length] = TOKENS[i];
            TOKENS.splice(i, 1)
        }
    });
    LISTNOTE.forEach((e, i) => {
        if (e.token === elToken) {
            DEL_LiSTNOTE[DEL_LiSTNOTE.length] = LISTNOTE[i];
            LISTNOTE.splice(i, 1)
        }
    });
    CONTENTNOTE.forEach((e, i) => {
        if (e.token === elToken) {
            DEL_CONTENTNOTE[DEL_CONTENTNOTE.length] = CONTENTNOTE[i];
            CONTENTNOTE.splice(i, 1)
        }
    });
    List.removeChild(selectEL);
    note_edit.classList.remove('note_edit_open');
    AddLocalStorage();
})

function AddLocalStorage() {
    localStorage.setItem('LISTNOTE', JSON.stringify(LISTNOTE))
    localStorage.setItem('CONTENTNOTE', JSON.stringify(CONTENTNOTE))
    localStorage.setItem('TOKENS', JSON.stringify(TOKENS))

    localStorage.setItem('DEL_LiSTNOTE', JSON.stringify(DEL_LiSTNOTE))
    localStorage.setItem('DEL_CONTENTNOTE', JSON.stringify(DEL_CONTENTNOTE))
    localStorage.setItem('DEL_TOKENS', JSON.stringify(DEL_TOKENS))

    localStorage.setItem('WORKS', JSON.stringify(WORKS))
}
add_new_btn.addEventListener('click', () => {
    try { NE_save.removeEventListener('click', editNote) } catch (err) { console.log(err.message) }
    note_edit.classList.toggle('note_edit_open');
    pre.innerHTML = '';
    NE_topic.value = '';
    NE_save.addEventListener('click', CreateNewNote = () => {
        NE_save.removeEventListener('click', CreateNewNote);
        if (NE_topic.value == '' && pre.innerHTML == '') {
        } else if (NE_topic.value === '') {
            NE_topic.value = "بدون موضوع"
        } else if (pre.innerHTML === '') {
            pre.innerHTML = "بدون محتوی...."
        } else {
            var date = getTimeNow()
            var token = getRandomToken()
            LISTNOTE[LISTNOTE.length] = {
                title: NE_topic.value,
                date: date,
                token: token,
                like: false
            }
            CONTENTNOTE[CONTENTNOTE.length] = {
                token: token,
                title: NE_topic.value,
                content: pre.innerHTML
            }
            TOKENS[TOKENS.length] = {
                token: token
            }
            AddLocalStorage()
            let like = false;
            CreateNewEL(NE_topic.value, date, like, token)
        }
        note_edit.classList.remove('note_edit_open');
    })
})
function CreateNewEL(title, date, like, token) {
    let el = document.createElement('li');
    like ? likeIcon = 'star_rate' : likeIcon = 'star_border'
    let div = document.createElement('div');
    let like_btn = document.createElement('like_btn_note')
    like_btn.setAttribute('class', 'like_btn_note')
    like_btn.innerHTML = '<i class="material-icons" data-like="' + like + '" style="font-size: 22px;">' + likeIcon + '</i>';
    div.appendChild(like_btn);
    el.innerHTML = '<div style="padding: 6px 0 3px;"><div class="title_note">' + title + '</div><div class="createTime_note">' + date + '</div></div>'
    el.appendChild(div);
    el.setAttribute('class', 'list_item')
    el.setAttribute('data-token', token);
    like_btn.setAttribute('data-token', token);
    like_btn.addEventListener('click', (e) => {
        e.stopPropagation()
        let el = e.currentTarget.querySelector('i');
        let token = e.currentTarget.getAttribute('data-token');
        token = Number(token);
        if (el.getAttribute('data-like') === 'true') {
            el.setAttribute('data-like', 'false');
            el.innerHTML = 'star_border';
            LISTNOTE.forEach(i => { if (i.token === token) { i.like = false } })

        } else {
            el.setAttribute('data-like', 'true');
            el.innerHTML = 'star_rate';
            LISTNOTE.forEach(i => { if (i.token === token) { i.like = true } })
        }
        AddLocalStorage()
    })
    el.addEventListener('click', (e) => {
        selectEL = e.currentTarget
        note_edit.classList.toggle('note_edit_open');
        var token = e.currentTarget.getAttribute('data-token');
        token = Number(token)
        for (let i = 0; i < CONTENTNOTE.length; i++) {
            const elem = CONTENTNOTE[i];
            if (token === elem.token) {
                index = i;
                NE_topic.value = elem.title;
                pre.innerHTML = elem.content;
                break;
            }
        }
        NE_save.addEventListener('click', editNote = () => {
            NE_save.removeEventListener('click', editNote);
            CONTENTNOTE[index].content = pre.innerHTML;
            CONTENTNOTE[index].title = NE_topic.value;
            LISTNOTE.forEach(item => {
                if (item.token === token) {
                    let date = getTimeNow() + ' | ' + 'ویرایش شده';
                    item.title = NE_topic.value;
                    item.date = date;
                    selectEL.querySelectorAll('div')[0].querySelector('.createTime_note').innerHTML = date;
                }
            })
            selectEL.querySelectorAll('div')[0].querySelector('.title_note').innerHTML = NE_topic.value;
            note_edit.classList.remove('note_edit_open');
            AddLocalStorage();
        })
    })
    List.appendChild(el)
}
function getRandomToken() {
    var token = Math.floor((Math.random() * 100) * ((Math.random() * 100) * (Math.random() * 1000)));
    TOKENS.forEach(a => { if (a = token) { token = Math.floor((Math.random() * 100) * ((Math.random() * 100) * (Math.random() * 1000))) } })
    return token;
}
function getTimeNow() {
    let x = new Date();
    let month = x.getMonth() + 1
    let date = x.getDate()
    let hours = x.getHours()
    let minutes = x.getMinutes()
    if (month < 10) { month = '0' + month }
    if (date < 10) { date = '0' + date }
    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    let time = x.getFullYear() + '/' + month + '/' + date + ' - ' + hours + ':' + minutes;
    return time
}
NE_close.addEventListener('click', () => {
    note_edit.classList.remove('note_edit_open')
    try {
        NE_save.removeEventListener('click', editNote);
        NE_save.removeEventListener('click', editNotedel);
    } catch (err) { console.log(err.message) }
})
munu_btn.addEventListener('click', () => cover.classList.toggle('open_menu'))
menu.addEventListener('click', (e) => {
    let cls = e.target.className
    if (cls === 'menu_title') {

    } else {
        cover.classList.remove('open_menu')
    }
})
window_view.addEventListener('click', () => List.classList = 'window')
row_view.addEventListener('click', () => List.classList = '')
container.addEventListener('contextmenu', e => e.preventDefault())
more_vert.addEventListener('click', () => {
    more_vert.querySelector('ul').classList.toggle('show')
})
NE_more_vert.addEventListener('click', () => {
    NE_more_vert.querySelector('ul').classList.toggle('show')
})
search.addEventListener('keyup', (e) => {
    search_text = e.target.value;
    let el = $.querySelectorAll('.title_note');
    search_text ? el.forEach(i => { if (i.innerHTML.indexOf(search_text) == -1) { i.parentNode.parentNode.style.display = 'none' } else { i.parentNode.parentNode.style.display = 'inline-flex' } }) : el.forEach(i => { i.parentNode.parentNode.style.display = 'inline-flex' })
})





















