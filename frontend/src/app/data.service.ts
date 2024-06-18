import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000/api/datos'; // URL del endpoint en el servidor
  private empleadosUrl = 'http://localhost:3000/api/empleados'; // URL del endpoint de empleados
  private stockUrl = 'http://localhost:3000/api/stock'; // URL del endpoint de empleados
  private clientesurl = 'http://localhost:3000/api/clientes'; 
  private ventasUrl = 'http://localhost:3000/api/ventass'; 
  private nani = 'http://localhost:3000/api'; // URL del endpoint en el servidor
  
  
  constructor(private http: HttpClient) { }

  // Método para obtener datos de una tabla específica
  getDatosTabla(nombreTabla: string): Observable<any[]> {
    const url = `${this.baseUrl}/${nombreTabla}`;
    return this.http.get<any[]>(url);
  }

    // Método para filtrar productos por precio y categoría
    filtrarProductos(filtros: any): Observable<any[]> {
      const url = `${this.nani}/productos`;
      return this.http.get<any[]>(url, { params: filtros });
    }

  // Método para obtener los datos de empleados
  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.empleadosUrl);
  }
// Método para agregar un nuevo empleado
addEmpleado(empleado: any): Observable<any> {
  return this.http.post<any>(this.empleadosUrl, empleado);
}

// Método para actualizar un empleado existente
updateEmpleado(id: number, empleado: any): Observable<any> {
  const url = `${this.empleadosUrl}/${id}`;
  return this.http.put<any>(url, empleado);
}

// Método para eliminar un empleado
deleteEmpleado(id: number): Observable<any> {
  const url = `${this.empleadosUrl}/${id}`;
  return this.http.delete<any>(url);
}
  
  

  getProductosSucursales(): Observable<any> {
    return this.http.get<any[]>(this.stockUrl);
  }
  
  getDatosClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.clientesurl);
  }
  
  getVentas(): Observable<any> {
    return this.http.get<any[]>(this.ventasUrl);
  }
}
