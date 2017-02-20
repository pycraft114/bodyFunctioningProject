var node = { item: 1, next: null};
var list = {head: node, length:1};

function addFirst(list,value){
    var newnode = {item:value, next:null};
    /*list.head = newnode;
    newnode.next = node;
    list.length++;*/
    newnode.next = list.head;
    list.head = newnode;
    list.length++
}

addFirst(list,2);
addFirst(list,3);
console.log(list);