'use strict'

//let cartBlock = $(".cart");





class ShoppingCart{

    constructor(){
        this.cartBlock = $(".cart");
        this.cartBlockItems = this.cartBlock.children(".cart-items-to-buy");
        this.orderedItems = [];
    }

    shopCartLengthCheck(){
        if(this.orderedItems.length == 0) 
            $(".cart").addClass('d-none');
        else
            $(".cart").removeClass('d-none');
        for(let i of this.orderedItems)
            console.log(i)

    }

    addItem(item){
        // if(this.orderedItems.includes(item)){
        if(this.orderedItems.find((i, index, arr) => i.id == item.id ) ){
            let inputElement = this.cartBlockItems.find("#"+item.id).find("input");
            inputElement.val(Number(inputElement.val()) + 1);
        }
        else{
            this.orderedItems.push(item);
            let newGood = $('<div class = "row text-center no-gutters pt-3 pb-3 " id='+item.id+'><div>');
            $('<div class="col col-sm-3"></div>').append('<span></span>').text(item.name).appendTo(newGood);
            $('<div class="col col-sm-3"></div>').append('<span></span>').text(item.price).appendTo(newGood);
            // newGood.append(creatPlusMinusInput(item));
            newGood.append(this.itemToDOM(item));
            this.cartBlockItems.append(newGood);
        }

        this.shopCartLengthCheck();

    }
    removeItem(item){
        if(this.orderedItems.find((i, index, arr) => i.id == item.id )){
            let inputElement = this.cartBlockItems.find("#"+item.id).find("input");
            if(Number(inputElement.val()) - 1 <= 0){
              this.cartBlockItems.find("#"+item.id).remove();
              this.orderedItems.find((i, index, arr) =>{ if(i.id == item.id) arr.splice(1, index)});
            }
            else
                inputElement.val(Number(inputElement.val()) - 1);
            this.shopCartLengthCheck();
        }
    }

    itemToDOM(item){
        let htmlDescript = '<div class=" col col-sm-6 d-flex plus-minus-input">'
        +'<button type="button" class="simp_btn btn-remove-item" >'
          +'<i class="fas fa-minus fa-xs"></i>'
        +'</button>'
        +'<input type="number" value="1">'
        +'<button type="button" class="simp_btn bttn-add-item" >'
          +'<i class="fas fa-plus fa-xs"></i>'
        +'</button>'
      +'</div>';
    
        // let parentBlock = $.parseHTML('<div class=" col col-sm-6 d-flex plus-minus-input"></div>');
        let parentBlock = $("<div></div>").addClass('col col-sm-6 d-flex plus-minus-input');
    
        // let minusBttn = $.parseHTML('<button type="button" class="simp_btn btn-remove-item" >'
        //                             +'<i class="fas fa-minus fa-xs"></i>'
        //                             +'</button>');
        // console.log(minusBttn);
        let minusBttn = $('<button type="button" class="simp_btn btn-remove-item"></button>');
        minusBttn.append($('<i class="fas fa-minus fa-xs"></i>'));
        minusBttn.on("click", event => shopCart.removeItem(item));
        parentBlock.append(minusBttn);
        
        let inputElement = $('<input type="number" value="1">');
        // inputElement.on("input", event => if(event.target.value =))
        // parentBlock.append($.parseHTML('<input type="number" value="1">'));
        parentBlock.append(inputElement);
    
        let plusBttn = $('<button type="button" class="simp_btn btn-add-item"></button>');
        plusBttn.append($('<i class="fas fa-plus fa-xs"></i>'));
        plusBttn.on("click", event => shopCart.addItem(item));
        parentBlock.append(plusBttn);
    //   return $.parseHTML(htmlDescript);
      return parentBlock;       
    }

}

let shopCart;
shopCart = new ShoppingCart();

let orderedItems = [];
let addButtons = $(".bttn-add-item");

addButtons.on("click", function(event){
    //let curItem = new Item($(event.currentTarget.parentNode));
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
    }
    alertData(){
        console.log(this.name);
        console.log(this.price);
    }

}


// function creatPlusMinusInput(item){
//     let htmlDescript = '<div class=" col col-sm-6 d-flex plus-minus-input">'
//     +'<button type="button" class="simp_btn btn-remove-item" >'
//       +'<i class="fas fa-minus fa-xs"></i>'
//     +'</button>'
//     +'<input type="number" value="1">'
//     +'<button type="button" class="simp_btn bttn-add-item" >'
//       +'<i class="fas fa-plus fa-xs"></i>'
//     +'</button>'
//   +'</div>';

//     // let parentBlock = $.parseHTML('<div class=" col col-sm-6 d-flex plus-minus-input"></div>');
//     let parentBlock = $("<div></div>").addClass('col col-sm-6 d-flex plus-minus-input');

//     // let minusBttn = $.parseHTML('<button type="button" class="simp_btn btn-remove-item" >'
//     //                             +'<i class="fas fa-minus fa-xs"></i>'
//     //                             +'</button>');
//     // console.log(minusBttn);
//     let minusBttn = $('<button type="button" class="simp_btn btn-remove-item"></button>');
//     minusBttn.append($('<i class="fas fa-minus fa-xs"></i>'));
//     minusBttn.on("click", event => shopCart.removeItem(item));
//     parentBlock.append(minusBttn);

//     parentBlock.append($.parseHTML('<input type="number" value="1">'));

//     let plusBttn = $('<button type="button" class="simp_btn btn-add-item"></button>');
//     plusBttn.append($('<i class="fas fa-plus fa-xs"></i>'));
//     plusBttn.on("click", event => shopCart.addItem(item));
//     parentBlock.append(plusBttn);
// //   return $.parseHTML(htmlDescript);
//   return parentBlock;
// }



