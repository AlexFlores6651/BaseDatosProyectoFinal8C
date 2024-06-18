import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.dataService.getDatosClientes().subscribe(
      (data: any) => {
        this.clientes = data;
      },
      (error: any) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }
}
