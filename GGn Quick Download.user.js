// ==UserScript==
// @name         GGn Quick Download
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Copy a page worth of (non-sticky) GGn download links to your clipboard for easy pasting
// @author       KingKrab23
// @match        https://*/torrents.php*
// @grant        none
// @require      https://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$(".linkbox").before('<button id="copy_dl_links_to_clipboard" style="margin-top:15px;">Copy DL links to clipboard</button>');

var $temp = $("<textarea class='hidden'>");
$("body").append($temp);

$("#copy_dl_links_to_clipboard").click(function () {
    $temp.toggleClass("hidden");

    $(".group_torrent.hidden").remove();
    copy_dl_links_to_clipboard();

    //$temp.toggleClass("hidden");
});

function copy_dl_links_to_clipboard() {
    //--- Note that contains() is CASE SENSITIVE.
    var specLink = $("a:contains('DL')");

    if (specLink.length) {
        var text_to_copy = "";
        $.each( specLink, function( key, value ) {
           text_to_copy += value + "\n";
        });

        copyToClipboard(text_to_copy);
        alert(specLink.length + ' torrents have been added to your clipboard');
    }
}

function copyToClipboard(textToCopy) {
    $temp.val(textToCopy).select();
    document.execCommand("copy");
    $temp.val('');
}
