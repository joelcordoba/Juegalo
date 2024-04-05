<script>
//<![CDATA[
/*
* Juegos favoritos
* Copyright (c) 2020 https://www.juegalo.com.co
* No Licensed & Open source Code
* jQuery library
*/
// variable empty konten
var massgEmpty = ('Lista de mis juegos favoritos'),
articleLabel = ('Continúa jugando'),
link_articleLabel = ('https://www.juegalo.com.co/search');
(function ($) {
"use strict";
var OptionManager = (function () {
var objToReturn = {};
var defaultOptions = {
bookmarkIcon: 'bookmarkIcon',
bookmarkBadge: 'show-bookmark',
articleQuantity: 'article-quantity',
affixBookmarkIcon: true,
showBookmarkModal: true,
clickOnAddToBookmark: function($addTobookmark) { },
clickOnbookmarkIcon: function($bookmarkIcon, konten ) { },
};
var getOptions = function (customOptions) {
var options = $.extend({}, defaultOptions);
 if (typeof customOptions === 'object') {
$.extend(options, customOptions);
}
return options;
}
objToReturn.getOptions = getOptions;
return objToReturn;
}());
var articleManager = (function(){
var objToReturn = {};
localStorage.konten = localStorage.konten ? localStorage.konten : "";
var getIndexOfarticle = function(id){
var articleIndex = -1;
var konten = getAllkonten();
$.each(konten, function(index, value){
if(value.id == id){
articleIndex = index;
return;
}
});
return articleIndex;
}
var setAllkonten = function(konten){
localStorage.konten = JSON.stringify(konten);
}
var addarticle = function(id, title, link, summary, quantity, borkimage) {
var konten = getAllkonten();
konten.push({
id: id,
title: title,
link: link,
summary: summary,
quantity: quantity,
borkimage: borkimage
});
setAllkonten(konten);
}
var getAllkonten = function(){
try {
var konten = JSON.parse(localStorage.konten);
return konten;
} catch (e) {
return [];
}
}
var updatePoduct = function(id, quantity) {
var articleIndex = getIndexOfarticle(id);
if(articleIndex < 0){
return false;
}
var konten = getAllkonten();
konten[articleIndex].quantity = typeof quantity === "undefined" ? konten[articleIndex].quantity : quantity;
setAllkonten(konten);
return true;
}
var setarticle = function(id, title, link, summary, quantity, borkimage) {
if(typeof id === "undefined"){
console.error("id required")
return false;
}
if(typeof title === "undefined"){
console.error("title required")
return false;
}
if(typeof link === "undefined"){
console.error("link required")
return false;
}
if(typeof borkimage === "undefined"){
console.error("borkimage required")
return false;
}
summary = typeof summary === "undefined" ? "" : summary;
if(!updatePoduct(id)){
addarticle(id, title, link, summary, quantity, borkimage);
}
}
var cleararticle = function(){
setAllkonten([]);
}
var removearticle = function(id){
var konten = getAllkonten();
konten = $.grep(konten, function(value, index) {
return value.id != id;
});
setAllkonten(konten);
}
var getTotalQuantity = function(){
var total = 0;
var konten = getAllkonten();
$.each(konten, function(index, value){
total += value.quantity;
});
return total;
}
objToReturn.getAllkonten = getAllkonten;
objToReturn.updatePoduct = updatePoduct;
objToReturn.setarticle = setarticle;
objToReturn.cleararticle = cleararticle;
objToReturn.removearticle = removearticle;
objToReturn.getTotalQuantity = getTotalQuantity;
return objToReturn;
}());
var loadBookmarkEvent = function(userOptions){
var options = OptionManager.getOptions(userOptions);
var $bookmarkIcon = $("." + options.bookmarkIcon);
var $bookmarkBadge = $("." + options.bookmarkBadge);
var articleQuantity = options.articleQuantity;
var idBookmarkModal = 'cart-modal';
var idbookmarkTable = 'cart-table';
var idEmptyBookmarkMessage = 'cart-empty-message';
var AffixMybookmarkIcon = 'bookmarkIcon-affix';
$bookmarkBadge.text(articleManager.getTotalQuantity());
if(!$("#" + idBookmarkModal).length) {
$('body').append(
'<div class="pop-area" id="' + idBookmarkModal + '">' +
'<div class="pop-html">' +
'<div class="head-pop"><a class="close-btn buka-tutup" style="font-size: 20px;">X</a></div>' +
'<div class="body-content">' +
'<span class="table-responsive" id="' + idbookmarkTable + '"></span>' +
'</div>' +
'</div>' +
'</div>'
);
}
var drawTable = function(){
    var $bookmarkTable = $("#" + idbookmarkTable);
    $bookmarkTable.empty();
    var konten = articleManager.getAllkonten();
    $.each(konten, function(){
        $bookmarkTable.append(
            '<table class="table">' +
            '<tbody>' +
            '<tr title="' + this.summary + '" data-id="' + this.id + '">' +
            '<td class="item-left amp-img-left" style="vertical-align: middle;">' +
            '<a href="' + this.link + '"><amp-img class="responsive-img" src="' + this.borkimage + '" width="400" height="140"/></a>' +
            '</td>' +
            '<td class="item-left" style="vertical-align: middle;">' +
            '<a class="btn-remove" style="display: inline-block; text-align: center;"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill text-danger" fill="currentColor"><path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg></a>' +
'</td>' +
'</tr>' +
'</tbody>' +
'</table>'     
);
});
$bookmarkTable.append(konten.length ? '':
'<div role="alert" id="' + idEmptyBookmarkMessage + '"><div class="text-center"><svg width="80" height="80" viewBox="0 0 24 24"><path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.5 6.5,20.5C8.45,20.5 10.55,20.9 12,22C13.35,21.15 15.8,20.5 17.5,20.5C19.15,20.5 20.85,20.81 22.25,21.56C22.35,21.61 22.4,21.59 22.5,21.59C22.75,21.59 23,21.34 23,21.09V6.5C22.4,6.05 21.75,5.75 21,5.5V7.5L21,13V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,19.15 12,20V13L12,8.5V6.5C10.55,5.4 8.45,5 6.5,5V5Z" fill="#007bff"/></svg><center>' + massgEmpty + '</center><a class="btn btn-outline-info m-2" href="' + link_articleLabel + '">' + articleLabel + '</a></div></div>'
);
}
var showModal = function(){
drawTable();
}
/*
EVENT ADD TO BOOKMARK LIST
*/
if(options.affixBookmarkIcon) {
var bookmarkIconBottom = $bookmarkIcon.offset().top * 1 + $bookmarkIcon.css("height").match(/\d+/) * 1;
$(window).scroll(function () {
$(window).scrollTop() >= bookmarkIconBottom ? $bookmarkIcon.addClass(AffixMybookmarkIcon) : $bookmarkIcon.removeClass(AffixMybookmarkIcon);
});
}
$bookmarkIcon.click(function(){
options.showBookmarkModal ? showModal() : options.clickOnbookmarkIcon($bookmarkIcon, articleManager.getAllkonten());
});
$(document).on('keypress', "." + articleQuantity, function(evt){
if(evt.keyCode == 38 || evt.keyCode == 40){
return ;
}
evt.preventDefault();
});
$(document).on({
click: function() {
var $tr = $(this).closest("tr");
var id = $tr.data("id");
$tr.hide(500, function(){
articleManager.removearticle(id);
drawTable();
$bookmarkBadge.text(articleManager.getTotalQuantity());
});
}}, '.btn-remove');
}
$(document).on({
click: function() {
$('.pop-area').toggleClass('open');
return false;
}}, '.buka-tutup');
$(function () {
var goTohartomyBookmark = function($addTobookmarkBtn){
}
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('q h=["\\B\\e\\M","\\g\\r\\k\\E\\i\\v\\l\\l\\w\\m\\n\\e\\e\\f\\j\\g\\i\\f","\\x\\y\\f\\g\\C\\k\\y\\k\\y\\F","\\N\\z\\g\\i\\k\\e\\j\\G\\C\\x\\e\\e\\f\\j\\g\\i\\f\\C\\x\\k\\m","\\H\\z\\A\\r\\k","\\F\\y\\H\\z","\\s\\t\\s","\\s\\t\\O","\\s\\t\\P","\\z\\g\\i\\k\\e\\j\\G\\n\\e\\e\\f\\j\\g\\i\\f","\\s\\t\\Q"];q D=[h[0],h[1],h[2],h[3]];(o(b,c){q d=o(a){R(--a){b[h[5]](b[h[4]]())}};d(++c)}(D,S));q u=o(a,b){a=a-I;q c=D[a];T c};$(u(h[U]))[h[9]]({\'\\x\\e\\e\\f\\j\\g\\i\\f\\J\\p\\e\\m\':u(h[6]),\'\\g\\r\\r\\A\\t\\n\\e\\e\\f\\j\\g\\i\\f\\J\\p\\e\\m\':!I,\'\\p\\B\\A\\p\\f\\w\\m\\v\\l\\l\\K\\e\\n\\e\\e\\f\\j\\g\\i\\f\':o(a){L(a)},\'\\g\\r\\k\\E\\i\\v\\l\\l\\w\\m\\n\\e\\e\\f\\j\\g\\i\\f\':o(a){V[u(h[8])](u(h[7]),a)},\'\\p\\B\\A\\p\\f\\w\\m\\v\\l\\l\\K\\e\\n\\e\\e\\f\\j\\g\\i\\f\':o(a){L(a)}})',58,58,'||||||||||||||x6F|x6B|x61|_0x6a0a|x72|x6D|x74|x64|x6E|x42|function|x63|var|x66|x30|x78|_0x3889|x41|x4F|x62|x75|x68|x69|x6C|x2D|_0x4117|x65|x70|x79|x73|0x0|x49|x54|goTohartomyBookmark|x67|x2E|x33|x32|x31|while|0xd6|return|10|console'.split('|'),0,{}))
});
var MyBookmark = function (target, userOptions) {
/*
PRIVATE
*/
var $target = $(target);
var options = OptionManager.getOptions(userOptions);
var $bookmarkBadge = $("." + options.bookmarkBadge);
/*
EVENT TARGET ADD TO BOOKMARK
*/
$target.click(function(){
options.clickOnAddToBookmark($target);
var id = $target.data('id');
var title = $target.data('title');
var link = $target.data('link');
var summary = $target.data('summary');
var quantity = $target.data('quantity');
var borkimage = $target.data('borkimage');
articleManager.setarticle(id, title, link, summary, quantity, borkimage);
$bookmarkBadge.text(articleManager.getTotalQuantity());
});
}
$.fn.hartomyBookmark = function (userOptions) {
loadBookmarkEvent(userOptions);
return $.each(this, function () {
new MyBookmark(this, userOptions);
});
}
})(jQuery);
//]]>
</script> 
