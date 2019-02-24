
pefModulList.push({
    id: 'ignoreUser',
    name: 'User ignorieren',
    description: 'User im Forum ausblenden',
    link: 'https://github.com/Blue-Reaper/Proxer-Essentials/blob/dev/docs/modules/ignoreUser.md',
    autor: 'Blue.Reaper',
    callMethod: change => ignoreUserCall(change)
});

function ignoreUserCall(change: ModulCallEvent) {
    switch (change) {
        case ModulCallEvent.on:
            ignoreUser();
            break;
        case ModulCallEvent.off:
            // ignoreUser();
            break;
        case ModulCallEvent.ajax:
            // ignoreUser();
            break;
    }
}

function ignoreUser() {
    // Only in Forum
    if (window.location.pathname.split('/')[1] !== 'forum'){
        return;
    }
    // button to hide user-comments
    $('div.kpost-thankyou').each((idx, div)=>{
        let ignoreUserButton = $('<i id="pefIgnoreUser" class="btn">User ausblenden</i>');
        let userId = $(div).parents('table.kpublished').find('li.kpost-username a').attr('href').slice(6, -4);
        ignoreUserButton.click(()=>{
            addIgnoredUser(userId);
            location.reload();
        });
        $(div).append(ignoreUserButton);
    });

    // init ignore-List
    if (GM_getValue("ignoreUserList")==null){
        GM_setValue("ignoreUserList",[]);
    }
    let userList: number[] = GM_getValue("ignoreUserList");

// hide comments
    userList.forEach((user) => {
        let blockedUser =  $('li.kpost-username a[href^="/user/'+user+'"]');
        let comment = blockedUser.parents(".kbody");
        comment.parent().append($('<div class="ignoredComment">Beitrag von '+blockedUser.text()+' ausgeblendet</div>'));
        let showUser = $('<i class="btn">User einblenden</i>');
        showUser.click(()=>{
            removeIgnoredUser(user);
            location.reload();
        });
        let buttons = $('<div class="kmessage-buttons-row center"></div>');
        buttons.append(showUser);
        comment.parent().append(buttons);
        comment.hide();
    });

}

function addIgnoredUser(userId: number){
    let userIgnoreList: number[] = GM_getValue("ignoreUserList");
    if(userIgnoreList.indexOf(userId) == -1){
        userIgnoreList.push(userId);
        GM_setValue("ignoreUserList",userIgnoreList);
    }
}

function removeIgnoredUser(userId: number){
    let userIgnoreList: number[] = GM_getValue("ignoreUserList");
    let index = userIgnoreList.indexOf(userId);
    if(index > -1){
        userIgnoreList.splice(index, 1);
        GM_setValue("ignoreUserList",userIgnoreList);
    }
}
