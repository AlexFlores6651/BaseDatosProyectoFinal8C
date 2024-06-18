import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { GraficasComponent } from './graficas/graficas.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HomeComponent } from './home/home.component';
import { SesionComponent } from './sesion/sesion.component';
import { StockComponent } from './stock/stock.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'graficas', component: GraficasComponent},
  {path: 'empleados', component: EmpleadosComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'sesion', component: SesionComponent},
  {path: 'stock', component: StockComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'home', component: HomeComponent},
  {path: 'contacto', component: ContactoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
