
// 点击按钮切换commit json

var obj_lis = document.getElementById("dropdown-menu").getElementsByTagName("li");
for(i=0;i<obj_lis.length;i++){
    obj_lis[i].onclick = function(){
        // alert(this.innerText);
        let href = this.children[0].attributes["value"].nodeValue;
        console.log(href)
        $.getJSON(href,function (d){
            data =d;
            reset();
        });
        $("#muButton").html(this.textContent + "<span class=\"caret\"></span>")
    }
}