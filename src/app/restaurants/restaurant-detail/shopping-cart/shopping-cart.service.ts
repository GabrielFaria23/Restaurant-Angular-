import { MenuItemComponent } from "../menu-item/menu-item.component"
import { CartItem } from "./cart.item.model"

export class ShoppingCartService {
    items: CartItem[] = []

    clear(){
        this.items = []
    }

    addItems(item:any){
        let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id)
        if (foundItem){
            foundItem.quantity = foundItem.quantity + 1
        }else{
            this.items.push(new CartItem(item))
        }
    }

    removeItem(item:any){
        this.items.splice(this.items.indexOf(item), 1) //apartir do item que foi recebido por paramentro vai remover 1
    }

    total(): number{
        return this.items
        .map(item => item.value()) //pega o array de item e transforma em um array de valores
        .reduce((prev, value) => prev + value, 0) //pega o valor anterior e soma com o valor atual começando com o valor 0
    }
}