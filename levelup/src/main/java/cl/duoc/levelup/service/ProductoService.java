package cl.duoc.levelup.service;

import cl.duoc.levelup.model.Producto;
import cl.duoc.levelup.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // ========== CRUD BÁSICO ==========

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Producto findByCodigo(String codigo) {
        return productoRepository.findById(codigo).orElse(null);
    }

    public Producto save(Producto producto) {
        // Normalizamos el stock: nunca negativo, nunca null
        if (producto.getStock() == null || producto.getStock() < 0) {
            producto.setStock(0);
        }
        return productoRepository.save(producto);
    }

    public void deleteByCodigo(String codigo) {
        productoRepository.deleteById(codigo);
    }

    // ========== LÓGICA DE STOCK ==========

    /**
     * Descuenta stock de un producto.
     * @param codigo  código del producto
     * @param cantidad cantidad a descontar (debe ser > 0)
     * @return true si se actualizó, false si no hay stock suficiente o no existe.
     */
    public boolean descontarStock(String codigo, int cantidad) {
        if (cantidad <= 0) return false;

        Producto p = findByCodigo(codigo);
        if (p == null) {
            return false;
        }

        if (p.getStock() == null) {
            p.setStock(0);
        }

        if (p.getStock() < cantidad) {
            // No hay stock suficiente
            return false;
        }

        p.setStock(p.getStock() - cantidad);
        productoRepository.save(p);
        return true;
    }

    /**
     * Aumenta stock (útil para carga de inventario).
     */
    public boolean aumentarStock(String codigo, int cantidad) {
        if (cantidad <= 0) return false;

        Producto p = findByCodigo(codigo);
        if (p == null) {
            return false;
        }

        if (p.getStock() == null) {
            p.setStock(0);
        }

        p.setStock(p.getStock() + cantidad);
        productoRepository.save(p);
        return true;
    }
}
