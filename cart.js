'use strict'


class ShoppingCart{

    constructor(){
        this.cartBlock = $(".cart");
        this.cartBlockItems = this.cartBlock.children(".cart-items-to-buy");
        this.orderedItems = new Map();
    }

    shopCartLengthCheck(){
        if(this.orderedItems.size  == 0) 
            $(".cart").addClass('d-none');
        else
            $(".cart").removeClass('d-none');
        for(let i of this.orderedItems)
            console.log(i);

    }

    updCartDOM(item){
        if(item.count <= 0){
            this.cartBlockItems.find("#"+item.id).remove();
            this.orderedItems.delete(item.id);
        }
        else{
            let inputElement = this.cartBlockItems.find("#"+item.id).find("input");
            console.log("3###");
            console.log(inputElement.val());
            inputElement.val(item.count);

            console.log(item.count);
            console.log("3###");
        }
    }

    addItem(item){
        if(this.orderedItems.has(item.id)){
            this.orderedItems.get(item.id).count++;
            console.log(this.orderedItems.get(item.id).count + " - cur count");
            this.updCartDOM(this.orderedItems.get(item.id));
            console.log("!!!!this.orderedItems.has(item.id)")
        }
        else{
            this.orderedItems.set(item.id, item);
            let newGood = $('<div class = "row text-center no-gutters pt-3 pb-3 " id='+item.id+'><div>');
            $('<div class="col col-sm-3"></div>').append('<span></span>').text(item.name).appendTo(newGood);
            $('<div class="col col-sm-3"></div>').append('<span></span>').text(item.price).appendTo(newGood);
            newGood.append(this.itemToDOM(item.id));
            this.cartBlockItems.append(newGood);
        }

        this.shopCartLengthCheck();

    }
    removeItem(item){
        if(this.orderedItems.has(item.id)){
            this.orderedItems.get(item.id).count--;
            this.updCartDOM(this.orderedItems.get(item.id));
            this.shopCartLengthCheck();
        }
    }

    itemToDOM(itemId){
        let item = this.orderedItems.get(itemId);
        let parentBlock = $("<div></div>").addClass('col col-sm-6 d-flex plus-minus-input');
    

        let minusBttn = $('<button type="button" class="simp_btn btn-remove-item"></button>');
        minusBttn.append($('<i class="fas fa-minus fa-xs"></i>'));
        minusBttn.on("click", event => this.removeItem(item));
        parentBlock.append(minusBttn);
        
        let inputElement = $('<input type="number" value="1">');
        inputElement.on("input", event => { item.count = event.target.value; 
                                            console.log(item.count + " cur item count in input event!")
                                            this.updCartDOM(item);})
        parentBlock.append(inputElement);
    
        let plusBttn = $('<button type="button" class="simp_btn btn-add-item"></button>');
        plusBttn.append($('<i class="fas fa-plus fa-xs"></i>'));
        plusBttn.on("click", event => this.addItem(item));
        parentBlock.append(plusBttn);
      return parentBlock;       
    }

}


let shopCart;
shopCart = new ShoppingCart();

let orderedItems = [];
let addButtons = $(".bttn-add-item");

addButtons.on("click", function(event){
    let nodeData = Item.extractDataFromNode($(event.currentTarget.parentNode));
    let curItem  = new Item(nodeData);
    shopCart.addItem(curItem);
});



class Item{
    static extractDataFromNode(node){
        let data = {};
        data.name = node.children("#ItemName").eq(0).text();
        data.price = node.children("#ItemPrice").eq(0).text();
        data.id = node.attr('id');
        return data;
    }

    constructor(node){
        this.name = node.name;
        this.price = node.price;
        this.id = node.id;
        this.count = 1;
    }
    alertData(){
        console.log(this.name);
        console.log(this.price);
    }

}



