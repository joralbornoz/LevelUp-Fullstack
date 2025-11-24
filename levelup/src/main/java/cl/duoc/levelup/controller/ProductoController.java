package cl.duoc.levelup.controller;

import cl.duoc.levelup.model.Producto;
import cl.duoc.levelup.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;


    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.findAll();
    }


    @GetMapping("/{codigo}")
    public Producto getProductoByCodigo(@PathVariable String codigo) {
        return productoService.findByCodigo(codigo);
    }


    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {


        if (producto.getStock() == null || producto.getStock() < 0) {
            producto.setStock(0);
        }

        return productoService.save(producto);
    }


    @PutMapping("/{codigo}")
    public Producto updateProducto(@PathVariable String codigo,
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


    @DeleteMapping("/{codigo}")
    public void deleteProducto(@PathVariable String codigo) {
        productoService.deleteByCodigo(codigo);
    }
}
