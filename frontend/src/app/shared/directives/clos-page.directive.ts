import { Directive, HostListener } from '@angular/core';
import { CartService } from '../../core/cart.service';

@Directive({
  selector: '[appClosPage]'
})
export class ClosPageDirective {

  constructor( private cartService: CartService) { }

 
@HostListener('window:unload', ['$event'])
unloadHandler() {
    this.cartService.updateCartOnLocalStorage()
}

// @HostListener('window:beforeunload', ['$event'])
// beforeUnloadHandler() {
//   console.log("pppppp")
// }


// @HostListener('mouseenter') onmouseover(){
//     const getcart = localStorage.getItem('test')
//     console.log(JSON.stringify(getcart))
// }

// constructor(private element: ElementRef, private renderer: Renderer2) { }

// @HostListener('mouseenter') onmouseover(){
//   this.renderer.setStyle(this.element.nativeElement, 'color', 'yellow')
//   this.renderer.setStyle(this.element.nativeElement, 'margin', '5px 10px')
  
// }

}
