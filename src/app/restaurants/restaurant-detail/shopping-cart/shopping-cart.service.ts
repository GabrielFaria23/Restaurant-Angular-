import { Injectable } from "@angular/core"
import { NotificationService } from "app/shared/messages/notification.service"
import { CartItem } from "./cart.item.model"

@Injectable()
export class ShoppingCartService {
    items: CartItem[] = []

    constructor(private notificationService: NotificationService){}

    clear(){
        this.items = []
    }

    addItems(item:any){
        let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id)
        if (foundItem){
            this.increaseQty(foundItem)
        }else{
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify(`Você adicionou o item ${item.name}` )
    }

    removeItem(item:CartItem ){
        this.items.splice(this.items.indexOf(item), 1) //apartir do item que foi recebido por paramentro vai remover 1
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}` )
    }

    total(): number{
        return this.items
        .map(item => item.value()) //pega o array de item e transforma em um array de valores
        .reduce((prev, value) => prev + value, 0) //pega o valor anterior e soma com o valor atual começando com o valor 0
    }

    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity - 1
        if (item.quantity === 0){
            this.removeItem(item)
        }
    }
}