package cl.duoc.levelup.catalogservice.controller;


import cl.duoc.levelup.catalogservice.model.Producto;
import cl.duoc.levelup.catalogservice.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Productos", description = "Controlador para gestión de productos")
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @Operation(
            summary = "Obtener todos los productos",
            description = "Devuelve una lista de todos los productos disponibles.")
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.findAll();
    }

    @Operation(
            summary = "Obtener producto por código",
            description = "Busca un producto específico usando su código.")
    @GetMapping("/{codigo}")
    public Producto getProductoByCodigo(
            @Parameter(description = "Código del producto", required = true)
            @PathVariable String codigo) {
        return productoService.findByCodigo(codigo);
    }

    @Operation(
            summary = "Crear un nuevo producto",
            description = "Agrega un nuevo producto a la base de datos.")
    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {


        if (producto.getStock() == null || producto.getStock() < 0) {
            producto.setStock(0);
        }

        return productoService.save(producto);
    }

    @Operation(
            summary = "Actualizar un producto",
            description = "Actualiza los datos de un producto existente usando su código.")
    @PutMapping("/{codigo}")
    public Producto updateProducto(
            @Parameter(description = "Código del producto a actualizar", required = true)
            @PathVariable String codigo,
            @Parameter(description = "Datos actualizados del producto", required = true)
            @RequestBody Producto datos) {

        Producto existente = productoService.findByCodigo(codigo);

        if (existente == null) {
            return null;
        }


        existente.setNombre(datos.getNombre());
        existente.setCategoria(datos.getCategoria());
        existente.setPrecio(datos.getPrecio());
        existente.setDescripcion(datos.getDescripcion());
        existente.setImagenUrl(datos.getImagenUrl());


        if (datos.getStock() != null && datos.getStock() >= 0) {
            existente.setStock(datos.getStock());
        }

        return productoService.save(existente);
    }

    @Operation(
            summary = "Eliminar un producto",
            description = "Elimina un producto usando su código.")
    @DeleteMapping("/{codigo}")
    public void deleteProducto(
            @Parameter(description = "Código del producto a eliminar", required = true)
            @PathVariable String codigo) {
        productoService.deleteByCodigo(codigo);
    }
}
