# ScrollFloater jQuery Plugin

## Demo
[Demo](http://hakashun.github.io/scrollfloater/scrollfloater.html)

## Features
* You can be fixed to one element in the page.
* You can not apply it against several elements. The reason is that one element is fixed once the process for fixing the other elements because not work well.

* ページ内の一つの要素を、スクロールに応じて最上部に固定することができる。
* 複数の要素への対応を検討しているが、使い方が限定されるため現状は１つの要素のみ適応できる仕様にしてある。

## Example
```
// Basic
$('#hoge').scrollFloater();

// Advanced
$('#hoge').scrollFloater({
    top: 20, // the distance from page top.
    handleAddFixed: function(el) { //after fixed },
    handleRemoveFixed: function(el) { //after unfixed }
});
```

## Licence

Released under the [MIT license](http://opensource.org/licenses/MIT)