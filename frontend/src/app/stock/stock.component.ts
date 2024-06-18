import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit{

  productosSucursales: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.obtenerProductosSucursales();
  }
  
  obtenerProductosSucursales(): void {
    this.dataService.getProductosSucursales().subscribe(
      (data) => {
        this.productosSucursales = data;
      },
      (error) => {
        console.error('Error al obtener productos y sucursales:', error);
      }
    );
  }
  

}
