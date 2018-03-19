import { Component } from '@angular/core';

/**
 * Defines the main component of the application.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(  ) { }

  
  readonly authors = [
    'Safa Ghribi (matricule 1919711)'
  ];

  

  ngOnInit() {
    
    
}
}
