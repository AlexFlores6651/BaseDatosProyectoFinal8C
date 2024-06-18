import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SesionComponent } from './sesion/sesion.component';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ProductosComponent } from './productos/productos.component';
import { StockComponent } from './stock/stock.component';
import { GraficasComponent } from './graficas/graficas.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ContactoComponent } from './contacto/contacto.component';



@NgModule({
  declarations: [
    AppComponent,
    SesionComponent,
    VentasComponent,
    ClientesComponent,
    EmpleadosComponent,
    ProductosComponent,
    StockComponent,
    GraficasComponent,
    HomeComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
