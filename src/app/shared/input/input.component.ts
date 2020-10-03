import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit , AfterContentInit{

  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip: boolean = true

  input: any //esse imput vai ser a variavel presente nos form-groups ex:iptAdress, iptNumber

  @ContentChild(NgModel) model: NgModel //variavel que vai ser referencia para enviar os valores do form a propriedade input //templates model
  @ContentChild(FormControlName) control: FormControlName //Reactive forms

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model || this.control
    if (this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
