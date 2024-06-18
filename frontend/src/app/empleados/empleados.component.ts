import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  nuevoEmpleado = { codigo: '', nombre: '', primape: '', segape: '', puesto: '', activo: '', email: '', telefono: '', cdg_dir: '', id_suc: '', cdg_jefe: '' };
  empleadoEditado = { idEmpleado: undefined, codigo: '', nombre: '', primape: '', segape: '', puesto: '', activo: '', email: '', telefono: '', cdg_dir: '', id_suc: '', cdg_jefe: '' };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.dataService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  agregarEmpleado(): void {
    this.dataService.addEmpleado(this.nuevoEmpleado).subscribe(() => {
      this.cargarEmpleados();
      this.nuevoEmpleado = { codigo: '', nombre: '', primape: '', segape: '', puesto: '', activo: '', email: '', telefono: '', cdg_dir: '', id_suc: '', cdg_jefe: '' }; // Resetea el formulario
    });
  }

  editarEmpleado(empleado: any): void {
    this.empleadoEditado = { ...empleado };
  }

  actualizarEmpleado(): void {
    if (this.empleadoEditado.idEmpleado !== undefined) {
      this.dataService.updateEmpleado(this.empleadoEditado.idEmpleado, this.empleadoEditado).subscribe(() => {
        this.cargarEmpleados();
        this.empleadoEditado = { idEmpleado: undefined, codigo: '', nombre: '', primape: '', segape: '', puesto: '', activo: '', email: '', telefono: '', cdg_dir: '', id_suc: '', cdg_jefe: '' }; // Resetea el formulario
      });
    }
  }

  eliminarEmpleado(id: number): void {
    this.dataService.deleteEmpleado(id).subscribe(() => {
      this.cargarEmpleados();
    });
  }
}
