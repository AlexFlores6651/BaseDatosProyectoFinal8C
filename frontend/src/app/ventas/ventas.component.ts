import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.dataService.getVentas().subscribe(
      (data) => {
        this.ventas = data;
        console.log(this.ventas);
      },
      (error) => {
        console.error('Error al obtener ventas:', error);
      }
    );
  }

  

}

